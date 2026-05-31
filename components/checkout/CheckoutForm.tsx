"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/components/CartContext";
import { REGIONES_COMUNAS } from "@/lib/regionesComunas";

const STORAGE_KEY = "sj_cliente_datos";

interface DatosCliente {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  rut: string;
  email: string;
  telefono: string;
  region: string;
  comuna: string;
  direccion: string;
  casaOfi: string;
}

const emptyForm: DatosCliente = {
  nombre: "", apellidoPaterno: "", apellidoMaterno: "",
  rut: "", email: "", telefono: "",
  region: "", comuna: "", direccion: "", casaOfi: "",
};

function loadDatos(): DatosCliente {
  if (typeof window === "undefined") return emptyForm;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...emptyForm, ...JSON.parse(raw) } : emptyForm;
  } catch { return emptyForm; }
}

function saveDatos(datos: DatosCliente) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(datos)); } catch { /* noop */ }
}

export default function CheckoutForm({
  loading,
  setLoading,
}: {
  loading: boolean;
  setLoading: (l: boolean) => void;
}) {
  const { cart, total, clearCart } = useCart();

  const [form, setForm] = useState<DatosCliente>(emptyForm);
  const [medioPago, setMedioPago] = useState("flow");
  const [error, setError] = useState("");
  const [datosPrecargados, setDatosPrecargados] = useState(false);

  // Cliente encontrado en backend (source of truth para comparar dirección)
  const [clienteGuardado, setClienteGuardado] = useState<DatosCliente | null>(null);
  const [clienteID, setClienteID] = useState<string | null>(null);
  const [buscandoCliente, setBuscandoCliente] = useState(false);
  const [mostrandoOtraDireccion, setMostrandoOtraDireccion] = useState(false);
  const [modalGuardarDireccion, setModalGuardarDireccion] = useState(false);

  // Descuento
  const [codigoInput, setCodigoInput] = useState("");
  const [validandoCodigo, setValidandoCodigo] = useState(false);
  const [descuento, setDescuento] = useState<{
    codigo: string;
    tipo: "porcentaje" | "monto_fijo";
    valor: number;
    descripcion: string;
  } | null>(null);
  const [errorCodigo, setErrorCodigo] = useState("");

  // Cargar datos de localStorage al montar (fallback si no hay cuenta)
  useEffect(() => {
    const guardados = loadDatos();
    if (guardados.nombre || guardados.email) {
      setForm(guardados);
      setDatosPrecargados(true);
    }
  }, []);

  const comunasDisponibles = REGIONES_COMUNAS.find(r => r.nombre === form.region)?.comunas ?? [];

  function set(field: keyof DatosCliente, value: string) {
    setForm(prev => {
      const next = { ...prev, [field]: value };
      if (field === "region") next.comuna = "";
      return next;
    });
  }

  // Email onBlur → buscar cliente en backend
  // Respuesta del backend: { encontrado, clienteID, datos }
  const handleEmailBlur = async () => {
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) return;
    setBuscandoCliente(true);
    try {
      const res = await fetch(`/api/clientes/buscar?email=${encodeURIComponent(form.email)}`);
      const data = await res.json();
      if (data.encontrado && data.datos) {
        const c = data.datos as DatosCliente;
        setClienteGuardado(c);
        setClienteID(data.clienteID ?? null);
        setForm(prev => ({
          ...prev,
          nombre:          c.nombre          || prev.nombre,
          apellidoPaterno: c.apellidoPaterno  || prev.apellidoPaterno,
          apellidoMaterno: c.apellidoMaterno  || prev.apellidoMaterno,
          rut:             c.rut             || prev.rut,
          telefono:        c.telefono        || prev.telefono,
          region:          c.region          || prev.region,
          comuna:          c.comuna          || prev.comuna,
          direccion:       c.direccion       || prev.direccion,
          casaOfi:         c.casaOfi         || prev.casaOfi,
        }));
        setDatosPrecargados(true);
        setMostrandoOtraDireccion(false);
      } else {
        setClienteGuardado(null);
        setClienteID(null);
      }
    } catch { /* silent — user fills manually */ }
    finally { setBuscandoCliente(false); }
  };

  // Validar código de descuento contra el backend
  const aplicarCodigo = async () => {
    if (!codigoInput.trim()) return;
    setValidandoCodigo(true);
    setErrorCodigo("");
    setDescuento(null);
    try {
      const res = await fetch("/api/descuento/validar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          codigo: codigoInput.trim().toUpperCase(),
          items: cart.map(i => ({ productoId: i.productoId, cantidad: i.cantidad })),
        }),
      });
      const data = await res.json();
      if (data.valido) {
        setDescuento({
          codigo: codigoInput.trim().toUpperCase(),
          tipo: data.tipo,
          valor: data.valor,
          descripcion: data.descripcion,
        });
      } else {
        setErrorCodigo("Código no válido o expirado.");
      }
    } catch {
      setErrorCodigo("No se pudo verificar el código. Intenta de nuevo.");
    } finally {
      setValidandoCodigo(false);
    }
  };

  // ¿La dirección actual difiere de la guardada en backend?
  const dirCambiada = () => {
    if (!clienteGuardado) return false;
    return (
      form.region    !== clienteGuardado.region    ||
      form.comuna    !== clienteGuardado.comuna    ||
      form.direccion !== clienteGuardado.direccion ||
      form.casaOfi   !== clienteGuardado.casaOfi
    );
  };

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#1f3460] focus:ring-1 focus:ring-[#1f3460] transition-[border-color,box-shadow]";

  type DireccionEntrega = { region: string; comuna: string; direccion: string; casaOfi: string };

  // Lógica de pedido desacoplada del submit para poder llamarla desde el modal
  const processOrder = async (direccionEntrega?: DireccionEntrega) => {
    setLoading(true);
    setError("");
    try {
      const body: Record<string, unknown> = {
        items: cart,
        medioPago,
        ...(descuento && { codigoDescuento: descuento.codigo }),
        cliente: {
          nombre: `${form.nombre} ${form.apellidoPaterno}${form.apellidoMaterno ? " " + form.apellidoMaterno : ""}`.trim(),
          apellidoPaterno: form.apellidoPaterno,
          apellidoMaterno: form.apellidoMaterno,
          rut:       form.rut,
          email:     form.email,
          telefono:  form.telefono,
          region:    form.region,
          comuna:    form.comuna,
          direccion: form.direccion,
          casaOfi:   form.casaOfi,
        },
      };
      // Solo incluir si el despacho es a una dirección distinta a la del cliente
      if (direccionEntrega) body.direccionEntrega = direccionEntrega;

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.url) {
        saveDatos(form);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { nombre, apellidoPaterno, rut, email, telefono, region, comuna, direccion } = form;
    if (!nombre || !apellidoPaterno || !rut || !email || !telefono || !region || !comuna || !direccion) {
      setError("Por favor completa todos los campos obligatorios.");
      return;
    }
    // Si hay cliente guardado y la dirección cambió → mostrar modal
    if (dirCambiada()) {
      setModalGuardarDireccion(true);
      return;
    }
    await processOrder();
  };

  const handleAddressDecision = async (guardar: boolean) => {
    setModalGuardarDireccion(false);
    const nuevaDir: DireccionEntrega = {
      region: form.region, comuna: form.comuna,
      direccion: form.direccion, casaOfi: form.casaOfi,
    };
    // Si elige guardar → PATCH el perfil del cliente primero
    if (guardar && clienteID) {
      try {
        await fetch(`/api/clientes/${clienteID}/direccion`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nuevaDir),
        });
      } catch { /* silent — el pedido sigue aunque falle el PATCH */ }
    }
    // Siempre enviar direccionEntrega al pedido cuando la dirección difiere
    await processOrder(nuevaDir);
  };

  return (
    <>
      <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">

        {/* 1. Datos de contacto — email primero */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
          <h2 className="text-xl font-bold text-[#1f3460] mb-6">Datos de contacto</h2>

          <div className="space-y-4">

            {/* Email — prominente, primero */}
            <div>
              <label htmlFor="co-email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <div className="relative">
                <input
                  id="co-email"
                  type="email"
                  value={form.email}
                  onChange={e => set("email", e.target.value)}
                  onBlur={handleEmailBlur}
                  placeholder="correo@ejemplo.com"
                  className={inputClass}
                  required
                />
                {buscandoCliente && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 border-2 border-[#1f3460]/20 border-t-[#1f3460] rounded-full animate-spin" />
                  </div>
                )}
              </div>
            </div>

            {/* Banner datos precargados */}
            {datosPrecargados && (
              <div className="bg-[#128708]/8 border border-[#128708]/20 rounded-xl px-5 py-3 flex items-center justify-between">
                <p className="text-sm text-[#128708] font-medium">
                  {clienteGuardado
                    ? `Hola ${clienteGuardado.nombre}, encontramos tus datos`
                    : "Tus datos fueron precargados de tu compra anterior"
                  }
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForm(emptyForm);
                    setDatosPrecargados(false);
                    setClienteGuardado(null);
                    setMostrandoOtraDireccion(false);
                  }}
                  className="text-xs text-[#1f3460]/50 hover:text-[#1f3460] transition-colors ml-4 underline"
                >
                  Limpiar
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="co-nombre" className="block text-sm font-medium text-gray-700 mb-1">Nombre(s) *</label>
                <input id="co-nombre" type="text" value={form.nombre} onChange={e => set("nombre", e.target.value)}
                  placeholder="Ej: Juan" className={inputClass} required />
              </div>
              <div>
                <label htmlFor="co-apellidoPaterno" className="block text-sm font-medium text-gray-700 mb-1">Apellido Paterno *</label>
                <input id="co-apellidoPaterno" type="text" value={form.apellidoPaterno} onChange={e => set("apellidoPaterno", e.target.value)}
                  placeholder="Ej: Pérez" className={inputClass} required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="co-apellidoMaterno" className="block text-sm font-medium text-gray-700 mb-1">Apellido Materno</label>
                <input id="co-apellidoMaterno" type="text" value={form.apellidoMaterno} onChange={e => set("apellidoMaterno", e.target.value)}
                  placeholder="Ej: González" className={inputClass} />
              </div>
              <div>
                <label htmlFor="co-rut" className="block text-sm font-medium text-gray-700 mb-1">RUT *</label>
                <input id="co-rut" type="text" value={form.rut} onChange={e => set("rut", e.target.value)}
                  placeholder="Ej: 12.345.678-9" className={inputClass} required />
              </div>
            </div>

            <div>
              <label htmlFor="co-telefono" className="block text-sm font-medium text-gray-700 mb-1">Teléfono *</label>
              <input id="co-telefono" type="tel" value={form.telefono} onChange={e => set("telefono", e.target.value)}
                placeholder="+56 9 1234 5678" className={inputClass} required />
            </div>
          </div>
        </section>

        {/* 2. Dirección de despacho */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#1f3460]">Dirección de despacho</h2>
            {clienteGuardado && !mostrandoOtraDireccion && (
              <button
                type="button"
                onClick={() => {
                  setMostrandoOtraDireccion(true);
                  setForm(prev => ({ ...prev, region: "", comuna: "", direccion: "", casaOfi: "" }));
                }}
                className="text-sm text-[#1f3460]/55 hover:text-[#1f3460] transition-colors underline"
              >
                ¿Enviar a otra dirección?
              </button>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="co-region" className="block text-sm font-medium text-gray-700 mb-1">Región *</label>
              <select id="co-region" value={form.region} onChange={e => set("region", e.target.value)}
                className={`${inputClass} cursor-pointer`} required>
                <option value="">Selecciona una región</option>
                {REGIONES_COMUNAS.map(r => (
                  <option key={r.nombre} value={r.nombre}>{r.nombre}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="co-comuna" className="block text-sm font-medium text-gray-700 mb-1">Comuna *</label>
              <select id="co-comuna" value={form.comuna} onChange={e => set("comuna", e.target.value)}
                className={`${inputClass} cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
                required disabled={!form.region}>
                <option value="">{form.region ? "Selecciona una comuna" : "Primero selecciona una región"}</option>
                {comunasDisponibles.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="co-direccion" className="block text-sm font-medium text-gray-700 mb-1">Dirección (Calle y número) *</label>
              <input id="co-direccion" type="text" value={form.direccion} onChange={e => set("direccion", e.target.value)}
                placeholder="Ej: Av. Los Leones 1234" className={inputClass} required />
            </div>

            <div>
              <label htmlFor="co-casaOfi" className="block text-sm font-medium text-gray-700 mb-1">Casa, Depto u Oficina</label>
              <input id="co-casaOfi" type="text" value={form.casaOfi} onChange={e => set("casaOfi", e.target.value)}
                placeholder="Ej: Depto 402, Casa 3" className={inputClass} />
            </div>
          </div>
        </section>

        {/* 3. Código de descuento */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
          <h2 className="text-xl font-bold text-[#1f3460] mb-6">Código de descuento</h2>

          {descuento ? (
            <div className="bg-[#128708]/8 border border-[#128708]/20 rounded-xl px-5 py-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-[#128708]">
                  {descuento.descripcion}
                </p>
                <p className="text-xs text-[#128708]/70 mt-0.5">Código: {descuento.codigo}</p>
              </div>
              <button
                type="button"
                onClick={() => { setDescuento(null); setCodigoInput(""); }}
                className="text-xs text-[#1f3460]/50 hover:text-[#1f3460] transition-colors underline ml-4"
              >
                Quitar
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex gap-3">
                <input
                  id="co-descuento"
                  type="text"
                  value={codigoInput}
                  onChange={e => { setCodigoInput(e.target.value.toUpperCase()); setErrorCodigo(""); }}
                  onKeyDown={e => e.key === "Enter" && (e.preventDefault(), aplicarCodigo())}
                  placeholder="Ej: VERANO10"
                  className={`${inputClass} uppercase tracking-widest flex-1`}
                />
                <button
                  type="button"
                  onClick={aplicarCodigo}
                  disabled={validandoCodigo || !codigoInput.trim()}
                  className="px-5 py-3 bg-[#1f3460] text-white rounded-lg text-sm font-semibold hover:opacity-90 active:scale-[0.97] transition-[opacity,transform] duration-150 disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                >
                  {validandoCodigo ? "..." : "Aplicar"}
                </button>
              </div>
              {errorCodigo && (
                <p className="text-sm text-red-500">{errorCodigo}</p>
              )}
            </div>
          )}
        </section>

        {/* 4. Método de pago */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#1f3460] mb-2">Método de pago</h2>
            <p className="text-sm text-gray-500">
              Serás redirigido a una página segura de pago. Jamás guardaremos tus datos bancarios.
            </p>
          </div>

          <div className="space-y-3">
            <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${medioPago === "flow" ? "border-[#128708] bg-[#128708]/5" : "border-gray-200 hover:border-gray-300"}`}>
              <input type="radio" name="pago" value="flow" checked={medioPago === "flow"}
                onChange={e => setMedioPago(e.target.value)}
                className="w-5 h-5 text-[#128708] border-gray-300 focus:ring-[#128708]" />
              <span className="ml-3 font-medium text-[#1f3460]">Webpay / Flow</span>
            </label>

            <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${medioPago === "mercadopago" ? "border-[#128708] bg-[#128708]/5" : "border-gray-200 hover:border-gray-300"}`}>
              <input type="radio" name="pago" value="mercadopago" checked={medioPago === "mercadopago"}
                onChange={e => setMedioPago(e.target.value)}
                className="w-5 h-5 text-[#128708] border-gray-300 focus:ring-[#128708]" />
              <span className="ml-3 font-medium text-[#1f3460]">MercadoPago</span>
            </label>

            {process.env.NEXT_PUBLIC_SIMULATE_ENABLED === "true" && (
            <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${medioPago === "simulacion" ? "border-[#ee7203] bg-[#ee7203]/5" : "border-gray-200 hover:border-gray-300"}`}>
              <input type="radio" name="pago" value="simulacion" checked={medioPago === "simulacion"}
                onChange={e => setMedioPago(e.target.value)}
                className="w-5 h-5 text-[#ee7203] border-gray-300 focus:ring-[#ee7203]" />
              <div className="ml-3">
                <span className="font-medium text-[#1f3460]">Pago de prueba</span>
                <span className="ml-2 text-xs bg-[#ee7203]/15 text-[#ee7203] px-2 py-0.5 rounded-full font-medium">Solo testing</span>
              </div>
            </label>
          )}
          </div>
        </section>

        {/* Error & Submit */}
        <div className="pt-4">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm flex items-start">
              <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>{error}</p>
            </div>
          )}

          <div className="bg-[#1f3460]/5 border border-[#1f3460]/10 rounded-xl p-3 mb-6 text-center">
            <p className="text-[#1f3460]/70 font-semibold text-sm">
              Despachos disponibles esta semana
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
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Pago seguro y encriptado
          </p>
        </div>
      </form>

      {/* Modal — ¿guardar dirección actualizada? */}
      {modalGuardarDireccion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1f3460]/50 backdrop-blur-sm px-6">
          <div className="bg-white rounded-2xl border border-gray-100 max-w-sm w-full p-8">
            <h3 className="text-xl font-bold text-[#1f3460] mb-2 tracking-tight">
              ¿Actualizar tu dirección?
            </h3>
            <p className="text-sm text-gray-500 mb-8 leading-relaxed">
              La dirección de este envío es distinta a la registrada en tu cuenta.
              ¿Quieres guardarla para futuras compras?
            </p>
            <div className="space-y-3">
              <button
                onClick={() => handleAddressDecision(true)}
                className="w-full bg-[#128708] text-white py-4 rounded-full font-bold hover:opacity-90 active:scale-[0.97] transition-[opacity,transform] duration-150"
              >
                Guardar como mi dirección
              </button>
              <button
                onClick={() => handleAddressDecision(false)}
                className="w-full text-[#1f3460]/55 hover:text-[#1f3460] py-3 text-sm transition-colors duration-150"
              >
                Solo para este envío
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
