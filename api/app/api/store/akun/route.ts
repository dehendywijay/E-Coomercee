import { PrismaClient } from "@/app/generated/prisma/client";
import { jwtVerify } from "jose";
import { NextRequest } from "next/server";

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

}

export async function GET(req: NextRequest) {
   const userId = await getUserIdFromRequest(req);
}
