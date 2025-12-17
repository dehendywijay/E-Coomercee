import { PrismaClient } from "@/app/generated/prisma/client";
import { createJoseToken } from "@/lib/token";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server"

const prisma = new PrismaClient();
export async function GET(req: NextRequest) {
        const refreshToken = req.cookies.get('refreshToken')?.value;
        if(!refreshToken){
            return NextResponse.json({
                message : "Tidak ada refresh token ",
                status : false

            })
        }
        const user = await prisma.user.findFirst({
            where:{
                refreshToken : refreshToken
            }
        });
        if(!user){
            return NextResponse.json({
                message : "Refresh token tidak valid",
                status : false
            })
        }
        const secret = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET!);
        try {
            await jwtVerify(refreshToken,secret);
            const userId = user.id;
            const email = user.email;
            const accesToken = await createJoseToken(
                { id: userId, email: email, name: user.name },
                '30s' 
             );
            return NextResponse.json({accesToken})
            
        }catch(err){
            return NextResponse.json({
                message : "Refresh token tidak valid",
                status : false
            })
        }
}