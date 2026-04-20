import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const Hero = () => {
  return (
    <section className="bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-4">
          Arte Hecho a Mano, Con Amor
        </h1>
        <p className="text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto mb-8">
          Descubre piezas únicas de amigurumi, macramé y más, creadas para dar un toque especial a tu vida.
        </p>
        <Link href="#gallery">
          <Button>
            Explorar Colección
          </Button>
        </Link>
      </div>
    </section>
  );
};
