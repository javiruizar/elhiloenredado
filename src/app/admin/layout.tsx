import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, ShoppingCart, Package, Users, Settings, Home } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Verificación de rol ADMIN
  if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") {
    redirect("/");
  }

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Pedidos", href: "/admin/orders", icon: ShoppingCart },
    { label: "Productos", href: "/admin/products", icon: Package },
    { label: "Usuarios", href: "/admin/users", icon: Users },
    { label: "Configuración", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-neutral-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-neutral-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-neutral-200">
          <Link href="/" className="flex items-center gap-2 font-serif text-primary text-xl font-bold">
             El Hilo Enredado
          </Link>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1 font-medium">Panel de Control</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:text-primary hover:bg-cream rounded-lg transition-all"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-neutral-200">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:text-primary hover:bg-cream rounded-lg transition-all"
          >
            <Home className="h-4 w-4" />
            Volver a la tienda
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-8">
          <h2 className="text-lg font-semibold text-primary">Administración</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground italic">Hola, {session.user.name}</span>
            <div className="h-8 w-8 rounded-full bg-sage flex items-center justify-center text-primary font-bold text-xs">
              {session.user.name?.[0]}
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
