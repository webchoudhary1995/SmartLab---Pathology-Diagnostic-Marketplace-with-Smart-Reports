'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Truck, Search, Phone, MapPin, Clock, User, CheckCircle, Package } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function LabPartnerDispatchPage() {
  const { orders, phlebotomists, updateOrderStatus } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const pendingOrders = orders.filter(o => o.status === 'confirmed');
  const assignedOrders = orders.filter(o => o.status === 'boy-assigned');

  const filteredOrders = [...pendingOrders, ...assignedOrders].filter(o => 
    o.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const assignOrder = (orderId: string, phlebotomistId: string) => {
    const phlebotomist = phlebotomists.find(p => p.id === phlebotomistId);
    updateOrderStatus(orderId, 'boy-assigned', phlebotomist);
    setSelectedOrder(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Dispatch Center</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white transition-smooth"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Orders List */}
        <div className="space-y-4">
          <h2 className="font-semibold text-slate-900">Unassigned Orders ({pendingOrders.length})</h2>
          {pendingOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedOrder(order.id)}
              className={`bg-white rounded-2xl shadow-sm border p-6 cursor-pointer transition-smooth hover:border-cyan-500 ${
                selectedOrder === order.id ? 'border-cyan-500 ring-2 ring-cyan-100' : 'border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-slate-900">{order.patientName}</h3>
                  <p className="text-sm text-slate-500">{order.id}</p>
                </div>
                <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">Pending</span>
              </div>
              <div className="space-y-2 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  <span>{order.packageName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{order.address.city}, {order.address.addressLine1}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{order.slot.date} at {order.slot.timeSlot}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Assign Phlebotomist */}
        <div>
          <h2 className="font-semibold text-slate-900 mb-4">Assign Phlebotomist</h2>
          {selectedOrder ? (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <p className="text-sm text-slate-500 mb-4">Select a phlebotomist for order {selectedOrder}</p>
              <div className="space-y-3">
                {phlebotomists.map((phlebotomist) => (
                  <motion.button
                    key={phlebotomist.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => assignOrder(selectedOrder, phlebotomist.id)}
                    className="w-full p-4 bg-slate-50 rounded-xl hover:bg-cyan-50 border border-slate-200 hover:border-cyan-300 transition-smooth flex items-center gap-4"
                  >
                    <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-cyan-600" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-slate-900">{phlebotomist.name}</p>
                      <p className="text-sm text-slate-500">{phlebotomist.phone}</p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-cyan-500" />
                  </motion.button>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 rounded-2xl p-8 text-center">
              <Truck className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">Select an order to assign</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}