import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { sql } from "@/lib/db"
import bcrypt from "bcryptjs"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        
        const users = await sql`SELECT * FROM users WHERE email = ${credentials.email as string}`;
        if (!users || users.length === 0) {
          return null;
        }
        
        const user = users[0];
        
        if (!user.password) {
          return null;
        }
        
        const passwordsMatch = await bcrypt.compare(credentials.password as string, user.password);
        if (passwordsMatch) {
          return { id: user.id.toString(), email: user.email, name: user.name };
        }
        
        return null;
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: async ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth?.user;
      const paths = ["/login", "/register"];
      const isAuthPage = paths.some(path => nextUrl.pathname.startsWith(path));
      
      if (isAuthPage) {
        if (isLoggedIn) return Response.redirect(new URL("/", nextUrl));
        return true;
      }
      
      return isLoggedIn;
    },
  },
})
