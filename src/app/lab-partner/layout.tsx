import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "SmartLab Lab Partner Portal",
  description: "SmartLab Franchise Partner Dashboard",
};

export default function LabPartnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}