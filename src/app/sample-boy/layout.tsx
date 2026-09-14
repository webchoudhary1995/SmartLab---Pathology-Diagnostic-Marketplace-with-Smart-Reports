import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "SmartLab Sample Boy Portal",
  description: "SmartLab Sample Collection App",
};

export default function SampleBoyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}