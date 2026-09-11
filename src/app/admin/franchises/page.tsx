'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Building2, MapPin, Phone, Edit, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import { franchises, cities } from '@/data/mockData';

export default function AdminFranchisesPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [franchiseList, setFranchiseList] = useState(franchises);
  const [newFranchise, setNewFranchise] = useState({
    name: '',
    cityId: '',
    address: '',
    phone: '',
    commission: 20,
  });

  const filteredFranchises = franchiseList.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.cityName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleActive = (id: string) => {
    setFranchiseList(prev => prev.map(f => 
      f.id === id ? { ...f, active: !f.active } : f
    ));
  };

  const addFranchise = () => {
    const city = cities.find(c => c.id === newFranchise.cityId);
    const newId = `f${franchiseList.length + 1}`;
    setFranchiseList([...franchiseList, {
      id: newId,
      ...newFranchise,
      cityName: city?.name || '',
      active: true,
      verified: false,
    }]);
    setShowAddForm(false);
    setNewFranchise({ name: '', cityId: '', address: '', phone: '', commission: 20 });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Franchise Management</h1>
              <p className="text-slate-500">Manage lab partners across cities</p>
            </div>
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
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Search */}
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

        {/* Franchise List */}
        <div className="grid gap-4">
          {filteredFranchises.map((franchise, index) => (
            <motion.div
              key={franchise.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${franchise.active ? 'bg-cyan-100 text-cyan-600' : 'bg-slate-100 text-slate-400'}`}>
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-900">{franchise.name}</h3>
                      {franchise.verified && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">Verified</span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {franchise.cityName}</span>
                      <span className="flex items-center gap-1"><Phone className="w-4 h-4" /> {franchise.phone}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-slate-500">Commission</p>
                    <p className="font-semibold text-slate-900">{franchise.commission}%</p>
                  </div>
                  <button
                    onClick={() => toggleActive(franchise.id)}
                    className="p-2 rounded-xl hover:bg-slate-100 transition-smooth"
                  >
                    {franchise.active ? (
                      <ToggleRight className="w-8 h-8 text-green-600" />
                    ) : (
                      <ToggleLeft className="w-8 h-8 text-slate-400" />
                    )}
                  </button>
                  <button className="p-2 rounded-xl hover:bg-slate-100 transition-smooth text-slate-400 hover:text-slate-600">
                    <Edit className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Add Franchise Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl shadow-xl max-w-md w-full p-6"
          >
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Add New Franchise</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Franchise Name</label>
                <input
                  type="text"
                  value={newFranchise.name}
                  onChange={(e) => setNewFranchise({ ...newFranchise, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white transition-smooth"
                  placeholder="SmartLab Jaipur Central"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                <select
                  value={newFranchise.cityId}
                  onChange={(e) => setNewFranchise({ ...newFranchise, cityId: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white transition-smooth"
                >
                  <option value="">Select City</option>
                  {cities.map(city => (
                    <option key={city.id} value={city.id}>{city.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                <input
                  type="text"
                  value={newFranchise.address}
                  onChange={(e) => setNewFranchise({ ...newFranchise, address: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white transition-smooth"
                  placeholder="123, Main Road"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={newFranchise.phone}
                  onChange={(e) => setNewFranchise({ ...newFranchise, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white transition-smooth"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Commission (%)</label>
                <input
                  type="number"
                  value={newFranchise.commission}
                  onChange={(e) => setNewFranchise({ ...newFranchise, commission: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white transition-smooth"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-smooth font-medium"
              >
                Cancel
              </button>
              <button
                onClick={addFranchise}
                className="flex-1 px-4 py-3 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition-smooth font-medium"
              >
                Add Franchise
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}