
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
            email : email
        },
        select : {
            email : true
        }
    })

    if (check) {
        return NextResponse.json(
        { message: "Data Tidak berhasil disimpan(Email Sudah Terdaftar)", status: false })
    }

    await prisma.user.create({
        data : {
            name : nama,
            email : email,
            password : password,
        }
    })

    return NextResponse.json({
        message: "Data berhasil disimpan", 
        status: true 
        });
}