# Mise en production et contenus restants

## 1. Contenus à fournir par l'église

| Où | Quoi |
| --- | --- |
| `src/app/about/page.jsx` | Histoire, date de fondation, chiffres (texte à valider avec le pasteur) |
| `src/app/building-project/page.jsx` | Mot du pasteur sur le projet de bâtiment, avancement, objectifs |
| `src/app/give/page.jsx` | Coordonnées de don réelles (aucun numéro n'est inventé) |
| `src/app/campuses/page.jsx` | Adresses et horaires de chaque lieu |
| `src/lib/faq.js` | Relire les réponses génériques (FAQ cellules, MAP, dons) |
| `src/lib/faq.js` (`TESTIMONIES`) | Témoignages, aujourd'hui vide |
| `src/lib/site.js` (`SITE.apps`) | Liens App Store et Google Play : les badges passent de « Bientôt » à actifs |
| Back-office | Sermons et événements : saisis directement dans `/admin` |

## 2. Hébergement

L'application a besoin d'un serveur Node (formulaires, back-office, base). Un hébergement purement statique ne convient pas.

1. Créer une base PostgreSQL (Neon, Supabase, ou un serveur à vous).
2. Dans `prisma/schema.prisma`, mettre `provider = "postgresql"`.
3. Définir sur l'hébergeur : `DATABASE_URL`, `SESSION_SECRET`, `ADMIN_EMAIL`, `ADMIN_INITIAL_PASSWORD`, `NEXT_PUBLIC_SITE_URL`.
4. Commandes : `npx prisma db push`, puis `node scripts/setup.mjs` (crée l'administrateur), puis `npm run build` et `npm start`.
5. Mettre le domaine en HTTPS : le cookie de session devient « secure » en production.

## 3. Avant l'ouverture

- Changer le mot de passe administrateur et créer les comptes pasteur / responsables (`/admin/users`).
- Vérifier `NEXT_PUBLIC_SITE_URL` (sitemap, partages) avec le vrai domaine.
- Sauvegarder la base régulièrement (dump PostgreSQL quotidien).
- Les données des fidèles (prières, conseils) sont sensibles : limiter les comptes ADMIN et PASTOR.
- Limitation de débit en mémoire : à déplacer vers un stockage partagé (Redis) si plusieurs instances.
