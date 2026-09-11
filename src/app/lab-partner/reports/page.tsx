'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, FlaskConical, CheckCircle, AlertTriangle, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { packages } from '@/data/mockData';

export default function LabPartnerReportsPage() {
  const { orders, updateOrderStatus } = useApp();
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, string>>({});

  const testingOrders = orders.filter(o => o.status === 'testing');
  const collectedOrders = orders.filter(o => o.status === 'collected');

  const getPackageParams = (packageId: string) => {
    const pkg = packages.find(p => p.id === packageId);
    return pkg?.parameters || [];
  };

  const getStatus = (value: number, min: number, max: number) => {
    if (value < min || value > max) return 'high';
    const range = max - min;
    const borderlineLow = min + range * 0.15;
    const borderlineHigh = max - range * 0.15;
    if (value < borderlineLow || value > borderlineHigh) return 'borderline';
    return 'normal';
  };

  const updateResult = (paramId: string, value: string) => {
    setResults(prev => ({ ...prev, [paramId]: value }));
  };

  const markTesting = (orderId: string) => {
    const barcode = `SL-${new Date().toISOString().split('T')[0].replace(/-/g, '')}-${Math.floor(Math.random() * 1000)}`;
    updateOrderStatus(orderId, 'testing', undefined, barcode);
  };

  const markCompleted = (orderId: string) => {
    updateOrderStatus(orderId, 'completed');
    setSelectedOrder(null);
    setResults({});
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-cyan-600 to-indigo-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl font-bold">Report Data Entry</h1>
          <p className="text-cyan-100">Enter test results and generate reports</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Sample Collection - Ready for Testing */}
          <div>
            <h2 className="font-semibold text-slate-900 mb-4">Collected - Ready for Testing ({collectedOrders.length})</h2>
            <div className="space-y-3">
              {collectedOrders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => {
                    setSelectedOrder(order.id);
                    setResults({});
                  }}
                  className={`bg-white rounded-2xl shadow-sm border border-slate-200 p-4 cursor-pointer transition-smooth ${selectedOrder === order.id ? 'border-cyan-500 ring-2 ring-cyan-200' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{order.id}</p>
                      <p className="text-sm text-slate-500">{order.packageName}</p>
                      <p className="text-sm text-slate-500">{order.patientName}</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        markTesting(order.id);
                      }}
                      className="px-4 py-2 bg-cyan-500 text-white text-sm font-medium rounded-xl"
                    >
                      Start Testing
                    </motion.button>
                  </div>
                </motion.div>
              ))}
              {collectedOrders.length === 0 && (
                <div className="text-center py-8 bg-white rounded-2xl border border-slate-200">
                  <p className="text-slate-500">No samples ready for testing</p>
                </div>
              )}
            </div>
          </div>

          {/* Currently Testing */}
          <div>
            <h2 className="font-semibold text-slate-900 mb-4">In Lab - Testing ({testingOrders.length})</h2>
            <div className="space-y-3">
              {testingOrders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => {
                    setSelectedOrder(order.id);
                    if (order.barcode) {
                      const params = getPackageParams(order.packageId);
                      const existingResults: Record<string, string> = {};
                      params.forEach(p => {
                        existingResults[p.id] = String((p.minNormal + p.maxNormal) / 2);
                      });
                      setResults(existingResults);
                    }
                  }}
                  className={`bg-white rounded-2xl shadow-sm border border-slate-200 p-4 cursor-pointer transition-smooth ${selectedOrder === order.id ? 'border-cyan-500 ring-2 ring-cyan-200' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-slate-900">{order.id}</p>
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full">Testing</span>
                      </div>
                      <p className="text-sm text-slate-500">{order.patientName}</p>
                      {order.barcode && <p className="text-xs text-slate-400">Barcode: {order.barcode}</p>}
                    </div>
                  </div>
                </motion.div>
              ))}
              {testingOrders.length === 0 && (
                <div className="text-center py-8 bg-white rounded-2xl border border-slate-200">
                  <p className="text-slate-500">No orders in testing</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Result Entry Form */}
        {selectedOrder && testingOrders.find(o => o.id === selectedOrder) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 mt-8 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-slate-900">Enter Test Results - {selectedOrder}</h2>
              <button onClick={() => setSelectedOrder(null)} className="p-2 rounded-xl hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(() => {
                const order = testingOrders.find(o => o.id === selectedOrder);
                if (!order) return null;
                const params = getPackageParams(order.packageId);
                return params.map((param) => {
                  const value = parseFloat(results[param.id] || '0');
                  const status = value ? getStatus(value, param.minNormal, param.maxNormal) : 'normal';
                  return (
                    <div key={param.id} className={`p-4 rounded-xl border-2 ${status === 'high' ? 'border-red-300 bg-red-50' : status === 'borderline' ? 'border-amber-300 bg-amber-50' : 'border-slate-200'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-slate-900 text-sm">{param.name}</span>
                        {status === 'high' && <AlertTriangle className="w-4 h-4 text-red-500" />}
                        {status === 'normal' && <CheckCircle className="w-4 h-4 text-green-500" />}
                      </div>
                      <input
                        type="number"
                        value={results[param.id] || ''}
                        onChange={(e) => updateResult(param.id, e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200"
                        placeholder={`${param.minNormal}-${param.maxNormal}`}
                      />
                      <p className="text-xs text-slate-500 mt-1">Normal: {param.minNormal} - {param.maxNormal} {param.unit}</p>
                    </div>
                  );
                });
              })()}
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => markCompleted(selectedOrder)}
              className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl"
            >
              Complete Report
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}