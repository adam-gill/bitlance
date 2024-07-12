// Import necessary types and Prisma client
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/hooks/hashpassword";
import { Role } from "@prisma/client"; // Adjust this import based on your Prisma generated types
import { NextRequest, NextResponse } from "next/server";

// Define types
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

export type FreelancerData = {
  user_id: string;
  bio: string;
  skills: string;
  portfolio_link: string;
  social_link: string;
};

export type ClientData = {
  user_id: string;
  company_name: string;
  company_description: string | null; // Adjusted to accept null
  websiteLink: string | null; // Include websiteLink in ClientData
};

type Data = {
  username: string;
  password: string;
  email: string;
  role: Role;
  freelancer: FreelancerData | null; // Allow for nullable FreelancerData
  client: ClientData | null; // Allow for nullable ClientData
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

  const { username, password, email, role, freelancer, client }: Data = await request.json();

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ success: false, message: "User already exists" }, { status: 409 });
    }

    const hashedPassword = await hashPassword(password);
    const createdUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
        name: username,
        role
      }
    });

    let createdFreelancer: FreelancerData | null = null;
    let createdClient: ClientData | null = null;

    // Create freelancer record if applicable
    if (freelancer) {
      createdFreelancer = await prisma.freelancer.create({
        data: {
          user_id: createdUser.user_id,
          bio: freelancer.bio || "", // Use default values if not provided
          skills: freelancer.skills || "",
          portfolio_link: freelancer.portfolio_link || "",
          social_link: freelancer.social_link || ""
        }
      });
    }

    // Create client record if applicable
    if (client) {
      createdClient = await prisma.client.create({
        data: {
          user_id: createdUser.user_id,
          company_name: client.company_name || username, // Use username if company_name not provided
          company_description: client.company_description || null // Adjusted to accept null
        }
      });
    }

    return NextResponse.json({ success: true, user: createdUser }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}

