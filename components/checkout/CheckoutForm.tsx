"use client";

import { useState } from "react";
import { useCart } from "@/components/CartContext";

export default function CheckoutForm({ 
  loading, 
  setLoading 
}: { 
  loading: boolean; 
  setLoading: (l: boolean) => void; 
}) {
  const { cart, total, clearCart } = useCart();
  
  // Contacto
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  
  // Dirección
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");
  const [direccion, setDireccion] = useState("");
  const [depto, setDepto] = useState("");
  
  // Pago
  const [medioPago, setMedioPago] = useState("flow");
  
  // UI State
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nombre || !email || !telefono || !region || !comuna || !direccion) {
      setError("Por favor completa todos los campos obligatorios.");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          total,
          medioPago,
          cliente: { nombre, email, telefono, region, comuna, direccion, depto },
        }),
      });
      
      const data = await res.json();
      
      if (data.url) {
        clearCart();
        window.location.href = data.url;
      } else {
        setError("Ocurrió un error al procesar el pago. Intenta de nuevo.");
      }
    } catch {
      setError("Ocurrió un error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
      
      {/* 1. Datos de contacto */}
      <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
        <h2 className="text-xl font-bold text-[#1f3460] mb-6">Datos de contacto</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo *</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: Juan Pérez"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#1f3460] focus:ring-1 focus:ring-[#1f3460] transition-[border-color,box-shadow]"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo@ejemplo.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#1f3460] focus:ring-1 focus:ring-[#1f3460] transition-[border-color,box-shadow]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono *</label>
              <input
                type="tel"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="+56 9 1234 5678"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#1f3460] focus:ring-1 focus:ring-[#1f3460] transition-[border-color,box-shadow]"
                required
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Dirección de despacho */}
      <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
        <h2 className="text-xl font-bold text-[#1f3460] mb-6">Dirección de despacho</h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Región *</label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#1f3460] focus:ring-1 focus:ring-[#1f3460] transition-[border-color,box-shadow] cursor-pointer"
                required
              >
                <option value="">Selecciona una región</option>
                <option value="RM">Región Metropolitana</option>
                <option value="V">Región de Valparaíso</option>
                <option value="VI">Región del Libertador Gral. Bernardo O'Higgins</option>
                {/* Agregar más regiones según necesite */}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Comuna *</label>
              <input
                type="text"
                value={comuna}
                onChange={(e) => setComuna(e.target.value)}
                placeholder="Ej: Providencia"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#1f3460] focus:ring-1 focus:ring-[#1f3460] transition-[border-color,box-shadow]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dirección (Calle y número) *</label>
            <input
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              placeholder="Ej: Av. Los Leones 1234"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#1f3460] focus:ring-1 focus:ring-[#1f3460] transition-[border-color,box-shadow]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Depto, Casa, Oficina (Opcional)</label>
            <input
              type="text"
              value={depto}
              onChange={(e) => setDepto(e.target.value)}
              placeholder="Ej: Depto 402"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#1f3460] focus:ring-1 focus:ring-[#1f3460] transition-[border-color,box-shadow]"
            />
          </div>
        </div>
      </section>

      {/* 3. Método de pago */}
      <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-[#1f3460] mb-2">Método de pago</h2>
          <p className="text-sm text-gray-500">
            Serás redireccionado a una página segura de pago, jamás guardaremos tus datos bancarios.
          </p>
        </div>
        
        <div className="space-y-3">
          <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${medioPago === 'flow' ? 'border-[#128708] bg-[#128708]/5' : 'border-gray-200 hover:border-gray-300'}`}>
            <input 
              type="radio" 
              name="pago" 
              value="flow" 
              checked={medioPago === "flow"}
              onChange={(e) => setMedioPago(e.target.value)}
              className="w-5 h-5 text-[#128708] border-gray-300 focus:ring-[#128708]" 
            />
            <span className="ml-3 font-medium text-[#1f3460]">Webpay / Flow</span>
          </label>
          
          <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${medioPago === 'mercadopago' ? 'border-[#128708] bg-[#128708]/5' : 'border-gray-200 hover:border-gray-300'}`}>
            <input
              type="radio"
              name="pago"
              value="mercadopago"
              checked={medioPago === "mercadopago"}
              onChange={(e) => setMedioPago(e.target.value)}
              className="w-5 h-5 text-[#128708] border-gray-300 focus:ring-[#128708]"
            />
            <span className="ml-3 font-medium text-[#1f3460]">MercadoPago</span>
          </label>

          <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${medioPago === 'simulacion' ? 'border-[#ee7203] bg-[#ee7203]/5' : 'border-gray-200 hover:border-gray-300'}`}>
            <input
              type="radio"
              name="pago"
              value="simulacion"
              checked={medioPago === "simulacion"}
              onChange={(e) => setMedioPago(e.target.value)}
              className="w-5 h-5 text-[#ee7203] border-gray-300 focus:ring-[#ee7203]"
            />
            <div className="ml-3">
              <span className="font-medium text-[#1f3460]">Pago de prueba</span>
              <span className="ml-2 text-xs bg-[#ee7203]/15 text-[#ee7203] px-2 py-0.5 rounded-full font-medium">Solo testing</span>
            </div>
          </label>
        </div>
      </section>

      {/* Error & Submit */}
      <div className="pt-4">
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm flex items-start">
            <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p>{error}</p>
          </div>
        )}

        {/* Mensaje de Urgencia */}
        <div className="bg-[#1f3460]/5 border border-[#1f3460]/10 rounded-xl p-3 mb-6 text-center">
          <p className="text-[#1f3460]/70 font-semibold text-sm">
            🚚 Despachos disponibles esta semana
          </p>
        </div>
        
        <button
          type="submit"
          disabled={loading || cart.length === 0}
          className="w-full bg-[#128708] text-white py-5 rounded-full font-bold text-lg hover:opacity-90 active:scale-[0.98] transition-[opacity,transform] duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Procesando pago seguro..." : "Confirmar pedido y pagar"}
        </button>
        <p className="text-center text-sm text-gray-500 mt-4 flex items-center justify-center gap-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          Pago seguro y encriptado
        </p>
      </div>

    </form>
  );
}
