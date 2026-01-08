import { PrismaClient } from "@/app/generated/prisma/client";
import { NextResponse } from "next/server";


const prisma = new PrismaClient()
export const GET = async (res : NextResponse,  
    ctx: { params: Promise<{ slug: string }> }) => {
    const { slug } = await ctx.params;
    
    const product = await prisma.product.findMany({
        where : {
            id : Number(slug)
        },select : {
            id : true,
            name : true,
            description : true,
            originalPrice : true,
            stock : true,
            discountPercentage : true,
            bonusText : true,
            rating : true,
            salesCount : true,
            location : true,
        }
    });
    if (!product) {
        return NextResponse.json(
            { message: "Product tidak ditemukan" },
            { status: 404 }
        );
    }
    
}