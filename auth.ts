import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import LinkedInProvider from "next-auth/providers/linkedin";
import { PrismaClient } from "@prisma/client";
import { sendVerificationRequest } from "./lib/send";

export const BASE_PATH =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/"
    : process.env.VERCEL_PROJECT_PRODUCTION_URL;

type Adapter = typeof PrismaAdapter;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const customAdapter: Adapter = (p: PrismaClient) => {
  return {
    ...PrismaAdapter(p),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createUser: async (data: any) => {
      await prisma.testLog.create({
        data: {
          log: JSON.stringify(data),
        },
      });
      return p.user.create({ data });
    },
  };
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: customAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID ?? "",
      clientSecret: process.env.AUTH_GITHUB_SECRET ?? "",
      allowDangerousEmailAccountLinking: true,
    }),
    LinkedInProvider({
      clientId: process.env.AUTH_LINKEDIN_ID ?? "",
      clientSecret: process.env.AUTH_LINKEDIN_SECRET ?? "",
      allowDangerousEmailAccountLinking: true,
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
    {
      from: process.env.AUTH_MAIL_FROM ?? "",
      options: {},
      id: "http-email",
      name: "Email",
      type: "email",
      maxAge: 60 * 60 * 24, // Email link will expire in 24 hours
      sendVerificationRequest,
    },
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
