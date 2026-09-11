'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle, Circle, User, Phone, MapPin, Barcode, FlaskConical, FileCheck, Download, PhoneCall, Navigation } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import FloatingMedicalElements from '@/components/FloatingMedicalElements';

const statusSteps = [
  { id: 'confirmed', label: 'Order Confirmed', icon: CheckCircle },
  { id: 'boy-assigned', label: 'Sample Boy Assigned', icon: User },
  { id: 'collected', label: 'Sample Collected', icon: FlaskConical },
  { id: 'testing', label: 'In Lab Testing', icon: Barcode },
  { id: 'completed', label: 'Report Ready', icon: FileCheck },
];

export default function TrackOrderPage() {
  const { orders, getOrderById } = useApp();
  const [orderId, setOrderId] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<typeof orders[0] | null>(null);

  const handleSearch = () => {
    const order = getOrderById(orderId);
    setSearchedOrder(order || null);
  };

  const getStatusIndex = (status: string) => {
    return statusSteps.findIndex(s => s.id === status);
  };

  return (
    <div className="relative min-h-screen">
      <FloatingMedicalElements />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-slate-900 text-center mb-2">
            Track Your Order
          </h1>
          <p className="text-slate-600 text-center mb-8">
            Enter your order ID to track the status of your sample collection
          </p>

          {/* Search Box */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="Enter Order ID (e.g., ORD-001)"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white transition-smooth"
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSearch}
                className="px-8 py-3 bg-cyan-500 text-white font-semibold rounded-xl hover:bg-cyan-600 transition-smooth"
              >
                Track
              </motion.button>
            </div>

            {/* Quick Order IDs for demo */}
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-500 mb-2">Try these demo order IDs:</p>
              <div className="flex flex-wrap gap-2">
                {orders.slice(0, 5).map(order => (
                  <button
                    key={order.id}
                    onClick={() => {
                      setOrderId(order.id);
                      setSearchedOrder(order);
                    }}
                    className="px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded-full hover:bg-slate-200 transition-smooth"
                  >
                    {order.id}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Order Status */}
          {searchedOrder && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
            >
              {/* Order Info Header */}
              <div className="bg-gradient-to-r from-cyan-500 to-indigo-600 p-6 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-cyan-100 text-sm">Order ID</p>
                    <p className="text-2xl font-bold">{searchedOrder.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-cyan-100 text-sm">Package</p>
                    <p className="font-semibold">{searchedOrder.packageName}</p>
                  </div>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="p-6">
                <h3 className="font-semibold text-slate-900 mb-6">Order Status</h3>
                <div className="relative">
                  {/* Progress Line */}
                  <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-slate-200">
                    <motion.div
                      className="w-full bg-cyan-500"
                      initial={{ height: '0%' }}
                      animate={{ 
                        height: `${(getStatusIndex(searchedOrder.status) / (statusSteps.length - 1)) * 100}%`
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>

                  <div className="space-y-6">
                    {statusSteps.map((step, index) => {
                      const isCompleted = getStatusIndex(searchedOrder.status) >= index;
                      const isCurrent = getStatusIndex(searchedOrder.status) === index;

                      return (
                        <div key={step.id} className="flex items-center gap-4">
                          <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-smooth ${
                            isCompleted 
                              ? 'bg-cyan-500 text-white' 
                              : 'bg-slate-100 text-slate-400'
                          }`}>
                            {isCompleted ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : (
                              <Circle className="w-5 h-5" />
                            )}
                          </div>
                          <div>
                            <p className={`font-medium ${isCompleted ? 'text-slate-900' : 'text-slate-400'}`}>
                              {step.label}
                            </p>
                            {isCurrent && (
                              <p className="text-sm text-cyan-600">In Progress</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Phlebotomist Info */}
              {(searchedOrder.status === 'boy-assigned' || searchedOrder.status === 'collected' || searchedOrder.status === 'testing' || searchedOrder.status === 'completed') && searchedOrder.phlebotomist && (
                <div className="p-6 border-t border-slate-200">
                  <h3 className="font-semibold text-slate-900 mb-4">Sample Collection Boy</h3>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-cyan-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{searchedOrder.phlebotomist.name}</p>
                        <p className="text-sm text-slate-500">Phlebotomist</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={`tel:${searchedOrder.phlebotomist.phone}`}
                        className="p-3 bg-green-100 text-green-600 rounded-xl"
                      >
                        <PhoneCall className="w-5 h-5" />
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={`https://maps.google.com/?q=${searchedOrder.address.addressLine1},${searchedOrder.address.city}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-blue-100 text-blue-600 rounded-xl"
                      >
                        <Navigation className="w-5 h-5" />
                      </motion.a>
                    </div>
                  </div>
                </div>
              )}

              {/* Barcode Info */}
              {(searchedOrder.status === 'collected' || searchedOrder.status === 'testing' || searchedOrder.status === 'completed') && searchedOrder.barcode && (
                <div className="p-6 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500">Sample Barcode</p>
                      <p className="font-mono font-semibold text-slate-900">{searchedOrder.barcode}</p>
                    </div>
                    <div className="px-4 py-2 bg-amber-100 text-amber-700 rounded-xl text-sm font-medium">
                      Sample Barcoded
                    </div>
                  </div>
                </div>
              )}

              {/* Order Details */}
              <div className="p-6 border-t border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-4">Order Details</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Patient Name</p>
                    <p className="font-medium text-slate-900">{searchedOrder.patientName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Age / Gender</p>
                    <p className="font-medium text-slate-900">{searchedOrder.age} years / {searchedOrder.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Collection Date</p>
                    <p className="font-medium text-slate-900">{searchedOrder.slot.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Time Slot</p>
                    <p className="font-medium text-slate-900">{searchedOrder.slot.timeSlot}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-sm text-slate-500">Pickup Address</p>
                    <p className="font-medium text-slate-900">{searchedOrder.address.addressLine1}, {searchedOrder.address.city} - {searchedOrder.address.pincode}</p>
                  </div>
                </div>
              </div>

              {/* Download Report Button */}
              {searchedOrder.status === 'completed' && (
                <div className="p-6 border-t border-slate-200">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-smooth flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download Smart Report
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}

          {/* No Order Found */}
          {orderId && !searchedOrder && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-red-500" />
              </div>
              <p className="text-slate-600">Order not found. Please check the order ID and try again.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}