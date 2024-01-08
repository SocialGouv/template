import type { NextApiRequest, NextApiResponse } from "next"
import type { NextRequest } from "next/server"
import NextAuth, { Session } from "next-auth";
import { Account } from "next-auth";
import { User } from "next-auth";
import { JWT } from "next-auth/jwt";
import KeycloakProvider from "next-auth/providers/keycloak";
import VaultModule from "../../../../vault/VaultModule"

import { refreshAccessToken } from "../../../lib/auth";

interface ExtendedToken extends JWT {
  accessToken: string;
  refreshToken: string;
  idToken: string;
  accessTokenExpires: number;
  user: User;
}

export default async function auth(req: any, res: any) {

  console.log("auth method triggered !")
  const vaultModule = new VaultModule("integrated");
  const keycloakClientId = await vaultModule.readSecret("kv/data/integrated/keycloak_client_id")
  const keycloakClientSecret = await vaultModule.readSecret("kv/data/integrated/keycloak_client_secret")
  const nextauthSecret = await vaultModule.readSecret("kv/data/integrated/nextauth_secret")

  console.log("Secret client id: ", keycloakClientId)

  // @ts-ignore
  return NextAuth(req, res, {
    debug: true,
    providers: [
      KeycloakProvider({
        clientId: keycloakClientId ?? "",
        clientSecret: keycloakClientSecret ?? "",
        issuer: process.env.KEYCLOAK_URL ?? "",
      }),
    ],
    secret: nextauthSecret,
    callbacks: {
      //@ts-ignore
      async jwt({
                  token,
                  user,
                  account,
                }: {
        token: JWT;
        user: User;
        account: Account;
      }) {
        // Initial sign in
        //console.log("jwt", { token, user, account });
        if (account && user) {
          return {
            accessToken: account.access_token,
            refreshToken: account.refresh_token,
            idToken: account.id_token,
            accessTokenExpires: account.expires_at
                ? account.expires_at * 1000
                : null,
            user,
          };
        }

        // Return previous token if the access token has not expired yet
        if (
            token.accessTokenExpires &&
            Date.now() < Number(token.accessTokenExpires)
        ) {
          return token as ExtendedToken;
        }

        // Access token has expired, try to update it
        return refreshAccessToken(token);
      },
      // @ts-ignore
      async session({
                      session,
                      token,
                    }: {
        session: Session;
        token: ExtendedToken;
      }) {
        if (token) {
          session.user = token.user;
          //@ts-ignore
          session.accessToken = token.accessToken;
          //@ts-ignore
          session.refreshToken = token.refreshToken;
          //@ts-ignore
          session.idToken = token.idToken;
          //@ts-ignore
          session.accessTokenExpires = token.accessTokenExpires;
          //@ts-ignore
          session.error = token.error;
        }

        return session;
      },
    },
  })
}
