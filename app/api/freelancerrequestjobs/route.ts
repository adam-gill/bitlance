import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const freelancer_id = searchParams.get("freelancer_id");

    if (!freelancer_id) {
      return NextResponse.json({ error: 'freelancer_id is required' }, { status: 400 });
    }

    const jobFreelancers = await prisma.jobFreelancer.findMany({
      where: { freelancer_id },
      include: {
        job: true,  // Including job details
        client: true  // Including client details
      },
    });

  

    return NextResponse.json({ success: true, jobFreelancers }, { status: 200 });
  } catch (error) {
    console.error("Error retrieving freelancer jobs:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
