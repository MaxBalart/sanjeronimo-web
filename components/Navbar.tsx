"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import CartButton from "./CartButton";
import CartPanel from "./CartPanel";

import { SABORES } from "@/lib/data";
import Link from "next/link";

import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isCheckout = pathname === "/checkout";

  return (
    <>
      <nav className="w-full fixed top-0 left-0 bg-white shadow-sm z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 h-20">

          <Link href="/" className="hover:opacity-80 transition">
            <Image 
              src="/Logo%20y%20letras%20lateral_navbar%20web.png"
              alt="San Jerónimo" 
              width={240} 
              height={64} 
              className="object-contain h-16 w-auto"
              priority
            />
          </Link>

          {!isCheckout && (
            <div className="flex items-center gap-8">
              <div className="hidden sm:flex items-center gap-6 text-sm text-[#162B45]">
                
                {/* Menú Desplegable Sabores */}
                <div className="relative group py-4">
                  <button className="hover:underline flex items-center gap-1 font-medium">
                    Sabores
                    <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
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

                <a href="/#contacto" className="hover:underline font-medium">Contacto</a>
              </div>
              <CartButton onClick={() => setOpen(true)} />
            </div>
          )}

        </div>
      </nav>

      <CartPanel open={open} onClose={() => setOpen(false)} />
    </>
  );
}
