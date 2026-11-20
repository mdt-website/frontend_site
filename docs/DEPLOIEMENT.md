# Mise en production : VPS Contabo + Namecheap (sans Cloudflare)

Une seule application Next.js sert tous les sous-domaines. Le serveur lit le nom de domaine de chaque requête (`src/proxy.js`) et affiche la bonne page.

Déploiement en place : `maisondelatransformation.com` sur le VPS `62.169.23.155` (Ubuntu 24.04), code dans `/srv/mdt`, base SQLite dans `/srv/mdt-data/prod.db`, nginx + certificat Let's Encrypt, pm2.

| Adresse | Contenu |
| --- | --- |
| `maisondelatransformation.com` | Site principal |
| `calavi.` `cotonou.` `lome.` | Mini-site de chaque lieu |
| `app.` | Pointage de présence |
| `sermons.` | Prédications |
| `lms.` | Formation en ligne |
| `dp.` | Visuels personnalisés d'événement |
| `evenements.` | Liste des événements, avec inscription |

## 1. DNS chez Namecheap

Dans **Domain List → Manage → Advanced DNS** :

1. Supprimer les enregistrements de parking.
2. Ajouter `A` | `@` | `62.169.23.155` | TTL automatique.
3. Ajouter `A` | `*` | `62.169.23.155` | TTL automatique (couvre tous les sous-domaines).
4. Enregistrer et attendre la propagation (`dig +short maisondelatransformation.com A` doit renvoyer l'IP).

Aucun proxy, aucun certificat à acheter : Let's Encrypt est installé sur le VPS.

## 2. VPS (Ubuntu 24.04)

```bash
sudo ufw allow OpenSSH && sudo ufw allow 80,443/tcp && sudo ufw enable
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs nginx sqlite3 certbot python3-certbot-nginx
sudo npm i -g pm2
```

Code dans `/srv/mdt`, puis :

```bash
cd /srv/mdt
cp .env.example .env.local        # remplir toutes les valeurs (voir plus bas)
npm ci
node scripts/setup.mjs            # crée la base et l'administrateur
npm run build
pm2 start "npm start -- -p 3000" --name mdt && pm2 save
pm2 startup systemd -u root --hp /root
```

`.env.local` en production :

- `DATABASE_URL="file:/srv/mdt-data/prod.db"`
- `SESSION_SECRET` : généré aléatoirement (48 octets)
- `ROOT_DOMAIN` et `NEXT_PUBLIC_SITE_URL` : `maisondelatransformation.com`
- `ADMIN_EMAIL`, `ADMIN_INITIAL_PASSWORD` : compte initial (mot de passe à changer)
- `SMTP_URL` et `MAIL_FROM` : pour l'envoi des certificats (Brevo gratuit : 300 emails/jour)

## 3. nginx + certificat

`/etc/nginx/sites-available/mdt` (avant certificat) :

```nginx
server {
  listen 80;
  server_name maisondelatransformation.com *.maisondelatransformation.com;
  location /.well-known/acme-challenge/ { root /var/www/certbot; }
  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header X-Forwarded-Proto $scheme;
    client_max_body_size 10m;
  }
}
```

Une fois le DNS propagé, émettre le certificat (un certificat Let's Encrypt ne peut pas être wildcard avec la validation HTTP ; on liste donc les sous-domaines) :

```bash
sudo certbot certonly --webroot -w /var/www/certbot --agree-tos -m admin@maisondelatransformation.com \
  -d maisondelatransformation.com -d www.maisondelatransformation.com \
  -d calavi.maisondelatransformation.com -d cotonou.maisondelatransformation.com \
  -d lome.maisondelatransformation.com -d app.maisondelatransformation.com \
  -d sermons.maisondelatransformation.com -d lms.maisondelatransformation.com \
  -d dp.maisondelatransformation.com -d evenements.maisondelatransformation.com
```

Puis ajouter le bloc HTTPS (mêmes `location`, avec `listen 443 ssl`, `ssl_certificate /etc/letsencrypt/live/maisondelatransformation.com/fullchain.pem`) et rediriger le port 80. Certbot renouvelle automatiquement via `certbot.timer`.

L'en-tête `Host` doit être transmis tel quel : c'est lui qui choisit le sous-domaine. Ne pas transmettre `CF-Connecting-IP` : sans Cloudflare, n'importe qui pourrait le falsifier.

## 4. Sécurité et sauvegardes

- Pare-feu : SSH + 80 + 443 uniquement.
- Changer le mot de passe administrateur à la première connexion et créer les comptes du pasteur et des responsables.
- Sauvegarde SQLite quotidienne : `/usr/local/bin/mdt-backup` (cron 3 h) copie `/srv/mdt-data/prod.db` dans `/srv/backups` (14 jours conservés). Prévoir une copie hors du serveur.
- Les prières, conseils, dons et aides sociales sont confidentiels : peu de comptes ADMIN et PASTOR.
- La limitation de débit est en mémoire : suffisant sur un seul serveur.

## 5. Contenus à fournir par l'église

| Où | Quoi |
| --- | --- |
| `src/lib/campuses.js` | Adresse, téléphone, horaires de Cotonou et de Lomé |
| `src/app/about/page.jsx` | Histoire, date de fondation, chiffres |
| `src/app/building-project/page.jsx` | Mot du pasteur sur le projet de bâtiment |
| `src/app/give/page.jsx` | Coordonnées de don réelles |
| `src/lib/faq.js` | Relire les réponses ; ajouter les témoignages |
| `src/lib/site.js` (`SITE.apps`) | Liens App Store et Google Play |
| Back-office | Sermons, événements, parcours de formation et leçons |

## 6. Tester les sous-domaines en local

`http://calavi.localhost:3100`, `http://lome.localhost:3100`, `http://app.localhost:3100`, etc.

## 7. Mises à jour automatiques

Le script `scripts/deploy.sh` est versionné. `/usr/local/bin/mdt-deploy` est un simple lanceur qui l'appelle, pour pouvoir le modifier via Git sans toucher au cron :

```bash
printf '%s\n' '#!/usr/bin/env bash' 'exec /srv/mdt/scripts/deploy.sh "$@"' > /usr/local/bin/mdt-deploy
chmod +x /usr/local/bin/mdt-deploy
(crontab -l 2>/dev/null; echo '*/5 * * * * flock -n /var/lock/mdt-deploy.lock /usr/local/bin/mdt-deploy >> /var/log/mdt-deploy.log 2>&1') | crontab -
```

Toutes les 5 minutes, le VPS compare `HEAD` avec `origin/main` ; s'il y a un nouveau commit, il récupère le code, réinstalle les dépendances, applique les changements Prisma, reconstruit et redémarre pm2. `.env.local` est exclu du `git clean` et n'est jamais écrasé.

Le dépôt étant public, aucun token n'est nécessaire pour lire GitHub. Pour forcer un redéploiement : `FORCE=1 /usr/local/bin/mdt-deploy`. Suivi : `tail -f /var/log/mdt-deploy.log`.
