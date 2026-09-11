'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle } from 'lucide-react';
import FloatingMedicalElements from '@/components/FloatingMedicalElements';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

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
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Message Sent!</h1>
          <p className="text-slate-600 mb-6">We'll get back to you within 24 hours</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <FloatingMedicalElements />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Contact Us</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">We'd love to hear from you. Get in touch with our team</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-slate-700 mb-1">Name</label><input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white" /></div>
                  <div><label className="block text-sm font-medium text-slate-700 mb-1">Phone</label><input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white" /></div>
                </div>
                <div><label className="block text-sm font-medium text-slate-700 mb-1">Email</label><input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white" /></div>
                <div><label className="block text-sm font-medium text-slate-700 mb-1">Message</label><textarea rows={4} required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white" placeholder="How can we help?" /></div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold rounded-xl shadow-lg flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" /> Send Message
                </motion.button>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center"><Phone className="w-6 h-6 text-cyan-600" /></div>
                  <div><p className="font-medium text-slate-900">Phone</p><p className="text-slate-600">+91 98765 43210</p></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center"><Mail className="w-6 h-6 text-cyan-600" /></div>
                  <div><p className="font-medium text-slate-900">Email</p><p className="text-slate-600">care@smartlab.com</p></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center"><MapPin className="w-6 h-6 text-cyan-600" /></div>
                  <div><p className="font-medium text-slate-900">Address</p><p className="text-slate-600">123, MI Road, Jaipur, Rajasthan 302001</p></div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-2xl p-6 md:p-8 text-white">
              <div className="flex items-center gap-4 mb-4">
                <MessageCircle className="w-8 h-8" />
                <h3 className="text-xl font-semibold">Live Chat</h3>
              </div>
              <p className="text-cyan-100 mb-4">Chat with our support team for instant assistance</p>
              <button className="px-6 py-3 bg-white text-cyan-600 font-semibold rounded-xl hover:bg-cyan-50 transition-smooth">Start Chat</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}