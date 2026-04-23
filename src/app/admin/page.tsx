export const dynamic = 'force-dynamic';
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Users, Package, Euro } from "lucide-react";

export default async function AdminDashboard() {
  // Estadísticas rápidas
  const [totalOrders, totalUsers, totalProducts, orders] = await Promise.all([
    prisma.order.count(),
    prisma.user.count(),
    prisma.product.count(),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { user: true },
    }),
  ]);

  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);

  const stats = [
    { title: "Ingresos Totales", value: `${totalRevenue.toFixed(2)}€`, icon: Euro, color: "text-emerald-600" },
    { title: "Pedidos", value: totalOrders, icon: ShoppingBag, color: "text-blue-600" },
    { title: "Usuarios", value: totalUsers, icon: Users, color: "text-orange-600" },
    { title: "Productos", value: totalProducts, icon: Package, color: "text-purple-600" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-serif font-bold text-primary">Resumen</h1>
        <p className="text-muted-foreground italic">Estado actual de El Hilo Enredado</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-neutral-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pedidos Recientes */}
        <Card className="border-neutral-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-serif">Pedidos Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.length === 0 ? (
                <p className="text-sm text-muted-foreground italic">Todavía no hay pedidos...</p>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-cream/30 rounded-lg border border-sand/10">
                    <div>
                      <p className="text-sm font-bold text-primary">#{order.id.slice(-6).toUpperCase()}</p>
                      <p className="text-xs text-muted-foreground">{order.user.name || order.user.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-accent">{order.total.toFixed(2)}€</p>
                      <span className="text-[10px] px-2 py-0.5 bg-sage/20 text-sage font-bold rounded-full uppercase">
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Acciones Rápidas */}
        <Card className="border-neutral-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-serif">Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <button className="p-4 border border-sand/30 rounded-xl hover:bg-cream transition-colors text-left space-y-1">
               <p className="text-sm font-bold text-primary">Nuevo Producto</p>
               <p className="text-[10px] text-muted-foreground">Añadir al catálogo</p>
             </button>
             <button className="p-4 border border-sand/30 rounded-xl hover:bg-cream transition-colors text-left space-y-1">
               <p className="text-sm font-bold text-primary">Gestionar Stock</p>
               <p className="text-[10px] text-muted-foreground">Control de unidades</p>
             </button>
             <button className="p-4 border border-sand/30 rounded-xl hover:bg-cream transition-colors text-left space-y-1">
               <p className="text-sm font-bold text-primary">Ver Pedidos</p>
               <p className="text-[10px] text-muted-foreground">Pendientes de preparar</p>
             </button>
             <button className="p-4 border border-sand/30 rounded-xl hover:bg-cream transition-colors text-left space-y-1">
               <p className="text-sm font-bold text-primary">Categorías</p>
               <p className="text-[10px] text-muted-foreground">Editar clasificación</p>
             </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
