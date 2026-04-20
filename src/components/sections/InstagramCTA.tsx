import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Instagram } from 'lucide-react';

export const InstagramCTA = () => {
  return (
    <section id="contact" className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-primary mb-4">
          Síguenos en Instagram
        </h2>
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-8">
          No te pierdas las últimas creaciones, detrás de cámaras y ofertas especiales.
        </p>
        <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <Button>
            <Instagram className="mr-2 h-4 w-4" />
            @elhiloenredado
          </Button>
        </Link>
      </div>
    </section>
  );
};
