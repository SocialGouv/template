import ContentSecurityPolicy from "./csp.config";

const DEFAULT_SEO_CONFIG = {
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
  ],
  additionalMetaTags: [
    {
      httpEquiv: "Content-Security-Policy",
      content: ContentSecurityPolicy.replace(/\n/g, " ").trim(),
    },
  ],
};

export default DEFAULT_SEO_CONFIG;
