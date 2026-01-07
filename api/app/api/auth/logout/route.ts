import { PrismaClient } from "@/app/generated/prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest, res : NextResponse) {
    const refreshToken = req.cookies.get('refreshToken')?.value;
        if(!refreshToken) return NextResponse.json({
            message : "Tidak ada refresh token ",
            status : false
        });
    
    const user = await prisma.user.findFirst({
        where:{
            refreshToken : refreshToken
        }
    })
    if(!user){
        return NextResponse.json({
            message : "Refresh token tidak valid",
            status : false
        })
    }
    await prisma.user.update({
        where:{
            id : user.id
        },
        data:{
            refreshToken : null
        }
    })

    res.cookies.delete('refreshToken');
    return NextResponse.json({
        message : "Berhasil logout",
        status : true
    })
}