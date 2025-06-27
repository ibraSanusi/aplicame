import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions";

// Extiende los tipos de NextAuth para incluir accessToken en Session y JWT
declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
