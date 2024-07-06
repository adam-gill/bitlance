import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";


const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req) {
        try {
          const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user/auth`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });
          console.log("res vcbnx",res)

          if (res.status != 200) {
            //throw new Error(`Failed to authenticate: ${res.status} ${res.statusText}`);
            const {message} = await res.json()
            throw new Error(message)
          }

          const user = await res.json();
          if (user) {
            return user; // Return user data to NextAuth for session management
          } else {
            throw new Error("Authentication failed"); // Handle case where no user data is returned
          }
        } catch (err: any) {
          console.error("Authorization error:", err);
          throw new Error(err);
        }
      },
    }),
    // Add other providers as needed
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      // Modify JWT payload if needed
      
      if (user) {
        token.user = user;
        
        }
      
      console.log("user user",user)
      return { ...token, ...user };
    },
    async session({ session, token, user }: any) {
      // Modify session data if needed
      session.user = token as any;
      console.log("session",session)
      return session;
    },
    // Add callbacks for other providers
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/login',
    error: '/login',
    signOut: '/'
  },
  //adapter: PrismaAdapter(prisma),
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 60 * 60 * 24 * 30,
    
  },

});

export { handler as GET, handler as POST }