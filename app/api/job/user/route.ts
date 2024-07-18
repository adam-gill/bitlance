import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get('user_id');
  const isFreelancer = searchParams.get('isFreelancer') === 'true';

  if (!user_id) {
    return NextResponse.json({ success: false, message: "Missing user_id" }, { status: 400 });
  }

  try {
    let jobs;

    if (isFreelancer) {
      const freelancer = await prisma.freelancer.findUnique({
        where: { user_id },
        include: { jobs: true },
      });

      if (!freelancer) {
        return NextResponse.json({ success: false, message: "Freelancer not found" }, { status: 404 });
      }

      jobs = freelancer.jobs;
    } else {
      const client = await prisma.client.findUnique({
        where: { user_id },
        include: { jobs: true },
      });

      if (!client) {
        return NextResponse.json({ success: false, message: "Client not found" }, { status: 404 });
      }

      jobs = client.jobs;
    }

    return NextResponse.json({ success: true, data: jobs }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch user jobs:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
