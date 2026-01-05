import { PrismaClient } from "@/app/generated/prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()
export const GET = async (res : NextResponse,  
    ctx: { params: Promise<{ slug: string }> }) => {
    const { slug } = await ctx.params;

    const product = await prisma.store.findMany({
        where : {
            userId : Number(slug)
        },select : {
            products : true
        }
    });
    if (!product) {
        return NextResponse.json(
            { message: "Profile tidak ditemukan" },
            { status: 404 }
        );
    }
    
    
    return NextResponse.json(product);
}