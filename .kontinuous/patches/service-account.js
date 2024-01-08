/*
Patch manifests
*/
module.exports = (manifests) => {
    for (const manifest of manifests) {
        const { kind } = manifest;
        if (kind === "Deployment" && manifest.metadata.name === "app") {
            manifest.spec.template.spec = {
                ...manifest.spec.template.spec,
                serviceAccountName: "vault"
            };
        }
    }
    return manifests;
};