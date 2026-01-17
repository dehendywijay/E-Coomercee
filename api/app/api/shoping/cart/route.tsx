import { PrismaClient } from "@/app/generated/prisma/client";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";


const prisma = new PrismaClient()
const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

async function getUserIdFromRequest(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) throw new Error("Unauthorized");

  const token = authHeader.split(" ")[1];
  const { payload } = await jwtVerify(token, secret);
  return payload.id as number; 
}

export async function PUT(req: NextRequest) {
    const userId = await getUserIdFromRequest(req);
    const body = await req.json();
    const { productId } = body;
  
    await prisma.profile.update({
      where: { userId },
      data: {
        cartItems : {
          connect: { id: Number(productId) }
        }
      },
    });

    if(!userId)return NextResponse.json({ message: "User tidak ditemukan" }, { status: 404 });
    return NextResponse.json({ message: "Product Berhasil Ditambahkan" }, { status: 200 });
}


export async function GET(req: NextRequest) {
  const userId = await getUserIdFromRequest(req);

  const profileCheckout = await prisma.profile.findUnique({
    where : {userId},
    include : {
      cartItems : true 
    }
});

    return NextResponse.json(profileCheckout?.cartItems);
}

