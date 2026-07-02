import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import prisma from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const { username, password } = credentials;
        const user = await prisma.user.findUnique({ where: { username } });
        if (!user) return null;
        const isValid = await verifyPassword(password, user.password);
        if (!isValid) return null;
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          username: user.username,
          role: user.role,
        };
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "github") {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email || "" },
        });
        if (!existingUser && user.email) {
          await prisma.user.create({
            data: {
              email: user.email,
              name: user.name || "GitHub User",
              username: user.email.split("@")[0] || "github-user",
              password: "oauth-github",
              role: "student",
            },
          });
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        const authUser = user as { id: string; username?: string; role?: string };
        token.id = authUser.id;
        token.username = authUser.username;
        token.role = authUser.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          name: token.name as string,
          email: token.email as string,
          username: token.username as string,
          role: token.role as string,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
};
