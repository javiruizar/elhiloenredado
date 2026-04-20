"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cart";
import { useSession } from "next-auth/react";

export const CartUpdater = () => {
  const { data: session } = useSession();
  const setItems = useCartStore((state) => state.setItems);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("/api/cart");
        if (res.ok) {
          const data = await res.json();
          setItems(data.items || []);
        }
      } catch (error) {
        console.error("Error fetching cart for store sync:", error);
      }
    };

    if (session?.user) {
      fetchCart();
    } else {
      setItems([]);
    }
  }, [session, setItems]);

  return null;
};
