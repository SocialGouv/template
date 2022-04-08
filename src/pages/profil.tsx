import { useKeycloak } from "@react-keycloak/ssr";
import { ParsedToken } from "@types";
import type { KeycloakInstance } from "keycloak-js";

const IndexPage = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const parsedToken: ParsedToken | undefined = keycloak?.tokenParsed;

  return (
    <div className="fr-container fr-my-6w">
      <h1>Mes informations</h1>
      <div className="fr-px-3w">
        {keycloak?.authenticated ? (
          <ul>
            <li>
              <span className="fr-text--bold">Email : </span>
              <span>{parsedToken?.email ?? ""}</span>
            </li>
            <li>
              <span className="fr-text--bold">Username : </span>
              <span>{parsedToken?.preferred_username ?? ""}</span>
            </li>
            <li>
              <span className="fr-text--bold">Prénom : </span>
              <span>{parsedToken?.given_name ?? ""}</span>
            </li>
            <li>
              <span className="fr-text--bold">Nom de famille : </span>
              <span>{parsedToken?.family_name ?? ""}</span>
            </li>
          </ul>
        ) : (
          <p>Identifiez vous pour accédez à ces informations</p>
        )}
      </div>
    </div>
  );
};

export default IndexPage;
