import { PrismaClient } from "@/app/generated/prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()
export const GET = async (res : NextResponse,  
    ctx: { params: Promise<{ slug: string }> }) => {
    const { slug } = await ctx.params;
    
    const profil = await prisma.store.findUnique({
        where : {
            userId : Number(slug)
        },select : {
            name : true,
            location : true
        }
    });

    
}