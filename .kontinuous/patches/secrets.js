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
export {{ $key }}={{ $value }} \
                    {{- end }} \
                  {{- end }}'
            };
            manifest.spec.template.spec = {
                ...manifest.spec.template.spec,
                serviceAccountName: "vault"
            };
        }
    }
    return manifests;
};