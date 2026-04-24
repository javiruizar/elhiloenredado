import React from 'react';
import { Instagram } from 'lucide-react';
import Link from 'next/link';

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-secondary text-secondary-foreground py-10 border-t border-sand/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm font-medium">
              &copy; {year} El Hilo Enredado.
            </p>
            <p className="text-xs text-muted-foreground mt-1 font-serif italic">
              Hecho a mano con amor
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold uppercase tracking-wider">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacidad
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Condiciones
            </Link>
            <Link href="/about" className="hover:text-primary transition-colors">
              Sobre Mí
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-sand/20 hover:bg-sand/40 text-primary transition-all">
              <Instagram size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
