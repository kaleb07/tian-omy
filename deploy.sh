#!/usr/bin/env bash
# Update tian-omy di VPS: pull main, install, build, restart PM2.
# Jalankan di dalam VPS:  cd /var/www/tian-omy && ./deploy.sh
set -euo pipefail

DIR="${DEPLOY_DIR:-/var/www/tian-omy}"
BRANCH="${DEPLOY_BRANCH:-main}"

cd "$DIR"

echo "=================================================="
echo "Memulai deploy tian-omy ($BRANCH)"
echo "=================================================="

git fetch origin
git checkout "$BRANCH"
git pull --ff-only origin "$BRANCH"

echo "Live: $(git log -1 --oneline)"

echo "Install dependencies..."
npm ci

echo "Build Next.js (RAM dibatasi supaya VPS 1 GB tidak OOM)..."
NODE_OPTIONS="--max-old-space-size=512" npm run build

echo "Restart PM2..."
if pm2 describe tian-omy >/dev/null 2>&1; then
  pm2 restart tian-omy --update-env
else
  pm2 start ecosystem.config.cjs
fi

pm2 save

echo "=================================================="
echo "Selesai. Cek: pm2 status  |  curl -I https://kristian-naomy.site"
echo "=================================================="
