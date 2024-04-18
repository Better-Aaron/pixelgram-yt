import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import authConfig from "@/auth.config";
import { getUserById } from "./data/user";
import { getAccountByUserId } from "@/data/account";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async authorized({ request, auth }) {
      console.log({ request, auth });
      const isLoggedIn = !!auth;
      const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      }
      return true;
    },
    async signIn({ user, account, profile }) {
      //* 네이버 로그인시 이름이 insert 되지 않는 문제 보정
      if (!user.name) {
        user.name = profile?.response?.name;
      }

      //* Allow OAuth without email verification.
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id);

      //* prevent sign in without email verification.
      if (!existingUser?.emailVerified) return false;

      return true;
    },
    async session({ token, session, user }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.isOAuth = token.isOAuth as boolean;

        if (token.email) {
          session.user.email = token.email;
        }
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccout = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccout;

      token.name = existingUser.name;
      token.email = existingUser.email;

      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  ...authConfig,
});
