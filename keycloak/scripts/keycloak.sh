#!/bin/bash

NEXTAUTH_URL=http://localhost:3000 KEYCLOAK_CLIENT_SECRET=********** cat .kube-workflow/files/realm-export.json | gomplate > keycloak/config/realm-export-local.json