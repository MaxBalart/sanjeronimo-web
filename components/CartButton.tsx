"use client";
import { useCart, CartItem } from "./CartContext";

export default function CartButton({ onClick }: { onClick: () => void }) {
  const { cart } = useCart();
  const cantidad = cart.reduce((acc: number, item: CartItem) => acc + item.cantidad, 0);

  return (
    <button
      onClick={onClick}
      className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#162B45]/10 active:scale-[0.92] transition-[background-color,transform] duration-150"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#162B45"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>

      <span
        suppressHydrationWarning
        className={`absolute -top-1 -right-1 bg-[#128708] text-white text-xs w-5 h-5 rounded-full items-center justify-center font-bold ${cantidad > 0 ? "flex" : "hidden"}`}
      >
        {cantidad}
      </span>
    </button>
  );
}
