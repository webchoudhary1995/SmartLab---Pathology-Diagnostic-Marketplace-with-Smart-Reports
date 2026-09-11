'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Building2, Calendar, CheckCircle, Clock, Search } from 'lucide-react';
import { franchises } from '@/data/mockData';

const payouts = [
  { id: 'PAY-001', franchiseId: 'f1', franchiseName: 'SmartLab Jaipur Central', amount: 25000, status: 'completed', date: '2025-09-10', period: 'Aug 2025' },
  { id: 'PAY-002', franchiseId: 'f2', franchiseName: 'SmartLab Delhi North', amount: 18500, status: 'pending', date: '2025-09-11', period: 'Aug 2025' },
  { id: 'PAY-003', franchiseId: 'f3', franchiseName: 'SmartLab Mumbai West', amount: 32000, status: 'pending', date: '2025-09-11', period: 'Aug 2025' },
  { id: 'PAY-004', franchiseId: 'f4', franchiseName: 'SmartLab Bengaluru South', amount: 15000, status: 'completed', date: '2025-09-08', period: 'Aug 2025' },
];

export default function AdminPayoutsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredPayouts = payouts.filter(p => {
    const matchesSearch = p.franchiseName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPending = payouts.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);
  const totalCompleted = payouts.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Payouts & Financials</h1>
            <p className="text-slate-500">Manage franchise commission payouts</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Summary Cards */}
        <div className="grid sm:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">₹{totalPending.toLocaleString()}</p>
                <p className="text-sm text-slate-500">Pending Payouts</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">₹{totalCompleted.toLocaleString()}</p>
                <p className="text-sm text-slate-500">Completed This Month</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-cyan-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{franchises.length}</p>
                <p className="text-sm text-slate-500">Active Franchises</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search franchises..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white transition-smooth"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'pending', 'completed'].map(status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-smooth capitalize ${
                    statusFilter === status
                      ? 'bg-cyan-500 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Payouts Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr className="text-left text-sm text-slate-500">
                  <th className="px-6 py-4 font-medium">Payout ID</th>
                  <th className="px-6 py-4 font-medium">Franchise</th>
                  <th className="px-6 py-4 font-medium">Period</th>
                  <th className="px-6 py-4 font-medium">Amount</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayouts.map((payout, index) => (
                  <motion.tr
                    key={payout.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-t border-slate-100"
                  >
                    <td className="px-6 py-4 font-medium text-slate-900">{payout.id}</td>
                    <td className="px-6 py-4 text-slate-600">{payout.franchiseName}</td>
                    <td className="px-6 py-4 text-slate-600">{payout.period}</td>
                    <td className="px-6 py-4 font-semibold text-slate-900">₹{payout.amount.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                        payout.status === 'completed' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {payout.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{payout.date}</td>
                    <td className="px-6 py-4">
                      {payout.status === 'pending' ? (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-4 py-2 bg-cyan-500 text-white text-sm font-medium rounded-xl hover:bg-cyan-600 transition-smooth"
                        >
                          Release
                        </motion.button>
                      ) : (
                        <button className="text-sm text-slate-500 hover:text-cyan-600">View Receipt</button>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}