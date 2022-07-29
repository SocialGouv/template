import NextAuth, { Session } from "next-auth";
import { Account } from "next-auth";
import { User } from "next-auth";
import { JWT } from "next-auth/jwt";
import KeycloakProvider from "next-auth/providers/keycloak";

import { refreshAccessToken } from "../../../lib/auth";

interface ExtendedToken extends JWT {
  accessToken: string;
  refreshToken: string;
  idToken: string;
  accessTokenExpires: number;
  user: User;
}

export default NextAuth({
  debug: true,
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID ?? "",
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET ?? "",
      issuer: process.env.KEYCLOAK_URL ?? "",
    }),
  ],

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
      console.log("jwt", { token, user, account });
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
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.idToken = token.idToken;
        session.accessTokenExpires = token.accessTokenExpires;
        session.error = token.error;
      }

      return session;
    },
  },
});
