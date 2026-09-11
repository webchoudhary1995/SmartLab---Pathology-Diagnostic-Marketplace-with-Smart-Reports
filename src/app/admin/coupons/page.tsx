'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Tag, Calendar, MapPin, DollarSign, Percent, Trash2, Edit, X } from 'lucide-react';
import { coupons, cities } from '@/data/mockData';

export default function AdminCouponsPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [couponList, setCouponList] = useState(coupons);
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discountType: 'percentage' as 'percentage' | 'fixed',
    discountValue: 10,
    minCartValue: 500,
    cityIds: [] as string[],
    expiresAt: '',
  });

  const filteredCoupons = couponList.filter(c => 
    c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleCouponActive = (id: string) => {
    setCouponList(prev => prev.map(c => 
      c.id === id ? { ...c, active: !c.active } : c
    ));
  };

  const toggleCity = (cityId: string) => {
    setNewCoupon(prev => ({
      ...prev,
      cityIds: prev.cityIds.includes(cityId)
        ? prev.cityIds.filter(id => id !== cityId)
        : [...prev.cityIds, cityId]
    }));
  };

  const addCoupon = () => {
    const newId = `c${couponList.length + 1}`;
    setCouponList([...couponList, {
      id: newId,
      ...newCoupon,
      active: true,
    }]);
    setShowAddForm(false);
    setNewCoupon({ code: '', discountType: 'percentage', discountValue: 10, minCartValue: 500, cityIds: [], expiresAt: '' });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Coupon & Offers</h1>
              <p className="text-slate-500">Manage discount codes and promotions</p>
            </div>
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
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Search */}
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

        {/* Coupons Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCoupons.map((coupon, index) => (
            <motion.div
              key={coupon.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-white rounded-2xl shadow-sm border-2 p-6 ${coupon.active ? 'border-cyan-200' : 'border-slate-200 opacity-60'}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <Tag className="w-6 h-6 text-white" />
                </div>
                <button
                  onClick={() => toggleCouponActive(coupon.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${coupon.active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}
                >
                  {coupon.active ? 'Active' : 'Inactive'}
                </button>
              </div>
              <h3 className="font-bold text-xl text-slate-900 mb-1">{coupon.code}</h3>
              <div className="flex items-center gap-2 mb-4">
                {coupon.discountType === 'percentage' ? (
                  <span className="text-2xl font-bold text-cyan-600">{coupon.discountValue}% OFF</span>
                ) : (
                  <span className="text-2xl font-bold text-cyan-600">₹{coupon.discountValue} OFF</span>
                )}
              </div>
              <div className="space-y-2 text-sm text-slate-600">
                <p className="flex items-center gap-2"><DollarSign className="w-4 h-4" /> Min cart: ₹{coupon.minCartValue}</p>
                <p className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Expires: {coupon.expiresAt}</p>
                {coupon.cityIds.length > 0 ? (
                  <p className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Selected cities</p>
                ) : (
                  <p className="flex items-center gap-2"><MapPin className="w-4 h-4" /> All cities</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Add Coupon Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl shadow-xl max-w-lg w-full p-6"
          >
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Create New Coupon</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Coupon Code</label>
                <input
                  type="text"
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white transition-smooth"
                  placeholder="SAVE20"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Discount Type</label>
                  <select
                    value={newCoupon.discountType}
                    onChange={(e) => setNewCoupon({ ...newCoupon, discountType: e.target.value as 'percentage' | 'fixed' })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white transition-smooth"
                  >
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Value</label>
                  <input
                    type="number"
                    value={newCoupon.discountValue}
                    onChange={(e) => setNewCoupon({ ...newCoupon, discountValue: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white transition-smooth"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Min Cart Value (₹)</label>
                <input
                  type="number"
                  value={newCoupon.minCartValue}
                  onChange={(e) => setNewCoupon({ ...newCoupon, minCartValue: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white transition-smooth"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Expiry Date</label>
                <input
                  type="date"
                  value={newCoupon.expiresAt}
                  onChange={(e) => setNewCoupon({ ...newCoupon, expiresAt: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white transition-smooth"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Applicable Cities (optional)</label>
                <div className="flex flex-wrap gap-2">
                  {cities.map(city => (
                    <button
                      key={city.id}
                      onClick={() => toggleCity(city.id)}
                      className={`px-3 py-1.5 rounded-full text-sm transition-smooth ${
                        newCoupon.cityIds.includes(city.id)
                          ? 'bg-cyan-500 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {city.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowAddForm(false)} className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-smooth font-medium">
                Cancel
              </button>
              <button onClick={addCoupon} className="flex-1 px-4 py-3 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition-smooth font-medium">
                Create Coupon
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}