'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, MapPin, Clock, CheckCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function LabPartnerDispatchPage() {
  const { orders, phlebotomists, updateOrderStatus } = useApp();
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [selectedPhlebotomist, setSelectedPhlebotomist] = useState<string>('');

  const unassignedOrders = orders.filter(o => o.status === 'confirmed');

  const assignOrder = (orderId: string) => {
    const phlebotomist = phlebotomists.find(p => p.id === selectedPhlebotomist);
    if (phlebotomist) {
      updateOrderStatus(orderId, 'boy-assigned', phlebotomist);
      setSelectedOrder(null);
      setSelectedPhlebotomist('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-cyan-600 to-indigo-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl font-bold">Dispatch Center</h1>
          <p className="text-cyan-100">Assign sample collections to phlebotomists</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Unassigned Orders */}
          <div>
            <h2 className="font-semibold text-slate-900 mb-4">Unassigned Orders ({unassignedOrders.length})</h2>
            <div className="space-y-4">
              {unassignedOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedOrder(order.id)}
                  className={`bg-white rounded-2xl shadow-sm border border-slate-200 p-5 cursor-pointer transition-smooth ${
                    selectedOrder === order.id ? 'border-cyan-500 ring-2 ring-cyan-200' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-slate-900">{order.id}</span>
                    <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">Pending</span>
                  </div>
                  <h3 className="font-medium text-slate-900 mb-2">{order.packageName}</h3>
                  <div className="space-y-1 text-sm text-slate-500">
                    <p className="flex items-center gap-2"><User className="w-4 h-4" /> {order.patientName}</p>
                    <p className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {order.address.addressLine1}</p>
                    <p className="flex items-center gap-2"><Clock className="w-4 h-4" /> {order.slot.date} at {order.slot.timeSlot}</p>
                  </div>
                </motion.div>
              ))}
              {unassignedOrders.length === 0 && (
                <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <p className="text-slate-600">All orders assigned!</p>
                </div>
              )}
            </div>
          </div>

          {/* Assign Form */}
          <div>
            <h2 className="font-semibold text-slate-900 mb-4">Assign to Phlebotomist</h2>
            {selectedOrder ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
              >
                <p className="text-sm text-slate-500 mb-4">Select a phlebotomist for order <span className="font-semibold text-slate-900">{selectedOrder}</span></p>
                <div className="space-y-3 mb-6">
                  {phlebotomists.filter(p => p.active).map((phlebotomist) => (
                    <div
                      key={phlebotomist.id}
                      onClick={() => setSelectedPhlebotomist(phlebotomist.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-smooth ${
                        selectedPhlebotomist === phlebotomist.id
                          ? 'border-cyan-500 bg-cyan-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-cyan-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-slate-900">{phlebotomist.name}</p>
                          <p className="text-sm text-slate-500">{phlebotomist.sector} • {phlebotomist.vehicleNumber}</p>
                        </div>
                        <Phone className="w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => assignOrder(selectedOrder)}
                  disabled={!selectedPhlebotomist}
                  className="w-full px-6 py-3 bg-cyan-500 text-white font-semibold rounded-xl hover:bg-cyan-600 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Assign Order
                </motion.button>
              </motion.div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
                <p className="text-slate-500">Select an order from the left to assign</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}