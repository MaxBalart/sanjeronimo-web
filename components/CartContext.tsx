"use client";
import { createContext, useContext, useState } from "react";

export type Product = {
  nombre: string;
  precio: number;
};

export type CartItem = Product & {
  cantidad: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product, cantidad?: number) => void;
  removeFromCart: (nombre: string) => void;
  clearCart: () => void;
  total: number;
};

const CartContext = createContext<CartContextType | null>(null);

function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("sj_cart");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCart(cart: CartItem[]) {
  try {
    localStorage.setItem("sj_cart", JSON.stringify(cart));
  } catch {}
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  // Sin useEffect — lazy init lee localStorage directamente en el cliente
  const [cart, setCart] = useState<CartItem[]>(readCart);

  const addToCart = (product: Product, cantidad = 1) => {
    setCart((prev) => {
      const next = prev.find((p) => p.nombre === product.nombre)
        ? prev.map((p) =>
            p.nombre === product.nombre
              ? { ...p, cantidad: p.cantidad + cantidad }
              : p
          )
        : [...prev, { ...product, cantidad }];
      saveCart(next);
      return next;
    });
  };

  const removeFromCart = (nombre: string) => {
    setCart((prev) => {
      const next = prev
        .map((p) => (p.nombre === nombre ? { ...p, cantidad: p.cantidad - 1 } : p))
        .filter((p) => p.cantidad > 0);
      saveCart(next);
      return next;
    });
  };

  const clearCart = () => {
    setCart([]);
    saveCart([]);
  };

  const total = cart.reduce((acc, i) => acc + i.precio * i.cantidad, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}
