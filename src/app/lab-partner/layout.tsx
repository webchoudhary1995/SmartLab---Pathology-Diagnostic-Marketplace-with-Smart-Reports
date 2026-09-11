import type { Metadata } from "next";
import "@/app/globals.css";
import LabPartnerHeader from "@/components/labpartner/LabPartnerHeader";

export const metadata: Metadata = {
  title: "SmartLab Lab Partner Portal",
  description: "SmartLab Franchise Partner Dashboard",
};

export default function LabPartnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-50">
        <LabPartnerHeader />
        <main className="flex-1 pt-0">
          {children}
        </main>
      </body>
    </html>
  );
}