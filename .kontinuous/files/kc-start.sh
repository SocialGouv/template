#!/bin/sh

# import realm and start server for keycloak@17 - fixed in 18

echo "ioo"
ls
ls /opt/keycloak/data/import
#/opt/keycloak/bin/kc.sh --version

/opt/keycloak/bin/kc.sh import --dir /opt/keycloak/data/import

/opt/keycloak/bin/kc.sh --version

/opt/keycloak/bin/kc.sh start doc --db=postgres --features admin2 --http-enabled=true --http-port=8080 --hostname-strict=false --hostname-strict-https=false
