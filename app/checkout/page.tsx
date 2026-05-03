"use client";

import { useCart } from "@/components/CartContext";
import { useState, useEffect } from "react";
import Link from "next/link";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";

export default function CheckoutPage() {
  const { cart } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Hydration safety y pantalla de carga inicial
  if (!mounted) {
    return (
      <main className="min-h-screen bg-[#FAF3DE] pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-center py-20">
          <p className="text-[#162B45] font-medium animate-pulse">Cargando tu checkout...</p>
        </div>
      </main>
    );
  }

  // Protección: Si el carrito está vacío, no mostrar el checkout
  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-[#FAF3DE] pt-24 pb-16 px-6 flex flex-col items-center justify-center text-center">
        <div className="bg-white p-12 rounded-3xl shadow-sm max-w-md w-full">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#162B45] mb-4">Tu carrito está vacío</h1>
          <p className="text-gray-500 mb-8">Agrega algunos de nuestros exquisitos sabores antes de continuar.</p>
          <Link 
            href="/#sabores" 
            className="inline-block bg-[#128708] text-white px-8 py-4 rounded-full font-bold hover:bg-[#0e6e06] transition-colors"
          >
            Descubrir sabores
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF3DE] pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-[#162B45] mb-10">
          Finaliza tu compra
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-10 items-start">
          
          {/* Columna Izquierda: Formulario (60%) */}
          <div className="order-2 md:order-1">
            <CheckoutForm />
          </div>

          {/* Columna Derecha: Resumen (40%) */}
          <div className="order-1 md:order-2">
            <CheckoutSummary />
          </div>

        </div>
      </div>
    </main>
  );
}
