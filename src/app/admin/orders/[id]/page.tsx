import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, User, MapPin, Package, Clock, Phone, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { OrderStatusSelect } from "@/components/admin/OrderStatusSelect";
import { buttonVariants } from "@/components/ui/button";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      user: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col gap-2">
        <Link 
          href="/admin/orders" 
          className="flex items-center text-xs text-muted-foreground hover:text-primary transition-colors w-fit"
        >
          <ChevronLeft className="mr-1 h-3 w-3" />
          Volver a pedidos
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-primary">
              Pedido <span className="text-accent">#{order.id.slice(-8).toUpperCase()}</span>
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1 italic">
              <Clock className="h-3 w-3" />
              <span>Realizado el {new Date(order.createdAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
          <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna Izquierda: Información del Cliente y Envío */}
        <div className="space-y-6">
          <Card className="border-neutral-200 shadow-sm overflow-hidden">
            <CardHeader className="bg-neutral-50/50 border-b border-neutral-200">
              <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 text-primary">
                <User className="h-4 w-4 text-accent" />
                Cliente
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-cream flex items-center justify-center font-bold text-primary border border-sand/20">
                  {order.user.name?.[0] || 'U'}
                </div>
                <div>
                  <p className="font-bold text-primary">{order.user.name || "Invitado"}</p>
                  <p className="text-xs text-muted-foreground italic">Usuario desde {new Date(order.user.emailVerified || order.createdAt).getFullYear()}</p>
                </div>
              </div>
              <div className="space-y-2 pt-2 border-t border-neutral-100">
                <div className="flex items-center gap-2 text-sm text-foreground/80">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  {order.user.email}
                </div>
                {order.user.phone && (
                  <div className="flex items-center gap-2 text-sm text-foreground/80">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    {order.user.phone}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-neutral-200 shadow-sm overflow-hidden">
            <CardHeader className="bg-neutral-50/50 border-b border-neutral-200">
              <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 text-primary">
                <MapPin className="h-4 w-4 text-accent" />
                Dirección de Envío
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <pre className="text-sm font-sans whitespace-pre-wrap leading-relaxed text-foreground/80 bg-neutral-50 p-4 rounded-xl border border-neutral-100">
                {order.address}
              </pre>
              {order.deliveryNote && (
                <div className="mt-4 p-4 bg-orange-50/50 border border-orange-100 rounded-xl">
                  <p className="text-[10px] font-bold text-orange-700 uppercase tracking-widest mb-1">Nota del cliente:</p>
                  <p className="text-sm text-orange-800 italic">&quot;{order.deliveryNote}&quot;</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Columna Derecha: Artículos del Pedido */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-neutral-200 shadow-sm overflow-hidden">
            <CardHeader className="bg-neutral-50/50 border-b border-neutral-200">
              <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 text-primary">
                <Package className="h-4 w-4 text-accent" />
                Resumen de Compra
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-neutral-100">
                {order.items.map((item) => (
                  <div key={item.id} className="p-6 flex gap-6 hover:bg-neutral-50/30 transition-colors">
                    <div className="h-20 w-20 relative rounded-xl overflow-hidden border border-neutral-200 flex-shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-primary">{item.product.name}</h4>
                          <p className="font-bold text-primary">{(item.price * item.quantity).toFixed(2)}€</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Precio unitario: {item.price.toFixed(2)}€ &middot; Cantidad: {item.quantity}</p>
                        {item.customization && (
                          <div className="mt-2 inline-block px-3 py-1 bg-sage/5 border border-sage/10 rounded-full">
                            <p className="text-[10px] font-medium text-sage italic">
                              Personalización: &quot;{item.customization}&quot;
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-6 bg-neutral-50/50 border-t border-neutral-200 space-y-3">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{order.total.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Gastos de envío</span>
                  <span className="italic">Calculados en el total</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-primary pt-2 border-t border-neutral-200">
                  <span>Total Pedido</span>
                  <span className="text-accent">{order.total.toFixed(2)}€</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-white border border-neutral-200 p-6 rounded-2xl flex items-center justify-between gap-4">
             <div className="flex items-center gap-3">
               <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                 <Mail className="h-5 w-5" />
               </div>
               <div>
                 <p className="text-sm font-bold text-primary">Contactar con el cliente</p>
                 <p className="text-xs text-muted-foreground">Enviar correo de actualización</p>
               </div>
             </div>
             <a 
               href={`mailto:${order.user.email}?subject=Información sobre tu pedido #${order.id.slice(-8).toUpperCase()}`}
               className={buttonVariants({ variant: "outline", className: "border-neutral-200 rounded-xl" })}
             >
                 Enviar Email
             </a>
          </div>
        </div>
      </div>
    </div>
  );
}
