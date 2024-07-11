import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const user_id: string | null = searchParams.get('user_id');

    if (!user_id) {
        return NextResponse.json({ success: false, message: "User ID is missing" }, { status: 400 });
    }

    const user: any = await prisma.user.findUnique({ where: { user_id: user_id } });

    if (!user) {
        return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    if (user.role === Role.BOTH || user.role === Role.FREELANCER) {
        const freelancer = await prisma.freelancer.findUnique({ where: { user_id: user_id } });
        return NextResponse.json({ success: true, data: freelancer }, { status: 201 }); // Returning the Freelancer Details
    } else {
        return NextResponse.json({ success: false, message: "User is not a Freelancer" }, { status: 400 });
    }
}
