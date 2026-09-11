'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, CheckCircle, ArrowRight } from 'lucide-react';
import FloatingMedicalElements from '@/components/FloatingMedicalElements';

export default function PartnerPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ businessName: '', contactName: '', phone: '', email: '', city: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="relative min-h-screen">
        <FloatingMedicalElements />
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </motion.div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Application Submitted!</h1>
          <p className="text-slate-600 mb-6">Our team will contact you within 24 hours</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <FloatingMedicalElements />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-2xl flex items-center justify-center"><Building2 className="w-8 h-8 text-white" /></div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Partner With SmartLab</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Join our network of diagnostic labs and grow your business</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {[{ title: 'Increased Revenue', desc: 'Access thousands of patients through our platform' }, { title: 'Brand Recognition', desc: 'Leverage SmartLab\'s trusted brand name' }, { title: 'Easy Management', desc: 'Simple dashboard to manage orders and reports' }, { title: 'Timely Payouts', desc: 'Weekly commission payouts with complete transparency' }].map((benefit, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex items-start gap-4">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0"><CheckCircle className="w-5 h-5 text-green-600" /></div>
              <div><h3 className="font-semibold text-slate-900">{benefit.title}</h3><p className="text-sm text-slate-600">{benefit.desc}</p></div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Franchise Application</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-slate-700 mb-1">Business Name</label><input type="text" required value={formData.businessName} onChange={(e) => setFormData({ ...formData, businessName: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white" /></div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">Contact Person</label><input type="text" required value={formData.contactName} onChange={(e) => setFormData({ ...formData, contactName: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white" /></div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-slate-700 mb-1">Phone</label><input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white" /></div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">Email</label><input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white" /></div>
            </div>
            <div><label className="block text-sm font-medium text-slate-700 mb-1">City</label><input type="text" required value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white" /></div>
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Message</label><textarea rows={3} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white" placeholder="Tell us about your lab..." /></div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold rounded-xl shadow-lg flex items-center justify-center gap-2">
              Submit Application <ArrowRight className="w-5 h-5" />
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
}