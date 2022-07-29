import NextAuth, { DefaultSession, DefaultAccount } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: { id: string } & DefaultSession["user"];
    accessToken: string;
    refreshToken: string;
    idToken: string;
    accessTokenExpires: number;
  }
  interface Account extends DefaultAccount {
    access_token: string;
    refresh_token: string;
    id_token: string;
    accessTokenExpires: number;
  }
}
