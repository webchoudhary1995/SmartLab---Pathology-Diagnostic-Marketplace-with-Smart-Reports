'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, ChevronDown, Clock, DollarSign } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { packages as allPackages, categoryFilters } from '@/data/mockData';
import FloatingMedicalElements from '@/components/FloatingMedicalElements';

export default function PackagesPage() {
  const { addToCart } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPackage, setSelectedPackage] = useState<typeof allPackages[0] | null>(null);
  const [showFastOnly, setShowFastOnly] = useState(false);

  const filteredPackages = allPackages.filter(pkg => {
    const matchesSearch = pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || pkg.category === activeCategory;
    const matchesFasting = !showFastOnly || !pkg.fastingRequired;
    return matchesSearch && matchesCategory && matchesFasting;
  });

  return (
    <div className="relative min-h-screen">
      <FloatingMedicalElements />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Health Packages & Tests
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Browse our comprehensive range of diagnostic tests and health packages
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search packages, tests, conditions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white transition-smooth"
              />
            </div>

            {/* Fasting Filter Toggle */}
            <button
              onClick={() => setShowFastOnly(!showFastOnly)}
              className={`px-4 py-3 rounded-xl border-2 transition-smooth flex items-center gap-2 ${
                showFastOnly 
                  ? 'border-cyan-500 bg-cyan-50 text-cyan-700' 
                  : 'border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              <Clock className="w-5 h-5" />
              <span className="font-medium">Fasting Only</span>
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
            {categoryFilters.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium text-sm transition-smooth ${
                  activeCategory === category.id
                    ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <p className="text-slate-600 mb-6">
          Showing <span className="font-semibold text-slate-900">{filteredPackages.length}</span> packages
        </p>

        {/* Package Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPackages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden card-hover group"
            >
              <div className="p-5">
                {pkg.popular && (
                  <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full mb-3">
                    Most Popular
                  </span>
                )}
                <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-cyan-600 transition-smooth">
                  {pkg.name}
                </h3>
                <p className="text-sm text-slate-500 mb-3 line-clamp-2">
                  {pkg.description}
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-full">
                    {pkg.parameters.length} Parameters
                  </span>
                  {pkg.fastingRequired && (
                    <span className="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-full">
                      Fasting
                    </span>
                  )}
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-sm text-slate-400 line-through">
                      ₹{pkg.originalPrice.toLocaleString()}
                    </span>
                    <div className="text-2xl font-bold text-cyan-600">
                      ₹{pkg.discountedPrice.toLocaleString()}
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedPackage(pkg)}
                    className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-xl hover:bg-slate-200 transition-smooth"
                  >
                    View Details
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Package Detail Modal */}
        <AnimatePresence>
          {selectedPackage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => setSelectedPackage(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6 border-b border-slate-200 flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{selectedPackage.name}</h2>
                    <p className="text-slate-600 mt-1">{selectedPackage.description}</p>
                  </div>
                  <button
                    onClick={() => setSelectedPackage(null)}
                    className="p-2 rounded-xl hover:bg-slate-100 transition-smooth"
                  >
                    <X className="w-5 h-5 text-slate-500" />
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl font-bold text-cyan-600">
                      ₹{selectedPackage.discountedPrice.toLocaleString()}
                    </span>
                    <span className="text-lg text-slate-400 line-through">
                      ₹{selectedPackage.originalPrice.toLocaleString()}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                      {Math.round((1 - selectedPackage.discountedPrice / selectedPackage.originalPrice) * 100)}% OFF
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1.5 bg-slate-100 text-slate-700 text-sm rounded-full">
                      {selectedPackage.parameters.length} Parameters
                    </span>
                    {selectedPackage.fastingRequired && (
                      <span className="px-3 py-1.5 bg-amber-100 text-amber-700 text-sm rounded-full">
                        10-12 Hours Fasting Required
                      </span>
                    )}
                  </div>

                  <h3 className="font-semibold text-slate-900 mb-4">Tests Included:</h3>
                  <div className="grid sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                    {selectedPackage.parameters.map((param) => (
                      <div
                        key={param.id}
                        className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl"
                      >
                        <div className="w-2 h-2 bg-cyan-500 rounded-full" />
                        <div className="flex-1">
                          <p className="font-medium text-slate-900 text-sm">{param.name}</p>
                          <p className="text-xs text-slate-500">
                            Normal: {param.minNormal} - {param.maxNormal} {param.unit}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 border-t border-slate-200 flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      addToCart(selectedPackage);
                      setSelectedPackage(null);
                    }}
                    className="flex-1 px-6 py-3 bg-cyan-500 text-white font-semibold rounded-xl hover:bg-cyan-600 transition-smooth"
                  >
                    Add to Cart
                  </motion.button>
                  <a href="/checkout">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3 bg-indigo-500 text-white font-semibold rounded-xl hover:bg-indigo-600 transition-smooth"
                    >
                      Book Now
                    </motion.button>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}