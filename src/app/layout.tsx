import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
          <Header />
          <main className="flex-1 pt-16 md:pt-20 relative">
            {children}
          </main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}