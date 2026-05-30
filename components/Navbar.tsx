"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import CartButton from "./CartButton";
import CartPanel from "./CartPanel";
import { SABORES } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isCheckout = pathname === "/checkout";

  function closeMobile() { setMobileOpen(false); }

  return (
    <>
      <nav className="w-full fixed top-0 left-0 bg-white shadow-sm z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 h-20">

          <Link href="/" className="hover:opacity-80 transition" onClick={closeMobile}>
            <Image
              src="/Logo%20y%20letras%20lateral_navbar%20web.png"
              alt="San Jerónimo"
              width={200}
              height={64}
              className="object-contain h-14 w-auto"
              priority
            />
          </Link>

          {!isCheckout && (
            <div className="flex items-center gap-3">

              {/* Desktop nav */}
              <div className="hidden sm:flex items-center gap-6 text-sm text-[#1f3460]">
                <div className="relative group py-4">
                  <button className="hover:underline flex items-center gap-1 font-medium">
                    Sabores
                    <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-48 bg-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden border border-gray-100">
                    <div className="py-2">
                      {SABORES.map(sabor => (
                        <Link
                          key={sabor.slug}
                          href={`/sabores/${sabor.slug}`}
                          className="block px-5 py-3 text-sm text-gray-600 hover:bg-[#FAF3DE] hover:text-[#128708] hover:translate-x-2 transition-[background-color,color,transform] duration-200 font-medium"
                        >
                          {sabor.nombre}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <Link href="/para-tu-negocio" className="hover:underline font-medium">Para tu Negocio</Link>
                <Link href="/#contacto" className="hover:underline font-medium">Contacto</Link>
              </div>

              {/* Hamburger — solo mobile */}
              <button
                className="sm:hidden p-2 rounded-lg text-[#1f3460] hover:bg-[#FAF3DE] transition-colors"
                onClick={() => setMobileOpen(o => !o)}
                aria-label="Menú"
              >
                {mobileOpen ? (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>

              <CartButton onClick={() => { setCartOpen(true); closeMobile(); }} />
            </div>
          )}
        </div>

        {/* Mobile menu — grid-rows animation (no layout thrashing) */}
        {!isCheckout && (
          <div className={`sm:hidden grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${mobileOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
            <div className="min-h-0 bg-white border-t border-gray-100 px-6 py-4 space-y-1">
              <p className="text-xs font-semibold text-[#1f3460]/40 uppercase tracking-widest mb-3">Sabores</p>
              {SABORES.map(sabor => (
                <Link
                  key={sabor.slug}
                  href={`/sabores/${sabor.slug}`}
                  onClick={closeMobile}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-[#1f3460] hover:bg-[#FAF3DE] transition-colors font-medium"
                >
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: sabor.color }} />
                  {sabor.nombre}
                </Link>
              ))}
              <div className="h-px bg-gray-100 my-3" />
              <Link
                href="/para-tu-negocio"
                onClick={closeMobile}
                className="block px-3 py-3 rounded-xl text-[#1f3460] hover:bg-[#FAF3DE] transition-colors font-medium"
              >
                Para tu Negocio
              </Link>
              <a
                href="/#contacto"
                onClick={closeMobile}
                className="block px-3 py-3 rounded-xl text-[#1f3460] hover:bg-[#FAF3DE] transition-colors font-medium"
              >
                Contacto
              </a>
            </div>
          </div>
        )}
      </nav>

      <CartPanel open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
