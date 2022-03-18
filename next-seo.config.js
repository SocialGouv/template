import ContentSecurityPolicy from "./csp.config";

export default {
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
