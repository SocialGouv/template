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
                "vault.hashicorp.com/role": "webapp",
                "vault.hashicorp.com/agent-inject-secret-nextauth": 'kv/data/dev/nextauth_secret',
                "vault.hashicorp.com/agent-inject-secret-keycloack_client_id": 'kv/data/dev/keycloack_client_id',
                "vault.hashicorp.com/agent-inject-secret-keycloack_client_secret": 'kv/data/dev/keycloack_client_secret',
                "vault.hashicorp.com/agent-inject-template-dev": '| \
                  {{- with secret "kv/dev/nextauth_secret" -}} \
                    {{- range $key, $value := .Data.data }} \
                      export {{ $key }}={{ $value }} \
                    {{- end }} \
                  {{- end }}'
            };
        }
    }
    return manifests;
};