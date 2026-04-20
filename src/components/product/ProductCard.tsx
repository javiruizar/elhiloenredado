import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product, Category } from '@prisma/client';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { AddToCartButton } from '@/components/cart/AddToCartButton';

interface ProductWithCategory extends Product {
  category: Category;
}

interface ProductCardProps {
  product: ProductWithCategory;
  className?: string;
}

export const ProductCard = ({ product, className }: ProductCardProps) => {
  return (
    <Card className={cn(
      "overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white flex flex-col border-sand/20",
      className
    )}>
      <Link href={`/product/${product.id}`} className="relative aspect-[4/3] w-full block overflow-hidden bg-cream/10">
        <Image
          src={product.image}
          alt={`Imagen de ${product.name}`}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          priority={false}
        />
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              Agotado
            </span>
          </div>
        )}
      </Link>
      
      <CardContent className="p-4 flex flex-col flex-grow">
        <Link href={`/product/${product.id}`} className="group">
          <h3 className="font-bold text-lg text-primary group-hover:text-accent transition-colors">{product.name}</h3>
        </Link>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mt-1 mb-2">
          {product.category.name}
        </p>
        <p className="text-xl font-bold text-foreground">{product.price.toFixed(2)}€</p>
      </CardContent>

      <CardFooter className="p-4 pt-0 mt-auto">
        <AddToCartButton 
          productId={product.id} 
          disabled={product.stock === 0} 
          size="default"
          className="rounded-lg h-10"
        />
      </CardFooter>
    </Card>
  );
};