'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Phone, Award, Star } from 'lucide-react';
import FloatingMedicalElements from '@/components/FloatingMedicalElements';
import { franchises } from '@/data/mockData';

export default function LabsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLabs = franchises.filter(lab =>
    lab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lab.cityName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-screen">
      <FloatingMedicalElements />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Find Labs Near You</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Visit our partner labs for sample collection or walk-in testing</p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input type="text" placeholder="Search by city or lab name..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLabs.map((lab, index) => (
            <motion.div key={lab.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-cyan-600" />
                </div>
                {lab.verified && <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Verified</span>}
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">{lab.name}</h3>
              <div className="space-y-2 text-sm text-slate-600 mb-4">
                <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-slate-400" /> {lab.address}</p>
                <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-slate-400" /> {lab.phone}</p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < 4 ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`} />)}
                  <span className="text-sm text-slate-500 ml-1">4.8</span>
                </div>
                <button className="text-cyan-600 font-medium text-sm hover:text-cyan-700">Get Directions</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}