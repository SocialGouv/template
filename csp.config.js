const ContentSecurityPolicy = `
  default-src 'self' *.fabrique.social.gouv.fr  ${
    // allow local keycloak in development
    process.env.NODE_ENV !== "production" &&
    "http://localhost:8080 http://localhost:8082"
  };
  img-src 'self' data: *.fabrique.social.gouv.fr https://dummyimage.com/;
  script-src 'self' *.fabrique.social.gouv.fr ${
    process.env.NODE_ENV !== "production" && "'unsafe-eval'"
  };
  frame-src 'self' *.fabrique.social.gouv.fr  ${
    // allow local keycloak in development
    process.env.NODE_ENV !== "production" && "http://localhost:8080"
  };
  style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net;
  font-src 'self' data: blob: https://cdn.jsdelivr.net;
`;

module.exports = ContentSecurityPolicy;
