'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Building2, MapPin, Phone, Trash2, Edit, ToggleLeft, ToggleRight, CheckCircle, XCircle, X, Save } from 'lucide-react';

const mockFranchises = [
  { id: '1', name: 'SmartLab Jaipur Central', city: 'Jaipur', address: 'MI Road, Jaipur', phone: '9876543210', status: 'active', verified: true, orders: 245 },
  { id: '2', name: 'SmartLab Delhi North', city: 'Delhi', address: 'Connaught Place, Delhi', phone: '9876543211', status: 'active', verified: true, orders: 189 },
  { id: '3', name: 'SmartLab Mumbai West', city: 'Mumbai', address: 'Andheri West, Mumbai', phone: '9876543212', status: 'active', verified: false, orders: 156 },
  { id: '4', name: 'SmartLab Bengaluru', city: 'Bengaluru', address: 'MG Road, Bengaluru', phone: '9876543213', status: 'inactive', verified: true, orders: 98 },
];

export default function AdminFranchisesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [franchises, setFranchises] = useState(mockFranchises);
  const [formData, setFormData] = useState({ name: '', city: '', address: '', phone: '' });

  const filteredFranchises = franchises.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddFranchise = () => {
    if (formData.name && formData.city && formData.address && formData.phone) {
      const newFranchise = {
        id: Date.now().toString(),
        name: formData.name,
        city: formData.city,
        address: formData.address,
        phone: formData.phone,
        status: 'active',
        verified: false,
        orders: 0
      };
      setFranchises([newFranchise, ...franchises]);
      setShowAddForm(false);
      setFormData({ name: '', city: '', address: '', phone: '' });
    }
  };

  const toggleStatus = (id: string) => {
    setFranchises(franchises.map(f => f.id === id ? { ...f, status: f.status === 'active' ? 'inactive' : 'active' } : f));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Franchise Management</h1>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition-smooth flex items-center gap-2 text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Add Franchise
        </motion.button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search franchises..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white transition-smooth"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFranchises.map((franchise, index) => (
          <motion.div
            key={franchise.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="flex items-center gap-2">
                {franchise.verified ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-amber-500" />
                )}
                <span className={`px-2 py-1 text-xs rounded-full ${franchise.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                  {franchise.status}
                </span>
              </div>
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">{franchise.name}</h3>
            <div className="space-y-2 text-sm text-slate-500 mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{franchise.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>{franchise.phone}</span>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-sm text-slate-500">{franchise.orders} orders</span>
              <div className="flex items-center gap-2">
                <button onClick={() => toggleStatus(franchise.id)} className="p-2 hover:bg-slate-100 rounded-lg">
                  {franchise.status === 'active' ? <ToggleRight className="w-6 h-6 text-green-500" /> : <ToggleLeft className="w-6 h-6 text-slate-400" />}
                </button>
                <button className="p-2 hover:bg-slate-100 rounded-lg">
                  <Edit className="w-4 h-4 text-slate-600" />
                </button>
                <button className="p-2 hover:bg-red-50 rounded-lg">
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Franchise Modal */}
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
                <h2 className="text-xl font-bold text-slate-900">Add New Franchise</h2>
                <button onClick={() => setShowAddForm(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Franchise Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                    placeholder="e.g., SmartLab Jaipur Central"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                  >
                    <option value="">Select City</option>
                    <option value="Jaipur">Jaipur</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Kolkata">Kolkata</option>
                    <option value="Pune">Pune</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 resize-none"
                    placeholder="Complete address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                    placeholder="10-digit mobile number"
                    maxLength={10}
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
                  onClick={handleAddFranchise}
                  className="px-6 py-2 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition-smooth font-medium flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Add Franchise
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}