import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "SmartLab Admin Portal",
  description: "SmartLab Master Administration",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}