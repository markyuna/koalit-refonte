import type { Metadata } from "next";

import AdminNavbar from "@/components/admin/AdminNavbar";

// Already disallowed in robots.ts -- noindex here too as defense in depth.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminNavbar />
      {children}
    </>
  );
}
