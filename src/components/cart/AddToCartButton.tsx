"use client";
import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { VariantProps } from "class-variance-authority";
import { useCartStore } from "@/store/cart";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export const AddToCartButton = ({ 
  productId, 
  disabled, 
  customization,
  size = "lg",
  className = ""
}: { 
  productId: string; 
  disabled: boolean; 
  customization?: string;
  size?: VariantProps<typeof buttonVariants>["size"];
  className?: string;
}) => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const toggleCart = useCartStore((state) => state.toggleCart);
  const setItems = useCartStore((state) => state.setItems);

  const addToCart = async () => {
    if (!session) {
      toast.info("Inicia sesión para añadir al carrito", {
        description: "Tardarás menos de un minuto y nos ayudará a gestionar mejor tu pedido."
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: 1, customization }),
      });

      if (res.ok) {
        // Actualizar el estado global del carrito tras añadir con éxito
        const cartRes = await fetch("/api/cart");
        if (cartRes.ok) {
          const cartData = await cartRes.json();
          setItems(cartData.items || []);
        }
        toast.success("Añadido al carrito", {
          description: "El artículo se ha guardado en tu cesta."
        });
        toggleCart(); // Abre el sidebar tras añadir
      } else {
        toast.error("Vaya, algo ha fallado", {
          description: "No se pudo añadir el artículo. Inténtalo de nuevo."
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Error de conexión", {
        description: "Comprueba tu conexión a internet."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      size={size} 
      className={`w-full ${className}`} 
      onClick={addToCart} 
      disabled={disabled || loading}
    >
      {loading ? "Añadiendo..." : "Añadir al carrito"}
    </Button>
  );
};