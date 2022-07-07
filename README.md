# template

Template est une application [Next](https://nextjs.org/) développée par la [Fabrique des ministères sociaux](https://www.fabrique.social.gouv.fr/) suivant les préconisations du [Système de Design de l'État](https://gouvfr.atlassian.net/wiki/spaces/DB/overview).

L'application dispose de deux branches principales :

- [`main`](https://github.com/SocialGouv/template) qui est la branche principale du projet, celle-ci dispose d'une instance keycloak connectée avec sa base de données `postgres`
- [`static`](https://github.com/SocialGouv/template/tree/static) qui est un template de site en statique sans la partie authentification

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
- Page d'authentification gérée par keycloak (exclusive à `main`)
- Page d'inscription gérée par keycloak (exclusive à `main`)
- Page profil (exclusive à `main`)

### D'un point de vue technique

- [react-dsfr](https://dataesr.github.io/react-dsfr/) pour l'utilisation du [design système de l'état](https://www.systeme-de-design.gouv.fr/)
- [next-seo](https://github.com/garmeeh/next-seo) pour gérer les balises meta au sein de l'application
- [storybook](https://storybook.js.org/) permettant de réaliser des stories pour les composants
- [@testing-library](https://testing-library.com/) pour tester de manière unitaire les composants
- [jest](https://jestjs.io/) pour tester de manière unitaire le code
- [cypress](https://www.cypress.io/) pour tester en e2e le frontend
- [matomo](https://matomo.org/) pour sauvegarder de manière anonyme les statistiques d'utilisation
- [sentry](https://sentry.io/) pour gérer les erreurs
- [keycloak](https://www.keycloak.org/) qui est un serveur d'authentification (exclusive à `main`)
- [next-auth](https://next-auth.js.org/) qui est un wrapper pour gérer l'authentification au sein de l'application (exclusive à `main`)

## Lancer le code

Après avoir cloné le projet :

### Développement

:warning: Avant de lancer le projet, vous devez installer `gomplate`

```bash
docker-compose up -d # to run keycloak and postgres in background
yarn # to install dependencies
yarn dev # to run in dev mode
```

### Production

```bash
yarn # to install dependencies
yarn build # to build code
yarn start # to start
```

### Gestion des environnements

Les variables issues des docker build-args, sont à utiliser dans `next.config.js`, pour les autres, il faut les définir dans les différents [`.env.*`](https://nextjs.org/docs/basic-features/environment-variables#environment-variable-load-order).

Le fichier `.env.staging` est utilisé pour les environnements de review et de pré-production.

Le fichier `.env.development` est utilisé pour l'environnement de développement.

:warning: Les variables d'environnement sont publiques (utilisées durant le build), ne commitez donc pas de variables privées dans ces fichiers.

### KeyCloak

Le template intègre [Next-auth](https://next-auth.js.org/) et [KeyCloak 18](https://www.keycloak.org/) qui assure tous les workflows d'authentification.

Le `realm` par défaut est dans [.kontinuous/files/realm-export.json](.kontinuous/files/realm-export.json). Pour générer realm utilisable par `docker-compose` à partir de celui-ci, utilisez `yarn keycloak`.

Le thème keycloak est basé sur le design-système de l'état, cf [keycloak-dsfr](https://github.com/SocialGouv/keycloak-dsfr).

#### FranceConnect

Cf https://partenaires.franceconnect.gouv.fr/fcp/fournisseur-service

Dans les URLs de callback définies [sur le compte FranceConnect](), utiliser `https://[votre-hostname]/realms/app-realm/broker/franceconnect-particulier/endpoint` et `https://[votre-hostname]/realms/app-realm/broker/franceconnect-particulier/endpoint/logout_response`.

## Liens

- <https://template.fabrique.social.gouv.fr/> : Version en production du projet
- <https://socialgouv.github.io/template/> : Storybook liés à la branche principale du projet


