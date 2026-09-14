'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Search, CheckCircle, AlertCircle, FileText, Save, Download } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function LabPartnerReportsPage() {
  const { orders } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [testResults, setTestResults] = useState<Record<string, string>>({});

  const testingOrders = orders.filter(o => o.status === 'testing');
  
  const filteredOrders = testingOrders.filter(o => 
    o.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleResultChange = (parameterId: string, value: string) => {
    setTestResults(prev => ({ ...prev, [parameterId]: value }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Report Data Entry</h1>

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

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Orders List */}
        <div className="space-y-4">
          <h2 className="font-semibold text-slate-900">Orders in Lab ({testingOrders.length})</h2>
          {filteredOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedOrder(order)}
              className={`bg-white rounded-2xl shadow-sm border p-6 cursor-pointer transition-smooth hover:border-cyan-500 ${
                selectedOrder?.id === order.id ? 'border-cyan-500 ring-2 ring-cyan-100' : 'border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-slate-900">{order.patientName}</h3>
                  <p className="text-sm text-slate-500">{order.id}</p>
                </div>
                <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">Testing</span>
              </div>
              <p className="text-sm text-slate-600">{order.packageName}</p>
            </motion.div>
          ))}
          {filteredOrders.length === 0 && (
            <div className="bg-slate-50 rounded-2xl p-8 text-center">
              <ClipboardList className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">No orders in testing</p>
            </div>
          )}
        </div>

        {/* Result Entry Form */}
        <div>
          {selectedOrder ? (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-slate-900">Enter Results</h2>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-smooth flex items-center gap-2 text-sm font-medium"
                >
                  <Save className="w-4 h-4" />
                  Save Results
                </motion.button>
              </div>
              
              <div className="space-y-4">
                {selectedOrder.package.parameters.map((param: any) => {
                  const value = testResults[param.name] || '';
                  const isHigh = value && parseFloat(value) > param.max;
                  const isLow = value && parseFloat(value) < param.min;
                  
                  return (
                    <div key={param.name} className="p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-medium text-slate-900">{param.name}</p>
                          <p className="text-xs text-slate-500">Normal: {param.min} - {param.max} {param.unit}</p>
                        </div>
                        {value && (
                          isHigh || isLow ? (
                            <AlertCircle className="w-5 h-5 text-red-500" />
                          ) : (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          )
                        )}
                      </div>
                      <input
                        type="number"
                        value={value}
                        onChange={(e) => handleResultChange(param.name, e.target.value)}
                        placeholder={`Enter ${param.name} value`}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 transition-smooth"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 rounded-2xl p-8 text-center">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">Select an order to enter results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}