import { PrismaClient } from "@/app/generated/prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req : NextRequest, res : NextResponse){
    try {

        const product = await prisma.store.findMany({
        orderBy: {
            id: 'desc'
        },select: {
            products:true
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