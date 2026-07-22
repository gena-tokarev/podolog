# Podolog Warszawa Wola

Localized single-page website for a podology practice in Warsaw's Wola district.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root URL redirects to the primary Polish version at `/pl`. Other localized routes are `/ru`, `/en`, and `/uk`.

## Launch configuration

Business details and the hero asset path are centralized in `src/config/site.ts`. Set the production site and Booksy URLs through environment variables based on `.env.example`.

- `NEXT_PUBLIC_SITE_URL`: canonical production origin, without a trailing slash
- `NEXT_PUBLIC_BOOKSY_URL`: public Booksy booking URL

Translations are stored as independent JSON dictionaries under `src/i18n/locales`.

## Nginx reverse proxy

The recommended local and single-server deployment uses Docker Compose. It runs Next.js and Nginx in separate containers; only Nginx publishes a host port, while the Next.js server remains private on the Compose network.

```bash
cp .env.example .env
docker compose up --build -d
```

Open [http://localhost](http://localhost). Check container status or logs with:

```bash
docker compose ps
docker compose logs -f
```

Stop the stack with `docker compose down`. If port 80 is already occupied, change `"80:80"` to `"8080:80"` in `compose.yaml` and open `http://localhost:8080`.

`NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_BOOKSY_URL` are passed into the image at build time. Rebuild the image after changing either value.

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

For a public production deployment, the next step is to add TLS—typically with Certbot—and redirect HTTP port 80 to HTTPS port 443. If Nginx and Next.js run in separate containers, use the Next.js container/service name as the upstream and bind Next.js to `0.0.0.0` inside its container instead of loopback.
