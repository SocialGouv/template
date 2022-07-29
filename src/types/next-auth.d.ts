import NextAuth, { DefaultSession, DefaultAccount } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken: string;
    refreshToken: string;
  }
  interface Account extends DefaultAccount {
    access_token: string;
    refresh_token: string;
    expires_at: number;
  }
}
