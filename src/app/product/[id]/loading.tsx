import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 max-w-6xl animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        {/* Columna de la imagen Skeleton */}
        <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-neutral-100 shadow-md">
          <Skeleton className="h-full w-full" />
        </div>

        {/* Columna de detalles Skeleton */}
        <div className="flex flex-col justify-start py-4 space-y-6">
          <div className="space-y-4">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-12 w-3/4 rounded-lg" />
            <Skeleton className="h-10 w-32 rounded-lg" />
          </div>
          
          <div className="space-y-3">
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-2/3 rounded-md" />
          </div>
          
          <div className="pt-6 space-y-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-24 rounded-lg" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
