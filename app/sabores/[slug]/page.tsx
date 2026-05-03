"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getSaborBySlug } from "@/lib/data";
import { useCart } from "@/components/CartContext";

export default function SaborPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const sabor = getSaborBySlug(resolvedParams.slug);

  const { cart, addToCart, removeFromCart } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!sabor) {
    notFound();
  }

  const enCarrito = cart.find((i) => i.nombre === sabor.nombre);

  return (
    <main className="min-h-screen pt-24 bg-[#FAF3DE]">
      
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        <Link href="/#sabores" className="inline-flex items-center text-[#162B45] hover:text-[#128708] font-medium mb-8 transition-colors">
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Volver a sabores
        </Link>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Botella */}
          <div className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden bg-white shadow-xl flex items-center justify-center p-8 group">
             <div className={`absolute top-0 left-0 w-full h-2 ${sabor.color}`}></div>
             <Image 
               src="/Botella.png" 
               alt={`Botella de Pisco Sour ${sabor.nombre}`} 
               width={300} 
               height={600} 
               className="object-contain h-full transition-transform duration-700 group-hover:scale-105"
               priority
             />
          </div>

          {/* Info */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-100">
              <span className={`w-3 h-3 rounded-full ${sabor.color}`}></span>
              <span className="text-sm font-semibold text-gray-700">Edición Especial</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-[#162B45] leading-tight">
              Sour San Jerónimo <br/>
              <span className="text-[#128708]">{sabor.nombre}</span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed">
              {sabor.descripcionLarga}
            </p>

            <div className="pt-6 border-t border-gray-200">
              <p className="text-3xl font-bold text-[#162B45] mb-6">
                ${sabor.precio.toLocaleString("es-CL")}
              </p>

              {/* Botones Carrito */}
              <div className="flex items-center gap-4">
                {!mounted ? (
                  <button className="bg-[#128708] text-white px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-opacity w-full sm:w-auto shadow-lg shadow-[#128708]/30">
                    Cargando...
                  </button>
                ) : enCarrito ? (
                  <div className="flex items-center justify-between w-full sm:w-[200px] bg-white border-2 border-[#128708] rounded-full p-2">
                    <button
                      onClick={() => removeFromCart(sabor.nombre)}
                      className="w-12 h-12 rounded-full bg-[#128708]/10 text-[#128708] flex items-center justify-center text-2xl font-bold hover:bg-[#128708] hover:text-white transition-colors"
                    >
                      −
                    </button>
                    <span className="text-xl font-bold text-[#162B45]">
                      {enCarrito.cantidad}
                    </span>
                    <button
                      onClick={() => addToCart({ nombre: sabor.nombre, precio: sabor.precio })}
                      className="w-12 h-12 rounded-full bg-[#128708]/10 text-[#128708] flex items-center justify-center text-2xl font-bold hover:bg-[#128708] hover:text-white transition-colors"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart({ nombre: sabor.nombre, precio: sabor.precio })}
                    className="bg-[#128708] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#0e6e06] active:scale-95 transition-all duration-200 w-full sm:w-auto shadow-lg shadow-[#128708]/30"
                  >
                    Agregar al carrito
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Preparación Section */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#162B45] mb-4">
              El arte de servirlo perfecto
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Sigue estos 3 simples pasos para disfrutar de la experiencia completa en casa.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-10 order-2 md:order-1">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#162B45] text-white flex items-center justify-center font-bold text-xl">1</div>
                <div>
                  <h3 className="text-xl font-bold text-[#162B45] mb-2">Agita con fuerza</h3>
                  <p className="text-gray-600">Agita la botella vigorosamente durante 5 a 10 segundos. Esto despertará los sabores y generará esa espuma característica que tanto nos gusta.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#162B45] text-white flex items-center justify-center font-bold text-xl">2</div>
                <div>
                  <h3 className="text-xl font-bold text-[#162B45] mb-2">Mucho hielo</h3>
                  <p className="text-gray-600">Sirve en una copa de Pisco Sour, flauta o vaso corto lleno de cubos de hielo. Mientras más frío, mejor se aprecian sus matices.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#162B45] text-white flex items-center justify-center font-bold text-xl">3</div>
                <div>
                  <h3 className="text-xl font-bold text-[#162B45] mb-2">El toque final (Opcional)</h3>
                  <p className="text-gray-600">Decora con unas gotitas de amargo de angostura sobre la espuma. ¡Salud!</p>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2 relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              {sabor.imagenPreparacion ? (
                <Image 
                  src={sabor.imagenPreparacion}
                  alt={`Preparación del Sour ${sabor.nombre}`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">Imagen de preparación</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
