import { PrismaClient } from "@/app/generated/prisma/client";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

async function getUserIdFromRequest(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) throw new Error("Unauthorized");

  const token = authHeader.split(" ")[1];
  const { payload } = await jwtVerify(token, secret);
  return payload.id as number; 
}
export async function POST(req: NextRequest){
    try{
    const userId = await getUserIdFromRequest(req);

    const body = await req.json();
    const { name, imageSrc, originalPrice, discountPercentage, rating, salesCount, location, stock, description } = body;

    
        await prisma.product.create({
        data : {
            name,
            imageSrc,
            originalPrice,
            discountPercentage,
            rating,
            salesCount,
            location,
            stock,
            description,
            store : {
                connect : {
                    userId : userId
                }
            }
        },
    });
    return NextResponse.json({ status: true, message: "Produk berhasil ditambahkan" });
    }catch (err) {
    
    console.error(err);
    return NextResponse.json(
      { status: false, message: "Gagal menyimpan Data"},
      { status: 400 },
      
    );
  }
}