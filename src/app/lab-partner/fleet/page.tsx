'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Plus, Search, Phone, MapPin, Truck, Edit, Trash2, X, Save } from 'lucide-react';

const mockPhlebotomists = [
  { id: '1', name: 'Rajesh Kumar', phone: '9876543210', vehicleNumber: 'RJ-01-AB-1234', assignedArea: 'Jaipur Sector 1', active: true },
  { id: '2', name: 'Amit Singh', phone: '9876543211', vehicleNumber: 'RJ-01-CD-5678', assignedArea: 'Jaipur Sector 2', active: true },
  { id: '3', name: 'Suresh Sharma', phone: '9876543212', vehicleNumber: 'RJ-01-EF-9012', assignedArea: 'Jaipur Sector 3', active: false },
];

export default function LabPartnerFleetPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [phlebotomists, setPhlebotomists] = useState(mockPhlebotomists);
  const [newPhlebotomist, setNewPhlebotomist] = useState({ name: '', phone: '', vehicleNumber: '', assignedArea: '' });

  const filteredPhlebotomists = phlebotomists.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.phone.includes(searchQuery)
  );

  const handleAddPhlebotomist = () => {
    if (newPhlebotomist.name && newPhlebotomist.phone) {
      const newItem = {
        id: Date.now().toString(),
        ...newPhlebotomist,
        active: true
      };
      setPhlebotomists([newItem, ...phlebotomists]);
      setShowAddForm(false);
      setNewPhlebotomist({ name: '', phone: '', vehicleNumber: '', assignedArea: '' });
    }
  };

  const toggleActive = (id: string) => {
    setPhlebotomists(phlebotomists.map(p => p.id === id ? { ...p, active: !p.active } : p));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Sample Boy Fleet</h1>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAddForm(true)}
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
              <button 
                onClick={() => toggleActive(phlebotomist.id)}
                className={`px-2 py-1 text-xs rounded-full cursor-pointer ${phlebotomist.active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}
              >
                {phlebotomist.active ? 'Active' : 'Inactive'}
              </button>
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">{phlebotomist.name}</h3>
            <div className="space-y-2 text-sm text-slate-500 mb-4">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>{phlebotomist.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4" />
                <span>{phlebotomist.vehicleNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{phlebotomist.assignedArea}</span>
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

      {/* Add Phlebotomist Modal */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">Add New Phlebotomist</h2>
                <button onClick={() => setShowAddForm(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={newPhlebotomist.name}
                    onChange={(e) => setNewPhlebotomist({ ...newPhlebotomist, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={newPhlebotomist.phone}
                    onChange={(e) => setNewPhlebotomist({ ...newPhlebotomist, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                    placeholder="10-digit mobile number"
                    maxLength={10}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Vehicle Number</label>
                  <input
                    type="text"
                    value={newPhlebotomist.vehicleNumber}
                    onChange={(e) => setNewPhlebotomist({ ...newPhlebotomist, vehicleNumber: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                    placeholder="RJ-01-AB-1234"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Assigned Area</label>
                  <input
                    type="text"
                    value={newPhlebotomist.assignedArea}
                    onChange={(e) => setNewPhlebotomist({ ...newPhlebotomist, assignedArea: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                    placeholder="e.g., Jaipur Sector 1"
                  />
                </div>
              </div>
              <div className="p-6 border-t border-slate-200 flex justify-end gap-3">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-smooth"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddPhlebotomist}
                  className="px-6 py-2 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition-smooth font-medium flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Phlebotomist
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}