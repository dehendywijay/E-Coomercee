import { PrismaClient } from "@/app/generated/prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()
export const GET = async (res : NextResponse,  
    ctx: { params: Promise<{ slug: string }> }) => {
    const { slug } = await ctx.params;

    const product = await prisma.product.findFirst({
        where : {
            storeId : Number(slug)
        },select : {
            name : true,
            imageSrc : true,
            originalPrice : true,
            discountPercentage : true,
            rating : true,
            salesCount : true,
            location : true,
            stock : true,
            description : true,
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