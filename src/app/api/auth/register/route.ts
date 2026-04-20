import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Faltan datos obligatorios" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      // Si el usuario existe pero no tiene contraseña, es porque inició sesión primero con Google.
      // Permitimos añadir la contraseña para vincular ambos métodos (OAuth + Credenciales).
      if (!existingUser.password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.update({
          where: { email },
          data: { 
            password: hashedPassword,
            name: existingUser.name || name // Mantenemos el nombre de Google si existe
          }
        });
        return NextResponse.json({ message: "Contraseña vinculada a tu cuenta de Google", user: { email } }, { status: 200 });
      }
      return NextResponse.json({ message: "El correo ya está registrado" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Asignar rol ADMIN automáticamente a un email específico (administrador principal)
    const isAdmin = email.toLowerCase() === "javiruizar@gmail.com";

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: isAdmin ? "ADMIN" : "USER",
      },
    });

    return NextResponse.json({ message: "Usuario creado", user: { email: user.email } }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
  }
}