import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata: Metadata = {
  title: "SmartLab - Diagnostic & Pathology Lab Marketplace",
  description: "SmartLab brings accurate lab tests to your doorstep. 100% NABL accredited labs, certified phlebotomists, and smart visual reports.",
  keywords: "lab tests, pathology, health checkup, diagnostic, NABL accredited, home sample collection",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-50">
        <AppProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </AppProvider>
      </body>
    </html>
  );
}