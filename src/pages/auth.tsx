import { useKeycloak } from "@react-keycloak/ssr";
import type { KeycloakInstance, KeycloakTokenParsed } from "keycloak-js";

type ParsedToken = KeycloakTokenParsed & {
  email?: string;

  preferred_username?: string;

  given_name?: string;

  family_name?: string;
};

const IndexPage = () => {
  const { keycloak, initialized } = useKeycloak<KeycloakInstance>();

  const parsedToken: ParsedToken | undefined = keycloak?.tokenParsed;

  return (
    <>
      <p>
        You are:{" "}
        {keycloak?.authenticated ? (
          <span className="text-success">logged in</span>
        ) : (
          <span className="text-danger">NOT logged in</span>
        )}
      </p>

      <p>{JSON.stringify(keycloak, null, 2)}</p>
      <p>
        {keycloak?.authenticated || (keycloak && parsedToken)
          ? `Welcome back ${parsedToken?.preferred_username ?? ""}!`
          : "Welcome visitor. Please login to continue."}
      </p>

      <ul>
        <li>
          <span className="font-weight-bold mr-1">Email:</span>
          <span className="text-muted">{parsedToken?.email ?? ""}</span>
        </li>
        <li>
          <span className="font-weight-bold mr-1">Username:</span>
          <span className="text-muted">
            {parsedToken?.preferred_username ?? ""}
          </span>
        </li>
        <li>
          <span className="font-weight-bold mr-1">First Name:</span>
          <span className="text-muted">{parsedToken?.given_name ?? ""}</span>
        </li>
        <li>
          <span className="font-weight-bold mr-1">Last Name:</span>
          <span className="text-muted">{parsedToken?.family_name ?? ""}</span>
        </li>
      </ul>

      <button
        type="button"
        className="mx-2 btn btn-outline-primary"
        onClick={() => {
          if (keycloak) {
            window.location.href = keycloak.createAccountUrl();
          }
        }}
      >
        My Account
      </button>

      <button
        type="button"
        className="mx-2 btn btn-outline-danger"
        onClick={() => {
          if (keycloak) {
            window.location.href = keycloak.createLogoutUrl();
          }
        }}
      >
        Logout
      </button>
      <button
        type="button"
        className="mx-2 btn btn-outline-primary"
        onClick={() => {
          if (keycloak) {
            window.location.href = keycloak.createRegisterUrl();
          }
        }}
      >
        Signup
      </button>

      <button
        type="button"
        className="mx-2 btn btn-outline-success"
        onClick={() => {
          if (keycloak) {
            window.location.href = keycloak.createLoginUrl();
          }
        }}
      >
        Login
      </button>
    </>
  );
};

export default IndexPage;
