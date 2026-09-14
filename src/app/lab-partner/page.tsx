'use client';

import { motion } from 'framer-motion';
import { FlaskConical, FileCheck, Users, Clock, ArrowRight, Package, Truck, ClipboardList } from 'lucide-react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';

export default function LabPartnerDashboard() {
  const { orders, phlebotomists } = useApp();

  const pendingOrders = orders.filter(o => o.status === 'boy-assigned').length;
  const samplesInLab = orders.filter(o => o.status === 'testing').length;
  const reportsReady = orders.filter(o => o.status === 'completed').length;

  const stats = [
    { title: "Today's Pending Orders", value: pendingOrders, icon: Clock, color: 'bg-amber-100 text-amber-600', href: '/lab-partner/dispatch' },
    { title: 'Samples in Lab', value: samplesInLab, icon: FlaskConical, color: 'bg-cyan-100 text-cyan-600', href: '/lab-partner/reports' },
    { title: 'Reports Ready', value: reportsReady, icon: FileCheck, color: 'bg-green-100 text-green-600', href: '/lab-partner/reports' },
    { title: 'Active Phlebotomists', value: phlebotomists.filter(p => p.active).length, icon: Users, color: 'bg-indigo-100 text-indigo-600', href: '/lab-partner/fleet' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
            <p className="text-sm text-slate-500">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Link href="/lab-partner/dispatch">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <Truck className="w-6 h-6 text-amber-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900">Dispatch Center</h3>
                <p className="text-sm text-slate-500">Assign sample collections</p>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400" />
            </div>
          </motion.div>
        </Link>
        <Link href="/lab-partner/reports">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
                <ClipboardList className="w-6 h-6 text-cyan-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900">Report Entry</h3>
                <p className="text-sm text-slate-500">Enter test results</p>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400" />
            </div>
          </motion.div>
        </Link>
        <Link href="/lab-partner/packages">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900">Package Pricing</h3>
                <p className="text-sm text-slate-500">Manage local prices</p>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400" />
            </div>
          </motion.div>
        </Link>
      </div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
      >
        <div className="p-6 border-b border-slate-200">
          <h2 className="font-semibold text-slate-900">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr className="text-left text-sm text-slate-500">
                <th className="px-6 py-3 font-medium">Order ID</th>
                <th className="px-6 py-3 font-medium">Package</th>
                <th className="px-6 py-3 font-medium">Patient</th>
                <th className="px-6 py-3 font-medium">Slot</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="border-t border-slate-100">
                  <td className="px-6 py-4 font-medium text-slate-900">{order.id}</td>
                  <td className="px-6 py-4 text-slate-600">{order.packageName}</td>
                  <td className="px-6 py-4 text-slate-600">{order.patientName}</td>
                  <td className="px-6 py-4 text-slate-600">{order.slot.date} {order.slot.timeSlot}</td>
                  <td className="px-6 py-4">
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}