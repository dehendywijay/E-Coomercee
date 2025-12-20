import { PrismaClient } from "@/app/generated/prisma/client";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

const secret = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET!);

async function getUserIdFromRequest(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) throw new Error("Unauthorized");

  const token = authHeader.split(" ")[1];
  const { payload } = await jwtVerify(token, secret);
  return payload.id as number; 
}

export async function POST(req : NextRequest, res : NextResponse){ 
    const userId = await getUserIdFromRequest(req);
    
    const body = await req.json();
    const { name, gender, phone, address, birthDate } = body;

    if (name) {
      await prisma.user.update({
        where: { id: userId },
        data: { name },
      });
    }
    
}