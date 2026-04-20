"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { User, LogOut, ChevronDown, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

interface UserNavProps {
  session: Session | null;
}

export const UserNav = ({ session }: UserNavProps) => {
  if (!session) {
    return (
      <Link href="/login">
        <Button 
          size="sm" 
          className="rounded-full shadow-md transition-all hover:scale-105"
        >
          Iniciar Sesión
        </Button>
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2 group relative">
      <Button 
        variant="ghost" 
        size="sm" 
        className="flex items-center gap-2 px-3 h-10 rounded-full hover:bg-sand/20 border border-transparent transition-all"
      >
        <div className="h-7 w-7 rounded-full bg-sand/30 flex items-center justify-center overflow-hidden border border-sand/50 relative">
          {session.user?.image ? (
            <Image 
              src={session.user.image} 
              alt={session.user.name || "User"} 
              fill
              className="object-cover" 
            />
          ) : (
            <User className="h-4 w-4 text-primary" />
          )}
        </div>
        <span className="hidden lg:inline-block text-xs font-bold text-primary uppercase tracking-wider">
          {session.user?.name?.split(' ')[0] || session.user?.email?.split('@')[0]}
        </span>
        <ChevronDown className="h-3 w-3 text-primary opacity-50 group-hover:rotate-180 transition-transform" />
      </Button>

      {/* Modern dropdown menu */}
      <div className="absolute right-0 top-[calc(100%+8px)] w-56 overflow-hidden rounded-2xl border border-sand/30 bg-white shadow-xl opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50">
        <div className="p-2 space-y-1">
          <div className="px-3 py-3 mb-2 rounded-xl bg-cream/30 border border-sand/10">
            <p className="text-xs font-bold text-primary truncate uppercase tracking-tighter">
              {session.user?.name || "Usuario"}
            </p>
            <p className="text-[10px] text-muted-foreground truncate italic">
              {session.user?.email}
            </p>
          </div>
          
          <Link 
            href="/profile" 
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-sand/10 hover:text-primary transition-all"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sand/10">
              <UserCircle className="h-4 w-4 text-sage" />
            </div>
            Mi Perfil
          </Link>
          
          <button 
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-all"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50">
              <LogOut className="h-4 w-4" />
            </div>
            Cerrar sesión
          </button>
        </div>
        <div className="bg-sage/5 py-2 px-3 text-center border-t border-sand/10">
          <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold">
            El Hilo Enredado
          </p>
        </div>
      </div>
    </div>
  );
};
