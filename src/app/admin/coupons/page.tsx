'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Tag, Trash2, Edit, Copy, Calendar, X, Save, Percent } from 'lucide-react';

const mockCoupons = [
  { id: '1', code: 'FIRST50', description: '50% off on first order', discount: 50, type: 'percent', minOrder: 500, city: 'All', validUntil: '2026-02-28', usageCount: 125, status: 'active' },
  { id: '2', code: 'JAIPUR20', description: '20% off for Jaipur users', discount: 20, type: 'percent', minOrder: 300, city: 'Jaipur', validUntil: '2026-03-15', usageCount: 45, status: 'active' },
  { id: '3', code: 'FLAT300', description: 'Flat ₹300 off', discount: 300, type: 'fixed', minOrder: 1000, city: 'All', validUntil: '2026-01-31', usageCount: 78, status: 'expired' },
];

export default function AdminCouponsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [coupons, setCoupons] = useState(mockCoupons);
  const [formData, setFormData] = useState({
    code: '', description: '', discount: '', type: 'percent', minOrder: '', city: 'All', validUntil: ''
  });

  const filteredCoupons = coupons.filter(c => 
    c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCoupon = () => {
    if (formData.code && formData.description && formData.discount && formData.validUntil) {
      const newCoupon = {
        id: Date.now().toString(),
        code: formData.code.toUpperCase(),
        description: formData.description,
        discount: parseInt(formData.discount),
        type: formData.type,
        minOrder: parseInt(formData.minOrder) || 0,
        city: formData.city,
        validUntil: formData.validUntil,
        usageCount: 0,
        status: 'active'
      };
      setCoupons([newCoupon, ...coupons]);
      setShowAddForm(false);
      setFormData({ code: '', description: '', discount: '', type: 'percent', minOrder: '', city: 'All', validUntil: '' });
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Coupon & Offers</h1>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAddForm(true)}
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
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-lg text-slate-900">{coupon.code}</h3>
              <button onClick={() => copyCode(coupon.code)} className="p-1 hover:bg-slate-100 rounded">
                <Copy className="w-4 h-4 text-slate-400" />
              </button>
            </div>
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

      {/* Add Coupon Modal */}
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
                <h2 className="text-xl font-bold text-slate-900">Create New Coupon</h2>
                <button onClick={() => setShowAddForm(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Coupon Code</label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 uppercase"
                    placeholder="e.g., SUMMER20"
                    maxLength={10}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                    placeholder="Brief description of the offer"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Discount Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                    >
                      <option value="percent">Percentage (%)</option>
                      <option value="fixed">Fixed Amount (₹)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Discount Value</label>
                    <input
                      type="number"
                      value={formData.discount}
                      onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                      placeholder={formData.type === 'percent' ? '20' : '300'}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Min Order Amount (₹)</label>
                    <input
                      type="number"
                      value={formData.minOrder}
                      onChange={(e) => setFormData({ ...formData, minOrder: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                      placeholder="500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Valid Until</label>
                    <input
                      type="date"
                      value={formData.validUntil}
                      onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                  >
                    <option value="All">All Cities</option>
                    <option value="Jaipur">Jaipur</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Hyderabad">Hyderabad</option>
                  </select>
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
                  onClick={handleAddCoupon}
                  className="px-6 py-2 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition-smooth font-medium flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Create Coupon
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}