import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generatePasswordResetToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "El email es obligatorio" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json({ 
        message: "Este correo no está registrado en nuestra base de datos." 
      }, { status: 404 });
    }

    if (!user.password) {
      return NextResponse.json({ 
        message: "Tu cuenta está vinculada a Google. Por favor, inicia sesión usando el botón de Google." 
      }, { status: 403 });
    }

    const passwordResetToken = await generatePasswordResetToken(email);
    
    try {
      await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token
      );
    } catch (error) {
      console.error("Error enviando email de recuperación:", error);
      return NextResponse.json({ message: "Error enviando el correo" }, { status: 500 });
    }

    return NextResponse.json({ message: "Enlace enviado correctamente" }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Error interno" }, { status: 500 });
  }
}
