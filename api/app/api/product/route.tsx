import { PrismaClient } from "@/app/generated/prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req : NextRequest, res : NextResponse){
    try {
        const body = await req.json();
        const { name, imageSrc, originalPrice, discountPercentage, rating, salesCount, location, stock, description } = body;
    }catch (err) {
    
    console.error(err);
    return NextResponse.json(
      { status: false, message: "Gagal menyimpan Data"},
      { status: 400 },
    );
}
}