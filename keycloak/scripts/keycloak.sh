#!/bin/bash

# This script creates keycloak/config/realm-export-local.json for local docker-compose developement

export NEXTAUTH_URL=http://localhost:3000 
export KEYCLOAK_CLIENT_SECRET=********** 
export FRANCE_CONNECT_CLIENT_ID=123
export FRANCE_CONNECT_CLIENT_SECRET=123
export SMTP_HOST=smtp.tipimail.com
export SMTP_USER=smtp-user
export SMTP_PASSWORD=smtp-password
export SMTP_SSL=false
cat .kube-workflow/files/realm-export.json | gomplate > keycloak/config/realm-export-local.json
