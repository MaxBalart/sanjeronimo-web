"use client";

import { useState } from "react";

const TIPOS_NEGOCIO = ["Restaurante", "Bar", "Hotel", "Eventos y catering", "Retail", "Otro"];
const VOLUMENES = [
  "Menos de 10 botellas/mes",
  "10 a 50 botellas/mes",
  "50 a 100 botellas/mes",
  "Más de 100 botellas/mes",
];

interface LeadB2B {
  nombre: string;
  empresa: string;
  tipoNegocio: string;
  email: string;
  telefono: string;
  volumenEstimado: string;
  mensaje: string;
}

const emptyLead: LeadB2B = {
  nombre: "", empresa: "", tipoNegocio: "",
  email: "", telefono: "", volumenEstimado: "", mensaje: "",
};

const inputClass =
  "w-full border border-gray-300 rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#1f3460] focus:ring-1 focus:ring-[#1f3460] transition-[border-color,box-shadow]";

export default function B2BForm() {
  const [form, setForm] = useState<LeadB2B>(emptyLead);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [enviado, setEnviado] = useState(false);

  function set(field: keyof LeadB2B, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { nombre, empresa, tipoNegocio, email, telefono } = form;
    if (!nombre || !empresa || !tipoNegocio || !email || !telefono) {
      setError("Por favor completa todos los campos obligatorios.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/leads-b2b", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setEnviado(true);
      } else {
        setError("Ocurrió un error al enviar tu consulta. Intenta de nuevo.");
      }
    } catch {
      setError("Ocurrió un error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (enviado) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
        <div className="w-16 h-16 bg-[#128708]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-[#128708]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-[#1f3460] mb-3 tracking-tight">
          ¡Consulta recibida!
        </h3>
        <p className="text-[#1f3460]/55 max-w-xs mx-auto leading-relaxed">
          Nos pondremos en contacto contigo a la brevedad. Revisa tu correo, te enviamos una confirmación.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del contacto *</label>
          <input type="text" value={form.nombre} onChange={e => set("nombre", e.target.value)}
            placeholder="Ej: María González" className={inputClass} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Empresa / Negocio *</label>
          <input type="text" value={form.empresa} onChange={e => set("empresa", e.target.value)}
            placeholder="Ej: Restaurante El Encuentro" className={inputClass} required />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de negocio *</label>
        <select value={form.tipoNegocio} onChange={e => set("tipoNegocio", e.target.value)}
          className={`${inputClass} cursor-pointer`} required>
          <option value="">Selecciona una opción</option>
          {TIPOS_NEGOCIO.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input type="email" value={form.email} onChange={e => set("email", e.target.value)}
            placeholder="contacto@tunegocio.cl" className={inputClass} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono *</label>
          <input type="tel" value={form.telefono} onChange={e => set("telefono", e.target.value)}
            placeholder="+56 9 1234 5678" className={inputClass} required />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Volumen estimado mensual</label>
        <select value={form.volumenEstimado} onChange={e => set("volumenEstimado", e.target.value)}
          className={`${inputClass} cursor-pointer`}>
          <option value="">Selecciona una opción (opcional)</option>
          {VOLUMENES.map(v => <option key={v} value={v}>{v}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje (opcional)</label>
        <textarea
          value={form.mensaje}
          onChange={e => set("mensaje", e.target.value)}
          placeholder="Cuéntanos más sobre tu establecimiento o qué necesitas..."
          rows={4}
          className={`${inputClass} resize-none`}
        />
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm flex items-start gap-2">
          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#128708] text-white py-4 rounded-full font-bold text-base hover:opacity-90 active:scale-[0.98] transition-[opacity,transform] duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Enviando consulta..." : "Enviar consulta"}
      </button>
    </form>
  );
}
