# template

Template est une application [next](https://nextjs.org/) développée par la [Fabrique des ministères sociaux](https://www.fabrique.social.gouv.fr/).

La version actuelle produit un site statique, mais le Dockerfile peut facilement être adapté.

Version en production du projet : <https://template.fabrique.social.gouv.fr/>.

Storybook liés à la branche principale du projet : <https://socialgouv.github.io/template/>.

## Description

### D'un point de vue fonctionnel

Ce template est composé de page :

- Page principale
- Politique de confidentialité
- Mentions légales
- Conditions générales d'utilisation
- Statistiques d'utilisation (fonctionnant avec matomo)
- Déclaration d'accessibilité
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

Les variables issues des docker build-args, sont à utiliser dans `next.config.js`, pour les autres, il faut les définir dans les différents [`.env.*`](https://nextjs.org/docs/basic-features/environment-variables#environment-variable-load-order).

Le fichier `.env.staging` est utilisé pour les environnements de review et de pré-production.

:warning: Les variables d'environnement sont publiques (utilisées durant le build), ne commitez donc pas de variables privées dans ces fichiers.

## Lancer le code

Après avoir cloné le projet :

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
