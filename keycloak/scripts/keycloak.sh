#!/bin/bash

# This script creates keycloak/config/realm-export-local.json for local docker-compose developement

export NEXTAUTH_URL=http://localhost:3000 
export KEYCLOAK_CLIENT_SECRET=********** 
export FRANCE_CONNECT_CLIENT_ID=123
export FRANCE_CONNECT_CLIENT_SECRET=123
export SMTP_HOST=maildev
export SMTP_PORT=1025
export SMTP_USER=some
export SMTP_PASSWORD=some
export SMTP_SSL=false

gomplate < .kontinuous/files/realm-export.json > keycloak/config/realm-export-local.json
