const ContentSecurityPolicy = `
  default-src 'self' *.fabrique.social.gouv.fr  ${
    // allow local keycloak in development
    process.env.NODE_ENV !== "production" && "http://localhost:8080"
  };
  img-src 'self' data: *.fabrique.social.gouv.fr https://dummyimage.com/;
  script-src 'self' *.fabrique.social.gouv.fr ${
    process.env.NODE_ENV !== "production" && "'unsafe-eval'"
  };
  frame-src 'self' *.fabrique.social.gouv.fr  ${
    process.env.NODE_ENV !== "production" && "http://localhost:8080"
  };
  style-src 'self' 'unsafe-inline';
  font-src 'self' data: blob:;
`;

module.exports = ContentSecurityPolicy;
