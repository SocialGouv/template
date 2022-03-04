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
    <div className="fr-container fr-my-6w">
      <h1>404 - Page non trouvée</h1>
    </div>
  );
};

export default Index;
