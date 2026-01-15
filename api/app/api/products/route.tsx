import { PrismaClient } from "@/app/generated/prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(){
    try {
        const product = await prisma.product.findMany({
        orderBy: {
            id: 'desc'
        }   
    });
    return NextResponse.json(product);
    }catch (err) {
    
    console.error(err);
    return NextResponse.json(
      { status: false, message: "Gagal menyimpan Data"},
      { status: 400 },
    );
}
}