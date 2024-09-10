import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import LinkedInProvider from "next-auth/providers/linkedin";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      clientId: process.env.AUTH_GOOGLE_ID ?? "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET ?? "",
    }),
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID ?? "",
      clientSecret: process.env.AUTH_GITHUB_SECRET ?? "",
    }),
    LinkedInProvider({
      clientId: process.env.AUTH_LINKEDIN_ID ?? "",
      clientSecret: process.env.AUTH_LINKEDIN_SECRET ?? "",
    }),
    CredentialsProvider({
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const dbUser = await prisma.user.findFirst({
          where: {
            email: credentials.email as string,
          },
        });
        return dbUser;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  /*  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  }, */
});
