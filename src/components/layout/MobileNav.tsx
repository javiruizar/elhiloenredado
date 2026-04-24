"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, User, LogOut, Home, ShoppingBag, Info, UserCircle } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { Separator } from "@/components/ui/separator";

interface MobileNavProps {
  session: Session | null;
}

const navLinks = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/products", label: "Productos", icon: ShoppingBag },
  { href: "/about", label: "Sobre Mí", icon: Info },
];

export const MobileNav = ({ session }: MobileNavProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden flex items-center">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger 
          render={
            <Button variant="ghost" size="icon-sm" className="hover:bg-sand/20 rounded-full h-10 w-10">
              <Menu className="h-6 w-6 text-primary" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          }
        />
        <SheetContent side="left" className="w-[85%] sm:max-w-sm bg-cream border-r border-sand/30 p-0 flex flex-col">
          <SheetHeader className="p-6 border-b border-sand/20 bg-white/50">
            <SheetTitle className="text-left">
              <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
                <div className="relative flex h-12 w-12 items-center justify-center">
                  {/* Cuadro original con la H (Comentado para futura referencia)
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sage text-primary shadow-sm">
                    <span className="font-serif text-sm">H</span>
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
                <span className="text-xl font-bold text-primary tracking-tighter">
                  El Hilo <span className="text-sage italic font-serif">Enredado</span>
                </span>
              </Link>
            </SheetTitle>
          </SheetHeader>
          
          <nav className="flex-1 px-4 py-8 overflow-y-auto">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-4 px-4 py-3.5 rounded-2xl text-lg font-semibold text-foreground/80 hover:bg-white hover:text-primary transition-all active:scale-95 border border-transparent hover:border-sand/20"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sand/10 text-sage">
                      <Icon className="h-5 w-5" />
                    </div>
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </nav>
          
          <div className="p-6 mt-auto bg-white/50 border-t border-sand/20">
            {session ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 px-2">
                  <div className="h-10 w-10 rounded-full bg-sand/30 flex items-center justify-center border border-sand/50">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-bold text-primary truncate">
                      {session.user?.name || "Usuario"}
                    </span>
                    <span className="text-[10px] text-muted-foreground truncate italic">
                      {session.user?.email}
                    </span>
                  </div>
                </div>
                
                <Separator className="bg-sand/20" />
                
                <div className="grid grid-cols-1 gap-2">
                  <Link 
                    href="/profile" 
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-sand/20 text-sm font-bold text-foreground/80 hover:bg-sand/10 hover:text-primary transition-all"
                  >
                    <UserCircle className="h-4 w-4 text-sage" />
                    Mi Perfil
                  </Link>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-3 h-12 rounded-xl border-red-100 text-red-500 hover:bg-red-50 hover:text-red-600 font-bold"
                    onClick={() => {
                      setOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    Cerrar sesión
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-center">
                <p className="text-sm text-muted-foreground italic px-4">
                  Únete a nuestra comunidad de artesanía
                </p>
                <Link href="/login" onClick={() => setOpen(false)}>
                  <Button className="w-full h-14 rounded-2xl shadow-lg text-lg font-bold transition-all active:scale-95">
                    Iniciar Sesión
                  </Button>
                </Link>
              </div>
            )}
            
            <p className="mt-8 text-center text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">
              El Hilo Enredado &middot; 2026
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
