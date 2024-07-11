import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Status, Role } from '@prisma/client'
const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    const {user_id} = await request.json();
    const user:any = await prisma.user.findFirst({where:{user_id:user_id}}); // Fetching the user object
    if(user.role=Role.BOTH){
        return NextResponse.json({success:true, data:user, message:"Already have access to both the Dashboards"}, { status: 201 });
    }
    else{
        const update_user = await prisma.user.update(
        {
            where:{ user_id:user_id},
            data:{ role:Role.BOTH}
        });
        return NextResponse.json({success:true, data:update_user, message:"Access Granted"}, {status: 200 });
    }
}
