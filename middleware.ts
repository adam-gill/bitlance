import middleware, { withAuth } from "next-auth/middleware";
const secret = process.env.NEXTAUTH_SECRET;
import { TokenPayload } from "./types/next-auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { GetSessionParams } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import jwt from "jsonwebtoken"
import { jwtTokenDecode } from "./types/jwt-token-decode";



export default withAuth(
  async function middleware(req) {
    console.log("token tokens auth:", req.nextauth.token);
    //console.log("Cookies:", req.cookies.get("refreshTokens")?.value);
    
    
    try {
      const session = (await getToken({ req })) as TokenPayload | null;
      // const session = req.nextauth.token as unknown as TokenPayload
      console.log("token token :", session?.data.role);
    //   const data = jwt.decode(
    //     session?.jti as string
    //   ) as jwtTokenDecode;
    //   console.log("data data is", data.user?.role);

      if (!session) {
        console.log("Redirecting to login page...");
        return NextResponse.redirect(new URL("/login", req.url));
      }

      // Define the allowed base paths
      const allowedPaths = ["login", "/", "login", "signup"];

      // Extract the base path from the requested URL
      const basePath = req.nextUrl.pathname.split("/")[1]; // Get the first segment after the initial "/"

      // Check if the basePath is in the allowedPaths and if the user's role matches
    //   if (!allowedPaths.includes(basePath) || data.user?.role !== basePath) {
    //     return NextResponse.redirect(new URL("/login", req.url));
    //   }

      console.log("Session exists. Allowing access...");
      // If the session exists and the role matches, continue with the request
      return NextResponse.next();
    } catch (error) {
      console.error("Error in middleware:", error);
      // Handle errors gracefully
      return NextResponse.error();
    }
  },
  {
    secret,
    pages: {
      signIn: "/login/",
      signOut: "/",
    },
  }
);

export const config = {
  matcher: [
    
    "/dashboard/:path*",
    
  ],
};