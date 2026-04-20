import React from 'react';
import { Instagram } from 'lucide-react';
import Link from 'next/link';

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-secondary text-secondary-foreground py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between">
        <p className="text-sm mb-4 sm:mb-0">
          &copy; {year} El Hilo Enredado. Todos los derechos reservados.
        </p>
        <div className="flex items-center space-x-4">
          <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
            <Instagram size={24} />
          </Link>
        </div>
      </div>
    </footer>
  );
};
