export const dynamic = 'force-dynamic';
import React, { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/product/ProductCard";
import Link from "next/link";
import { ProductSearch } from "@/components/product/ProductSearch";
import { Package } from "lucide-react";
import { Prisma } from "@prisma/client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catálogo de Productos",
  description: "Explora nuestra colección completa de artículos hechos a mano. Encuentra el regalo perfecto o ese detalle especial para tu hogar.",
  openGraph: {
    title: "Catálogo | El Hilo Enredado",
    description: "Explora nuestra colección completa de artículos hechos a mano.",
    url: "/products",
    images: [
      {
        url: "/elhiloenredado_logo_medium.png",
        width: 800,
        height: 800,
        alt: "Catálogo El Hilo Enredado",
      },
    ],
  }
};

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category, search } = await searchParams;

  // Obtener categorías para el filtro
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  // Construir la consulta de productos
  const whereClause: Prisma.ProductWhereInput = {};
  if (category) whereClause.categoryId = category;
  if (search) {
    whereClause.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } }
    ];
  }
  
  const products = await prisma.product.findMany({
    where: whereClause,
    include: { category: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 max-w-7xl animate-in fade-in duration-500">
      <div className="flex flex-col gap-8">
        {/* Cabecera y Buscador */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-2">
              Nuestros Productos
            </h1>
            <p className="text-muted-foreground max-w-2xl text-sm sm:text-base">
              Explora nuestra colección de artículos hechos a mano con cariño y atención al detalle.
            </p>
          </div>
          
          <div className="flex flex-col items-start md:items-end gap-3 w-full md:w-auto">
            <Suspense fallback={<div className="h-10 w-full md:w-64 bg-secondary/50 rounded-full animate-pulse" />}>
              <ProductSearch />
            </Suspense>
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {products.length} {products.length === 1 ? 'producto' : 'productos'} encontrados
            </div>
          </div>
        </div>

        {/* Filtros de Categoría */}
        <div className="flex flex-wrap gap-2 border-y py-6 border-sand/10">
          <Link
            href="/products"
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
              !category 
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/10" 
                : "bg-white border border-sand/30 text-primary hover:bg-cream"
            }`}
          >
            Todos
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.id}${search ? `&search=${search}` : ''}`}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                category === cat.id 
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/10" 
                  : "bg-white border border-sand/30 text-primary hover:bg-cream"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Mensaje si no hay productos */}
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
            <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center text-sand">
              <Package className="h-8 w-8" />
            </div>
            <div>
              <p className="text-xl font-medium text-primary mb-1">No encontramos lo que buscas</p>
              <p className="text-muted-foreground italic text-sm">Prueba con otros términos o filtros</p>
            </div>
            <Link 
              href="/products" 
              className="px-6 py-2 bg-primary text-white rounded-full text-sm font-bold shadow-lg shadow-primary/10 hover:bg-primary/90 transition-all"
            >
              Ver todo el catálogo
            </Link>
          </div>
        ) : (
          /* Grid de Productos */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
