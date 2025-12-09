import { PrismaClient } from "@/app/generated/prisma/client";
import { createJoseToken } from "@/lib/token";
import { NextRequest, NextResponse } from "next/server"

const prisma = new PrismaClient();
export async function GET(req: NextRequest) {
        const refreshToken = req.cookies.get('refreshToken')?.value;
        if(!refreshToken){
            return NextResponse.json({
                message : `Tidak ada refresh token goblok, ${refreshToken}`,
                status : false

            })
        }

}