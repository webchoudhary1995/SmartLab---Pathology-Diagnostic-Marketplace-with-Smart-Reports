'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, CheckCircle, Phone, FileText, ArrowRight } from 'lucide-react';
import FloatingMedicalElements from '@/components/FloatingMedicalElements';

export default function UploadPrescriptionPage() {
  const [file, setFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', notes: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="relative min-h-screen">
        <FloatingMedicalElements />
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center"
          >
            <CheckCircle className="w-12 h-12 text-green-600" />
          </motion.div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Request Received!</h1>
          <p className="text-slate-600 mb-6">Our health expert will call you within 30 minutes</p>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 text-left">
            <p className="text-sm text-slate-500 mb-2">Reference Number</p>
            <p className="text-2xl font-bold text-cyan-600">RX-{Date.now().toString().slice(-8)}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <FloatingMedicalElements />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-2">
            Upload Prescription
          </h1>
          <p className="text-slate-600 text-center mb-8">
            Get a customized package recommendation from our experts
          </p>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Upload Prescription</label>
                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:border-cyan-400 transition-smooth cursor-pointer relative">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="space-y-3">
                    <div className="w-16 h-16 mx-auto bg-cyan-100 rounded-2xl flex items-center justify-center">
                      <Upload className="w-8 h-8 text-cyan-600" />
                    </div>
                    {file ? (
                      <p className="font-medium text-green-600">{file.name}</p>
                    ) : (
                      <>
                        <p className="text-slate-700 font-medium">Drag & drop your prescription</p>
                        <p className="text-slate-500 text-sm">PDF, JPG, PNG up to 10MB</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white transition-smooth"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white transition-smooth"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Additional Notes</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white transition-smooth"
                  placeholder="Any specific tests or concerns..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-smooth flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Get Free Consultation
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <p className="text-center text-xs text-slate-500">
                Our team will call you within 30 minutes with package recommendations
              </p>
            </form>
          </div>

          {/* Benefits */}
          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            {[
              { icon: FileText, title: 'Free Review', desc: 'Experts review your prescription' },
              { icon: CheckCircle, title: 'Best Prices', desc: 'Get exclusive discounts' },
              { icon: Phone, title: 'Quick Support', desc: 'Call within 30 mins' },
            ].map((benefit, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 text-center">
                <benefit.icon className="w-6 h-6 text-cyan-600 mx-auto mb-2" />
                <p className="font-medium text-slate-900 text-sm">{benefit.title}</p>
                <p className="text-xs text-slate-500">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}