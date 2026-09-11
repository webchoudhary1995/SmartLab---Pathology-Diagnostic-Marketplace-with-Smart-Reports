'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, FlaskConical, Trash2, Edit, X } from 'lucide-react';
import { packages as allPackages } from '@/data/mockData';

export default function AdminTestsPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [packagesList, setPackagesList] = useState(allPackages);
  const [selectedPackage, setSelectedPackage] = useState<typeof allPackages[0] | null>(null);

  const filteredPackages = packagesList.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Test & Package Master</h1>
              <p className="text-slate-500">Manage tests, packages, and parameters</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition-smooth flex items-center gap-2 text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Test/Package
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
              placeholder="Search tests or packages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white transition-smooth"
            />
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedPackage(pkg)}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 cursor-pointer card-hover"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
                  <FlaskConical className="w-6 h-6 text-cyan-600" />
                </div>
                <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full capitalize">
                  {pkg.category.replace('-', ' ')}
                </span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">{pkg.name}</h3>
              <p className="text-sm text-slate-500 mb-4 line-clamp-2">{pkg.description}</p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-slate-400 line-through">₹{pkg.originalPrice}</span>
                  <span className="ml-2 text-lg font-bold text-cyan-600">₹{pkg.discountedPrice}</span>
                </div>
                <span className="text-sm text-slate-500">{pkg.parameters.length} params</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Package Detail Modal */}
      {selectedPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">{selectedPackage.name}</h2>
                <p className="text-slate-500 capitalize">{selectedPackage.category.replace('-', ' ')}</p>
              </div>
              <button onClick={() => setSelectedPackage(null)} className="p-2 rounded-xl hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl font-bold text-cyan-600">₹{selectedPackage.discountedPrice}</span>
                <span className="text-lg text-slate-400 line-through">₹{selectedPackage.originalPrice}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedPackage.fastingRequired && (
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 text-sm rounded-full">Fasting Required</span>
                )}
                <span className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full">
                  {selectedPackage.parameters.length} Parameters
                </span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-4">Parameters</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {selectedPackage.parameters.map((param) => (
                  <div key={param.id} className="p-3 bg-slate-50 rounded-xl flex justify-between items-center">
                    <span className="font-medium text-slate-900">{param.name}</span>
                    <span className="text-sm text-slate-500">{param.minNormal} - {param.maxNormal} {param.unit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 border-t border-slate-200 flex gap-3">
              <button className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-smooth font-medium flex items-center justify-center gap-2">
                <Edit className="w-4 h-4" />
                Edit Package
              </button>
              <button className="px-4 py-3 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-smooth">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Add Package Form (Simplified) */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl shadow-xl max-w-lg w-full p-6"
          >
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Add New Package</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Package Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white transition-smooth" placeholder="Complete Blood Picture" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <select className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white transition-smooth">
                  <option>Full Body</option>
                  <option>Diabetes</option>
                  <option>Heart</option>
                  <option>Women</option>
                  <option>Senior</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Original Price</label>
                  <input type="number" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white transition-smooth" placeholder="2999" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Discounted Price</label>
                  <input type="number" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white transition-smooth" placeholder="1499" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea rows={3} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white transition-smooth" placeholder="Package description..." />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowAddForm(false)} className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-smooth font-medium">
                Cancel
              </button>
              <button onClick={() => setShowAddForm(false)} className="flex-1 px-4 py-3 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition-smooth font-medium">
                Create Package
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}