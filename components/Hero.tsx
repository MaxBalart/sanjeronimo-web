"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  const advance = useCallback((to?: number) => {
    setCurrent((c) => {
      const next = to !== undefined ? to : (c + 1) % 2;
      setPrev(c);
      setTimeout(() => setPrev(null), 700);
      return next;
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => advance(), 5000);
    return () => clearInterval(timer);
  }, [advance]);

  const slideClass = (index: number) => {
    if (index === current) return "translate-x-0 z-10";
    if (index === prev)    return "-translate-x-full z-10";
    return "translate-x-full z-0";
  };

  return (
    <section className="relative w-full min-h-[85vh] overflow-hidden pt-20">

      {/* Slide 1 — Branding */}
      <div className={`absolute inset-0 bg-[#FAF3DE] transition-transform duration-700 ease-in-out ${slideClass(0)}`}>
        <div className="absolute inset-0 grid grid-cols-3">

          {/* Izquierda — Logo */}
          <div className="relative">
            <Image
              src="/Logo%20Solo%20Hero%20web.png"
              alt="Logo San Jerónimo"
              fill
              className="object-contain p-10"
              priority
            />
          </div>

          {/* Centro — Texto */}
          <div className="flex flex-col items-center justify-center text-center px-5">
            <span className="text-2xl md:text-5xl font-bold text-[#162B45] tracking-widest uppercase mb-1">
              Sour
            </span>
            <h1
              className="text-6xl md:text-[6rem] leading-none text-[#162B45] tracking-wide uppercase"
              style={{ fontFamily: '"Phosphate Inline", Phosphate, sans-serif' }}
            >
              San Jerónimo
            </h1>
            <p
              className="text-3xl md:text-4xl text-[#162B45]/80 mt-4"
              style={{ fontFamily: "'SignPainter', cursive" }}
            >
              Un{" "}
              <span className="text-5xl md:text-6xl">Sour</span>
              {" "}con historia
            </p>
          </div>

          {/* Derecha — Colibrí */}
          <div className="relative">
            <Image
              src="/Colibri%20original.png"
              alt="Colibrí San Jerónimo"
              fill
              className="object-contain p-8 animate-float"
            />
          </div>

        </div>
      </div>

      {/* Slide 2 — Producto */}
      <div className={`absolute inset-0 grid grid-cols-1 md:grid-cols-2 transition-transform duration-700 ease-in-out ${slideClass(1)}`}>

        {/* Izquierda — Texto */}
        <div className="bg-[#162B45] flex items-center justify-center px-10 md:px-20 py-16 md:py-0">
          <div className="max-w-md">
            <h1 className="text-white font-bold leading-none">
              <span className="block text-4xl md:text-5xl mb-3">
                EL SABOR
              </span>
              <span className="block text-4xl md:text-5xl">
                DEL ENCUENTRO
              </span>
            </h1>
            <p className="mt-8 text-white/60 tracking-[0.3em] text-xs md:text-sm uppercase">
              Sour San Jerónimo
            </p>
            <Link
              href="/#sabores"
              className="inline-block mt-8 bg-[#128708] text-white px-8 py-3 rounded-full text-lg font-semibold hover:opacity-90 transition"
            >
              Comprar ahora
            </Link>
          </div>
        </div>

        {/* Derecha — Imagen */}
        <div className="relative h-64 md:h-auto">
          <Image
            src="/Hero_sour_slide2_tabla.png"
            alt="Sour San Jerónimo"
            fill
            className="object-cover object-[center_30%]"
          />
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {[0, 1].map((i) => (
          <button
            key={i}
            onClick={() => advance(i)}
            aria-label={`Slide ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === current
                ? "bg-[#128708] scale-125"
                : "bg-gray-400/50 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
