"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const SESSION_KEY = "sj_age_verified";

export default function AgeGate() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem(SESSION_KEY)) {
      setVisible(true);
    }
  }, []);

  function handleYes() {
    sessionStorage.setItem(SESSION_KEY, "1");
    setVisible(false);
  }

  function handleNo() {
    window.location.href = "http://www.hattrick.org";
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#1f3460]/95 backdrop-blur-sm px-6">
      <div className="flex flex-col items-center text-center max-w-sm w-full">

        <Image
          src="/Logo Solo Hero web.png"
          alt="San Jerónimo"
          width={80}
          height={80}
          className="mb-8 opacity-90"
        />

        <p className="text-xs tracking-[0.2em] text-white/40 uppercase mb-3">
          Contenido para adultos
        </p>

        <h1 className="text-3xl font-bold text-white tracking-tight mb-3">
          ¿Eres mayor de 18 años?
        </h1>

        <p className="text-white/50 text-sm mb-10 leading-relaxed">
          San Jerónimo Sour es una bebida alcohólica.<br />
          El consumo de alcohol está prohibido para menores de edad.
        </p>

        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={handleYes}
            className="w-full bg-[#128708] text-white py-4 rounded-full font-bold text-base hover:bg-[#0e6e06] active:scale-[0.97] transition-[background-color,transform] duration-150"
          >
            Sí, soy mayor de 18
          </button>

          <button
            onClick={handleNo}
            className="w-full bg-white/8 text-white/60 py-4 rounded-full font-medium text-base hover:bg-white/12 active:scale-[0.97] transition-[background-color,transform] duration-150"
          >
            No, soy menor de edad
          </button>
        </div>

        <p className="text-white/25 text-xs mt-8">
          Al ingresar confirmas que tienes 18 años o más y aceptas nuestra política de privacidad.
        </p>
      </div>
    </div>
  );
}
