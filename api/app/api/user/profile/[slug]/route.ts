import { PrismaClient } from "@/app/generated/prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()
export const GET = async (res : NextResponse,  
    ctx: { params: Promise<{ slug: string }> }) => {
    const { slug } = await ctx.params;
    
    const profil = await prisma.profile.findUnique({
        where : {
            userId : Number(slug)
        },select : {
            gender : true,
            phone : true,
            address : true,
            birthDate: true,
            user : {
                select : {
                    email : true
        },}
        }
    });

    if (!profil) {
    return NextResponse.json(
      { message: "Profile tidak ditemukan" },
      { status: 404 }
    );
  }
    return NextResponse.json(profil);
    
}