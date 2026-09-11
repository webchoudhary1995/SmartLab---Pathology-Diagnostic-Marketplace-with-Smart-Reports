'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, Calendar, MapPin, Building2, FlaskConical, Users, ArrowUpRight } from 'lucide-react';
import { adminMetrics, orders, franchises, cities } from '@/data/mockData';
import Link from 'next/link';

const metricCards = [
  { title: 'Total Revenue', value: `₹${(adminMetrics.totalRevenue / 100000).toFixed(2)}L`, change: '+12.5%', icon: DollarSign, color: 'bg-green-100 text-green-600' },
  { title: "Today's Bookings", value: adminMetrics.todayBookings.toString(), change: '+8', icon: Calendar, color: 'bg-cyan-100 text-cyan-600' },
  { title: 'Active Cities', value: adminMetrics.activeCities.toString(), change: '+2', icon: MapPin, color: 'bg-indigo-100 text-indigo-600' },
  { title: 'Verified Labs', value: adminMetrics.verifiedLabs.toString(), change: '+3', icon: Building2, color: 'bg-amber-100 text-amber-600' },
  { title: 'Pending Collections', value: adminMetrics.pendingCollections.toString(), change: '-5', icon: FlaskConical, color: 'bg-red-100 text-red-600', negative: true },
];

const cityPerformance = [
  { city: 'Jaipur', bookings: 45, revenue: 125000, labs: 8, growth: 15 },
  { city: 'Delhi', bookings: 38, revenue: 98000, labs: 6, growth: 12 },
  { city: 'Mumbai', bookings: 32, revenue: 87000, labs: 5, growth: 8 },
  { city: 'Bengaluru', bookings: 28, revenue: 72000, labs: 4, growth: 18 },
  { city: 'Hyderabad', bookings: 13, revenue: 35000, labs: 1, growth: 5 },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Admin Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
              <p className="text-slate-500">SmartLab Master Administration</p>
            </div>
            <div className="flex gap-3">
              <Link href="/admin/franchises" className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-smooth text-sm font-medium">
                Franchises
              </Link>
              <Link href="/admin/tests" className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-smooth text-sm font-medium">
                Tests
              </Link>
              <Link href="/admin/coupons" className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-smooth text-sm font-medium">
                Coupons
              </Link>
              <Link href="/admin/payouts" className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-smooth text-sm font-medium">
                Payouts
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Metric Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {metricCards.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${metric.color}`}>
                  <metric.icon className="w-6 h-6" />
                </div>
                <span className={`text-sm font-medium ${metric.negative ? (metric.change.startsWith('-') ? 'text-green-600' : 'text-red-600') : metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{metric.value}</p>
              <p className="text-sm text-slate-500">{metric.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts & Tables */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-slate-900">Revenue Overview</h2>
              <select className="text-sm bg-slate-100 rounded-lg px-3 py-1">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
              </select>
            </div>
            <div className="h-48 flex items-end gap-2">
              {[65, 45, 75, 50, 85, 60, 95].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                    className="w-full bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t-lg"
                  />
                  <span className="text-xs text-slate-400">Mon</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* City Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
          >
            <h2 className="font-semibold text-slate-900 mb-6">City Performance</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-slate-500 border-b border-slate-200">
                    <th className="pb-3 font-medium">City</th>
                    <th className="pb-3 font-medium">Bookings</th>
                    <th className="pb-3 font-medium">Revenue</th>
                    <th className="pb-3 font-medium">Labs</th>
                    <th className="pb-3 font-medium">Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {cityPerformance.map((city, i) => (
                    <tr key={i} className="border-b border-slate-100">
                      <td className="py-3 font-medium text-slate-900">{city.city}</td>
                      <td className="py-3 text-slate-600">{city.bookings}</td>
                      <td className="py-3 text-slate-600">₹{city.revenue.toLocaleString()}</td>
                      <td className="py-3 text-slate-600">{city.labs}</td>
                      <td className="py-3">
                        <span className="text-green-600 text-sm font-medium">+{city.growth}%</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mt-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-slate-900">Recent Orders</h2>
            <button className="text-sm text-cyan-600 hover:text-cyan-700 font-medium">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-slate-500 border-b border-slate-200">
                  <th className="pb-3 font-medium">Order ID</th>
                  <th className="pb-3 font-medium">Package</th>
                  <th className="pb-3 font-medium">Patient</th>
                  <th className="pb-3 font-medium">City</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="border-b border-slate-100">
                    <td className="py-3 font-medium text-slate-900">{order.id}</td>
                    <td className="py-3 text-slate-600">{order.packageName}</td>
                    <td className="py-3 text-slate-600">{order.patientName}</td>
                    <td className="py-3 text-slate-600">{order.address.city}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        order.status === 'completed' ? 'bg-green-100 text-green-700' :
                        order.status === 'testing' ? 'bg-amber-100 text-amber-700' :
                        order.status === 'collected' ? 'bg-blue-100 text-blue-700' :
                        order.status === 'boy-assigned' ? 'bg-indigo-100 text-indigo-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {order.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="py-3 text-slate-900 font-medium">₹{order.totalAmount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}