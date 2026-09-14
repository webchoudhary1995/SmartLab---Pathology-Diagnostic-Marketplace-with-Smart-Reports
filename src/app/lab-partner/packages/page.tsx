'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Search, ToggleLeft, ToggleRight, IndianRupee, Edit2 } from 'lucide-react';
import { packages as allPackages } from '@/data/mockData';

export default function LabPartnerPackagesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [packagesList, setPackagesList] = useState(allPackages.map(pkg => ({ ...pkg, enabled: true, localPrice: pkg.discountedPrice })));

  const filteredPackages = packagesList.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const togglePackage = (id: string) => {
    setPackagesList(packagesList.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Package Pricing</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search packages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white transition-smooth"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPackages.map((pkg, index) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`bg-white rounded-2xl shadow-sm border p-6 ${pkg.enabled ? 'border-slate-200' : 'border-slate-100 opacity-60'}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${pkg.enabled ? 'bg-cyan-100' : 'bg-slate-100'}`}>
                <Package className={`w-6 h-6 ${pkg.enabled ? 'text-cyan-600' : 'text-slate-400'}`} />
              </div>
              <button onClick={() => togglePackage(pkg.id)} className="text-slate-400 hover:text-slate-600">
                {pkg.enabled ? <ToggleRight className="w-8 h-8 text-green-500" /> : <ToggleLeft className="w-8 h-8" />}
              </button>
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">{pkg.name}</h3>
            <p className="text-sm text-slate-500 mb-4 line-clamp-2">{pkg.description}</p>
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div>
                <span className="text-sm text-slate-400 line-through">₹{pkg.originalPrice}</span>
                <span className="ml-2 text-lg font-bold text-cyan-600">₹{pkg.localPrice}</span>
              </div>
              <button className="p-2 hover:bg-slate-100 rounded-lg transition-smooth">
                <Edit2 className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}