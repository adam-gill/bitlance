import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export type DataJobRequest = {
  job_id: string;
  freelancer_id: string;
  client_id: string;
  freelancer_address: string;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { job_id, freelancer_id, client_id, freelancer_address }: DataJobRequest = body;

    // Validate the request data
    if (!job_id || !freelancer_id || !client_id || !freelancer_address) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const jobFreelancer = await prisma.jobFreelancer.create({
      data: {
        job_id,
        freelancer_id,
        client_id,
        freelancer_address,
      },
    });

    return NextResponse.json({ success: true, jobFreelancer }, { status: 201 });
  } catch (error) {
    console.error("Error creating JobFreelancer:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
