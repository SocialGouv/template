#!/bin/bash

set -o errexit

cluster_name="template"
reg_name='kind-registry'
reg_port='5001' # host port for the registry

# create registry container unless it already exists
if [ "$(docker inspect -f '{{.State.Running}}' "${reg_name}" 2>/dev/null || true)" != 'true' ]; then
  docker run \
    -d --restart=always -p "127.0.0.1:${reg_port}:5000" --name "${reg_name}" \
    registry:2
fi

# connect the registry to the cluster network if not already connected
if [ "$(docker inspect -f='{{json .NetworkSettings.Networks.kind}}' "${reg_name}")" = 'null' ]; then
  docker network connect "kind" "${reg_name}"
fi

kind delete clusters "${cluster_name}" || true
kind create cluster --wait 5m --name "${cluster_name}" --config=./config.yaml

# add ingress-nginx
kubectl --context "kind-${cluster_name}" apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml

# add local registry
kubectl --context "kind-${cluster_name}" apply -f ./local-registry.yaml
