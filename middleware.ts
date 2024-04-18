import NextAuth from "next-auth";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);
export default auth((req) => {});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.png).*)"],
};
