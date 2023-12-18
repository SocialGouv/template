/*
Patch manifests
*/
module.exports = (manifests) => {
  for (const manifest of manifests) {
    const { kind } = manifest;
    if (kind === "Ingress") {
      manifest.metadata.labels = {
        ...manifest.metadata.labels,
        hello: "world",
      };
    }
  }
  return manifests;
};
