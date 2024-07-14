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
    console.log("P", payload);
    const {description, category, user_id, price} = payload; // We are getting user_id here, But to create a job we need client_id hence we would be fetching client_id from here
    const client = await prisma.client.findUnique({where: {user_id: user_id}}); // First we are fetching the client object from the user id, because only clients can create a job
    const client_id = client?.c_id;
    console.log("C", client, client_id);
    if(client_id){
        console.log("P", payload);
        const job = await prisma.job.create({
            data: {
                description, category, price: Number(price), client_id, status:Status.OPEN,
            }
        });
        return NextResponse.json({ success: true, job}, { status: 201 });
    }
    else{
        return NextResponse.json({ success: false, message:"User is not a Client"}, { status: 400 });
    }
}

export async function PUT(request: NextRequest){
    const {job_id, user_id, description, category, price} = await request.json();
    const job: any = await prisma.job.findUnique({where : {job_id: job_id}});
    console.log("J", job);
    if(job){
        if(job.status === Status.OPEN){ // We are checking if JOB is currently OPEN and not taken up by any freelacner yet then only we will have access to edit it.
            //Now check if the job has been created by this user only and only the owner of the job can edit the job
            const client: any = await prisma.client.findUnique({where : {c_id: job.client_id}});
            console.log("Client", client);
            if(user_id === client.user_id){ // Now the logic for the editing part
                const updatedJob = await prisma.job.update({
                    where:{job_id: job_id},
                    data:{description, category, price: Number(price)}
                })
                return NextResponse.json({ success: true, updatedJob, message:"Job Updated Successfullt!"}, { status: 201 });
            }
            else{
                return NextResponse.json({ success: false, message:"This user/client cannot edit this job"}, { status: 400 });
            }
        }
        else{
            return NextResponse.json({ success: false, message:"Job is not OPEN hence editing is not possible"}, { status: 400 });
        }

    }
    else{
        return NextResponse.json({ success: false, message:"Job does not exist/ Invalid Job ID"}, { status: 400 });
    }
}