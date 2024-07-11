import { NextRequest, NextResponse } from "next/server";
//import { prisma, Status } from "@/lib/prisma";
import { PrismaClient, Role} from '@prisma/client'
const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    const searchparmas = request.nextUrl.searchParams;
    const user_id:string = searchparmas.get('user_id');
    const user:any = await prisma.user.findUnique({ where : {user_id: user_id}}); // Fetching the user object
    if(user.role == Role.BOTH || user.role == Role.FREELANCER){
        const freelacner = await prisma.freelancer.findUnique({ where : {user_id: user_id}});
        return NextResponse.json( {success:true, data:freelacner}, {status:201}); // Returning the Freelancer Details
    }
    else{
        return NextResponse.json( {success:false, message:"User is not a Freelancer"}, {status:400});
    }
}