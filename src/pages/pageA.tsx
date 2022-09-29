import { Alert, Button } from "@dataesr/react-dsfr";
import type { NextPage } from "next";
import React from "react";

const PageA: NextPage = () => {
  const onClick1 = () => {
    throw new Error("Hello, sentry");
  };
  const onClick2 = () => {
    fetch("/api/error");
  };
  return (
    <div className="fr-container fr-my-6w">
      <h1>Lien A</h1>
      <Alert title="Cette page doit être mise à jour. " type="info" />
      <br />
      <Button onClick={onClick1}>test sentry client-side error</Button>
      &nbsp;
      <Button onClick={onClick2}>test sentry server-side error</Button>
    </div>
  );
};

export default PageA;
