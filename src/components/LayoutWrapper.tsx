'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminHeader from '@/components/admin/AdminHeader';
import LabPartnerHeader from '@/components/labpartner/LabPartnerHeader';
import SampleBoyHeader from '@/components/sampleboy/SampleBoyHeader';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Check if we're in a portal
  const isAdminPortal = pathname.startsWith('/admin');
  const isLabPartnerPortal = pathname.startsWith('/lab-partner');
  const isSampleBoyPortal = pathname.startsWith('/sample-boy');
  
  // Portals have their own headers
  if (isAdminPortal) {
    return (
      <>
        <AdminHeader />
        <main className="flex-1 pt-0">{children}</main>
      </>
    );
  }
  
  if (isLabPartnerPortal) {
    return (
      <>
        <LabPartnerHeader />
        <main className="flex-1 pt-0">{children}</main>
      </>
    );
  }
  
  if (isSampleBoyPortal) {
    return (
      <>
        <SampleBoyHeader />
        <main className="flex-1 pt-0">{children}</main>
      </>
    );
  }
  
  // Main website - show website header/footer
  return (
    <>
      <Header />
      <main className="flex-1 pt-16 md:pt-20 relative">
        {children}
      </main>
      <Footer />
    </>
  );
}