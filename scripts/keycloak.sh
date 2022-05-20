#!/bin/bash

NEXTAUTH_URL=http://localhost:3000 KEYCLOAK_CLIENT_SECRET=********** cat .kube-workflow/files/realm-export.json | gomplate > .kube-workflow/files/realm-export-local.json