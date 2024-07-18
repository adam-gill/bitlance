import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const job_id = searchParams.get("job_id");

    if (!job_id) {
      return NextResponse.json({ error: 'job_id is required' }, { status: 400 });
    }

    const jobFreelancers = await prisma.jobFreelancer.findMany({
      where: { job_id },
      include: {
        freelancer: true,  // Including freelancer details
        client: true,  // Including client details
        job: true  // Including job details
      },
    });

    

    return NextResponse.json({ success: true, jobFreelancers }, { status: 200 });
  } catch (error) {
    console.error("Error retrieving job freelancers:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
