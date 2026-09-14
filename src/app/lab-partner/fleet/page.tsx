'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, Search, Phone, MapPin, Truck, ToggleLeft, ToggleRight, Edit, Trash2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function LabPartnerFleetPage() {
  const { phlebotomists } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPhlebotomists = phlebotomists.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.phone.includes(searchQuery)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Sample Boy Fleet</h1>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition-smooth flex items-center gap-2 text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Add Phlebotomist
        </motion.button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search phlebotomists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white transition-smooth"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhlebotomists.map((phlebotomist, index) => (
          <motion.div
            key={phlebotomist.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {phlebotomist.name.charAt(0)}
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${phlebotomist.active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                {phlebotomist.active ? 'Active' : 'Inactive'}
              </span>
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">{phlebotomist.name}</h3>
            <div className="space-y-2 text-sm text-slate-500 mb-4">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>{phlebotomist.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4" />
                <span>RJ-01-AB-1234</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Jaipur Sector 1</span>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button className="p-2 hover:bg-slate-100 rounded-lg transition-smooth">
                <Edit className="w-4 h-4 text-slate-600" />
              </button>
              <button className="p-2 hover:bg-red-50 rounded-lg transition-smooth">
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}