import React from "react";
import { withAuth } from "@lib";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@dataesr/react-dsfr";

const IndexPage = () => {
  const { data: session } = useSession();
  return (
    <div className="fr-container fr-my-6w">
      <h1>Mes informations</h1>
      <div className="fr-px-3w">
        <ul>
          <li>
            <span className="fr-text--bold">Email : </span>
            <span>{session?.user?.email ?? ""}</span>
          </li>
          <li>
            <span className="fr-text--bold">Name : </span>
            <span>{session?.user?.name}</span>
          </li>
        </ul>
        <Button
          onClick={() =>
            signOut({
              callbackUrl: `/api/logout?id_token_hint=${session?.idToken}`,
            })
          }
        >
          Se déconnecter
        </Button>
      </div>
    </div>
  );
};

export const getServerSideProps = withAuth(() => {
  return { props: {} };
});

export default IndexPage;
