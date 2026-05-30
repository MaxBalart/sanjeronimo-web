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
        <Link href="/#sabores" className="inline-flex items-center text-[#1f3460]/60 hover:text-[#1f3460] font-medium mb-8 transition-[color] duration-150 active:scale-[0.97]">
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Volver a sabores
        </Link>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Botella */}
          <div className="relative h-[320px] md:h-[560px] group">
             <Image
               src={sabor.imagen}
               alt={`Botella de Pisco Sour ${sabor.nombre}`}
               fill
               sizes="(max-width: 768px) 100vw, 50vw"
               className="object-contain drop-shadow-[0_20px_30px_rgba(22,43,69,0.18)] transition-transform duration-700 ease-out group-hover:scale-105"
               priority
             />
          </div>

          {/* Info */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-[#1f3460] leading-tight">
              Sour San Jerónimo <br/>
              <span style={{ color: sabor.color }}>{sabor.nombre}</span>
            </h1>

            <p className="text-lg text-[#1f3460]/60 leading-relaxed">
              {sabor.descripcionLarga}
            </p>

            <div className="pt-6 border-t border-[#1f3460]/10">
              <div className="flex items-baseline gap-2 mb-6">
                <p className="text-3xl font-bold text-[#1f3460]">
                  ${sabor.precio.toLocaleString("es-CL")}
                </p>
                <span className="text-sm text-[#1f3460]/30 font-normal">/ botella</span>
              </div>

              {/* Botones Carrito */}
              <div className="flex items-center gap-4">
                {!mounted ? (
                  <button className="text-white px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-opacity w-full sm:w-auto" style={{ backgroundColor: sabor.color }}>
                    Cargando...
                  </button>
                ) : enCarrito ? (
                  <div className="flex items-center justify-between w-[180px] bg-white rounded-full p-2 border-2" style={{ borderColor: sabor.color }}>
                    <button
                      onClick={() => removeFromCart(sabor.nombre)}
                      className="w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold transition-[background-color,color,transform] duration-150 hover:text-white active:scale-[0.92]"
                      style={{ backgroundColor: `${sabor.color}1a`, color: sabor.color }}
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = sabor.color; e.currentTarget.style.color = "white"; }}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = `${sabor.color}1a`; e.currentTarget.style.color = sabor.color; }}
                    >
                      −
                    </button>
                    <span className="text-xl font-bold text-[#1f3460]">
                      {enCarrito.cantidad}
                    </span>
                    <button
                      onClick={() => addToCart({ nombre: sabor.nombre, precio: sabor.precio })}
                      className="w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold transition-[background-color,color,transform] duration-150 hover:text-white active:scale-[0.92]"
                      style={{ backgroundColor: `${sabor.color}1a`, color: sabor.color }}
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = sabor.color; e.currentTarget.style.color = "white"; }}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = `${sabor.color}1a`; e.currentTarget.style.color = sabor.color; }}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart({ nombre: sabor.nombre, precio: sabor.precio })}
                    className="text-white px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 active:scale-[0.98] transition-[opacity,transform] duration-150 w-full sm:w-auto"
                    style={{ backgroundColor: sabor.color }}
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#1f3460] mb-4">
              El arte de servirlo perfecto
            </h2>
            <p className="text-[#1f3460]/60 max-w-2xl mx-auto text-lg">
              Tres pasos para disfrutar de la experiencia completa en casa.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-10 order-2 md:order-1">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#1f3460] text-white flex items-center justify-center font-bold text-xl">1</div>
                <div>
                  <h3 className="text-xl font-bold text-[#1f3460] tracking-tight mb-2">Agrega San Jerónimo y hielo a gusto</h3>
                  <p className="text-[#1f3460]/60">Vierte el contenido de la botella en una licuadora y agrega hielo a gusto. Debe estar descongelado; el hielo ayudará a la textura.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#1f3460] text-white flex items-center justify-center font-bold text-xl">2</div>
                <div>
                  <h3 className="text-xl font-bold text-[#1f3460] tracking-tight mb-2">Licúa hasta obtener mezcla uniforme y espumosa</h3>
                  <p className="text-[#1f3460]/60">Licúa a velocidad alta hasta que la mezcla sea homogénea. La espuma natural aparece sola.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#1f3460] text-white flex items-center justify-center font-bold text-xl">3</div>
                <div>
                  <h3 className="text-xl font-bold text-[#1f3460] tracking-tight mb-2">Sirve y disfruta</h3>
                  <p className="text-[#1f3460]/60">Sirve en copas y disfruta. Una botella rinde entre 9 y 12 copas.</p>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2 relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              {sabor.imagenPreparacion ? (
                <Image
                  src={sabor.imagenPreparacion}
                  alt={`Preparación del Sour ${sabor.nombre}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#1f3460]/5 flex items-center justify-center">
                  <span className="text-[#1f3460]/30 text-sm">Imagen de preparación</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
