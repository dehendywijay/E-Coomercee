
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
        const res = NextResponse.json(
        { message: "Data Tidak berhasil disimpan(Email Sudah Terdaftar)", status: false },
        { status: 200 }
        );
        res.headers.set("Access-Control-Allow-Origin", "*");
        return res;
    }
    await prisma.user.create({
        data : {
            name : nama,
            email : email,
            password : password,
        }
    })

    const res = NextResponse.json(
        { message: "Data berhasil disimpan", status: true },
        { status: 200 }
        );
        res.headers.set("Access-Control-Allow-Origin", "*");
        return res;
    }

export async function OPTIONS() {
  const res = new NextResponse(null, { status: 204 });
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return res;
}