import NextAuth, { DefaultSession } from "next-auth";

// augment default Session type
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
