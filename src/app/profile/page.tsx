export const dynamic = 'force-dynamic';
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Button, buttonVariants } from "@/components/ui/button";
import { User, Mail, Phone, MapPin, ShoppingBag, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function ProfilePage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      orders: {
        orderBy: { createdAt: "desc" },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "PENDING": return "Pendiente";
      case "SHIPPED": return "Enviado";
      case "COMPLETED": return "Completado";
      case "CANCELLED": return "Cancelado";
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING": return "bg-orange-100 text-orange-700";
      case "SHIPPED": return "bg-blue-100 text-blue-700";
      case "COMPLETED": return "bg-emerald-100 text-emerald-700";
      case "CANCELLED": return "bg-red-100 text-red-700";
      default: return "bg-neutral-100 text-neutral-700";
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl animate-in fade-in duration-500">
      <div className="flex flex-col gap-2 mb-12 text-center md:text-left">
        <h1 className="text-4xl font-serif font-bold text-primary">Mi Espacio</h1>
        <p className="text-muted-foreground italic">Gestiona tus datos y revive tus compras favoritas</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar de Perfil (Columna Izquierda) */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white border border-sand/30 rounded-2xl p-8 shadow-sm text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-sage" />
            
            <div className="h-28 w-28 rounded-full bg-cream mx-auto flex items-center justify-center overflow-hidden border-2 border-sand/20 mb-6 relative shadow-inner">
              {user.image ? (
                <Image 
                  src={user.image} 
                  alt={user.name || "Usuario"} 
                  fill
                  className="object-cover" 
                />
              ) : (
                <User className="h-14 w-14 text-sand/60" />
              )}
            </div>
            
            <h2 className="text-2xl font-serif font-bold text-primary mb-1">{user.name || "Usuario"}</h2>
            <p className="text-sm text-muted-foreground italic mb-8">{user.email}</p>
            
            <div className="space-y-3 pt-6 border-t border-sand/10">
              <div className="flex items-center gap-3 text-sm text-foreground/80">
                <Mail className="h-4 w-4 text-accent" />
                <span className="truncate">{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-foreground/80">
                <Phone className="h-4 w-4 text-accent" />
                <span>{user.phone || "Sin teléfono"}</span>
              </div>
            </div>

            <Button variant="outline" className="w-full mt-8 rounded-xl border-sand text-primary hover:bg-cream">
              Editar Perfil
            </Button>
          </div>

          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
            <h3 className="font-bold text-primary mb-2 flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              ¿Necesitas ayuda?
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Si tienes dudas sobre un pedido en curso o una personalización, no dudes en contactarnos directamente.
            </p>
          </div>
        </div>

        {/* Contenido Principal (Columna Derecha) */}
        <div className="lg:col-span-8 space-y-12">
          {/* Sección de Pedidos */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif font-bold text-primary flex items-center gap-3">
                <ShoppingBag className="h-6 w-6 text-accent" />
                Mis Pedidos
              </h2>
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest bg-neutral-100 px-3 py-1 rounded-full">
                {user.orders.length} totales
              </span>
            </div>

            {user.orders.length === 0 ? (
              <div className="bg-white border border-sand/20 rounded-2xl p-12 text-center space-y-4">
                <p className="text-muted-foreground italic">Aún no has realizado ningún pedido.</p>
                <Link href="/products" className={buttonVariants({ variant: "outline", className: "rounded-xl border-sand text-primary" })}>
                  Ir a la tienda
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {user.orders.map((order) => (
                  <div 
                    key={order.id} 
                    className="bg-white border border-sand/30 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group animate-in fade-in slide-in-from-bottom-2 duration-300"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-cream rounded-xl text-accent">
                          <Clock className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-primary">Pedido #{order.id.slice(-8).toUpperCase()}</p>
                          <p className="text-xs text-muted-foreground italic">
                            Realizado el {new Date(order.createdAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 self-end sm:self-auto">
                        <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                          {getStatusLabel(order.status)}
                        </span>
                        <p className="text-lg font-bold text-primary">{order.total.toFixed(2)}€</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 overflow-x-auto pb-2 scrollbar-hide">
                      {order.items.map((item) => (
                        <div key={item.id} className="relative h-14 w-14 rounded-lg overflow-hidden border border-sand/20 flex-shrink-0 group-hover:scale-105 transition-transform">
                          <Image 
                            src={item.product.image} 
                            alt={item.product.name} 
                            fill 
                            className="object-cover" 
                          />
                        </div>
                      ))}
                      {order.items.length > 5 && (
                        <div className="h-14 w-14 rounded-lg bg-neutral-50 flex items-center justify-center text-xs font-bold text-muted-foreground border border-dashed border-sand/40">
                          +{order.items.length - 5}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Más secciones... */}
        </div>
      </div>
    </div>
  );
}
