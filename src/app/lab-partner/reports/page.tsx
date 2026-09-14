'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList, Search, CheckCircle, AlertCircle, FileText, Save, Download, X, Check, Clock, FlaskConical } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { packages as allPackages } from '@/data/mockData';

export default function LabPartnerReportsPage() {
  const { orders, updateOrderStatus } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [testResults, setTestResults] = useState<Record<string, string>>({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmModalData, setConfirmModalData] = useState<{type: string, orderId: string, values: Record<string, string>} | null>(null);

  const testingOrders = orders.filter(o => o.status === 'testing' || o.status === 'collected');
  
  const filteredOrders = testingOrders.filter(o => 
    o.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get package details from packageId
  const getPackageParams = (packageId: string) => {
    const pkg = allPackages.find(p => p.id === packageId);
    return pkg?.parameters || [];
  };

  const handleResultChange = (parameterId: string, value: string) => {
    setTestResults(prev => ({ ...prev, [parameterId]: value }));
  };

  const handleSaveResults = () => {
    if (selectedOrder) {
      setConfirmModalData({ type: 'save', orderId: selectedOrder.id, values: testResults });
      setShowConfirmModal(true);
    }
  };

  const handleCompleteReport = () => {
    if (selectedOrder) {
      setConfirmModalData({ type: 'complete', orderId: selectedOrder.id, values: testResults });
      setShowConfirmModal(true);
    }
  };

  const confirmAction = () => {
    if (confirmModalData?.type === 'complete' && selectedOrder) {
      updateOrderStatus(selectedOrder.id, 'completed');
      setSelectedOrder(null);
      setTestResults({});
    }
    setShowConfirmModal(false);
    setConfirmModalData(null);
  };

  const parameters = selectedOrder ? getPackageParams(selectedOrder.packageId) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Smart Report Data Entry</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search orders for reporting..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white transition-smooth"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Orders List */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="font-semibold text-slate-900">Orders in Lab ({testingOrders.length})</h2>
          {filteredOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => {
                setSelectedOrder(order);
                setTestResults({});
              }}
              className={`bg-white rounded-2xl shadow-sm border p-4 cursor-pointer transition-smooth hover:border-cyan-500 ${
                selectedOrder?.id === order.id ? 'border-cyan-500 ring-2 ring-cyan-100' : 'border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-slate-900">{order.patientName}</h3>
                  <p className="text-sm text-slate-500">{order.id}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${order.status === 'testing' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                  {order.status}
                </span>
              </div>
              <p className="text-sm text-slate-600">{order.packageName}</p>
              <div className="mt-2 flex items-center gap-1 text-xs text-slate-500">
                <Clock className="w-3 h-3" />
                <span>{order.slot.date}</span>
              </div>
            </motion.div>
          ))}
          {filteredOrders.length === 0 && (
            <div className="bg-slate-50 rounded-2xl p-8 text-center">
              <FlaskConical className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">No orders pending for reporting</p>
            </div>
          )}
        </div>

        {/* Result Entry Form */}
        <div className="lg:col-span-2">
          {selectedOrder ? (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-semibold text-slate-900">Enter Test Results</h2>
                  <p className="text-sm text-slate-500">{selectedOrder.patientName} - {selectedOrder.packageName}</p>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSaveResults}
                    className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-smooth flex items-center gap-2 text-sm font-medium"
                  >
                    <Save className="w-4 h-4" />
                    Save Draft
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCompleteReport}
                    className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-smooth flex items-center gap-2 text-sm font-medium"
                  >
                    <Check className="w-4 h-4" />
                    Complete & Send
                  </motion.button>
                </div>
              </div>
              
              {parameters.length > 0 ? (
                <div className="space-y-4">
                  {parameters.map((param: any) => {
                    const value = testResults[param.name] || '';
                    const numValue = parseFloat(value);
                    const isHigh = value && !isNaN(numValue) && numValue > param.maxNormal;
                    const isLow = value && !isNaN(numValue) && numValue < param.minNormal;
                    const isNormal = value && !isNaN(numValue) && !isHigh && !isLow;
                    
                    return (
                      <div key={param.id} className="p-4 bg-slate-50 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-medium text-slate-900">{param.name}</p>
                            <p className="text-xs text-slate-500">Normal Range: {param.minNormal} - {param.maxNormal} {param.unit}</p>
                          </div>
                          {value && (
                            isHigh ? (
                              <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" /> High
                              </span>
                            ) : isLow ? (
                              <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" /> Low
                              </span>
                            ) : (
                              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" /> Normal
                              </span>
                            )
                          )}
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            value={value}
                            onChange={(e) => handleResultChange(param.name, e.target.value)}
                            placeholder={`Enter ${param.name} value`}
                            className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 transition-smooth"
                          />
                          <span className="px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 text-sm">
                            {param.unit}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FlaskConical className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">No parameters defined for this package</p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-slate-50 rounded-2xl p-8 text-center">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">Select an order from the list to enter results</p>
            </div>
          )}
        </div>
      </div>

      {/* Confirm Modal */}
      <AnimatePresence>
        {showConfirmModal && confirmModalData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowConfirmModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {confirmModalData.type === 'complete' ? 'Complete Report?' : 'Save Draft?'}
                </h3>
                <p className="text-slate-500 mb-6">
                  {confirmModalData.type === 'complete' 
                    ? 'This will mark the report as complete and send notification to the customer.'
                    : 'This will save your entered values as a draft.'
                  }
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="flex-1 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-smooth"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmAction}
                    className="flex-1 px-4 py-2 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition-smooth font-medium"
                  >
                    {confirmModalData.type === 'complete' ? 'Complete' : 'Save'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}