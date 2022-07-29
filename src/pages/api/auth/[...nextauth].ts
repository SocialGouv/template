import NextAuth, { Session } from "next-auth";
import { Account } from "next-auth";
import { User } from "next-auth";
import { JWT } from "next-auth/jwt";
import KeycloakProvider from "next-auth/providers/keycloak";

import { refreshAccessToken } from "../../../lib/auth";

// async function refreshAccessToken(token) {
//   console.log("refreshAccessToken", token);
//   try {
//     const url =
//       "http://localhost:8080/realms/app-realm/protocol/openid-connect/token";

//     // new URLSearchParams({
//     //   client_id: process.env.KEYCLOAK_CLIENT_ID ?? "",
//     //   client_secret: process.env.KEYCLOAK_CLIENT_SECRET ?? "",
//     //   grant_type: "refresh_token",
//     //   refresh_token: token.refreshToken,
//     // })

//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body: new URLSearchParams({
//         client_id: process.env.KEYCLOAK_CLIENT_ID ?? "",
//         //client_secret: process.env.KEYCLOAK_CLIENT_SECRET ?? "",
//         grant_type: "refresh_token",
//         refresh_token: token.refreshToken,
//       }).toString(),
//     });

//     const refreshedTokens = await response.json();
//     console.log("refreshedTokens", refreshedTokens);

//     if (!response.ok) {
//       console.log("error", response.body);
//       throw refreshedTokens;
//     }

//     return {
//       ...token,
//       accessToken: refreshedTokens.access_token,
//       accessTokenExpires: Date.now() + refreshedTokens.expires_at * 1000,
//       refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
//     };
//   } catch (error) {
//     console.log(error);

//     return {
//       ...token,
//       error: "RefreshAccessTokenError",
//     };
//   }
// }

interface ExtendedToken extends JWT {
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: number | null;
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
        session.error = token.error;
      }

      return session;
    },
  },
});
