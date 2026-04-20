import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    
    if (!userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const cart = await prisma.cart.findUnique({
      where: { userId: userId },
      include: {
        items: {
          include: { product: true }
        }
      }
    });

    const response = NextResponse.json(cart || { items: [] });
    
    // Prevención del bug de Auth.js v5
    response.headers.delete("Set-Cookie");
    
    return response;
  } catch {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { productId, quantity, customization } = await req.json();

    const cart = await prisma.cart.upsert({
      where: { userId: userId },
      update: {},
      create: { userId: userId }
    });

    const existingItem = await prisma.cartItem.findFirst({
      where: { cartId: cart.id, productId, customization: customization || null }
    });

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity }
      });
    } else {
      await prisma.cartItem.create({
        data: { cartId: cart.id, productId, quantity, customization }
      });
    }

    const response = NextResponse.json({ success: true });
    
    // Prevención del bug de Auth.js v5
    response.headers.delete("Set-Cookie");
    
    return response;
  } catch {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { itemId, quantity } = await req.json();

    if (quantity <= 0) {
      await prisma.cartItem.delete({
        where: { id: itemId }
      });
    } else {
      await prisma.cartItem.update({
        where: { id: itemId },
        data: { quantity }
      });
    }

    const response = NextResponse.json({ success: true });
    response.headers.delete("Set-Cookie");
    return response;
  } catch {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { itemId } = await req.json();

    await prisma.cartItem.delete({
      where: { id: itemId }
    });

    const response = NextResponse.json({ success: true });
    response.headers.delete("Set-Cookie");
    return response;
  } catch {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}