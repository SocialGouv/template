const ContentSecurityPolicy = `
  default-src 'self' *.fabrique.social.gouv.fr;
  img-src 'self' data: *.fabrique.social.gouv.fr https://dummyimage.com/;
  connect-src 'self' *.lafabriquenumerique.cloud-ed.fr;
  script-src 'self' *.fabrique.social.gouv.fr *.lafabriquenumerique.cloud-ed.fr ${
    process.env.NODE_ENV !== "production" && "'unsafe-eval' 'unsafe-inline'"
  };
  frame-src 'self' *.fabrique.social.gouv.fr;
  style-src 'self' 'unsafe-inline';
  font-src 'self' data: blob:;
`;

module.exports = ContentSecurityPolicy;
