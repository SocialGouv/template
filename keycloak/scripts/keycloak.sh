#!/bin/bash

export NEXTAUTH_URL=http://localhost:3000 
export KEYCLOAK_CLIENT_SECRET=********** 
cat .kube-workflow/files/realm-export.json | gomplate > keycloak/config/realm-export-local.json