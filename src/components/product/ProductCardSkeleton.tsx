import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface ProductCardSkeletonProps {
  className?: string;
}

export const ProductCardSkeleton = ({ className }: ProductCardSkeletonProps) => {
  return (
    <Card className={cn(
      "overflow-hidden shadow-sm bg-white flex flex-col border-sand/20",
      className
    )}>
      {/* Aspect Ratio 4/3 Skeleton for Image */}
      <div className="relative aspect-[4/3] w-full bg-neutral-100">
        <Skeleton className="h-full w-full" />
      </div>
      
      <CardContent className="p-4 flex flex-col flex-grow space-y-3">
        {/* Title Skeleton */}
        <Skeleton className="h-6 w-3/4 rounded-md" />
        
        {/* Category Skeleton */}
        <Skeleton className="h-3 w-1/4 rounded-full" />
        
        {/* Price Skeleton */}
        <Skeleton className="h-7 w-1/3 rounded-md mt-1" />
      </CardContent>

      <CardFooter className="p-4 pt-0 mt-auto">
        {/* Button Skeleton */}
        <Skeleton className="h-10 w-full rounded-lg" />
      </CardFooter>
    </Card>
  );
};
