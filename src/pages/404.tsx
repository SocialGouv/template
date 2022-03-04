import type { NextPage } from "next";
import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import { push } from "@socialgouv/matomo-next";

const Index: NextPage = () => {
  useEffect(() => {
    Sentry.captureMessage("Page non trouvée");
    push(["trackEvent", "404", "Page non trouvée"]);
  }, []);

  return (
    <>
      <div style={{ height: "800px" }}>404</div>
    </>
  );
};

export default Index;
