'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, FlaskConical, Trash2, Edit, X, Save, Package, Beaker } from 'lucide-react';

const mockPackages = [
  { id: '1', name: 'Complete Blood Count (CBC)', category: 'blood', description: 'Complete blood count test including Hb, RBC, WBC, Platelets', originalPrice: 800, discountedPrice: 499, parameters: [{ name: 'Hemoglobin', min: 12, max: 17.5, unit: 'g/dL' }, { name: 'RBC Count', min: 4.5, max: 6.5, unit: 'million/cumm' }], fasting: 'No' },
  { id: '2', name: 'Liver Function Test', category: 'liver', description: 'Complete liver function assessment', originalPrice: 1500, discountedPrice: 999, parameters: [{ name: 'SGPT', min: 0, max: 40, unit: 'U/L' }, { name: 'SGOT', min: 0, max: 40, unit: 'U/L' }], fasting: 'Yes (12 hrs)' },
  { id: '3', name: 'Thyroid Profile', category: 'thyroid', description: 'T3, T4, TSH levels check', originalPrice: 1200, discountedPrice: 799, parameters: [{ name: 'TSH', min: 0.4, max: 4.0, unit: 'mIU/L' }, { name: 'T3', min: 0.8, max: 2.0, unit: 'ng/mL' }], fasting: 'No' },
];

export default function AdminTestsPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [packagesList, setPackagesList] = useState(mockPackages);
  const [formData, setFormData] = useState({
    name: '', category: 'blood', description: '', originalPrice: '', discountedPrice: '', fasting: 'No', parameters: [{ name: '', min: '', max: '', unit: '' }]
  });

  const filteredPackages = packagesList.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddParameter = () => {
    setFormData({ ...formData, parameters: [...formData.parameters, { name: '', min: '', max: '', unit: '' }] });
  };

  const handleRemoveParameter = (index: number) => {
    setFormData({ ...formData, parameters: formData.parameters.filter((_, i) => i !== index) });
  };

  const handleParameterChange = (index: number, field: string, value: string) => {
    const newParams = [...formData.parameters];
    newParams[index] = { ...newParams[index], [field]: value };
    setFormData({ ...formData, parameters: newParams });
  };

  const handleSubmit = () => {
    if (formData.name && formData.description && formData.originalPrice && formData.discountedPrice) {
      const newPackage = {
        id: Date.now().toString(),
        name: formData.name,
        category: formData.category,
        description: formData.description,
        originalPrice: parseInt(formData.originalPrice),
        discountedPrice: parseInt(formData.discountedPrice),
        fasting: formData.fasting,
        parameters: formData.parameters.filter(p => p.name && p.min && p.max && p.unit).map(p => ({ name: p.name, min: Number(p.min), max: Number(p.max), unit: p.unit }))
      };
      setPackagesList([newPackage, ...packagesList]);
      setShowAddForm(false);
      setFormData({ name: '', category: 'blood', description: '', originalPrice: '', discountedPrice: '', fasting: 'No', parameters: [{ name: '', min: '', max: '', unit: '' }] });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Test & Package Master</h1>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition-smooth flex items-center gap-2 text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Add Test/Package
        </motion.button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search tests or packages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white transition-smooth"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPackages.map((pkg, index) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
                {pkg.parameters.length > 3 ? <Package className="w-6 h-6 text-cyan-600" /> : <FlaskConical className="w-6 h-6 text-cyan-600" />}
              </div>
              <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full capitalize">
                {pkg.category}
              </span>
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">{pkg.name}</h3>
            <p className="text-sm text-slate-500 mb-4 line-clamp-2">{pkg.description}</p>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-slate-400 line-through">₹{pkg.originalPrice}</span>
                <span className="ml-2 text-lg font-bold text-cyan-600">₹{pkg.discountedPrice}</span>
              </div>
              <span className="text-sm text-slate-500">{pkg.parameters.length} params</span>
            </div>
            {pkg.fasting !== 'No' && (
              <span className="mt-2 inline-block px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">
                {pkg.fasting}
              </span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Add Package Modal */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto"
            onClick={() => setShowAddForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl max-w-2xl w-full my-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl">
                <h2 className="text-xl font-bold text-slate-900">Add New Test/Package</h2>
                <button onClick={() => setShowAddForm(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Package Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                    placeholder="e.g., Complete Blood Count"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                    >
                      <option value="blood">Blood</option>
                      <option value="liver">Liver</option>
                      <option value="kidney">Kidney</option>
                      <option value="thyroid">Thyroid</option>
                      <option value="heart">Heart</option>
                      <option value="diabetes">Diabetes</option>
                      <option value="full-body">Full Body</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Fasting Required</label>
                    <select
                      value={formData.fasting}
                      onChange={(e) => setFormData({ ...formData, fasting: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                    >
                      <option value="No">No</option>
                      <option value="Yes (8 hrs)">Yes (8 hours)</option>
                      <option value="Yes (12 hrs)">Yes (12 hours)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 resize-none"
                    placeholder="Package description..."
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Original Price (₹)</label>
                    <input
                      type="number"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                      placeholder="1000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Discounted Price (₹)</label>
                    <input
                      type="number"
                      value={formData.discountedPrice}
                      onChange={(e) => setFormData({ ...formData, discountedPrice: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                      placeholder="699"
                    />
                  </div>
                </div>

                {/* Parameters Section */}
                <div className="border-t border-slate-200 pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                      <Beaker className="w-5 h-5" />
                      Test Parameters
                    </h3>
                    <button
                      type="button"
                      onClick={handleAddParameter}
                      className="text-sm text-cyan-600 hover:text-cyan-700 flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" /> Add Parameter
                    </button>
                  </div>
                  {formData.parameters.map((param, index) => (
                    <div key={index} className="grid grid-cols-5 gap-2 mb-3 items-end">
                      <div className="col-span-2">
                        <input
                          type="text"
                          value={param.name}
                          onChange={(e) => handleParameterChange(index, 'name', e.target.value)}
                          className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:border-cyan-500"
                          placeholder="Parameter name"
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          value={param.min}
                          onChange={(e) => handleParameterChange(index, 'min', e.target.value)}
                          className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:border-cyan-500"
                          placeholder="Min"
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          value={param.max}
                          onChange={(e) => handleParameterChange(index, 'max', e.target.value)}
                          className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:border-cyan-500"
                          placeholder="Max"
                        />
                      </div>
                      <div className="flex items-center gap-1">
                        <input
                          type="text"
                          value={param.unit}
                          onChange={(e) => handleParameterChange(index, 'unit', e.target.value)}
                          className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:border-cyan-500"
                          placeholder="Unit"
                        />
                        {formData.parameters.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveParameter(index)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-6 border-t border-slate-200 flex justify-end gap-3 sticky bottom-0 bg-white rounded-b-2xl">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-smooth"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition-smooth font-medium flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Package
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}