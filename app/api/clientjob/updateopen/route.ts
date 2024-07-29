import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Status } from "@prisma/client";

//reverting an progress job to open

export async function PATCH(request: NextRequest) {
  try {
    const { job_id, client_id, freelancer_id } = await request.json(); //freelancer_id is actually user_id

    if (!job_id) {
      return NextResponse.json({ success: false, message: "Missing job_id" }, { status: 400 });
    }

    if (!client_id) {
      return NextResponse.json({ success: false, message: "Missing client_id" }, { status: 400 });
    }

    console.log("client_id:", client_id);
    const client = await prisma.user.findUnique({
      where: { user_id: client_id }
    });
    const freelancer = await prisma.freelancer.findUnique({where:{user_id:freelancer_id}});
    
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

    if (job.status !== Status.INPROGRESS) {
      console.log("Job status not in progress * for reverting");
      return NextResponse.json({ success: false, message: "Only jobs with status InProgress can be updated to Open" }, { status: 400 });
    }

    const updatedJob = await prisma.job.update({
      where: { job_id },
      data: { status: Status.OPEN, freelancer_id:freelancer?.f_id},
    });

    console.log("Job status updated to OPEN");
    return NextResponse.json({ success: true, updatedJob, message: "Job status updated to OPEN" }, { status: 200 });
  } catch (error) {
    console.error("Error updating job status:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
