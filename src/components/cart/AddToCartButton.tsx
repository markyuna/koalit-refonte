// src/components/cart/AddToCartButton.tsx

"use client";

import { Check, ShoppingCart } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

import { useCart, type CartItem } from "@/lib/cart-context";

type Props = {
  product: Omit<CartItem, "quantity">;
  isBranded: boolean;
};

export default function AddToCartButton({ product, isBranded }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={clsx(
        "mt-2 flex w-full items-center justify-center gap-2 rounded-full px-5 py-2 text-[11px] font-medium uppercase tracking-[0.12em] transition-colors",
        isBranded
          ? "bg-white/10 text-white hover:bg-white/20"
          : "bg-slate-100 text-[#103a63] hover:bg-slate-200"
      )}
    >
      {added ? <Check className="h-3.5 w-3.5" /> : <ShoppingCart className="h-3.5 w-3.5" />}
      {added ? "Ajouté !" : "Ajouter au panier"}
    </button>
  );
}
