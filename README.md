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

Translations are stored as independent JSON dictionaries under `src/i18n/locales`.

## Nginx reverse proxy

The Docker Compose stack runs Next.js behind an internal Nginx container. Neither
container publishes a public host port. The Nginx container joins the external
`shared_proxy` Docker network under the `podolog-nginx` alias; the shared public
proxy in the `infra` repository owns ports 80/443 and TLS.

```bash
cp .env.example .env
docker network inspect shared_proxy >/dev/null 2>&1 || docker network create shared_proxy
docker compose up --build -d
```

Check container status or logs with:

```bash
docker compose ps
docker compose logs -f
```

Stop the stack with `docker compose down`. Ports 80 and 443 must be publicly reachable for the production HTTPS setup.

The public site, Booksy, Facebook, and Instagram URLs are passed into the image at build time. Rebuild the image after changing any of them. Until the social URLs are provided, their buttons remain visibly disabled and do not navigate away from the page.

DNS, public routing, the `www` redirect, and Let's Encrypt certificates are
configured in the sibling `infra` repository.
