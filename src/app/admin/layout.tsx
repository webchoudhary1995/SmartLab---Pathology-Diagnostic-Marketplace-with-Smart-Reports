import type { Metadata } from "next";
import "./globals.css";
import AdminHeader from "@/components/admin/AdminHeader";

export const metadata: Metadata = {
  title: "SmartLab Admin Portal",
  description: "SmartLab Master Administration",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-50">
        <AdminHeader />
        <main className="flex-1 pt-0">
          {children}
        </main>
      </body>
    </html>
  );
}