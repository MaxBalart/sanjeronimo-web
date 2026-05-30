"use client";

import { useState, useEffect, useRef } from "react";
import { useCart } from "./CartContext";
import { SABORES } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

export default function Flavors() {
  const { cart, addToCart, removeFromCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const [clasico, maracuya, sinAzucar] = SABORES;

  return (
    <section id="sabores" className="bg-[#FAF3DE] py-20 px-6">
      <div ref={ref} className="max-w-6xl mx-auto">

        <div className="h-px bg-[#1f3460]/10 mb-12" />
        <h2 className={`text-4xl md:text-5xl font-bold tracking-tight text-[#1f3460] mb-12 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          Elige el tuyo
        </h2>

        {/* Grid asimétrico: featured (2/3) + stack (1/3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:items-start">

          {/* Card featured — Clásico */}
          <FeaturedCard sabor={clasico} cart={cart} mounted={mounted} addToCart={addToCart} removeFromCart={removeFromCart} visible={visible} delay={100} />

          {/* Stack derecho — Maracuyá + Sin Azúcar */}
          <div className="flex flex-col gap-4">
            <CompactCard sabor={maracuya} cart={cart} mounted={mounted} addToCart={addToCart} removeFromCart={removeFromCart} visible={visible} delay={200} />
            <CompactCard sabor={sinAzucar} cart={cart} mounted={mounted} addToCart={addToCart} removeFromCart={removeFromCart} visible={visible} delay={300} />
          </div>

        </div>
      </div>
    </section>
  );
}

type CardProps = {
  sabor: typeof SABORES[0];
  cart: ReturnType<typeof useCart>["cart"];
  mounted: boolean;
  addToCart: ReturnType<typeof useCart>["addToCart"];
  removeFromCart: ReturnType<typeof useCart>["removeFromCart"];
  visible: boolean;
  delay: number;
};

function FeaturedCard({ sabor, cart, mounted, addToCart, removeFromCart, visible, delay }: CardProps) {
  const enCarrito = cart.find(i => i.nombre === sabor.nombre);

  return (
    <div
      className={`md:col-span-2 group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Franja de color del sabor */}
      <div className="h-1 w-full" style={{ backgroundColor: sabor.color }} />

      <div className="flex flex-col md:flex-row flex-1">
        {/* Imagen */}
        <Link href={`/sabores/${sabor.slug}`} className="flex items-end justify-center bg-[#FAF3DE] md:w-2/5 py-6 px-6 md:py-10 md:px-8 flex-shrink-0 min-h-[180px] md:min-h-0">
          <Image
            src={sabor.imagen}
            alt={sabor.nombre}
            width={100}
            height={160}
            className="object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.15)] transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-1 md:w-[140px] md:h-[220px]"
          />
        </Link>

        {/* Contenido */}
        <div className="flex flex-col justify-between p-8 flex-1">
          <div>
            <Link href={`/sabores/${sabor.slug}`}>
              <h3 className="text-2xl md:text-3xl font-semibold mb-3 transition-colors" style={{ color: sabor.color }}>
                {sabor.nombre}
              </h3>
            </Link>
            <p className="text-[#1f3460]/60 text-sm leading-relaxed mb-6 max-w-xs">{sabor.descripcion}</p>
            <p className="text-3xl font-bold text-[#1f3460]">
              ${sabor.precio.toLocaleString("es-CL")}
            </p>
          </div>

          <div className="mt-6">
            {mounted && enCarrito ? (
              <div className="flex items-center gap-3">
                <button onClick={() => removeFromCart(sabor.nombre)} style={{ backgroundColor: sabor.color }} className="w-9 h-9 rounded-full text-white flex items-center justify-center text-xl font-bold hover:opacity-80 active:scale-[0.92] transition-[opacity,transform] duration-150">−</button>
                <span className="text-lg font-bold w-5 text-center" style={{ color: sabor.color }}>{enCarrito.cantidad}</span>
                <button onClick={() => addToCart({ nombre: sabor.nombre, precio: sabor.precio })} style={{ backgroundColor: sabor.color }} className="w-9 h-9 rounded-full text-white flex items-center justify-center text-xl font-bold hover:opacity-80 active:scale-[0.92] transition-[opacity,transform] duration-150">+</button>
              </div>
            ) : (
              <button
                onClick={() => addToCart({ nombre: sabor.nombre, precio: sabor.precio })}
                style={{ backgroundColor: sabor.color }}
                className="text-white px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-[opacity,transform] duration-150"
              >
                Agregar al carrito
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CompactCard({ sabor, cart, mounted, addToCart, removeFromCart, visible, delay }: CardProps) {
  const enCarrito = cart.find(i => i.nombre === sabor.nombre);

  return (
    <div
      className={`group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col flex-1 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="h-1 w-full" style={{ backgroundColor: sabor.color }} />

      <div className="flex flex-row items-center gap-5 p-5 flex-1">
        {/* Imagen compacta */}
        <Link href={`/sabores/${sabor.slug}`} className="flex-shrink-0 flex items-end justify-center bg-[#FAF3DE] rounded-xl w-20 h-24 p-2">
          <Image
            src={sabor.imagen}
            alt={sabor.nombre}
            width={48}
            height={80}
            className="object-contain drop-shadow-[0_6px_12px_rgba(0,0,0,0.15)] transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-0.5"
          />
        </Link>

        {/* Contenido */}
        <div className="flex flex-col justify-between flex-1 min-w-0 h-full py-1">
          <div>
            <Link href={`/sabores/${sabor.slug}`}>
              <h3 className="text-base font-semibold mb-1 transition-colors" style={{ color: sabor.color }}>{sabor.nombre}</h3>
            </Link>
            <p className="text-[#1f3460]/55 text-xs leading-relaxed line-clamp-2">{sabor.descripcion}</p>
          </div>

          <div className="flex items-center justify-between mt-3">
            <p className="text-lg font-bold text-[#1f3460]">${sabor.precio.toLocaleString("es-CL")}</p>
            {mounted && enCarrito ? (
              <div className="flex items-center gap-2">
                <button onClick={() => removeFromCart(sabor.nombre)} style={{ backgroundColor: sabor.color }} className="w-7 h-7 rounded-full text-white flex items-center justify-center text-base font-bold hover:opacity-80 active:scale-[0.92] transition-[opacity,transform] duration-150">−</button>
                <span className="text-sm font-bold w-4 text-center" style={{ color: sabor.color }}>{enCarrito.cantidad}</span>
                <button onClick={() => addToCart({ nombre: sabor.nombre, precio: sabor.precio })} style={{ backgroundColor: sabor.color }} className="w-7 h-7 rounded-full text-white flex items-center justify-center text-base font-bold hover:opacity-80 active:scale-[0.92] transition-[opacity,transform] duration-150">+</button>
              </div>
            ) : (
              <button
                onClick={() => addToCart({ nombre: sabor.nombre, precio: sabor.precio })}
                style={{ backgroundColor: sabor.color }}
                className="text-white px-4 py-2 rounded-full text-xs font-semibold hover:opacity-90 active:scale-[0.98] transition-[opacity,transform] duration-150"
              >
                Agregar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
