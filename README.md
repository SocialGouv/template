# template


Template est une application [Next](https://nextjs.org/) développée par la [Fabrique des ministères sociaux](https://www.fabrique.social.gouv.fr/) suivant les préconisations du [Système de Design de l'État](https://gouvfr.atlassian.net/wiki/spaces/DB/overview).

L'application dispose de deux branches principales :

- [`main`](https://github.com/SocialGouv/template) qui est la branche principale du projet, celle-ci dispose d'une instance [keycloak](https://www.keycloak.org) et d'une API [hasura](https://hasura.io) connectées sur une base de données `postgres`
- [`static`](https://github.com/SocialGouv/template/tree/static) qui est un template de site en statique sans la partie authentification

Ce template intègre les recommendations de la [documentation technique SocialGouv](https://socialgouv.github.io/support)

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
- [hasura](https://hasura.io) qui permet d'exposer une API GraphQL sur votre Postgres et de gérer les authorisations (RBAC)
- [talisman](https://github.com/thoughtworks/talisman/) qui permet de prévenir la publication de secrets dans votre code

## Lancer le code

Après avoir cloné le projet :

### Développement

:warning: Avant de lancer le projet, vous devez installer `gomplate`

```bash
docker-compose up -d # to run keycloak and postgres in background
yarn # to install dependencies
yarn dev # to run in dev mode
```

#### Hasura

Lancer les seeds :

```sh
yarn hasura seed apply --file books.sql --project ./hasura --database-name default --endpoint http://127.0.0.1:8082 --admin-secret myadminsecretkey
```

Mettre à jour les metadatas et migrations :

Lancer la console avec `yarn hasura console --project ./hasura --endpoint http://127.0.0.1:8082 --admin-secret myadminsecretkey`. Les modifs faites dans l'UI seront reportées dans les dossiers `hasura/metadata` et `hasura/migrations`

Cf [migrations documentation](https://hasura.io/docs/latest/migrations-metadata-seeds/manage-migrations/)

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
- <https://github.com/socialgouv/keycloak-dsfr> : Thème keycloak-DSFR
- <https://socialgouv.github.io/support> : Documentation technique SocialGouv

