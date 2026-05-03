"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import { CartItem } from "./CartContext";

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

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCheckout = () => {
    onClose();
    router.push("/checkout");
  };

  return (
    <>
      {open && (
        <div onClick={onClose} className="fixed inset-0 bg-black/40 z-40" />
      )}

      <div
        className={`fixed top-16 right-0 w-80 max-h-[80vh] bg-white z-50 shadow-xl rounded-bl-2xl transition-transform duration-300 flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-bold text-[#162B45]">Carrito</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">✕</button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {(!mounted || cart.length === 0) && (
            <p className="text-gray-400 text-sm text-center mt-8">Tu carrito está vacío</p>
          )}

          {mounted && cart.map((item: CartItem) => (
            <div key={item.nombre} className="flex justify-between items-center">
              <div>
                <p className="font-medium text-[#162B45] text-sm">{item.nombre}</p>
                <p className="text-xs text-gray-500">
                  ${item.precio.toLocaleString("es-CL")} x {item.cantidad}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => removeFromCart(item.nombre)}
                  className="w-7 h-7 rounded-full bg-[#128708] text-white flex items-center justify-center text-base font-bold hover:opacity-80 transition"
                >
                  −
                </button>
                <span className="text-sm font-bold text-[#162B45] w-4 text-center">
                  {item.cantidad}
                </span>
                <button
                  onClick={() => addToCart(item)}
                  className="w-7 h-7 rounded-full bg-[#128708] text-white flex items-center justify-center text-base font-bold hover:opacity-80 transition"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t space-y-3">
          {mounted && cart.length > 0 && (
            <button
              onClick={clearCart}
              className="w-full text-sm text-gray-400 hover:text-red-500 transition"
            >
              Vaciar carrito
            </button>
          )}

          <p className="font-bold text-[#162B45]">
            Total: ${mounted ? total.toLocaleString("es-CL") : "0"}
          </p>

          <button
            onClick={handleCheckout}
            disabled={!mounted || cart.length === 0}
            className="w-full bg-[#162B45] text-white py-2 rounded-full hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Ir a pagar
          </button>
        </div>
      </div>
    </>
  );
}
