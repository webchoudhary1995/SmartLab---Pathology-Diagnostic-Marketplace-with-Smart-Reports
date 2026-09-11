'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, User, Phone, Car, MapPin, ToggleLeft, ToggleRight, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function LabPartnerFleetPage() {
  const { phlebotomists } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);
  const [fleet, setFleet] = useState(phlebotomists);
  const [newPhlebotomist, setNewPhlebotomist] = useState({ name: '', phone: '', vehicleNumber: '', sector: '' });

  const toggleActive = (id: string) => {
    setFleet(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));
  };

  const addPhlebotomist = () => {
    const newId = `ph${fleet.length + 1}`;
    setFleet([...fleet, { id: newId, ...newPhlebotomist, photo: '', franchiseId: 'f1', active: true }]);
    setShowAddForm(false);
    setNewPhlebotomist({ name: '', phone: '', vehicleNumber: '', sector: '' });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-cyan-600 to-indigo-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Sample Boy Fleet</h1>
            <p className="text-cyan-100">Manage phlebotomists</p>
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setShowAddForm(true)} className="px-4 py-2 bg-white text-cyan-600 rounded-xl font-medium flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Phlebotomist
          </motion.button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fleet.map((phlebotomist, index) => (
            <motion.div key={phlebotomist.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className={`bg-white rounded-2xl shadow-sm border border-slate-200 p-6 ${!phlebotomist.active ? 'opacity-60' : ''}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-cyan-600" />
                </div>
                <button onClick={() => toggleActive(phlebotomist.id)} className="text-slate-400">
                  {phlebotomist.active ? <ToggleRight className="w-8 h-8 text-green-600" /> : <ToggleLeft className="w-8 h-8 text-slate-300" />}
                </button>
              </div>
              <h3 className="font-semibold text-slate-900 mb-3">{phlebotomist.name}</h3>
              <div className="space-y-2 text-sm text-slate-600">
                <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-slate-400" /> {phlebotomist.phone}</p>
                <p className="flex items-center gap-2"><Car className="w-4 h-4 text-slate-400" /> {phlebotomist.vehicleNumber}</p>
                <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-slate-400" /> {phlebotomist.sector}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-3xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-900">Add Phlebotomist</h2>
              <button onClick={() => setShowAddForm(false)} className="p-2 rounded-xl hover:bg-slate-100"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium text-slate-700 mb-1">Name</label><input type="text" value={newPhlebotomist.name} onChange={(e) => setNewPhlebotomist({ ...newPhlebotomist, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white" /></div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">Phone</label><input type="tel" value={newPhlebotomist.phone} onChange={(e) => setNewPhlebotomist({ ...newPhlebotomist, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white" /></div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">Vehicle Number</label><input type="text" value={newPhlebotomist.vehicleNumber} onChange={(e) => setNewPhlebotomist({ ...newPhlebotomist, vehicleNumber: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white" /></div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">Sector</label><input type="text" value={newPhlebotomist.sector} onChange={(e) => setNewPhlebotomist({ ...newPhlebotomist, sector: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white" /></div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowAddForm(false)} className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium">Cancel</button>
              <button onClick={addPhlebotomist} className="flex-1 px-4 py-3 bg-cyan-500 text-white rounded-xl font-medium">Add</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}