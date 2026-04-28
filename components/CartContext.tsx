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
  total: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, cantidad = 1) => {
    setCart((prev) => {
      const existe = prev.find((p) => p.nombre === product.nombre);
      if (existe) {
        return prev.map((p) =>
          p.nombre === product.nombre ? { ...p, cantidad: p.cantidad + cantidad } : p
        );
      }
      return [...prev, { ...product, cantidad }];
    });
  };

  const removeFromCart = (nombre: string) => {
    setCart((prev) =>
      prev
        .map((p) => (p.nombre === nombre ? { ...p, cantidad: p.cantidad - 1 } : p))
        .filter((p) => p.cantidad > 0)
    );
  };

  const total = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}
