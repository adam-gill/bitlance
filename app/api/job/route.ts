import { NextRequest, NextResponse } from "next/server";
//import { prisma, Status } from "@/lib/prisma";
import { PrismaClient, Status } from '@prisma/client'
const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    const jobs = await prisma.job.findMany({});
    console.log("J", jobs);
    return NextResponse.json({success:true, data:jobs}, { status: 201 });
}

export async function POST(request: NextRequest){
    const payload = await request.json();
    const {description, category, user_id} = payload; // We are getting user_id here, But to create a job we need client_id hence we would be fetching client_id from here
    const client = await prisma.client.findUnique({where: {user_id: user_id}});
    const client_id = client?.c_id;
    if(client_id){
        console.log("P", payload);
        const job = await prisma.job.create({
            data: {
                description, category, client_id, status:Status.OPEN
            }
        });
        return NextResponse.json({ success: true, job}, { status: 201 });
    }
    else{
        return NextResponse.json({ success: false, message:"User is not a Client"}, { status: 400 });
    }
}

export async function PUT(request: NextRequest){
    const {user_id, job_id} = await request.json();
    const job: any = await prisma.job.findUnique({where : {job_id: job_id}});
    if(job.status = Status.OPEN){ // We are checking if JOB is currently OPEN and not taken up by any freelacner yet then only we will have access to edit it.
        //Now check if the job has been created by this user only and only the owner of the job can edit the job
        if(user_id === job.client.user_id){

        }
        else{
            return NextResponse.json({ success: false, message:"This user/client cannot edit this job"}, { status: 400 });
        }
    }
    else{
        return NextResponse.json({ success: false, message:"Job is not in Open status hence editing is not possible"}, { status: 400 });

    }
}