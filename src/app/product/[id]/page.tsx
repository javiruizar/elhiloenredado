import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ProductPurchaseActions } from "@/components/product/ProductPurchaseActions";
import type { Metadata, ResolvingMetadata } from "next";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata(
  { params }: ProductPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    return {
      title: "Producto no encontrado",
      description: "El producto que buscas no existe en nuestra tienda.",
    };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | El Hilo Enredado`,
      description: product.description,
      url: `https://elhiloenredado.com/product/${product.id}`,
      images: [
        {
          url: product.image,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Esperar la resolución de los parámetros de la URL
  const { id } = await params;

  // Consulta a la base de datos
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        {/* Columna de la imagen */}
        <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-secondary shadow-md border border-border/50">
          <Image
            src={product.image}
            alt={`Imagen de ${product.name}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Columna de detalles */}
        <div className="flex flex-col justify-start py-4">
          <div className="mb-8">
            <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-2 px-3 py-1 bg-accent/10 w-fit rounded-full">
              {product.category.name}
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-4 leading-tight">
              {product.name}
            </h1>
            <p className="text-3xl font-bold text-foreground">
              {product.price.toFixed(2)}€
            </p>
          </div>
          
          <div className="prose prose-sm sm:prose-base text-foreground/70 mb-10 max-w-none">
            <p className="whitespace-pre-wrap leading-relaxed">{product.description}</p>
          </div>
          
          <ProductPurchaseActions 
            productId={product.id} 
            stock={product.stock} 
          />
        </div>
      </div>
    </div>
  );
}
