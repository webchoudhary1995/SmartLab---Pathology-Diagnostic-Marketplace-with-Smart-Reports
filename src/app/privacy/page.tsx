'use client';

import { motion } from 'framer-motion';
import FloatingMedicalElements from '@/components/FloatingMedicalElements';

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen">
      <FloatingMedicalElements />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold text-slate-900 mb-8">Privacy Policy</h1>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-6 text-slate-600">
            <p>Last updated: September 2025</p>
            <section><h2 className="text-xl font-semibold text-slate-900 mb-2">1. Introduction</h2><p>At SmartLab, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data.</p></section>
            <section><h2 className="text-xl font-semibold text-slate-900 mb-2">2. Information We Collect</h2><p>We collect personal information including your name, contact details, health information, and test results. This information is necessary to provide diagnostic services and generate accurate health reports.</p></section>
            <section><h2 className="text-xl font-semibold text-slate-900 mb-2">3. How We Use Your Information</h2><p>Your information is used to provide lab testing services, generate reports, communicate test results, and improve our services. We may also use anonymized data for research and analytical purposes.</p></section>
            <section><h2 className="text-xl font-semibold text-slate-900 mb-2">4. Data Security</h2><p>We implement appropriate technical and organizational measures to protect your data against unauthorized access, alteration, disclosure, or destruction. All data is encrypted and stored securely.</p></section>
            <section><h2 className="text-xl font-semibold text-slate-900 mb-2">5. Your Rights</h2><p>You have the right to access, correct, or delete your personal information. You can also opt-out of receiving promotional communications. To exercise these rights, contact our privacy team.</p></section>
            <section><h2 className="text-xl font-semibold text-slate-900 mb-2">6. Contact Us</h2><p>If you have any questions about this Privacy Policy, please contact us at privacy@smartlab.com or call +91 98765 43210.</p></section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}