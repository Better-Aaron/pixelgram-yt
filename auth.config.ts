import { type NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Naver from "next-auth/providers/naver";
import Credentials from "next-auth/providers/credentials";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Naver({
      clientId: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const user = {
          email: "dev@gamil.com",
          name: "Aaron",
          role: "USER",
        };
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
