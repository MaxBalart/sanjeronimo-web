"use client";
import { useState } from "react";
import CartButton from "./CartButton";
import CartPanel from "./CartPanel";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="w-full fixed top-0 left-0 bg-white shadow-sm z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 h-16">

          <span className="font-bold text-[#162B45] text-lg">San Jerónimo</span>

          <div className="flex items-center gap-8">
            <div className="hidden sm:flex items-center gap-6 text-sm text-[#162B45]">
              <a href="#sabores" className="hover:underline">Sabores</a>
              <a href="#contacto" className="hover:underline">Contacto</a>
            </div>
            <CartButton onClick={() => setOpen(true)} />
          </div>

        </div>
      </nav>

      <CartPanel open={open} onClose={() => setOpen(false)} />
    </>
  );
}
