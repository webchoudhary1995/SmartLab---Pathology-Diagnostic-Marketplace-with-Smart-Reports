'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Tag, Trash2, Edit, Copy, Calendar } from 'lucide-react';

const mockCoupons = [
  { id: '1', code: 'FIRST50', description: '50% off on first order', discount: 50, type: 'percent', minOrder: 500, city: 'All', validUntil: '2026-02-28', usageCount: 125, status: 'active' },
  { id: '2', code: 'JAIPUR20', description: '20% off for Jaipur users', discount: 20, type: 'percent', minOrder: 300, city: 'Jaipur', validUntil: '2026-03-15', usageCount: 45, status: 'active' },
  { id: '3', code: 'FLAT300', description: 'Flat ₹300 off', discount: 300, type: 'fixed', minOrder: 1000, city: 'All', validUntil: '2026-01-31', usageCount: 78, status: 'expired' },
];

export default function AdminCouponsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [coupons] = useState(mockCoupons);

  const filteredCoupons = coupons.filter(c => 
    c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Coupon & Offers</h1>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition-smooth flex items-center gap-2 text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Create Coupon
        </motion.button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search coupons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white transition-smooth"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCoupons.map((coupon, index) => (
          <motion.div
            key={coupon.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <Tag className="w-6 h-6 text-amber-600" />
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${coupon.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                {coupon.status}
              </span>
            </div>
            <h3 className="font-bold text-lg text-slate-900 mb-1">{coupon.code}</h3>
            <p className="text-sm text-slate-500 mb-4">{coupon.description}</p>
            <div className="flex items-center justify-between text-sm mb-4">
              <span className="font-semibold text-cyan-600">
                {coupon.type === 'percent' ? `${coupon.discount}% off` : `₹${coupon.discount} off`}
              </span>
              <span className="text-slate-500">Min: ₹{coupon.minOrder}</span>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center gap-1 text-sm text-slate-500">
                <Calendar className="w-4 h-4" />
                <span>{coupon.validUntil}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-slate-500">
                <span>Used: {coupon.usageCount}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}