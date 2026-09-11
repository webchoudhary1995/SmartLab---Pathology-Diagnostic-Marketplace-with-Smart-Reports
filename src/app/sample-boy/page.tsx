'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, CheckCircle, Navigation, User, Droplets } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function SampleBoyPage() {
  const { orders, updateOrderStatus, phlebotomists } = useApp();
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [barcode, setBarcode] = useState('');
  const [barcodeError, setBarcodeError] = useState('');

  // Get orders assigned to the first phlebotomist for demo
  const demoPhlebotomist = phlebotomists[0];
  const assignedOrders = orders.filter(o => o.phlebotomist?.id === demoPhlebotomist?.id || o.status === 'boy-assigned');
  const pendingPickups = assignedOrders.filter(o => o.status === 'boy-assigned');
  const completedPickups = assignedOrders.filter(o => o.status === 'collected');

  const markCollected = (orderId: string) => {
    if (!barcode.trim()) {
      setBarcodeError('Please enter barcode');
      return;
    }
    setBarcodeError('');
    updateOrderStatus(orderId, 'collected', undefined, barcode);
    setSelectedOrder(null);
    setBarcode('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-cyan-50">
      {/* Mobile Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-lg">SmartLab</h1>
              <p className="text-xs text-green-100">Sample Collection</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-green-100">Today</p>
            <p className="font-semibold">{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4"
          >
            <p className="text-3xl font-bold text-amber-600">{pendingPickups.length}</p>
            <p className="text-sm text-slate-500">Pending Pickups</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4"
          >
            <p className="text-3xl font-bold text-green-600">{completedPickups.length}</p>
            <p className="text-sm text-slate-500">Completed</p>
          </motion.div>
        </div>

        {/* Pending Pickups */}
        <div>
          <h2 className="font-semibold text-slate-900 mb-3">Today's Pickups</h2>
          <div className="space-y-3">
            {pendingPickups.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-slate-900">{order.id}</span>
                    <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">Pending</span>
                  </div>
                  <h3 className="font-medium text-slate-900 mb-2">{order.packageName}</h3>
                  <div className="space-y-2 text-sm text-slate-600 mb-4">
                    <p className="flex items-center gap-2"><User className="w-4 h-4" /> {order.patientName} • {order.age} yrs • {order.gender}</p>
                    <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-red-500" /> {order.address.addressLine1}, {order.address.city}</p>
                    <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-amber-500" /> {order.slot.date} at {order.slot.timeSlot}</p>
                    <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-green-500" /> {order.address.phone}</p>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={`tel:${order.address.phone}`}
                      className="flex-1 px-4 py-2.5 bg-green-500 text-white font-medium rounded-xl flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4" /> Call
                    </a>
                    <a
                      href={`https://maps.google.com/?q=${order.address.addressLine1},${order.address.city}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2.5 bg-blue-500 text-white font-medium rounded-xl flex items-center justify-center gap-2"
                    >
                      <Navigation className="w-4 h-4" /> Navigate
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedOrder(order.id)}
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-semibold flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" /> Mark Sample Collected
                </button>
              </motion.div>
            ))}
            {pendingPickups.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <p className="text-slate-600">No pending pickups today!</p>
              </div>
            )}
          </div>
        </div>

        {/* Completed */}
        {completedPickups.length > 0 && (
          <div>
            <h2 className="font-semibold text-slate-900 mb-3">Completed Collections</h2>
            <div className="space-y-2">
              {completedPickups.map((order) => (
                <div key={order.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">{order.id}</p>
                    <p className="text-sm text-slate-500">{order.patientName}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {order.barcode && <span className="text-xs text-slate-400">{order.barcode}</span>}
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Barcode Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white rounded-t-3xl sm:rounded-3xl shadow-xl max-w-md w-full p-6"
          >
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Mark Sample Collected</h2>
            <p className="text-sm text-slate-600 mb-4">Enter the barcode from the blood sample vial</p>
            <input
              type="text"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              placeholder="e.g., SL-20250911-001"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white text-lg font-mono"
            />
            {barcodeError && <p className="text-red-500 text-sm mt-1">{barcodeError}</p>}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setSelectedOrder(null);
                  setBarcode('');
                  setBarcodeError('');
                }}
                className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => markCollected(selectedOrder)}
                className="flex-1 px-4 py-3 bg-cyan-500 text-white rounded-xl font-medium"
              >
                Confirm Collection
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}