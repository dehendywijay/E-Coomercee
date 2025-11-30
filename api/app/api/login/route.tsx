import { PrismaClient } from "@/app/generated/prisma/client";
import { signToken } from "@/lib/jwt";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

// Inisialisasi Prisma Client
const prisma = new PrismaClient();

// Fungsi POST untuk menangani permintaan login
export async function POST (req: Request) {
    try {
        const data = await req.json();
        const plainTextPassword = data.password; 
        const email = data.email;
        const user = await prisma.user.findUnique({
            where: {
                email: email
            },
            select: {
                id: true, 
                email: true,
                password: true 
            }
        });

        
        if (!user) {
            return NextResponse.json({
                message: "Email atau Password salah.",
                status: false
            })
        }

        const isPasswordMatch = await bcrypt.compare(plainTextPassword, user.password);

        if (!isPasswordMatch) {
            return NextResponse.json({
                message: "Email atau Password salah.",
                status: false
            })
        }
        

        const token = signToken({ id: user.id, email: user.email });

        const res = NextResponse.json({
            message: "Login berhasil",
            status: true,
            user: { id: user.id, email: user.email }
        });

        res.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: "/",
            maxAge: 60 * 60 * 24, 
        });

        return res;

    } catch (error) {
        console.error("Login Error:", error);
        return NextResponse.json({
            message: "Terjadi kesalahan server saat login.",
            status: false
        }, { status: 500 });
    }
}