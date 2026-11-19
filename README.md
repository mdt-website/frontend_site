# La Maison de la Transformation (MDT)

Site web et back-office (CRM) de l'église, Abomey-Calavi, Bénin. Next.js 16 (App Router), Prisma, SQLite en local (PostgreSQL possible en production).

Structure et choix issus de l'audit de joincci.org : voir [docs/AUDIT_CCI.md](docs/AUDIT_CCI.md).

## Démarrage

```bash
npm install
npm run db:setup   # crée .env.local, la base, et le compte administrateur
npm run dev
```

`db:setup` génère `.env.local` (non versionné) avec un secret de session et un mot de passe administrateur initial (variable `ADMIN_INITIAL_PASSWORD`). Connectez-vous sur `/admin`, puis changez-le dans « Mon compte ».

Tests : `npm test`.

## Variables d'environnement

| Variable | Rôle |
| --- | --- |
| `DATABASE_URL` | Base de données (`file:./dev.db` en local) |
| `SESSION_SECRET` | Clé de signature des sessions, 32 caractères minimum |
| `ADMIN_EMAIL`, `ADMIN_INITIAL_PASSWORD` | Compte administrateur créé par `db:setup` |
| `NEXT_PUBLIC_SITE_URL` | URL publique (SEO, sitemap) |
| `NOTIFY_WEBHOOK_URL` | Optionnel : webhook appelé à chaque nouvelle demande |

## Ce qui est en place

- **Formulaires publics** (`/api/requests`) : validation, anti-spam (champ piège + limite par IP), création automatique de la fiche personne (dédoublonnage par téléphone puis email), abonnement newsletter.
- **Back-office** (`/admin`) : tableau de bord, demandes (statut, responsable, notes de suivi), personnes, dons annoncés, abonnés, sermons, événements, cultes et présence, utilisateurs, exports CSV.
- **Rôles** : `ADMIN` (tout), `PASTOR` (contenus, demandes confidentielles, dons), `LEADER` (demandes non confidentielles, personnes). Les demandes de prière, conseil, aide sociale et les dons sont masqués aux responsables.
- **Pointage** (`/checkin`) : un code à 4 chiffres par culte, les fidèles signalent leur présence.
- **Pages publiques** `/sermons` et `/events` alimentées par la base.
- Sécurité : mots de passe scrypt, cookie de session signé httpOnly, limitation des tentatives de connexion, neutralisation des formules dans les exports CSV.

## Sous-domaines et plateforme

- **Trois lieux** : `calavi.`, `cotonou.`, `lome.` : mini-site de chaque lieu ; le lieu est enregistré avec chaque demande, personne et culte (filtre dans le back-office).
- **Pointage** : `app.` + image du code à projeter (paysage ou portrait, avec QR) depuis « Cultes et présence ».
- **Formation en ligne** : `lms.` : comptes apprenants, parcours, leçons vidéo YouTube + texte, progression ; gestion dans « Formation ».
- **Certificats** : « Certificats » : émission en lot, page publique de vérification `/certificat/<code>`, envoi par email si `SMTP_URL` est configuré.
- **Visuels d'événement** : `dp.` : photo + nom sur un visuel, composé dans le navigateur (aucune photo envoyée au serveur).
- **Événements** : page détail et inscription par événement.

Déploiement : voir [docs/DEPLOIEMENT.md](docs/DEPLOIEMENT.md) (VPS Contabo + Cloudflare).

## Passer à PostgreSQL

Dans `prisma/schema.prisma`, remplacer `provider = "sqlite"` par `"postgresql"`, renseigner `DATABASE_URL`, puis `npx prisma db push`. La limitation de débit est en mémoire : avec plusieurs instances, la déplacer vers un stockage partagé.

## À fournir par l'église

Témoignages, coordonnées de don, mot du pasteur, histoire, déclaration de foi, dates d'événements, liens App Store / Google Play (`SITE.apps` dans `src/lib/site.js`).
