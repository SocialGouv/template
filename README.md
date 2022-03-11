# template

Template est une application [next](https://nextjs.org/) développée par la [Fabrique des ministères sociaux](https://www.fabrique.social.gouv.fr/).

Version en production du projet : <https://template.social.gouv.fr/>.

Storybook liés à la branche principale du projet : <https://socialgouv.github.io/template/>.

## Description

### D'un point de vue fonctionnelle

Ce template est composé de page :

- Page principale
- Politique de confidentialité
- Mention légale avec une référence à l'accessibilité
- Conditions générales d'utilisation
- Statistiques d'utilisation (fonctionnant avec matomo)
- Healthz
- Page 404

### D'un point de vue technique

- [react-dsfr](https://dataesr.github.io/react-dsfr/) pour l'utilisation du [design système de l'état](https://www.systeme-de-design.gouv.fr/)
- [next-seo](https://github.com/garmeeh/next-seo) pour gérer les balises meta au sein de l'application
- [storybook](https://storybook.js.org/) permettant de réaliser des stories pour les composants
- [@testing-library](https://testing-library.com/) pour tester de manière unitaire les composants
- [jest](https://jestjs.io/) pour tester de manière unitaire le code
- [cypress](https://www.cypress.io/) pour tester en e2e le frontend
- [matomo](https://matomo.org/) pour sauvegarder de manière anonyme les statistiques d'utilisation
- [sentry](https://sentry.io/) pour gérer les erreurs

#### Gestion des environnements

Elle se divise en deux parties, concernant les variables issues des docker build args, il faut les passer dans le `next.config.js`, sinon utiliser les différents `.env`. Les variables d'environnements sont des variables publiques.

## Lancer le code

Après avoir cloner le projet :

### Développement

```bash
yarn
yarn dev
```

### Production

```bash
yarn
yarn build
yarn export
```

## Todo

- Ajouter des CSP
- Husky pour avant de commit faire des verifications
- Finir la documentation, en mode si vous créez un fichier faut le mettre là, etc.
- Rajouter une config sur <https://github.com/SocialGouv/linters> un linter pour next 12 et accessibilité plugin
