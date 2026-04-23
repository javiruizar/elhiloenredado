export const dynamic = 'force-dynamic';
import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/ProductForm";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <Link 
          href="/admin/products" 
          className="flex items-center text-xs text-muted-foreground hover:text-primary transition-colors w-fit"
        >
          <ChevronLeft className="mr-1 h-3 w-3" />
          Volver al listado
        </Link>
        <h1 className="text-3xl font-serif font-bold text-primary">Nuevo Producto</h1>
        <p className="text-muted-foreground italic">Crea una nueva pieza artesanal para tu catálogo</p>
      </div>

      <ProductForm categories={categories} />
    </div>
  );
}
