import { prisma } from "@/lib/prisma";
import { Button, buttonVariants } from "@/components/ui/button";
import { Plus, Edit, Trash2, Package } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { DeleteProductButton } from "@/components/admin/DeleteProductButton";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary">Productos</h1>
          <p className="text-muted-foreground italic">Gestiona el catálogo de tus manualidades</p>
        </div>
        <Link href="/admin/products/new" className={buttonVariants({ className: "bg-sage hover:bg-sage/90 text-primary-foreground rounded-xl" })}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Producto
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Producto</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Categoría</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Precio</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Stock</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Visible</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground italic">
                    No hay productos en el catálogo aún. ¡Empieza creando uno!
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-cream/20 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg overflow-hidden border border-sand/20 bg-neutral-50 relative flex-shrink-0">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-primary group-hover:text-accent transition-colors">
                            {product.name}
                          </p>
                          <p className="text-[10px] text-muted-foreground line-clamp-1 max-w-[200px]">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-medium px-2 py-1 bg-sand/10 text-primary rounded-full">
                        {product.category.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-accent text-sm">
                      {product.price.toFixed(2)}€
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${product.stock > 0 ? 'bg-sage' : 'bg-red-400'}`} />
                        <span className="text-sm font-medium">{product.stock} uds.</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${product.showInGallery ? 'bg-emerald-100 text-emerald-700' : 'bg-neutral-100 text-neutral-500'}`}>
                        {product.showInGallery ? 'En Galería' : 'Oculto'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/products/${product.id}`} className={buttonVariants({ variant: "ghost", size: "icon", className: "hover:text-blue-600 hover:bg-blue-50" })}>
                          <Edit className="h-4 w-4" />
                        </Link>
                        <DeleteProductButton productId={product.id} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
