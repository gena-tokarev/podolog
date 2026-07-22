# Podolog Warszawa Wola

Localized single-page website for a podology practice in Warsaw's Wola district.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root URL redirects to the primary Polish version at `/pl`. Other localized routes are `/ru`, `/en`, and `/uk`.

## Launch configuration

Business details and the hero asset path are centralized in `src/config/site.ts`. All public URLs are configured in `.env`; `.env.example` is the template to copy on a new machine.

- `NEXT_PUBLIC_SITE_URL`: canonical production origin, without a trailing slash
- `NEXT_PUBLIC_BOOKSY_URL`: public Booksy booking URL
- `NEXT_PUBLIC_FACEBOOK_URL`: Facebook profile URL
- `NEXT_PUBLIC_INSTAGRAM_URL`: Instagram profile URL
- `DOMAIN`: hostname used by Nginx and Let's Encrypt
- `LETSENCRYPT_EMAIL`: email used for certificate expiry and account notices

Translations are stored as independent JSON dictionaries under `src/i18n/locales`.

## Nginx reverse proxy

The recommended local and single-server deployment uses Docker Compose. It runs Next.js and Nginx in separate containers; only Nginx publishes a host port, while the Next.js server remains private on the Compose network.

```bash
cp .env.example .env
docker compose up --build -d
```

Before a certificate is issued, the site remains available over HTTP. Check container status or logs with:

```bash
docker compose ps
docker compose logs -f
```

Stop the stack with `docker compose down`. Ports 80 and 443 must be publicly reachable for the production HTTPS setup.

The public site, Booksy, Facebook, and Instagram URLs are passed into the image at build time. Rebuild the image after changing any of them. Until the social URLs are provided, their buttons remain visibly disabled and do not navigate away from the page.

## HTTPS with Let's Encrypt

The Compose stack includes Nginx and Certbot. Nginx serves the ACME validation path over HTTP, redirects normal traffic to HTTPS after a certificate exists, and reloads periodically so renewed certificates are picked up. Certbot checks for renewals twice per day.

First, point the domain's DNS `A` record to the server's public IPv4 address. Add an `AAAA` record only if the server has working public IPv6. Make sure inbound TCP ports 80 and 443 are open. Then run on the production server:

```bash
docker compose up --build -d
./scripts/enable-https.sh
```

The certificate is stored in the `letsencrypt` Docker volume and survives container recreation. Do not repeatedly run the activation script before DNS is correct, because Let's Encrypt applies issuance rate limits.

### Host-installed Nginx alternative

The host-based configuration remains available in `deploy/nginx/podolog.conf`. It listens on port 80 and reverse-proxies requests to a Next.js process on `127.0.0.1:3000`.

On a typical Debian or Ubuntu server:

```bash
sudo cp deploy/nginx/podolog.conf /etc/nginx/sites-available/podolog
sudo ln -s /etc/nginx/sites-available/podolog /etc/nginx/sites-enabled/podolog
sudo nginx -t
sudo systemctl reload nginx
```

Remove or adjust another `default_server` configuration if Nginx reports a duplicate default server. Once DNS is configured, replace `server_name _;` with the production domain. Run the built application with `npm run build` followed by `npm start`, preferably under systemd or another process supervisor.

This alternative does not use the containerized Certbot configuration above; TLS must be configured separately on the host.
