import { PrismaClient } from "@/app/generated/prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest, res : NextResponse) {
    const refreshToken = req.cookies.get('refreshToken')?.value;
       
}