'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, ArrowRight, Shield, Award, Clock, FileText, 
  Heart, Droplets, Waves, Sparkles, User, Users, 
  ChevronLeft, ChevronRight, CheckCircle, Phone, MapPin,
  Search, Stethoscope, Activity
} from 'lucide-react';
import FloatingMedicalElements from '@/components/FloatingMedicalElements';
import { useApp } from '@/context/AppContext';
import { packages, categoryFilters, organCategories, timeSlots } from '@/data/mockData';

export default function HomePage() {
  const { addToCart, selectedCity } = useApp();
  const [activeCategory, setActiveCategory] = useState('all');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showUploadSuccess, setShowUploadSuccess] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const filteredPackages = activeCategory === 'all' 
    ? packages 
    : packages.filter(p => p.category === activeCategory);

  const popularPackages = packages.filter(p => p.popular);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setShowUploadSuccess(true);
      setTimeout(() => setShowUploadSuccess(false), 3000);
    }
  };

  return (
    <div className="relative">
      <FloatingMedicalElements />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 rounded-full">
                <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-cyan-700">Now in {selectedCity.name}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                Accurate Lab Tests at Your{' '}
                <span className="gradient-text">Doorstep</span>
              </h1>
              
              <p className="text-lg text-slate-600 max-w-lg">
                Book certified lab tests online. NABL accredited labs, expert phlebotomists, 
                and smart visual reports delivered to you.
              </p>

              {/* Value Badges */}
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Shield, label: '100% Certified Labs', color: 'bg-green-100 text-green-700' },
                  { icon: Award, label: 'NABL Accredited', color: 'bg-amber-100 text-amber-700' },
                  { icon: Clock, label: '30-Min Home Collection', color: 'bg-cyan-100 text-cyan-700' },
                  { icon: FileText, label: 'Smart Graphic Reports', color: 'bg-indigo-100 text-indigo-700' },
                ].map((badge, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${badge.color}`}
                  >
                    <badge.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{badge.label}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/packages">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-smooth flex items-center justify-center gap-2 group"
                  >
                    View Packages
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
                <Link href="/upload-prescription">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 font-semibold rounded-xl border-2 border-slate-200 hover:border-cyan-500 hover:text-cyan-600 transition-smooth flex items-center justify-center gap-2"
                  >
                    <Upload className="w-5 h-5" />
                    Upload Prescription
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            {/* Prescription Upload Box */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-slate-200/50">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  Upload Your Prescription
                </h3>
                <p className="text-slate-600 text-sm mb-6">
                  Get a free consultation and customized package recommendation
                </p>
                
                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:border-cyan-400 transition-smooth cursor-pointer relative overflow-hidden group">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="space-y-3">
                    <div className="w-16 h-16 mx-auto bg-cyan-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Upload className="w-8 h-8 text-cyan-600" />
                    </div>
                    {uploadedFile ? (
                      <div className="text-green-600 font-medium">
                        <CheckCircle className="w-5 h-5 inline mr-2" />
                        {uploadedFile.name}
                      </div>
                    ) : (
                      <>
                        <p className="text-slate-700 font-medium">
                          Drag & drop your prescription
                        </p>
                        <p className="text-slate-500 text-sm">
                          PDF, JPG, PNG up to 10MB
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <AnimatePresence>
                  {showUploadSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-4 p-4 bg-green-100 rounded-xl flex items-center gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-700">Prescription uploaded!</p>
                        <p className="text-sm text-green-600">Our health expert will call you shortly</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-smooth flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Get Call from Health Expert
                </motion.button>

                <p className="text-center text-xs text-slate-500 mt-3">
                  Trusted by 50,000+ customers across India
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Health Packages Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Popular Health Packages
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Comprehensive diagnostic tests curated by medical experts
            </p>
          </motion.div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categoryFilters.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2.5 rounded-full font-medium transition-smooth ${
                  activeCategory === category.id
                    ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Package Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPackages.slice(0, 8).map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden card-hover group"
              >
                <div className="p-5">
                  {pkg.popular && (
                    <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full mb-3">
                      Most Popular
                    </span>
                  )}
                  <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-cyan-600 transition-smooth">
                    {pkg.name}
                  </h3>
                  <p className="text-sm text-slate-500 mb-3 line-clamp-2">
                    {pkg.description}
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-full">
                      {pkg.parameters.length} Parameters
                    </span>
                    {pkg.fastingRequired && (
                      <span className="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-full">
                        Fasting Required
                      </span>
                    )}
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-sm text-slate-400 line-through">
                        ₹{pkg.originalPrice.toLocaleString()}
                      </span>
                      <div className="text-2xl font-bold text-cyan-600">
                        ₹{pkg.discountedPrice.toLocaleString()}
                      </div>
                    </div>
                    <Link href={`/packages?id=${pkg.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addToCart(pkg)}
                        className="px-4 py-2 bg-cyan-500 text-white text-sm font-medium rounded-xl hover:bg-cyan-600 transition-smooth"
                      >
                        Book Now
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/packages">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-smooth inline-flex items-center gap-2"
              >
                View All Packages
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* Organ & Disease Category Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Browse by Organ & Condition
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Find the right tests for your specific health needs
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {organCategories.map((organ, index) => (
              <motion.div
                key={organ.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/packages?category=${organ.id}`}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    className={`p-6 rounded-2xl ${organ.color} cursor-pointer group`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-white/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Stethoscope className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{organ.name}</h3>
                        <p className="text-sm text-slate-600">
                          {packages.filter(p => p.category === organ.id).length} tests available
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose SmartLab */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Why Choose SmartLab?
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              We make diagnostic testing convenient, accurate, and accessible
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: 'NABL Accredited', desc: 'International quality standards for accurate results' },
              { icon: Clock, title: '30-Min Collection', desc: 'Quick home sample collection by certified phlebotomists' },
              { icon: FileText, title: 'Smart Reports', desc: 'Visual, easy-to-understand reports with doctor comments' },
              { icon: Shield, title: '100% Safe', desc: 'Sterile equipment and safe sample handling protocols' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-cyan-100 rounded-2xl flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-cyan-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-cyan-500 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Book Your Health Checkup?
            </h2>
            <p className="text-cyan-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust SmartLab for their diagnostic needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/packages">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-white text-cyan-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-smooth"
                >
                  Browse Packages
                </motion.button>
              </Link>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-white/10 transition-smooth"
                >
                  Contact Us
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}