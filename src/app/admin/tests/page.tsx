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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Test & Package Master</h1>
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
  );
}