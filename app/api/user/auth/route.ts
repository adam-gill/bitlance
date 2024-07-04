// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { comparePassword } from "@/hooks/hashpassword";

type ApiResponse = {
  success: boolean;
  message?: string;
  data?: any;
};

export async function POST(request: NextRequest) {
  if (request.method !== "POST") {
    return NextResponse.json({ success: false, message: "Method Not Allowed" }, { status: 405 });
  }

  const { email, password } = await request.json();
  console.log(email)

  try {
    // Find the user in the database
    const user = await prisma.user.findUnique({
      where: {
        email:email
      },
    });
    console.log(user)

    // If no user is found or the password is incorrect, return an error
    if (!user || !(await comparePassword(password, user.password))) {
      return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 });
    }

    // Return the user object without the password
    const { password: _, ...userWithoutPassword } = user;
    console.log("user without password",userWithoutPassword)
    

    return NextResponse.json({ success: true, data: userWithoutPassword }, { status: 200 });
  } catch (error) {
    console.error("Error signing in:", error);
    alert(error)
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
