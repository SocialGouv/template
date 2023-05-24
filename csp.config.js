const ContentSecurityPolicy = `
  default-src 'self' *.fabrique.social.gouv.fr;
  img-src 'self' data: *.fabrique.social.gouv.fr https://dummyimage.com/;
  script-src 'self' *.fabrique.social.gouv.fr 'wasm-unsafe-eval' ${
    process.env.NODE_ENV !== "production" && "'unsafe-inline'"
  };
  connect-src 'self' data: wss: *.fabrique.social.gouv.fr ${
    process.env.NODE_ENV !== "production" && "http://localhost:8082"
  };
  frame-src 'self' *.fabrique.social.gouv.fr;
  style-src 'self' 'unsafe-inline';
  font-src 'self' data: blob:;
`;

module.exports = ContentSecurityPolicy;
