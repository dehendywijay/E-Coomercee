import { PrismaClient } from "@/app/generated/prisma/client";


const prisma = new PrismaClient()
const secret = new TextEncoder().encode(process.env.JWT_SECRET!);