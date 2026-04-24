import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { auth } from '@/auth';
import { CartButton } from '@/components/cart/CartButton';
import { MobileNav } from './MobileNav';
import { UserNav } from './UserNav';

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/products", label: "Productos" },
  { href: "/about", label: "Sobre Mí" },
];

export const Navbar = async () => {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-sand/30 bg-white/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        
        {/* Mobile Navigation (Visible only on mobile) */}
        <div className="md:hidden">
          <MobileNav session={session} />
        </div>

        {/* Logo - Centered on mobile if needed, but here kept on one side */}
        <div className="flex items-center">
          <Link 
            href="/" 
            className="group flex items-center gap-2 text-2xl font-bold tracking-tighter text-primary transition-all hover:opacity-90"
          >
            <div className="relative flex h-16 w-16 items-center justify-center transition-transform duration-300 group-hover:rotate-180 group-hover:scale-110">
              {/* Cuadro original con la H (Comentado para futura referencia)
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sage text-primary shadow-lg">
                <span className="font-serif text-xl">H</span>
              </div>
              */}
              <Image 
                src="/elhiloenredado_icon.png" 
                alt="Logo El Hilo Enredado"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="hidden sm:inline-block">
              El Hilo <span className="text-sage italic font-serif">Enredado</span>
            </span>
            <span className="sm:hidden text-lg">EH<span className="text-sage italic font-serif">E</span></span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-sm font-semibold text-foreground/70 transition-all hover:text-primary group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-sage transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>
        
        {/* Actions (Cart & User) */}
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="transition-transform hover:scale-110">
            <CartButton />
          </div>
          
          <div className="hidden sm:block border-l border-sand/40 pl-6 h-8 flex items-center">
             <UserNav session={session} />
          </div>
        </div>
      </div>
    </header>
  );
};
