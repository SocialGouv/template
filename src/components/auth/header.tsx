import { ToolItem, Tag } from "@dataesr/react-dsfr";

import { useSession, signIn, signOut } from "next-auth/react";

const Index = (): JSX.Element => {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <>
          <Tag as="a" href="/profil">
            {session.user?.email}
          </Tag>
          <ToolItem
            onClick={() =>
              signOut({
                callbackUrl: "/api/logout",
              })
            }
          >
            Se déconnecter
          </ToolItem>
        </>
      ) : (
        <ToolItem onClick={() => signIn("keycloak")}>Se connecter</ToolItem>
      )}
    </>
  );
};

export default Index;
