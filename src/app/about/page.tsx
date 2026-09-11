'use client';

import { motion } from 'framer-motion';
import { Shield, Award, Clock, Users, Heart, Stethoscope } from 'lucide-react';
import FloatingMedicalElements from '@/components/FloatingMedicalElements';

export default function AboutPage() {
  return (
    <div className="relative min-h-screen">
      <FloatingMedicalElements />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">About SmartLab</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Revolutionizing diagnostic healthcare with technology and compassion</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Making Healthcare Accessible</h2>
            <p className="text-slate-600 mb-4">SmartLab was founded with a simple mission: to make quality diagnostic testing accessible to everyone. We believe that preventive healthcare should be convenient, affordable, and stress-free.</p>
            <p className="text-slate-600">Our platform connects patients with NABL-accredited laboratories, expert phlebotomists, and provides intelligent health reports that are easy to understand.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-3xl p-8 text-white">
            <div className="grid grid-cols-2 gap-6">
              {[{ value: '50K+', label: 'Happy Customers' }, { value: '100+', label: 'Cities Covered' }, { value: '24/7', label: 'Customer Support' }, { value: '99.9%', label: 'Accuracy Rate' }].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-cyan-100 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">Why Choose SmartLab</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[{ icon: Shield, title: 'NABL Accredited', desc: 'International quality standards for accurate results' }, { icon: Clock, title: 'Home Collection', desc: 'Sample collection from your doorstep' }, { icon: Stethoscope, title: 'Expert Review', desc: 'Reports reviewed by certified doctors' }, { icon: Heart, title: 'Patient First', desc: 'Dedicated support throughout your journey' }].map((feature, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 text-center">
                <div className="w-14 h-14 mx-auto mb-4 bg-cyan-100 rounded-2xl flex items-center justify-center"><feature.icon className="w-7 h-7 text-cyan-600" /></div>
                <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-3xl p-8 md:p-12 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Join Our Network</h2>
          <p className="text-cyan-100 mb-6 max-w-2xl mx-auto">Partner with SmartLab to grow your diagnostic business. Join hundreds of labs across India.</p>
          <a href="/partner" className="inline-block px-8 py-3 bg-white text-cyan-600 font-semibold rounded-xl hover:bg-cyan-50 transition-smooth">Partner With Us</a>
        </div>
      </div>
    </div>
  );
}