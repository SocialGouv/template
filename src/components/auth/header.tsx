import { ToolItem, Tag } from "@dataesr/react-dsfr";

import { useSession, signIn } from "next-auth/react";
import Link from "next/link";

const Index = (): JSX.Element => {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <Tag>
          <Link href="/profil">{session.user?.email}</Link>
        </Tag>
      ) : (
        <ToolItem onClick={() => signIn("keycloak")}>Se connecter</ToolItem>
      )}
    </>
  );
};

export default Index;
