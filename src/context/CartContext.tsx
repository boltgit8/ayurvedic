import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { CartItem } from '@/types';
import { calculateCartSummary, type CartSummary } from '@/utils/offerEngine';

interface CartContextValue {
  items: CartItem[];
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string, isFreeItem?: boolean) => void;
  updateQuantity: (productId: string, quantity: number, isFreeItem?: boolean) => void;
  addFreeItem: (freeProductId: string, qualifyingProductId: string) => void;
  removeFreeItem: (freeProductId: string) => void;
  clearCart: () => void;
  summary: CartSummary;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'gaps-magic-cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const addItem = useCallback((productId: string, quantity: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId && !i.isFreeItem);
      if (existing) {
        return prev.map((i) =>
          i.productId === productId && !i.isFreeItem
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { productId, quantity, isFreeItem: false }];
    });
  }, []);

  const removeItem = useCallback((productId: string, isFreeItem: boolean = false) => {
    setItems((prev) => {
      if (isFreeItem) {
        return prev.filter((i) => !(i.productId === productId && i.isFreeItem));
      }
      const updated = prev.filter((i) => !(i.productId === productId && !i.isFreeItem));
      return updated.filter((i) => !(i.isFreeItem && i.freeItemFor === productId));
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number, isFreeItem: boolean = false) => {
    if (quantity <= 0) {
      removeItem(productId, isFreeItem);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId && i.isFreeItem === isFreeItem
          ? { ...i, quantity }
          : i
      )
    );
  }, [removeItem]);

  const addFreeItem = useCallback((freeProductId: string, qualifyingProductId: string) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.productId === freeProductId && i.isFreeItem && i.freeItemFor === qualifyingProductId
      );
      if (existing) {
        return prev.map((i) =>
          i.productId === freeProductId && i.isFreeItem && i.freeItemFor === qualifyingProductId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { productId: freeProductId, quantity: 1, isFreeItem: true, freeItemFor: qualifyingProductId }];
    });
  }, []);

  const removeFreeItem = useCallback((freeProductId: string) => {
    setItems((prev) => prev.filter((i) => !(i.productId === freeProductId && i.isFreeItem)));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const summary = calculateCartSummary(items);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, addFreeItem, removeFreeItem, clearCart, summary, itemCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
