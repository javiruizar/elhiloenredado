"use client";

import React, { useState } from "react";
import { AddToCartButton } from "@/components/cart/AddToCartButton";

interface ProductPurchaseActionsProps {
  productId: string;
  stock: number;
}

export const ProductPurchaseActions = ({ productId, stock }: ProductPurchaseActionsProps) => {
  const [customization, setCustomization] = useState("");

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <label 
          htmlFor="customization" 
          className="text-sm font-medium text-foreground"
        >
          Personalización (opcional)
        </label>
        <textarea
          id="customization"
          placeholder="Escribe el nombre, inicial o mensaje que quieras añadir..."
          className="w-full min-h-[100px] p-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          value={customization}
          onChange={(e) => setCustomization(e.target.value)}
        />
        <p className="text-xs text-muted-foreground">
          Ejemplo: &quot;Nombre: Sofía&quot;, &quot;Inicial: M&quot;, &quot;Mensaje: Con cariño&quot;.
        </p>
      </div>

      <div className="pt-4 border-t border-border">
        <div className="flex items-center gap-4 mb-6">
          <span className="text-sm font-medium text-foreground">
            Estado: {stock > 0 ? (
              <span className="text-green-600 font-semibold">En stock ({stock} disponibles)</span>
            ) : (
              <span className="text-red-500 font-semibold">Agotado</span>
            )}
          </span>
        </div>
        
        <AddToCartButton 
          productId={productId} 
          disabled={stock === 0}
          customization={customization}
        />
      </div>
    </div>
  );
};
