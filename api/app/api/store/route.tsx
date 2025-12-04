import { PrismaClient } from "@/app/generated/prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
 
    const body = await req.json();

    const { name, location, isOfficial, userId } = body;

    const store = await prisma.store.create({
      data: {
        name,
        location,
        isOfficial: isOfficial ?? false,
        userId, 
      },
    });

    if (userId !== store.userId) {
      return NextResponse.json(
        {
          message: "Store gagal dibuat, userId tidak sesuai",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Store berhasil dibuat",
        data: store,
      },
      { status: 201 }
    );
}
