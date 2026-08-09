# Podolog Warszawa Wola

Localized single-page website for a podology practice in Warsaw's Wola district.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root URL redirects to the primary Polish version at `/pl`. Other localized routes are `/ru`, `/en`, and `/uk`.

## Site configuration

Public business details, canonical site URL, social links, booking URL, and the
hero asset path are committed in `src/config/site.ts`. Podolog does not require
runtime or build-time environment variables.

Translations are stored as independent JSON dictionaries under `src/i18n/locales`.

## Deployment

GitHub Actions validates the application and builds the production image from
the committed site configuration.

Passing `main` builds are published to `ghcr.io/gena-tokarev/podolog-web`. The
workflow then commits the immutable image digest to the private sibling `infra`
repository. Argo CD observes that commit and deploys it to k3s. The application
workflow has no VPS or Kubernetes credentials.

DNS, HTTPS, public routing, deployment history, and rollback are managed from
the private `infra` repository.
