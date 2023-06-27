import React, { useCallback } from "react";
import { withAuth } from "../src/lib/auth";
import { useSession, signOut } from "next-auth/react";
import { ButtonsGroup } from "@codegouvfr/react-dsfr/ButtonsGroup";
import { useE2ESDKClient } from "@socialgouv/e2esdk-react";
import { fr } from "@codegouvfr/react-dsfr";

const ProfilPage = () => {
  const client = useE2ESDKClient();
  const { data: session } = useSession();

  const backupKey = useCallback(async () => {
    const deviceQR = await client.enrollNewDevice();
    const textFile = new File([deviceQR], "key-backup.txt", {
      type: "text",
    });
    const link = document.createElement("a");
    link.setAttribute("href", URL.createObjectURL(textFile));
    link.setAttribute("download", textFile.name);
    link.click();
    URL.revokeObjectURL(link.href);
  }, [client]);

  const logout = useCallback(async () => {
    signOut({
      // @ts-ignore // todo
      callbackUrl: `/api/logout?id_token_hint=${session?.idToken}`,
    });
  }, [session]);

  return (
    <div className="fr-container fr-my-6w">
      <h1>Mes informations</h1>
      <div className="fr-px-3w">
        <ul>
          <li>
            <span className="fr-text--bold">Id : </span>
            <span>{session?.user?.id ?? ""}</span>
          </li>
          <li>
            <span className="fr-text--bold">Email : </span>
            <span>{session?.user?.email ?? ""}</span>
          </li>
          <li>
            <span className="fr-text--bold">Name : </span>
            <span>{session?.user?.name}</span>
          </li>
        </ul>
        <ButtonsGroup
          className={fr.cx("fr-mt-12w")}
          buttons={[
            {
              iconId: "ri-key-2-fill",
              onClick: backupKey,
              children: "Créer une clé de sauvegarde",
            },
            {
              priority: "secondary",
              iconId: "ri-door-closed-fill",
              onClick: logout,
              children: "Se déconnecter",
            },
          ]}
        />
      </div>
    </div>
  );
};

export const getServerSideProps = withAuth(() => {
  return { props: {} };
});

export default ProfilPage;
