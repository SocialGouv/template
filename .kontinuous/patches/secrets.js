/*
Patch manifests
*/
module.exports = (manifests) => {
    for (const manifest of manifests) {
        const { kind } = manifest;
        if (kind === "Deployment" && manifest.metadata.name === "app") {
            manifest.spec.template.metadata.annotations = {
                ...manifest.spec.template.metadata.annotations,
                "vault.hashicorp.com/service": "http://vault.vault-dev.svc:8200",
                "vault.hashicorp.com/agent-inject": "true",
                "vault.hashicorp.com/role": "dev",
                "vault.hashicorp.com/agent-inject-secret-nextauth": 'kv/data/dev/nextauth_secret',
                "vault.hashicorp.com/agent-inject-secret-keycloak_client_id": 'kv/data/dev/keycloak_client_id',
                "vault.hashicorp.com/agent-inject-secret-keycloak_client_secret": 'kv/data/dev/keycloak_client_secret',
                "vault.hashicorp.com/agent-inject-template-dev": '\
                  {{- with secret "kv/dev/nextauth_secret" -}} \
                    {{- range $key, $value := .Data.data }} \
export {{ $key | upper }}={{ $value }} \
                    {{- end }} \
                  {{- end }}'
            };
            manifest.spec.template.spec = {
                ...manifest.spec.template.spec,
                serviceAccountName: "vault"
            };
            manifest.spec.template.spec.containers[0] = {
                ...manifest.spec.template.spec.containers[0],
                command: ['sh', '-c'],
                args: ['source /vault/secrets/dev && yarn start']
            }
        }
    }
    return manifests;
};