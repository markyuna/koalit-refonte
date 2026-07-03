// src/components/account/AddressForm.tsx

"use client";

import { authInputClass, authLabelClass } from "@/lib/form-styles";

export type AddressFormValues = {
  label: string;
  full_name: string;
  address_line1: string;
  address_line2: string;
  postal_code: string;
  city: string;
  country: string;
  phone: string;
};

type Props = {
  initial?: Partial<AddressFormValues>;
  onSubmit: (values: AddressFormValues) => void;
  onCancel: () => void;
  saving: boolean;
};

export default function AddressForm({ initial, onSubmit, onCancel, saving }: Props) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    onSubmit({
      label: String(formData.get("label") ?? "").trim(),
      full_name: String(formData.get("full_name") ?? "").trim(),
      address_line1: String(formData.get("address_line1") ?? "").trim(),
      address_line2: String(formData.get("address_line2") ?? "").trim(),
      postal_code: String(formData.get("postal_code") ?? "").trim(),
      city: String(formData.get("city") ?? "").trim(),
      country: String(formData.get("country") ?? "France").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-[var(--koalit-border)] bg-[var(--koalit-cream)] p-5"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="label" className={authLabelClass}>
            Nom de l&apos;adresse
          </label>
          <input
            id="label"
            name="label"
            type="text"
            defaultValue={initial?.label ?? ""}
            placeholder="Domicile, Bureau..."
            className={authInputClass}
          />
        </div>

        <div>
          <label htmlFor="full_name" className={authLabelClass}>
            Nom complet
          </label>
          <input
            id="full_name"
            name="full_name"
            type="text"
            defaultValue={initial?.full_name ?? ""}
            className={authInputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="address_line1" className={authLabelClass}>
          Adresse
        </label>
        <input
          id="address_line1"
          name="address_line1"
          type="text"
          defaultValue={initial?.address_line1 ?? ""}
          required
          className={authInputClass}
        />
      </div>

      <div>
        <label htmlFor="address_line2" className={authLabelClass}>
          Complément d&apos;adresse
        </label>
        <input
          id="address_line2"
          name="address_line2"
          type="text"
          defaultValue={initial?.address_line2 ?? ""}
          className={authInputClass}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="postal_code" className={authLabelClass}>
            Code postal
          </label>
          <input
            id="postal_code"
            name="postal_code"
            type="text"
            defaultValue={initial?.postal_code ?? ""}
            required
            className={authInputClass}
          />
        </div>

        <div>
          <label htmlFor="city" className={authLabelClass}>
            Ville
          </label>
          <input
            id="city"
            name="city"
            type="text"
            defaultValue={initial?.city ?? ""}
            required
            className={authInputClass}
          />
        </div>

        <div>
          <label htmlFor="country" className={authLabelClass}>
            Pays
          </label>
          <input
            id="country"
            name="country"
            type="text"
            defaultValue={initial?.country ?? "France"}
            required
            className={authInputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className={authLabelClass}>
          Téléphone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          defaultValue={initial?.phone ?? ""}
          placeholder="06 12 34 56 78"
          className={authInputClass}
        />
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-[var(--koalit-blue)]/15 px-6 py-3 text-sm font-semibold text-[var(--koalit-blue)] transition hover:bg-white"
        >
          Annuler
        </button>

        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-[var(--koalit-blue)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Enregistrement..." : "Enregistrer"}
        </button>
      </div>
    </form>
  );
}
