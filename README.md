# Podolog Warszawa Wola

Localized single-page website for a podology practice in Warsaw's Wola district.

## Local development

```bash
npm install
cp .env.local .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root URL redirects to the primary Polish version at `/pl`. Other localized routes are `/ru`, `/en`, and `/uk`.

## Launch configuration

Business details and the hero asset path are centralized in `src/config/site.ts`.
`.env.example` defines the complete environment contract. Keep real values in
the ignored `.env.local` and `.env.prod` profiles, then copy the profile being
used to `.env`.

- `NEXT_PUBLIC_SITE_URL`: canonical production origin, without a trailing slash
- `NEXT_PUBLIC_BOOKSY_URL`: public Booksy booking URL
- `NEXT_PUBLIC_FACEBOOK_URL`: Facebook profile URL
- `NEXT_PUBLIC_INSTAGRAM_URL`: Instagram profile URL

Translations are stored as independent JSON dictionaries under `src/i18n/locales`.

## Deployment

GitHub Actions validates the application and builds the production image. The
public site, Booksy, Facebook, and Instagram URLs are GitHub `production`
environment variables and are embedded into that image at build time.

Passing `main` builds are published to `ghcr.io/gena-tokarev/podolog-web`. The
workflow then commits the immutable image digest to the private sibling `infra`
repository. Argo CD observes that commit and deploys it to k3s. The application
workflow has no VPS or Kubernetes credentials.

DNS, HTTPS, public routing, deployment history, and rollback are managed from
the private `infra` repository.
