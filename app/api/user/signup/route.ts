import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/hooks/hashpassword";
import { Role } from "@prisma/client"; // Adjust this import based on your Prisma generated types
import { NextRequest, NextResponse } from "next/server";

// Define the User type
export type User = {
  user_id: string;
  username: string;
  password: string;
  email: string;
  created_at: Date;
  name: string;
  discord_handle: string | null;
  role: Role;
};

type Data = {
  username: string;
  password: string;
  email: string;
};

type ApiResponse = {
  success: boolean;
  message?: string;
  data?: any;
  user?: User;
};

export async function POST(request: NextRequest) {
  if (request.method !== "POST") {
    return NextResponse.json({ success: false, message: "Method Not Allowed" }, { status: 405 });
  }

  const { username, password, email }: Data = await request.json();

  try {
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
        name: username,
        role: Role.FREELANCER // Example usage of Role enum
      }
    });

    return NextResponse.json({ success: true, user }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
