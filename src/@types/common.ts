import { KeycloakTokenParsed } from "keycloak-js";

export type ParsedToken = KeycloakTokenParsed & {
  email?: string;

  preferred_username?: string;

  given_name?: string;

  family_name?: string;
};
