import { PrismaClient } from "@/app/generated/prisma/client";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";


const prisma = new PrismaClient();


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
        

        const accesToken = sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
            expiresIn: '20s'
        });
        

        const res = NextResponse.json({
            message: "Login berhasil",
            status: true,
            user: { id: user.id, email: user.email },
            token: token
        });

        res.cookies.set("token", token, {
            httpOnly: true,
            secure: true,
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