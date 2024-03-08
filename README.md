# template

![GitHub last commit (branch)](https://img.shields.io/github/last-commit/betagouv/template/main
![Libraries.io dependency status for GitHub repo](https://img.shields.io/librariesio/github/betagouv/template)

Template minimal en Next.js qui intègre les recommandations tech beta.gouv.fr.

> ⚠️ Le [Système de Design de l'État](https://www.systeme-de-design.gouv.fr/) s'adresse **uniquement** aux développeurs et aux concepteurs, qu'ils soient agents publics ou prestataires pour des sites Internet de l'État (Ministères, Administrations centrales, Préfectures, Ambassades, etc.). cf [conditions d'utilisation](https://www.systeme-de-design.gouv.fr/utilisation-et-organisation/perimetre-d-application).

## Description

- 🇫🇷 Basé sur [codegouv/react-dsfr](https://github.com/codegouvfr/react-dsfr)
- ⚖️ Pages de "conformité" (CGU, RGPD, stats..)
- 📦 Testing, lint, CI & release automatisés
- 🔒 Image docker `rootless`, [header CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- 🔑 prévention de fuite de secrets avec [talisman](https://github.com/thoughtworks/talisman/)
- 📊 Intégration de sentry & matomo
- ⚡️ Basé sur [Next](https://nextjs.org/) et TypeScript

## Dans le détail

### D'un point de vue fonctionnel

- Page principale
- Politique de confidentialité
- Mentions légales
- Conditions générales d'utilisation
- Statistiques d'utilisation (fonctionnant avec matomo)
- Déclaration d'accessibilité
- Healthz
- Page 404

### D'un point de vue technique

- [storybook](https://storybook.js.org/) permettant de réaliser des stories pour les composants
- [@testing-library](https://testing-library.com/) pour tester de manière unitaire les composants
- [jest](https://jestjs.io/) pour tester de manière unitaire le code
- [cypress](https://www.cypress.io/) pour tester en e2e le frontend
- [talisman](https://github.com/thoughtworks/talisman/) qui permet de prévenir la publication de secrets dans votre code
- un [Dockerfile](./Dockerfile) rootless de production basé sur nginx
- des [Content Security Policy et headers de sécurité de base](https://developer.mozilla.org/fr/docs/Web/HTTP/CSP)

- Côté Next.js:
  - intégration de [@codegouvfr/react-dsfr](https://github.com/codegouvfr/react-dsfr/) pour le [design système de l'état](https://www.systeme-de-design.gouv.fr/)
  - intégration de [sentry](https://sentry.io/) pour gérer les erreurs
  - intégration de [matomo](https://matomo.org/) pour les statistiques d'utilisation

## Lancer le code

Après avoir cloné le projet :

### Développement

:warning: Avant de lancer le projet, vous devez installer `gomplate`

```bash
yarn # to install dependencies
yarn dev # to run in dev mode
```

### Gestion des environnements

Les variables issues des docker build-args, sont à utiliser dans `next.config.js`, pour les autres, il faut les définir dans les différents [`.env.*`](https://nextjs.org/docs/basic-features/environment-variables#environment-variable-load-order).

Le fichier `.env.staging` est utilisé pour les environnements de review et de pré-production.

Le fichier `.env.development` est utilisé pour l'environnement de développement.

:warning: Les variables d'environnement sont publiques (utilisées durant le build), ne commitez donc pas de variables privées dans ces fichiers.

## Liens

- <https://github.com/socialgouv/> : Version initiale du template
