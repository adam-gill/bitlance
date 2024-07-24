import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export type DataJobRequest = {
  job_id: string;
  freelancer_id: string | undefined;
  client_id: string;
  freelancer_address: string;
};

export async function POST(request: NextRequest) {
  try {
     

    const { job_id, freelancer_id, client_id, freelancer_address }: DataJobRequest = await request.json();

    // Validate the request data
    if (!job_id || !freelancer_id || !client_id || !freelancer_address) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }
    const job_application = await prisma.jobFreelancer.findFirst({ where : {AND:[{freelancer_id},{job_id}]}});
    if(!job_application){
      const jobFreelancer = await prisma.jobFreelancer.create({
        data: {
          job_id,
          freelancer_id,
          client_id,
          freelancer_address,
        },
      });
      console.log("HI", jobFreelancer);
      return NextResponse.json({ success: true, jobFreelancer }, { status: 201 });
    }
    else{
      return NextResponse.json({ success: true, message:"You have already applied for this job" }, { status: 202 });
    }
  } catch (error) {
    console.error("Error creating JobFreelancer:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
