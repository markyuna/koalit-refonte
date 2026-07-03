// src/app/(site)/compte/commandes/page.tsx

import type { Metadata } from "next";
import Link from "next/link";

import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase-server";
import { formatPrice } from "@/lib/product-helpers";

export const metadata: Metadata = {
  title: "Mes commandes | Koa'lit",
};

type OrderItem = {
  id: string;
  product_name: string;
  unit_price: number;
  quantity: number;
};

type Order = {
  id: string;
  status: string;
  total_amount: number;
  created_at: string;
  order_items: OrderItem[];
};

const STATUS_LABELS: Record<string, string> = {
  en_cours: "En cours",
};

export default async function CommandesPage() {
  const user = await getCurrentUser();
  const supabase = await createClient();

  const { data: orders } = await supabase
    .from("orders")
    .select(
      "id, status, total_amount, created_at, order_items(id, product_name, unit_price, quantity)"
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const typedOrders = (orders ?? []) as unknown as Order[];

  return (
    <div className="rounded-[2rem] bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-semibold text-[var(--koalit-blue)]">
        Mes commandes
      </h1>

      {typedOrders.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-[var(--koalit-blue)]/20 p-10 text-center">
          <p className="text-neutral-600">
            Vous n&apos;avez pas encore de commande.
          </p>

          <Link
            href="/matelas"
            className="mt-6 inline-flex rounded-full bg-[var(--koalit-blue)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Découvrir nos matelas
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {typedOrders.map((order) => (
            <article
              key={order.id}
              className="rounded-2xl border border-[var(--koalit-border)] p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-neutral-500">
                    {new Date(order.created_at).toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </p>
                  <p className="mt-1 font-semibold text-[var(--koalit-blue)]">
                    {formatPrice(order.total_amount)}
                  </p>
                </div>

                <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
                  {STATUS_LABELS[order.status] ?? order.status}
                </span>
              </div>

              <ul className="mt-4 space-y-1 border-t border-[var(--koalit-border)] pt-4 text-sm text-neutral-600">
                {order.order_items.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span>
                      {item.quantity} × {item.product_name}
                    </span>
                    <span>{formatPrice(item.unit_price * item.quantity)}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
