// src/components/account/AddressesManager.tsx

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Pencil, Plus, Star, Trash2 } from "lucide-react";

import { createClient } from "@/lib/supabase-browser";
import AddressForm, { type AddressFormValues } from "@/components/account/AddressForm";

type Address = {
  id: string;
  label: string | null;
  full_name: string | null;
  address_line1: string;
  address_line2: string | null;
  postal_code: string;
  city: string;
  country: string;
  phone: string | null;
  is_default: boolean;
};

type Props = {
  userId: string;
  initialAddresses: Address[];
};

export default function AddressesManager({ userId, initialAddresses }: Props) {
  const router = useRouter();
  const [addresses, setAddresses] = useState(initialAddresses);
  const [addingNew, setAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleCreate = async (values: AddressFormValues) => {
    setSaving(true);
    const supabase = createClient();

    const { data, error } = await supabase
      .from("addresses")
      .insert({
        user_id: userId,
        label: values.label || null,
        full_name: values.full_name || null,
        address_line1: values.address_line1,
        address_line2: values.address_line2 || null,
        postal_code: values.postal_code,
        city: values.city,
        country: values.country,
        phone: values.phone || null,
        is_default: addresses.length === 0,
      })
      .select()
      .single();

    setSaving(false);

    if (error || !data) {
      alert("Une erreur est survenue, merci de réessayer.");
      return;
    }

    setAddresses((current) => [...current, data]);
    setAddingNew(false);
    router.refresh();
  };

  const handleUpdate = async (id: string, values: AddressFormValues) => {
    setSaving(true);
    const supabase = createClient();

    const { error } = await supabase
      .from("addresses")
      .update({
        label: values.label || null,
        full_name: values.full_name || null,
        address_line1: values.address_line1,
        address_line2: values.address_line2 || null,
        postal_code: values.postal_code,
        city: values.city,
        country: values.country,
        phone: values.phone || null,
      })
      .eq("id", id);

    setSaving(false);

    if (error) {
      alert("Une erreur est survenue, merci de réessayer.");
      return;
    }

    setAddresses((current) =>
      current.map((address) =>
        address.id === id
          ? {
              ...address,
              label: values.label || null,
              full_name: values.full_name || null,
              address_line1: values.address_line1,
              address_line2: values.address_line2 || null,
              postal_code: values.postal_code,
              city: values.city,
              country: values.country,
              phone: values.phone || null,
            }
          : address
      )
    );
    setEditingId(null);
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Supprimer cette adresse ?");
    if (!confirmed) return;

    const supabase = createClient();
    const { error } = await supabase.from("addresses").delete().eq("id", id);

    if (error) {
      alert("Une erreur est survenue, merci de réessayer.");
      return;
    }

    setAddresses((current) => current.filter((address) => address.id !== id));
    router.refresh();
  };

  const handleSetDefault = async (id: string) => {
    const supabase = createClient();

    const { error: unsetError } = await supabase
      .from("addresses")
      .update({ is_default: false })
      .eq("user_id", userId)
      .neq("id", id);

    const { error: setError } = await supabase
      .from("addresses")
      .update({ is_default: true })
      .eq("id", id);

    if (unsetError || setError) {
      alert("Une erreur est survenue, merci de réessayer.");
      return;
    }

    setAddresses((current) =>
      current.map((address) => ({ ...address, is_default: address.id === id }))
    );
    router.refresh();
  };

  return (
    <div className="space-y-4">
      {addresses.map((address) =>
        editingId === address.id ? (
          <AddressForm
            key={address.id}
            initial={{
              label: address.label ?? "",
              full_name: address.full_name ?? "",
              address_line1: address.address_line1,
              address_line2: address.address_line2 ?? "",
              postal_code: address.postal_code,
              city: address.city,
              country: address.country,
              phone: address.phone ?? "",
            }}
            saving={saving}
            onCancel={() => setEditingId(null)}
            onSubmit={(values) => handleUpdate(address.id, values)}
          />
        ) : (
          <article
            key={address.id}
            className="rounded-2xl border border-[var(--koalit-border)] bg-white p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-[var(--koalit-blue)]">
                    {address.label || "Adresse"}
                  </h3>
                  {address.is_default && (
                    <span className="rounded-full bg-[var(--koalit-gold)]/20 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[var(--koalit-blue)]">
                      Par défaut
                    </span>
                  )}
                </div>

                <div className="mt-2 space-y-0.5 text-sm text-neutral-600">
                  {address.full_name && <p>{address.full_name}</p>}
                  <p>{address.address_line1}</p>
                  {address.address_line2 && <p>{address.address_line2}</p>}
                  <p>
                    {address.postal_code} {address.city}, {address.country}
                  </p>
                  {address.phone && <p>{address.phone}</p>}
                </div>
              </div>

              <div className="flex shrink-0 gap-2">
                {!address.is_default && (
                  <button
                    type="button"
                    onClick={() => handleSetDefault(address.id)}
                    title="Définir par défaut"
                    aria-label="Définir par défaut"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--koalit-cream)] text-[var(--koalit-blue)] transition hover:bg-[var(--koalit-blue)] hover:text-white"
                  >
                    <Star className="h-4 w-4" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setEditingId(address.id)}
                  title="Modifier"
                  aria-label="Modifier"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--koalit-cream)] text-[var(--koalit-blue)] transition hover:bg-[var(--koalit-blue)] hover:text-white"
                >
                  <Pencil className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(address.id)}
                  title="Supprimer"
                  aria-label="Supprimer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-600 transition hover:bg-red-600 hover:text-white"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </article>
        )
      )}

      {addingNew ? (
        <AddressForm
          saving={saving}
          onCancel={() => setAddingNew(false)}
          onSubmit={handleCreate}
        />
      ) : (
        <button
          type="button"
          onClick={() => setAddingNew(true)}
          className="inline-flex items-center gap-2 rounded-full border border-dashed border-[var(--koalit-blue)]/30 px-6 py-3 text-sm font-semibold text-[var(--koalit-blue)] transition hover:bg-[var(--koalit-blue-soft)]"
        >
          <Plus className="h-4 w-4" />
          Ajouter une adresse
        </button>
      )}

      {addresses.length === 0 && !addingNew && (
        <p className="text-sm text-neutral-500">
          Vous n&apos;avez pas encore enregistré d&apos;adresse.
        </p>
      )}
    </div>
  );
}
