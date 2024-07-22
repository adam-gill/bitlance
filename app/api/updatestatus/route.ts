import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Status } from "@prisma/client";

export async function PATCH(request: NextRequest) {
  try {
    const { job_id, client_id } = await request.json();

    if (!job_id) {
      return NextResponse.json({ success: false, message: "Missing job_id" }, { status: 400 });
    }

    if (!client_id) {
      return NextResponse.json({ success: false, message: "Missing client_id" }, { status: 400 });
    }

    console.log("client_id:", client_id);
    const client = await prisma.client.findUnique({
      where: { c_id: client_id }
    });
    
    if (!client) {
      console.log("Client not found");
      return NextResponse.json({ success: false, message: "Client not found" }, { status: 404 });
    }

    console.log("job_id:", job_id);
    const job = await prisma.job.findUnique({ where: { job_id } });
    
    if (!job) {
      console.log("Job not found");
      return NextResponse.json({ success: false, message: "Job not found" }, { status: 404 });
    }

    if (job.status !== Status.OPEN) {
      console.log("Job status not OPEN");
      return NextResponse.json({ success: false, message: "Only jobs with status OPEN can be updated to INPROGRESS" }, { status: 400 });
    }

    const updatedJob = await prisma.job.update({
      where: { job_id },
      data: { status: Status.INPROGRESS },
    });

    console.log("Job status updated to INPROGRESS");
    return NextResponse.json({ success: true, updatedJob, message: "Job status updated to INPROGRESS" }, { status: 200 });
  } catch (error) {
    console.error("Error updating job status:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
