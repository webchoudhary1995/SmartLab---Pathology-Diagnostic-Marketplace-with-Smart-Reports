import type { Metadata } from "next";
import "@/app/globals.css";
import SampleBoyHeader from "@/components/sampleboy/SampleBoyHeader";

export const metadata: Metadata = {
  title: "SmartLab Sample Boy Portal",
  description: "SmartLab Sample Collection App",
};

export default function SampleBoyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-gradient-to-br from-green-50 to-emerald-50">
        <SampleBoyHeader />
        <main className="flex-1 pt-0">
          {children}
        </main>
      </body>
    </html>
  );
}