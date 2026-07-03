// src/app/admin/commandes/page.tsx

import { createAdminClient } from "@/lib/supabase-admin";
import { formatPrice } from "@/lib/product-helpers";
import DeleteOrderButton from "@/components/admin/DeleteOrderButton";

// Always fetch fresh orders -- without this, admins would never see
// new orders placed by customers until the next deploy.
export const dynamic = "force-dynamic";

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
  user_id: string;
  order_items: OrderItem[];
};

const STATUS_LABELS: Record<string, string> = {
  en_cours: "En cours",
};

export default async function AdminCommandesPage() {
  const admin = createAdminClient();

  const { data: orders, error } = await admin
    .from("orders")
    .select(
      "id, status, total_amount, created_at, user_id, order_items(id, product_name, unit_price, quantity)"
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erreur chargement commandes:", error);
  }

  const { data: usersData } = await admin.auth.admin.listUsers();
  const emailByUserId = new Map(
    usersData?.users.map((user) => [user.id, user.email]) ?? []
  );

  const typedOrders = (orders ?? []) as unknown as Order[];

  return (
    <main className="min-h-screen bg-[#f8f6f1]">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="text-4xl font-bold text-[#103a63]">Commandes</h1>
        <p className="mt-3 text-slate-600">
          Commandes passées par les clients depuis leur compte.
        </p>

        <div className="mt-10 overflow-hidden rounded-[2rem] bg-white shadow-sm">
          {typedOrders.length === 0 ? (
            <p className="p-8 text-slate-500">
              Aucune commande pour le moment.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left">
                <thead className="bg-[#103a63] text-white">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold">Date</th>
                    <th className="px-6 py-4 text-sm font-semibold">Client</th>
                    <th className="px-6 py-4 text-sm font-semibold">Articles</th>
                    <th className="px-6 py-4 text-sm font-semibold">Total</th>
                    <th className="px-6 py-4 text-sm font-semibold">Statut</th>
                    <th className="px-6 py-4 text-sm font-semibold">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {typedOrders.map((order) => (
                    <tr key={order.id} className="border-b border-slate-100 last:border-b-0">
                      <td className="px-6 py-5 text-sm text-slate-600">
                        {new Date(order.created_at).toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </td>

                      <td className="px-6 py-5 text-sm text-slate-600">
                        {emailByUserId.get(order.user_id) ?? order.user_id}
                      </td>

                      <td className="px-6 py-5 text-sm text-slate-600">
                        <ul className="space-y-1">
                          {order.order_items.map((item) => (
                            <li key={item.id}>
                              {item.quantity} × {item.product_name}
                            </li>
                          ))}
                        </ul>
                      </td>

                      <td className="px-6 py-5 font-semibold text-[#103a63]">
                        {formatPrice(order.total_amount)}
                      </td>

                      <td className="px-6 py-5">
                        <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
                          {STATUS_LABELS[order.status] ?? order.status}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <DeleteOrderButton orderId={order.id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
