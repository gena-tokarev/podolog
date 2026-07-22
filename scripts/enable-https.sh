#!/bin/sh

set -eu

if [ ! -f .env ]; then
  echo "Missing .env. Copy .env.example to .env and configure it first." >&2
  exit 1
fi

set -a
. ./.env
set +a

if [ -z "${DOMAIN:-}" ] || [ -z "${LETSENCRYPT_EMAIL:-}" ]; then
  echo "DOMAIN and LETSENCRYPT_EMAIL must be set in .env." >&2
  exit 1
fi

docker compose up -d web nginx
docker compose run --rm --entrypoint certbot certbot certonly \
  --webroot \
  --webroot-path /var/www/certbot \
  --domain "$DOMAIN" \
  --email "$LETSENCRYPT_EMAIL" \
  --agree-tos \
  --no-eff-email \
  --non-interactive
docker compose restart nginx

echo "HTTPS is enabled at https://$DOMAIN"
