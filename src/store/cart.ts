import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  quantity: number;
  customization?: string;
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
}

interface CartStore {
  isOpen: boolean;
  items: CartItem[];
  toggleCart: () => void;
  setItems: (items: CartItem[]) => void;
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      isOpen: false,
      items: [],
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      setItems: (items) => set({ items }),
      addItem: (newItem) => set((state) => {
        const existingItem = state.items.find(
          (item) => item.product.id === newItem.product.id && item.customization === newItem.customization
        );
        if (existingItem) {
          return {
            items: state.items.map((item) =>
              item.id === existingItem.id
                ? { ...item, quantity: item.quantity + newItem.quantity }
                : item
            ),
          };
        }
        return { items: [...state.items, newItem] };
      }),
      removeItem: (itemId) => set((state) => ({
        items: state.items.filter((item) => item.id !== itemId),
      })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items }), // Solo persistimos los items del carrito
    }
  )
);
