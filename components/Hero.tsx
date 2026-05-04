"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % 2);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-[85vh] overflow-hidden pt-20">

      {/* Slide 1 — Branding */}
      <div
        className={`absolute inset-0 bg-[#FAF3DE] transition-opacity duration-700 ${
          current === 0 ? "opacity-100 z-10" : "opacity-0 z-0"
        }`}
      >
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
      <div
        className={`absolute inset-0 flex items-center justify-center bg-[#162B45] transition-opacity duration-700 ${
          current === 1 ? "opacity-100 z-10" : "opacity-0 z-0"
        }`}
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 px-6 text-center md:text-left">
          <Image
            src="/Botella.png"
            alt="Botella San Jerónimo"
            width={200}
            height={400}
            className="object-contain drop-shadow-2xl"
          />
          <div className="flex flex-col items-center md:items-start gap-4">
            <p className="text-sm uppercase tracking-widest text-[#FAF3DE]/60 font-semibold">
              Pisco Sour Artesanal
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight max-w-xs">
              El sabor que te transporta
            </h2>
            <p className="text-[#FAF3DE]/70 max-w-xs">
              Elaborado con ingredientes naturales, sin preservantes.
            </p>
            <Link
              href="/#sabores"
              className="mt-2 bg-[#128708] text-white px-8 py-3 rounded-full text-base font-semibold hover:bg-[#0e6e06] transition-colors"
            >
              Comprar ahora
            </Link>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {[0, 1].map((i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
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
