"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import { CartItem } from "./CartContext";
import { SABORES } from "@/lib/data";

function getSaborColor(nombre: string): string {
  return SABORES.find(s => s.nombre === nombre)?.color ?? "#128708";
}

export default function CartPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { cart, addToCart, removeFromCart, clearCart, total } = useCart();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleCheckout = () => {
    onClose();
    router.push("/checkout");
  };

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-[#1f3460]/50 z-40 transition-opacity duration-200 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      <div
        className={`fixed top-20 right-0 w-80 max-h-[80vh] bg-white z-50 shadow-xl rounded-bl-2xl transition-transform duration-300 ease-out flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-bold text-[#1f3460]">Carrito</h2>
          <button onClick={onClose} aria-label="Cerrar carrito" className="text-gray-400 hover:text-gray-600 active:scale-[0.9] transition-[color,transform] duration-150">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {(!mounted || cart.length === 0) && (
            <p className="text-gray-400 text-sm text-center mt-8">Tu carrito está vacío</p>
          )}
          {mounted && cart.map((item: CartItem) => {
            const saborColor = getSaborColor(item.nombre);
            return (
              <div key={item.nombre} className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-sm" style={{ color: saborColor }}>{item.nombre}</p>
                  <p className="text-xs text-gray-500">
                    ${item.precio.toLocaleString("es-CL")} x {item.cantidad}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => removeFromCart(item.nombre)} style={{ backgroundColor: saborColor }} className="w-7 h-7 rounded-full text-white flex items-center justify-center text-base font-bold hover:opacity-80 active:scale-[0.92] transition-[opacity,transform] duration-150">−</button>
                  <span className="text-sm font-bold w-4 text-center" style={{ color: saborColor }}>{item.cantidad}</span>
                  <button onClick={() => addToCart(item)} style={{ backgroundColor: saborColor }} className="w-7 h-7 rounded-full text-white flex items-center justify-center text-base font-bold hover:opacity-80 active:scale-[0.92] transition-[opacity,transform] duration-150">+</button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t space-y-3">
          {mounted && cart.length > 0 && (
            <button onClick={clearCart} className="w-full text-sm text-gray-400 hover:text-red-500 transition-colors duration-150">
              Vaciar carrito
            </button>
          )}
          <p className="font-bold text-[#1f3460]">
            Total: ${mounted ? total.toLocaleString("es-CL") : "0"}
          </p>
          <button
            onClick={handleCheckout}
            disabled={!mounted || cart.length === 0}
            className="w-full bg-[#1f3460] text-white py-2 rounded-full hover:opacity-90 active:scale-[0.98] transition-[opacity,transform] duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Ir a pagar
          </button>
        </div>
      </div>
    </>
  );
}
