# Mise en production : VPS Contabo + Cloudflare

Une seule application Next.js sert tous les sous-domaines. Le serveur lit le nom de domaine de chaque requête (`src/proxy.js`) et affiche la bonne page.

| Adresse | Contenu |
| --- | --- |
| `maisondelatransformation.com` | Site principal |
| `calavi.` `cotonou.` `lome.` | Mini-site de chaque lieu. Les formulaires et le pointage savent de quel lieu vient la personne |
| `app.` | Pointage de présence (code à 4 chiffres) |
| `sermons.` | Prédications |
| `lms.` | Formation en ligne |
| `dp.` | Visuels personnalisés d'événement |
| `evenements.` | Liste des événements, avec inscription |

Le back-office reste sur `/admin` du domaine principal et de chaque sous-domaine ; les certificats sont sur `/certificat/<code>`.

## 1. Cloudflare (DNS)

1. Ajouter le domaine dans Cloudflare et remplacer les serveurs de noms chez le registrar.
2. DNS : un enregistrement `A` pour `@` et un enregistrement `A` pour `*` (joker), tous deux vers l'IP du VPS, nuage orange (proxy activé). Le joker couvre `calavi`, `cotonou`, `lome`, `app`, `sermons`, `lms`, `dp`, `evenements` sans rien ajouter à chaque nouveau sous-domaine.
3. SSL/TLS : mode **Full (strict)**. Créer un certificat d'origine (SSL/TLS, Serveur d'origine) pour `domaine.com` et `*.domaine.com`, à installer sur le VPS.
4. Le certificat universel gratuit couvre `*.domaine.com` (un seul niveau de sous-domaine). Ne pas créer de sous-domaine de sous-domaine.

## 2. VPS Contabo (Ubuntu 22.04 ou 24.04)

```bash
# Pare-feu : SSH + web uniquement
sudo ufw allow OpenSSH && sudo ufw allow 80,443/tcp && sudo ufw enable
# Node 22, Caddy ou nginx, pm2
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash - && sudo apt install -y nodejs nginx sqlite3
sudo npm i -g pm2
```

Récupérer le code dans `/srv/mdt`, puis :

```bash
cd /srv/mdt
cp .env.example .env.local        # remplir toutes les valeurs (voir plus bas)
npm ci
npx prisma db push && npx prisma generate
node scripts/setup.mjs            # crée l'administrateur
npm run build
pm2 start "npm start -- -p 3000" --name mdt && pm2 save && pm2 startup
```

`.env.local` en production :
- `DATABASE_URL="file:/srv/mdt-data/prod.db"` (SQLite hors du dossier du code) ou PostgreSQL sur le même VPS
- `SESSION_SECRET` : 32 caractères aléatoires minimum
- `ROOT_DOMAIN` et `NEXT_PUBLIC_SITE_URL` : le vrai domaine
- `SMTP_URL` et `MAIL_FROM` : pour l'envoi des certificats (Brevo gratuit : 300 emails par jour)

## 3. nginx devant l'application

Un seul bloc pour tous les sous-domaines, avec le certificat d'origine Cloudflare :

```nginx
server {
  listen 443 ssl;
  server_name maisondelatransformation.com *.maisondelatransformation.com;
  ssl_certificate     /etc/ssl/cloudflare/origin.pem;
  ssl_certificate_key /etc/ssl/cloudflare/origin.key;
  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header CF-Connecting-IP $http_cf_connecting_ip;
  }
}
server { listen 80; return 301 https://$host$request_uri; }
```

L'en-tête `Host` doit être transmis tel quel : c'est lui qui choisit le sous-domaine.

## 4. Sécurité

- Pare-feu : n'accepter les ports 80 et 443 que depuis les adresses Cloudflare (liste publique sur cloudflare.com/ips). L'application se fie à l'en-tête `CF-Connecting-IP` pour limiter les abus ; sans cette restriction, il peut être falsifié.
- Changer le mot de passe administrateur à la première connexion et créer les comptes du pasteur et des responsables.
- Sauvegarde SQLite quotidienne : `sqlite3 /srv/mdt-data/prod.db ".backup '/srv/backups/mdt-$(date +%F).db'"` dans un cron, copie hors du serveur.
- Les prières, conseils, dons et aides sociales sont confidentiels : peu de comptes ADMIN et PASTOR.
- La limitation de débit est en mémoire : suffisant sur un seul serveur.

## 5. Contenus à fournir par l'église

| Où | Quoi |
| --- | --- |
| `src/lib/campuses.js` | Adresse, téléphone, horaires de Cotonou et de Lomé (champs vides pour l'instant) |
| `src/app/about/page.jsx` | Histoire, date de fondation, chiffres |
| `src/app/building-project/page.jsx` | Mot du pasteur sur le projet de bâtiment |
| `src/app/give/page.jsx` | Coordonnées de don réelles |
| `src/lib/faq.js` | Relire les réponses ; ajouter les témoignages (`TESTIMONIES`) |
| `src/lib/site.js` (`SITE.apps`) | Liens App Store et Google Play |
| Back-office | Sermons, événements, parcours de formation et leçons : à saisir dans `/admin` |

## 6. Tester les sous-domaines en local

Les navigateurs résolvent `*.localhost` vers la machine locale : `http://calavi.localhost:3100`, `http://lome.localhost:3100`, `http://app.localhost:3100`, etc.
