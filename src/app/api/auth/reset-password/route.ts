import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ message: "Token y contraseña son obligatorios" }, { status: 400 });
    }

    const existingToken = await prisma.passwordResetToken.findUnique({
      where: { token }
    });

    if (!existingToken) {
      return NextResponse.json({ message: "Token inválido" }, { status: 400 });
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
      return NextResponse.json({ message: "El token ha expirado" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: existingToken.email }
    });

    if (!user) {
      return NextResponse.json({ message: "El usuario no existe" }, { status: 404 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword }
    });

    await prisma.passwordResetToken.delete({
      where: { id: existingToken.id }
    });

    return NextResponse.json({ message: "Contraseña actualizada correctamente" }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Error interno" }, { status: 500 });
  }
}
