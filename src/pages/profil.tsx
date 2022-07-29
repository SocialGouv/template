import React from "react";
import { withAuth } from "@lib";
import { useSession } from "next-auth/react";

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
      </div>
    </div>
  );
};

export const getServerSideProps = withAuth(() => {
  return { props: {} };
});

export default IndexPage;
