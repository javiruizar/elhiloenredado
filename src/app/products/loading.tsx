import { ProductCardSkeleton } from "@/components/product/ProductCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsLoading() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 max-w-7xl">
      <div className="flex flex-col gap-8 animate-in fade-in duration-500">
        {/* Cabecera y Buscador Skeleton */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 w-full md:w-1/2">
            <Skeleton className="h-10 w-3/4 rounded-lg" />
            <Skeleton className="h-4 w-full rounded-md" />
          </div>
          
          <div className="flex flex-col items-start md:items-end gap-3 w-full md:w-auto">
            <Skeleton className="h-10 w-full md:w-64 rounded-full" />
            <Skeleton className="h-3 w-24 rounded-md" />
          </div>
        </div>

        {/* Filtros Skeleton */}
        <div className="flex flex-wrap gap-2 border-y py-6 border-sand/10">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-10 w-24 rounded-full" />
          ))}
        </div>

        {/* Grid de Productos Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
