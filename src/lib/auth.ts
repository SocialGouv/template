import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

export function withAuth(
  getServerSideProps: (context: NextPageContext) => any
) {
  return async (context: NextPageContext) => {
    const session = await getSession({ req: context.req });
    if (!session) {
      return {
        redirect: {
          permanent: false,
          destination: "/api/auth/signin",
        },
      };
    }
    return await getServerSideProps(context);
  };
}

// for server only
export async function refreshAccessToken(token: any) {
  try {
    const url = `${process.env.KEYCLOAK_URL}/protocol/openid-connect/token`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.KEYCLOAK_CLIENT_ID ?? "",
        client_secret: process.env.KEYCLOAK_CLIENT_SECRET ?? "",
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      }).toString(),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      console.log("error", response.status, response.statusText);
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires:
        new Date().getTime() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
