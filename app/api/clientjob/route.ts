import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Status } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const client_id = searchParams.get("client_id");

    if (!client_id) {
      return NextResponse.json({ error: 'client_id is required' }, { status: 400 });
    }

    const client = await prisma.client.findUnique({
      where: { user_id: client_id },
      include: {
        jobs: true,
      },
    });

    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, jobs: client.jobs }, { status: 200 });
  } catch (error) {
    console.error("Error retrieving client jobs:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}



export async function PATCH(request: NextRequest) {
  try {
      const { job_id } = await request.json();

      if (!job_id) {
          return NextResponse.json({ success: false, message: "Missing job_id" }, { status: 400 });
      }

      const job = await prisma.job.findUnique({ where: { job_id } });

      if (!job) {
          return NextResponse.json({ success: false, message: "Job not found" }, { status: 404 });
      }

      if (job.status !== Status.OPEN) {
          return NextResponse.json({ success: false, message: "Only jobs with status OPEN can be updated to INPROGRESS" }, { status: 400 });
      }

      const updatedJob = await prisma.job.update({
          where: { job_id },
          data: { status: Status.INPROGRESS },
      });

      return NextResponse.json({ success: true, updatedJob, message: "Job status updated to INPROGRESS" }, { status: 200 });
  } catch (error) {
      console.error("Error updating job status:", error);
      return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}