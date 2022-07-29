import { signIn } from "next-auth/react";

const HASURA_GRAPHQL_ENDPOINT_URL =
  process.env.HASURA_GRAPHQL_ENDPOINT_URL || "http://localhost:8082/v1/graphql";

type HasuraParams = {
  operationName?: string;
  query: string;
  variables?: Record<string, any>;
};

export type HasuraJsonResponse = {
  data: any;
  errors?: { message: string }[];
};

export type Token = {
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: number;
};

export const fetchHasura = (
  params: HasuraParams,
  token: Token,
  retry: number = 5
): Promise<HasuraJsonResponse> => {
  const checkRefreshToken = async (res: HasuraJsonResponse) => {
    if (
      res.errors &&
      res.errors
        .map((r: any) => r.message)
        .filter((m: string) => m.match(/JWTExpired/)).length
    ) {
      // refresh JWT
      const newToken = await fetch("/api/refresh").then((r) => r.json());
      if (retry > 0) {
        // restart query
        return fetchHasura(params, newToken, retry - 1);
      } else {
        console.error("Abort: Too many fails");
        signIn("keycloak");
      }
    }

    return res;
  };
  return fetch(HASURA_GRAPHQL_ENDPOINT_URL, {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
      ...(token.accessToken
        ? { Authorization: `Bearer ${token.accessToken}` }
        : {}),
    },
  })
    .then((r) => r.json())
    .then(checkRefreshToken);
};
