
import { PrismaClient } from "@/app/generated/prisma/client";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const data = await req.json();
    const nama = data.name;
    const password = data.password;
    const confirmPassword = data.confirmPassword;
    const email = data.email;

    if (password !== confirmPassword) {
        return NextResponse.json(
        { message: "Data Tidak berhasil disimpan(Password dan Confirm Password tidak sesuai)" })
    }
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
    const salt = await bcrypt.genSalt(10); 
    const hashedPassword = await bcrypt.hash(password, salt);

    await prisma.user.create({
        data : {
            name : nama,
            email : email,
            password : hashedPassword,
        }
    })

    return NextResponse.json({
        message: "Data berhasil disimpan", 
        status: true 
        });
}