#!/usr/bin/env bash
set -euo pipefail

cd /srv/mdt

if [ ! -d .git ]; then
  git init -q
  git remote add origin https://github.com/mdt-website/frontend_site.git
fi

git fetch --quiet origin main
TARGET=$(git rev-parse origin/main)
CURRENT=$(git rev-parse HEAD 2>/dev/null || true)

if [ "$CURRENT" = "$TARGET" ] && [ "${FORCE:-0}" != "1" ]; then
  exit 0
fi

echo "[$(date -Is)] deploy ${CURRENT:-aucun} -> $TARGET"
git reset --hard "$TARGET"
git clean -fd -e .env.local -e node_modules -e .next
npm ci --prefer-offline --no-audit --no-fund
npx prisma db push --skip-generate
npm run build
pm2 restart mdt
pm2 save
echo "[$(date -Is)] deploy terminé"
