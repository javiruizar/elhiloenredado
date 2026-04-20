import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await auth();
    
    // 1. Extraemos y validamos el ID asegurando el tipo string
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { address, deliveryNote } = await req.json();

    if (!address) {
      return NextResponse.json({ error: "La dirección es obligatoria" }, { status: 400 });
    }

    const cart = await prisma.cart.findUnique({
      // Usamos la constante validada
      where: { userId: userId },
      include: { items: { include: { product: true } } }
    });

    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ error: "El carrito está vacío" }, { status: 400 });
    }

    const total = cart.items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          userId: userId, // TypeScript ahora sabe que esto es 100% un string
          total,
          address,
          deliveryNote,
          items: {
            create: cart.items.map(item => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.product.price,
              customization: item.customization
            }))
          }
        }
      });

      await tx.cartItem.deleteMany({
        where: { cartId: cart.id }
      });

      return newOrder;
    });

    const response = NextResponse.json({ success: true, orderId: order.id }, { status: 201 });
    response.headers.delete("Set-Cookie");
    return response;
    
  } catch {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}