"use client";

import { SessionProvider } from "next-auth/react";
import { CartUpdater } from "@/components/cart/CartUpdater";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartUpdater />
      {children}
    </SessionProvider>
  );
}
