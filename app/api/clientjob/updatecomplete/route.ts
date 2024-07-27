import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Status } from "@prisma/client";

export async function PATCH(request: NextRequest) {
  try {
    const { job_id,freelancer_id } = await request.json(); //freelancer_id is actually user_id

    if (!job_id) {
      return NextResponse.json({ success: false, message: "Missing job_id" }, { status: 400 });
    }

   
    //const freelancer = await prisma.freelancer.findUnique({where:{user_id:freelancer_id}});
    


    console.log("job_id:", job_id);
    const job = await prisma.job.findUnique({ where: { job_id } });
    
    if (!job) {
      console.log("Job not found");
      return NextResponse.json({ success: false, message: "Job not found" }, { status: 404 });
    }

    if (job.status !== Status.INPROGRESS) {
      console.log("Job status not INPROGRESS");
      return NextResponse.json({ success: false, message: "Only jobs with status OPEN can be updated to COMPLETED" }, { status: 400 });
    }

    const updatedJob = await prisma.job.update({
      where: { job_id },
      data: { status: Status.COMPLETED, u_id:freelancer_id},
    });

    console.log("Job status updated to COMPLETED");
    return NextResponse.json({ success: true, updatedJob, message: "Job status updated to COMPLETED" }, { status: 200 });
  } catch (error) {
    console.error("Error updating job status:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
