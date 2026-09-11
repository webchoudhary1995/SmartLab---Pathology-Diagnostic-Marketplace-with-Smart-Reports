'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ToggleLeft, ToggleRight } from 'lucide-react';
import { packages } from '@/data/mockData';

export default function LabPartnerPackagesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [packageSettings, setPackageSettings] = useState(
    packages.map(pkg => ({
      id: pkg.id,
      enabled: true,
      localPrice: pkg.discountedPrice,
    }))
  );

  const filteredPackages = packages.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleEnabled = (id: string) => {
    setPackageSettings(prev => prev.map(s => 
      s.id === id ? { ...s, enabled: !s.enabled } : s
    ));
  };

  const updatePrice = (id: string, price: number) => {
    setPackageSettings(prev => prev.map(s => 
      s.id === id ? { ...s, localPrice: price } : s
    ));
  };

  const getSetting = (id: string) => packageSettings.find(s => s.id === id);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-cyan-600 to-indigo-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl font-bold">Package Pricing</h1>
          <p className="text-cyan-100">Manage local pricing for your city</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
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

        <div className="space-y-4">
          {filteredPackages.map((pkg, index) => {
            const setting = getSetting(pkg.id);
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-white rounded-2xl shadow-sm border border-slate-200 p-6 ${!setting?.enabled ? 'opacity-60' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <button
                      onClick={() => toggleEnabled(pkg.id)}
                      className="text-slate-400 hover:text-slate-600 transition-smooth"
                    >
                      {setting?.enabled ? (
                        <ToggleRight className="w-10 h-10 text-green-600" />
                      ) : (
                        <ToggleLeft className="w-10 h-10 text-slate-300" />
                      )}
                    </button>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900">{pkg.name}</h3>
                      <p className="text-sm text-slate-500">{pkg.parameters.length} parameters • {pkg.fastingRequired ? 'Fasting' : 'No fasting'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-slate-500">Master Price</p>
                      <p className="text-slate-400 line-through">₹{pkg.discountedPrice}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-500">Your Price</p>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-cyan-600">₹{setting?.localPrice || pkg.discountedPrice}</span>
                      </div>
                    </div>
                    {setting?.enabled && (
                      <div className="w-24">
                        <input
                          type="number"
                          value={setting.localPrice}
                          onChange={(e) => updatePrice(pkg.id, parseInt(e.target.value))}
                          className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white text-sm"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}