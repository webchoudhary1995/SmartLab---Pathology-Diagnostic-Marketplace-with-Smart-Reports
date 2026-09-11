'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, Calendar, User, ChevronRight, X, Activity, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { reports } from '@/data/mockData';
import FloatingMedicalElements from '@/components/FloatingMedicalElements';

export default function MyReportsPage() {
  const [selectedReport, setSelectedReport] = useState<typeof reports[0] | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-100 text-green-700';
      case 'borderline': return 'bg-amber-100 text-amber-700';
      case 'high': return 'bg-red-100 text-red-700';
      case 'low': return 'bg-purple-100 text-purple-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal': return <TrendingDown className="w-4 h-4" />;
      case 'borderline': return <Minus className="w-4 h-4" />;
      case 'high': return <TrendingUp className="w-4 h-4" />;
      case 'low': return <Activity className="w-4 h-4" />;
      default: return <Minus className="w-4 h-4" />;
    }
  };

  const getParameterPercentage = (value: number, min: number, max: number) => {
    const range = max - min;
    const normalizedValue = value - min;
    return Math.min(Math.max((normalizedValue / range) * 100, 0), 100);
  };

  return (
    <div className="relative min-h-screen">
      <FloatingMedicalElements />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-slate-900 mb-2">My Reports</h1>
          <p className="text-slate-600 mb-8">View and download your diagnostic reports</p>

          {/* Reports List */}
          <div className="space-y-4">
            {reports.map((report, index) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedReport(report)}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 cursor-pointer card-hover"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
                      <FileText className="w-6 h-6 text-cyan-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{report.packageName}</h3>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm text-slate-500 flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {report.testDate}
                        </span>
                        <span className="text-sm text-slate-500 flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {report.patientName}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                      Completed
                    </span>
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {reports.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                <FileText className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-600">No reports available yet</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Report Detail Modal */}
      <AnimatePresence>
        {selectedReport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedReport(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Report Header */}
              <div className="bg-gradient-to-r from-cyan-500 to-indigo-600 p-6 text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-5 h-5" />
                      <span className="text-cyan-100">Smart Report</span>
                    </div>
                    <h2 className="text-2xl font-bold">{selectedReport.packageName}</h2>
                    <p className="text-cyan-100 mt-1">Report ID: {selectedReport.id}</p>
                  </div>
                  <button
                    onClick={() => setSelectedReport(null)}
                    className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-smooth"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
                <div className="flex items-center gap-6 mt-4">
                  <div>
                    <p className="text-cyan-100 text-sm">Patient</p>
                    <p className="font-semibold">{selectedReport.patientName}</p>
                  </div>
                  <div>
                    <p className="text-cyan-100 text-sm">Test Date</p>
                    <p className="font-semibold">{selectedReport.testDate}</p>
                  </div>
                </div>
              </div>

              {/* Parameters */}
              <div className="p-6">
                <h3 className="font-semibold text-slate-900 mb-4">Test Results</h3>
                <div className="space-y-4">
                  {selectedReport.parameters.map((param) => {
                    const percentage = getParameterPercentage(param.value, param.minNormal, param.maxNormal);
                    const statusColor = getStatusColor(param.status);
                    
                    return (
                      <div key={param.parameterId} className="p-4 bg-slate-50 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${statusColor}`}>
                              {getStatusIcon(param.status)}
                            </span>
                            <div>
                              <p className="font-medium text-slate-900">{param.parameterName}</p>
                              <p className="text-xs text-slate-500">Normal: {param.minNormal} - {param.maxNormal} {param.unit}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`text-xl font-bold ${statusColor.replace('bg-', 'text-').replace('100', '600')}`}>
                              {param.value} <span className="text-sm font-normal">{param.unit}</span>
                            </p>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${statusColor}`}>
                              {param.status}
                            </span>
                          </div>
                        </div>
                        {/* Progress Bar */}
                        <div className="relative h-2 bg-slate-200 rounded-full overflow-hidden">
                          <motion.div
                            className={`absolute h-full rounded-full ${
                              param.status === 'normal' ? 'bg-green-500' :
                              param.status === 'borderline' ? 'bg-amber-500' :
                              'bg-red-500'
                            }`}
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          />
                          {/* Normal Range Marker */}
                          <div 
                            className="absolute top-0 bottom-0 w-0.5 bg-slate-400"
                            style={{ left: '50%' }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Doctor Comment */}
                {selectedReport.doctorComment && (
                  <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-5 h-5 text-amber-600" />
                      <span className="font-semibold text-amber-800">Doctor's Comment</span>
                    </div>
                    <p className="text-amber-900">{selectedReport.doctorComment}</p>
                  </div>
                )}
              </div>

              {/* Download Button */}
              <div className="p-6 border-t border-slate-200">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-smooth flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download PDF Report
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}