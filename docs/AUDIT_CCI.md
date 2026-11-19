# Audit joincci.org (Celebration Church International) → plan de réplication MDT

Méthode : pages publiques lues dans un navigateur réel (le site est derrière Cloudflare, un simple `curl` reçoit un challenge 403, non contourné) + liste des sous-domaines issue des certificats publics (crt.sh). Aucune page de connexion n'a été franchie. Tout ce qui est marqué *(déduit)* est une inférence, pas une observation.

## 1. Écosystème : ~120 sous-domaines, 6 familles

| Famille | Sous-domaines | Rôle (observé / déduit) |
|---|---|---|
| Site vitrine | `joincci.org`, `www` | Next.js (App Router), pages : about, ql, campuses, cell-church, map, give, celebrations, ministries, membership-class, counselling, pre/post-marital-counselling, prayer-request, ft (first timers), online-community, welfare, newcampusvolunteers, buildingproject |
| Campus (~50) | `ikeja`, `lagos`, `yaba`, `abuja…`, `london`, `uk`, `usa`, `canada`, `toronto`, `dallas`, `boston`… | Un mini-site par campus, même gabarit (Connect / Ministères / Ressources / Média). Hubs pays : `usa`, `uk`, `canada` |
| Médias | `sermons`, `sermons-api-staging`, `sermons-cdn.essantra`, `essantra` | App de prédications (thèmes : Grâce, Foi, Guérison…, « Latest Sermons », « Show more »). `essantra` = même moteur en marque blanche. API + CDN séparés |
| Plateforme / SI | `app` (check-in code 4 chiffres + apps iOS/Android), `gamma` (admin « CCI Admin », login email/mot de passe), `gammakids`, `checkin`, `membership`, `lms` + `lms-media`, `certgen`/`cert`, `chatbot`, `aiei`, `elf` | App mobile, back-office admin, présence, LMS (Membership School, Discipleship Experience, Leadership Training), certificats, chatbot |
| Backend / API | `api`, `api-staging`, `*.api.axios` (auth-service, comms-service, post-service, rabbitmq), `staging.core.api`, `staging.finance.api`, `manage` | Architecture **microservices** : auth, communications, posts, core, finance, file de messages RabbitMQ. `manage` = **Strapi** (CMS headless) |
| Événements & outils | `rebootcamp` (Reboot Camp 2026, 3–6 déc., National Stadium : ministres, programme, inscription, vendeurs, itinéraire), `getdp` (générateur de DP/visuels d'événement : choisir événement → photo → nom → télécharger), `forms` (WordPress + Gravity Forms embarqués en iframe), `gift.usa`, `support.usa`, `trackmails`, `mail.dataasset` | Micro-sites par événement, formulaires, don, support, emailing suivi |

Hébergement/infra : Cloudflare (WAF, challenge anti-bot, Insights), Google Tag Manager (`GTM-5JSPJ93H`), mail Google Workspace (MX Google), environnements `-staging` séparés.

## 2. Charte CCI (à NE PAS copier : remplacée par celle de la MDT)

Rouge `hsl(0 100% 34%)` (≈ #AD0000) sur fond sombre/photo plein écran, titres **Anton** en capitales, texte **Lato**, composants type shadcn/Tailwind (`--radius: .5rem`), héros vidéo/photo avec 2 CTA (Watch Live / Quick Links), animations fade-in.

## 3. Structure de la home CCI (à reproduire en sections)

1. Navbar : About · Quick Links · Campuses · Cell Church · Sermons · Map · Give
2. Hero plein écran « Vision » + CTA *Watch Live* (YouTube) / *Quick Links*
3. Bienvenue + 3 cartes (Qui sommes-nous / Rejoindre la communauté / Célébrations)
4. Campus : compteurs par pays (30 / 8 / 9 / 4) + lien carte
5. « Nous nous glorifions en Christ » (témoignage de mission)
6. Communauté : Classes de membres · Célébrations · Accompagnement (counselling)
7. Pasteur principal (bio + « Lire plus »)
8. Ministères (Kids/Teens, Jeunesse, Worship/Chorale…)
9. Footer : Give, Building Project, Connect, Ministères, Ressources, Média, stores iOS/Android, réseaux

## 4. Fonctionnalités backend/CRM (comment ils le font, et l'équivalent MDT)

| Fonction CCI | Technique (observé/déduit) | Équivalent MDT proposé |
|---|---|---|
| Contenu éditable (pages, campus, ministères, prédications) | Strapi headless | **Strapi** (ou Supabase/Directus) ; le React actuel consomme l'API |
| Membres / CRM (membership, first/second timers, prayer request, welfare, counselling) | Formulaires Gravity Forms (WordPress) → *(déduit)* service core + base | Table `people` + `requests(type, statut, assigné)` ; formulaires React → API |
| Check-in cultes | `app` : code 4 chiffres affiché au culte → présence | Table `services` (code rotatif) + `attendance` ; page `/checkin` |
| Dons | `give` + `gift.<pays>`, service finance | Page Don + passerelle (Stripe / Mobile Money / Wave / Orange Money) + reçus |
| Prédications | App `sermons` + API + CDN, tags thématiques | Page Sermons : YouTube + audio, tags, recherche, pagination |
| LMS | `lms` (Membership School, Discipleship, Leadership) + `certgen` | Phase 3 : parcours + certificats PDF |
| Emails/notifications | comms-service + RabbitMQ + trackmails | Resend/Brevo + file de jobs ; séquences d'accueil first-timers |
| Auth admin | `gamma` (sign-in admin) + auth-service | Auth JWT + rôles (admin, pasteur, responsable de ministère) |
| Événements | micro-site par événement + `getdp` | Page Événements dynamique + inscription + générateur de visuel |
| Analytics | GTM, Cloudflare Insights | GA4/Plausible + Cloudflare |

## 5. Points de sécurité observés (leçons pour MDT)

- `manage.joincci.org` affiche l'écran Strapi « DEVELOPMENT » en production : mode dev et admin exposés. → chez nous : `NODE_ENV=production`, admin sur URL/IP restreinte.
- Les environnements `staging` et les noms de services internes (auth, rabbitmq, finance) sont visibles dans les certificats publics. → éviter les certificats wildcard/noms parlants, protéger le staging par authentification.
- Admin `gamma` accessible publiquement avec simple email/mot de passe. → 2FA + limitation de tentatives.

## 6. État du projet MDT (React CRA, déjà commencé)

Existant : routes `/`, `/about`, `/sermon`, `/evenements`, `/ministry`, `/contact`, `/donate`, `/detailpastoral`, 404 ; composants Navbar, Footer, Events, Library, Discover, NextCulte, PastorMessage, PastoralMember, Map… ; charte déjà posée dans `src/index.css` : **marine #253F7C / #062F6B, or #E7CF84→#B29A4F, fond #F0EEE7, vert #1A3A37, texte #221917**, polices Montserrat + Marcellus. Pas de backend, pas de données dynamiques ; `Donate.jsx` (9 lignes) et plusieurs pages sont des coquilles.

## 7. Plan proposé

- **Phase 1 – Front (équivalent site vitrine)** : refonte de la home sur la structure §3 avec la charte MDT ; pages manquantes : campus/localisation, cellules, ministères détaillés, membership, counselling, prière, première visite, don, Quick Links.
- **Phase 2 – Backend/CRM** : Strapi + Postgres ; modèles `Sermon`, `Event`, `Ministry`, `Campus`, `Person`, `Request`, `Donation`, `Attendance` ; formulaires branchés ; back-office admin.
- **Phase 3 – Plateforme** : check-in, LMS/certificats, emailing, app mobile (PWA).
