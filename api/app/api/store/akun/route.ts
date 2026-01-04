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

export async function POST(req: NextRequest) {
  
  try{
  const userId = await getUserIdFromRequest(req);
  const body = await req.json();
  const { buka, name, location } = body;

  await prisma.store.upsert({
      where: { userId },         
      update: {
        buka,
        name,
        location,
      },
      create: {
        buka,
        name,
        location,
        userId,
      },
    });
    return NextResponse.json({ status: true, message: "Profil tersimpan" });
  } catch (err) {
    
    console.error(err);
    return NextResponse.json(
      { status: false, message: "Gagal menyimpan Data"},
      { status: 400 },
      
    );
  }
}