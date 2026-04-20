"use client";
import { useCartStore } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export const CartButton = () => {
  const toggleCart = useCartStore((state) => state.toggleCart);
  const items = useCartStore((state) => state.items);
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Button 
      variant="ghost" 
      size="icon-sm" 
      onClick={toggleCart}
      className="relative h-10 w-10 rounded-full hover:bg-sand/20 transition-all active:scale-90"
    >
      <ShoppingCart className="h-5 w-5 text-primary" />
      {itemCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white shadow-sm animate-in zoom-in duration-300">
          {itemCount}
        </span>
      )}
      <span className="sr-only">Carrito de compras</span>
    </Button>
  );
};
