const axios = require("axios");

module.exports = async (manifests, _options, context) => {
  const { values, logger } = context;
  const endpoints = {
    dev: "https://kubeseal.dev2.fabrique.social.gouv.fr/v1/verify",
    prod: "https://kubeseal.prod2.fabrique.social.gouv.fr/v1/verify",
  };
  const endpoint = values.isProd ? endpoints.prod : endpoints.dev;

  async function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const verifySecret = async (manifest) => {
    let status = null;
    const content = JSON.stringify(manifest);
    let error;
    try {
      await axios.post(endpoint, content);
      status = true;
      logger.debug(
        `${manifest.metadata.name} is sealed properly for namespace ${manifest.metadata.namespace}`
      );
    } catch (err) {
      if (err.response?.status === 409) {
        status = false;
        logger.error(`${manifest.metadata.name} is not sealed properly for namespace ${manifest.metadata.namespace}`)
      }
      if (err.response?.status === 429) {
        await wait(2000);
        return verifySecret(manifest);
      }
      error = err;
    }
    return { manifest, status, error };
  };

  const promises = [];
  for (const manifest of manifests) {
    if (manifest.kind !== "SealedSecret") continue;

    const promise = verifySecret(manifest);
    promises.push(promise);
  }
  const results = await Promise.all(promises);
  const errors = results
    .filter(({ status }) => status !== true)
    .map(({ manifest, status, error }) => {
      if (status === false) {
        return `${manifest.metadata.name} is not sealed properly for namespace ${manifest.metadata.namespace}`;
      } else {
        return `Kubeseal API call failed for SealedSecret manifest "${
          manifest.metadata.name
        }": ${error.response.status} ${JSON.stringify(
          error.response.headers
        )} ${JSON.stringify(error.response.data)}`;
      }
    });
  if (errors.length > 0) {
    throw new Error(`Following errors occurred: ${errors.join("\n")}`);
  }
};
