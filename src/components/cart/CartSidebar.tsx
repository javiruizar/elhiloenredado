"use client";

import { useEffect, useState, useCallback } from "react";
import { useCartStore } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Minus, Loader2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export const CartSidebar = () => {
  const { isOpen, toggleCart, items, setItems } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const router = useRouter();

  const fetchCart = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/cart");
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  }, [setItems]);

  useEffect(() => {
    if (isOpen) {
      fetchCart();
    }
  }, [isOpen, fetchCart]);

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    setUpdatingId(itemId);
    try {
      const res = await fetch("/api/cart", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId, quantity: newQuantity }),
      });
      if (res.ok) {
        await fetchCart();
      } else {
        toast.error("Error", { description: "No se pudo actualizar la cantidad." });
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Error", { description: "Hubo un problema al actualizar." });
    } finally {
      setUpdatingId(null);
    }
  };

  const removeItem = async (itemId: string) => {
    setUpdatingId(itemId);
    try {
      const res = await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId }),
      });
      if (res.ok) {
        await fetchCart();
        toast.info("Artículo eliminado", { description: "El artículo ha sido retirado de tu cesta." });
      } else {
        toast.error("Error", { description: "No se pudo eliminar el artículo." });
      }
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Error", { description: "Hubo un problema al eliminar el artículo." });
    } finally {
      setUpdatingId(null);
    }
  };

  const total = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  const handleCheckout = () => {
    toggleCart();
    router.push("/checkout");
  };

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-full sm:max-w-md flex flex-col bg-cream border-l border-sand/30 shadow-2xl">
        <SheetHeader className="pb-6">
          <SheetTitle className="text-3xl font-serif font-bold text-primary tracking-tight">
            Tu Cesta
          </SheetTitle>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
            {items.length} {items.length === 1 ? 'artículo' : 'artículos'} seleccionados
          </p>
        </SheetHeader>
        
        <Separator className="bg-sand/20" />

        <div className="flex-1 overflow-y-auto py-6 space-y-6 custom-scrollbar">
          {loading && items.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-40 space-y-4">
              <Loader2 className="h-8 w-8 text-accent animate-spin" />
              <p className="text-muted-foreground italic">Preparando tus hilos...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6 px-4">
              <div className="w-20 h-20 bg-sand/10 rounded-full flex items-center justify-center">
                 <Trash2 className="h-10 w-10 text-sand/40" />
              </div>
              <div>
                <p className="text-lg font-medium text-primary mb-2">Tu cesta está vacía</p>
                <p className="text-sm text-muted-foreground italic">Todavía no has añadido nada al hilo...</p>
              </div>
              <Button 
                variant="outline" 
                className="rounded-full px-8 border-sand text-primary hover:bg-sand/10"
                onClick={toggleCart}
              >
                Seguir comprando
              </Button>
            </div>
          ) : (
            <div className="space-y-6 pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 group animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="relative h-20 w-20 flex-shrink-0 rounded-xl overflow-hidden border border-sand/20 bg-white shadow-sm">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                    {updatingId === item.id && (
                      <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                        <Loader2 className="h-5 w-5 text-accent animate-spin" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-bold text-primary line-clamp-1 group-hover:text-accent transition-colors">
                          {item.product.name}
                        </h4>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-red-500 transition-colors ml-2"
                          disabled={updatingId === item.id}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      
                      {item.customization && (
                        <p className="text-[10px] text-sage italic mt-1 line-clamp-1 bg-sage/5 px-2 py-0.5 rounded-full w-fit">
                          &quot;{item.customization}&quot;
                        </p>
                      )}
                    </div>

                    <div className="flex justify-between items-end mt-2">
                      <div className="flex items-center border border-sand/30 rounded-lg bg-white overflow-hidden">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-sand/10 disabled:opacity-30"
                          disabled={updatingId === item.id || item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-medium">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-sand/10 disabled:opacity-30"
                          disabled={updatingId === item.id}
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <p className="font-bold text-accent">
                        {(item.product.price * item.quantity).toFixed(2)}€
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="border-t border-sand/20 pt-6 flex-col sm:flex-col space-y-4 bg-cream">
            <div className="space-y-2 w-full">
              <div className="flex justify-between w-full text-sm text-muted-foreground">
                <span>Subtotal</span>
                <span>{total.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between w-full text-xl font-bold text-primary">
                <span>Total estimado</span>
                <span className="text-accent">{total.toFixed(2)}€</span>
              </div>
            </div>
            
            <Button 
              className="w-full py-6 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-lg shadow-primary/10 transition-all hover:translate-y-[-2px] active:translate-y-[0px]" 
              onClick={handleCheckout}
            >
              Finalizar Pedido
            </Button>
            
            <p className="text-[9px] text-center text-muted-foreground uppercase tracking-[0.2em] font-medium py-2">
              Hecho con cariño &middot; El Hilo Enredado
            </p>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
