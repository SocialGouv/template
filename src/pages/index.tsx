import type { NextPage } from "next";
import { NextSeo } from "next-seo";

const Home: NextPage = () => {
  return (
    <>
      <NextSeo
        title="Template"
        description="Template de la fabrique des ministères sociaux."
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/favicon.ico",
          },
        ]}
      />
      <div style={{ height: "800px" }}>yooooo</div>
    </>
  );
};

export default Home;
