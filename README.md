# template

Template est une application [next](https://nextjs.org/) développée par la [Fabrique des ministères sociaux](https://www.fabrique.social.gouv.fr/).

Storybook URL : <https://socialgouv.github.io/template/>
Production URL : <https://template.fabrique.social.gouv.fr/>

## Description

Ce template est composé de page :

- Page principale
- Politique de confidentialité
- Mention légale avec une référence à l'accessibilité
- Healthz
- Conditions générales d'utilisation
- Statistiques d'utilisation (fonctionnant avec matomo)

D'un point de vue technique :

- Storybook
- @testing-library pour les tests côté frontend
- jest pour les tests unitaires
- cypress pour les tests e2e
- matomo pour les statistiques
- react-dsfr pour le design systeme de l'état
- next-seo pour gérer les balises meta
- sentry pour la gestion des erreurs

## Lancer le code

Après avoir clean le projet :

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
- Finir la documentation, en mode si vous créez un fichier faut le mettre là, etc.
- Rajouter une config sur <https://github.com/SocialGouv/linters> un linter pour next 12 et accessibilité plugin
