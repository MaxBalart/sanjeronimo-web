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
    <section className="relative w-full min-h-[85dvh] overflow-hidden pt-20">

      {/* Slide 1 — Branding */}
      <div className={`absolute inset-0 bg-[#FAF3DE] transition-transform duration-700 ease-out ${slideClass(0)}`}>

        {/* Mobile layout — texto + colibrí estático */}
        <div className="md:hidden absolute inset-0 flex flex-col items-center justify-center text-center px-6 pt-28 pb-16 gap-4">
          <div>
            <span className="block text-sm font-bold text-[#1f3460] tracking-[0.3em] uppercase mb-2">
              Sour
            </span>
            <h1
              className="text-[clamp(3rem,13.5vw,5rem)] leading-none text-[#1f3460] tracking-wide uppercase"
              style={{ fontFamily: 'var(--font-bebas), "Phosphate Inline", Phosphate, sans-serif' }}
            >
              San Jerónimo
            </h1>
            <p
              className="text-[1.75rem] text-[#1f3460]/80 mt-3 leading-tight"
              style={{ fontFamily: "'SignPainter', cursive" }}
            >
              Un{" "}<span className="text-[2.4rem]">Sour</span>{" "}con historia
            </p>
          </div>
          <div className="relative w-44 h-44 opacity-90">
            <Image
              src="/Colibri%20original.png"
              alt="Colibrí San Jerónimo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Desktop layout — grid 3 columnas */}
        <div className="hidden md:grid absolute inset-0 grid-cols-3">
          <div className="relative">
            <Image
              src="/Logo%20Solo%20Hero%20web.png"
              alt="Logo San Jerónimo"
              fill
              sizes="33vw"
              className="object-contain p-10"
              priority
            />
          </div>
          <div className="flex flex-col items-center justify-center text-center px-5">
            <span className="text-3xl font-bold text-[#1f3460] tracking-widest uppercase mb-1">
              Sour
            </span>
            <h1
              className="text-[6rem] leading-none text-[#1f3460] tracking-wide uppercase"
              style={{ fontFamily: '"Phosphate Inline", Phosphate, sans-serif' }}
            >
              San Jerónimo
            </h1>
            <p
              className="text-4xl text-[#1f3460]/80 mt-4"
              style={{ fontFamily: "'SignPainter', cursive" }}
            >
              Un{" "}<span className="text-6xl">Sour</span>{" "}con historia
            </p>
          </div>
          <div className="relative">
            <Image
              src="/Colibri%20original.png"
              alt="Colibrí San Jerónimo"
              fill
              sizes="33vw"
              className="object-contain p-8 animate-float"
            />
          </div>
        </div>

      </div>

      {/* Slide 2 — Producto */}
      <div className={`absolute inset-0 flex flex-col md:grid md:grid-cols-2 transition-transform duration-700 ease-out ${slideClass(1)}`}>

        {/* Izquierda — Texto */}
        <div className="bg-[#1f3460] flex items-center justify-center px-8 md:px-20 flex-shrink-0">
          <div className="max-w-md w-full pt-28 pb-10 md:py-0">
            <h1 className="text-white font-bold leading-none">
              <span className="block text-3xl md:text-5xl mb-2">
                EL SABOR
              </span>
              <span className="block text-3xl md:text-5xl">
                DEL ENCUENTRO
              </span>
            </h1>
            <p className="mt-5 text-white/60 tracking-[0.3em] text-xs uppercase">
              Sour San Jerónimo
            </p>
            <Link
              href="/#sabores"
              className="inline-block mt-6 bg-[#128708] text-white px-7 py-3 rounded-full text-base font-semibold hover:opacity-90 transition"
            >
              Comprar ahora
            </Link>
          </div>
        </div>

        {/* Derecha — Imagen */}
        <div className="relative flex-1 md:flex-none md:h-auto min-h-[200px]">
          <Image
            src="/Hero_sour_slide2_tabla.png"
            alt="Sour San Jerónimo"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-[center_30%]"
          />
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1 z-20">
        {[0, 1].map((i) => (
          <button
            key={i}
            onClick={() => advance(i)}
            aria-label={`Slide ${i + 1}`}
            aria-current={i === current ? true : undefined}
            className="w-11 h-11 flex items-center justify-center"
          >
            <span className={`w-2.5 h-2.5 rounded-full transition-[background-color,transform] duration-300 ${
              i === current
                ? "bg-[#128708] scale-125"
                : "bg-[#1f3460]/20 hover:bg-[#1f3460]/40"
            }`} />
          </button>
        ))}
      </div>
    </section>
  );
}
