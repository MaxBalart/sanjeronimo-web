"use client";
import { useCart } from "./CartContext";
import { CartItem } from "./CartContext";
import { WHATSAPP_NUMBER } from "../lib/constants";

export default function CartPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { cart, addToCart, removeFromCart, total } = useCart();

  return (
    <>
      {open && (
        <div onClick={onClose} className="fixed inset-0 bg-black/40 z-40" />
      )}

      <div
        className={`fixed top-0 right-0 w-80 h-full bg-white z-50 shadow-xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b flex justify-between">
          <h2 className="font-bold">Carrito</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="p-4 space-y-4">
          {cart.length === 0 && <p>Carrito vacío</p>}

          {cart.map((item: CartItem) => (
            <div key={item.nombre} className="flex justify-between items-center">
              <div>
                <p>{item.nombre}</p>
                <p className="text-sm text-gray-500">
                  ${item.precio.toLocaleString("es-CL")} x {item.cantidad}
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => removeFromCart(item.nombre)}>-</button>
                <button onClick={() => addToCart(item)}>+</button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t">
          <p className="font-bold mb-2">Total: ${total.toLocaleString("es-CL")}</p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola%21%20Quiero%20finalizar%20mi%20pedido%20de%20Sour%20San%20Jer%C3%B3nimo%20por%20%24${total.toLocaleString("es-CL")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-[#162B45] text-white py-2 rounded-full hover:opacity-90 transition"
          >
            Finalizar compra
          </a>
        </div>
      </div>
    </>
  );
}
