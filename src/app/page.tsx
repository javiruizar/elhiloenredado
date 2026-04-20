import { Hero } from "@/components/sections/Hero";
import { ProductGallery } from "@/components/sections/ProductGallery";
import { About } from "@/components/sections/About";
import { InstagramCTA } from "@/components/sections/InstagramCTA";
import { Suspense } from "react";
import { ProductCardSkeleton } from "@/components/product/ProductCardSkeleton";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Suspense fallback={<ProductGalleryLoading />}>
        <ProductGallery />
      </Suspense>
      <About />
      <InstagramCTA />
    </>
  );
}

function ProductGalleryLoading() {
  return (
    <section id="gallery" className="py-16 sm:py-24 animate-in fade-in duration-500">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-primary mb-12 opacity-50">
          Nuestras Creaciones
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
