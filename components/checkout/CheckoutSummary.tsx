"use client";

import { useCart } from "@/components/CartContext";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { SABORES } from "@/lib/data";

export default function CheckoutSummary({ loading }: { loading: boolean }) {
  const { cart, total } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-28">
        <h2 className="text-lg font-bold text-[#162B45] mb-6">Resumen del pedido</h2>
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-gray-100 rounded-lg"></div>
          <div className="h-12 bg-gray-100 rounded-lg"></div>
          <div className="h-6 bg-gray-100 rounded w-1/2 ml-auto"></div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-28 text-center">
        <h2 className="text-lg font-bold text-[#162B45] mb-4">Resumen del pedido</h2>
        <p className="text-gray-500 mb-4">Tu carrito está vacío.</p>
        <Link href="/#sabores" className="text-[#128708] font-semibold hover:underline">
          Ver sabores →
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-28">
      <h2 className="text-lg font-bold text-[#162B45] mb-6">Resumen del pedido</h2>

      <div className="space-y-4 mb-6">
        {cart.map((item) => (
          <div key={item.nombre} className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-[#FAF3DE] rounded-lg flex items-center justify-center p-1">
                  <Image src={SABORES.find(s => s.nombre === item.nombre)?.imagen ?? "/Botella.png"} alt={item.nombre} width={40} height={40} className="object-contain h-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.12)]" />
                </div>
                <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                  {item.cantidad}
                </span>
              </div>
              <span className="font-medium text-gray-700">{item.nombre}</span>
            </div>
            <span className="font-semibold text-[#162B45]">
              ${(item.precio * item.cantidad).toLocaleString("es-CL")}
            </span>
          </div>
        ))}
      </div>

      <div className="space-y-3 pt-4 border-t border-gray-100 text-sm">
        <div className="flex justify-between text-gray-500">
          <span>Subtotal</span>
          <span>${total.toLocaleString("es-CL")}</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Envío</span>
          <span className="text-xs">Calculado en el siguiente paso</span>
        </div>
      </div>

      <div className="pt-4 mt-4 border-t border-gray-100 flex justify-between items-center mb-6">
        <span className="text-lg font-bold text-[#162B45]">Total</span>
        <span className="text-2xl font-bold text-[#162B45]">
          ${total.toLocaleString("es-CL")}
        </span>
      </div>

      <button
        form="checkout-form"
        type="submit"
        disabled={loading}
        className="w-full bg-[#128708] text-white py-4 rounded-full font-bold text-lg hover:bg-[#0e6e06] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#128708]/20"
      >
        {loading ? "Procesando..." : "Confirmar pedido y pagar"}
      </button>
    </div>
  );
}
