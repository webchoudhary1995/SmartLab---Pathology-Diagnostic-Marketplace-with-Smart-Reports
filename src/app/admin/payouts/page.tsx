'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Building2, Calendar, CheckCircle, Clock, Search, Filter } from 'lucide-react';

const mockPayouts = [
  { id: '1', franchise: 'SmartLab Jaipur Central', amount: 45000, period: 'Jan 1-15, 2026', status: 'pending', orders: 45 },
  { id: '2', franchise: 'SmartLab Delhi North', amount: 32000, period: 'Jan 1-15, 2026', status: 'approved', orders: 32 },
  { id: '3', franchise: 'SmartLab Mumbai West', amount: 28000, period: 'Jan 1-15, 2026', status: 'pending', orders: 28 },
  { id: '4', franchise: 'SmartLab Bengaluru', amount: 18000, period: 'Dec 16-31, 2025', status: 'paid', orders: 18 },
];

export default function AdminPayoutsPage() {
  const [payouts] = useState(mockPayouts);
  const [filter, setFilter] = useState('all');

  const filteredPayouts = payouts.filter(p => filter === 'all' || p.status === filter);
  const totalPending = payouts.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);
  const totalPaid = payouts.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Payouts & Financials</h1>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900">₹{totalPending.toLocaleString()}</p>
          <p className="text-sm text-slate-500">Pending Payouts</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900">₹{totalPaid.toLocaleString()}</p>
          <p className="text-sm text-slate-500">Paid This Month</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-cyan-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900">{payouts.length}</p>
          <p className="text-sm text-slate-500">Total Transactions</p>
        </motion.div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-4 mb-6">
        {['all', 'pending', 'approved', 'paid'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-smooth ${
              filter === status ? 'bg-cyan-500 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Payouts Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr className="text-left text-sm text-slate-500">
              <th className="px-6 py-3 font-medium">Franchise</th>
              <th className="px-6 py-3 font-medium">Period</th>
              <th className="px-6 py-3 font-medium">Orders</th>
              <th className="px-6 py-3 font-medium">Amount</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayouts.map((payout) => (
              <tr key={payout.id} className="border-t border-slate-100">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-indigo-600" />
                    </div>
                    <span className="font-medium text-slate-900">{payout.franchise}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600">{payout.period}</td>
                <td className="px-6 py-4 text-slate-600">{payout.orders}</td>
                <td className="px-6 py-4 font-semibold text-slate-900">₹{payout.amount.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    payout.status === 'paid' ? 'bg-green-100 text-green-700' :
                    payout.status === 'approved' ? 'bg-cyan-100 text-cyan-700' :
                    payout.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {payout.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {payout.status === 'pending' && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-smooth"
                    >
                      Approve
                    </motion.button>
                  )}
                  {payout.status === 'approved' && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-4 py-2 bg-cyan-500 text-white rounded-lg text-sm font-medium hover:bg-cyan-600 transition-smooth"
                    >
                      Pay Now
                    </motion.button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}