import { PrismaClient } from "@/app/generated/prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const data = await req.json();
    const nama = data.name;
    const password = data.password;
    const email = data.email;

    const check = await prisma.user.findFirst({
        where : {
            email : email,
            password : password
        },
        select : {
            email : true
        }
    })

    if (check) {
        return NextResponse.json(
        { message: "Login Berhasil)", status: false })
    }else{
        return NextResponse.json(
        { message: "Login Gagal", status: false })
    }
}