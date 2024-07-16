import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Status } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    const jobs = await prisma.job.findMany({});
    console.log("J", jobs);
    return NextResponse.json({ success: true, data: jobs }, { status: 201 });
}

export async function POST(request: NextRequest) {
    try {
        const payload = await request.json();
        console.log("Payload Received:", payload); // Log the entire payload

        const { description, category, user_id, price,client_address } = payload;

        if (!user_id) {
            return NextResponse.json({ success: false, message: "Missing user_id" }, { status: 400 });
        }

        if (!client_address) {
            return NextResponse.json({ success: false, message: "Missing Wallet Address" }, { status: 400 });
        }

        // Fetch the client using the user_id
        const client = await prisma.client.findUnique({
            where: { user_id: user_id },
        });

        if (!client) {
            return NextResponse.json({ success: false, message: "Client not found" }, { status: 404 });
        }

        const client_id = client.c_id;

        // Check if `price` is a valid number
        const parsedPrice = parseFloat(price);
        if (isNaN(parsedPrice)) {
            return NextResponse.json({ success: false, message: "Invalid price" }, { status: 400 });
        }

        // Create the job
        const job = await prisma.job.create({
            data: {
                description,
                category,
                price: parsedPrice,
                client_id,
                client_address:client_address,
                status: Status.OPEN, // Ensure Status.OPEN is a valid value
            } as any,
        });

        return NextResponse.json({ success: true, job }, { status: 201 });
    } catch (error) {
        console.error("Error creating job:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    const { job_id, user_id, description, category, price } = await request.json();
    const job: any = await prisma.job.findUnique({ where: { job_id: job_id } });
    console.log("J", job);
    if (job) {
        if (job.status === Status.OPEN) { // We are checking if JOB is currently OPEN and not taken up by any freelancer yet then only we will have access to edit it.
            // Now check if the job has been created by this user only and only the owner of the job can edit the job
            const client: any = await prisma.client.findUnique({ where: { c_id: job.client_id } });
            console.log("Client", client);
            if (user_id === client.user_id) { // Now the logic for the editing part
                const updatedJob = await prisma.job.update({
                    where: { job_id: job_id },
                    data: {
                        description,
                        category,
                        price: price ? Number(price) : undefined,
                    } as any
                });
                return NextResponse.json({ success: true, updatedJob, message: "Job Updated Successfully!" }, { status: 201 });
            } else {
                return NextResponse.json({ success: false, message: "This user/client cannot edit this job" }, { status: 400 });
            }
        } else {
            return NextResponse.json({ success: false, message: "Job is not OPEN hence editing is not possible" }, { status: 400 });
        }
    } else {
        return NextResponse.json({ success: false, message: "Job does not exist/ Invalid Job ID" }, { status: 400 });
    }
}
