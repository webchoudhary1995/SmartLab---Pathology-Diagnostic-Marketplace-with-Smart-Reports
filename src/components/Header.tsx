'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, ChevronDown, ShoppingCart, User, Menu, X, Package, MapPinned, FileText, Truck } from 'lucide-react';
import SmartLabLogo from './SmartLabLogo';
import { useApp } from '@/context/AppContext';

export default function Header() {
  const { selectedCity, setSelectedCity, cities, cart } = useApp();
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [portalDropdownOpen, setPortalDropdownOpen] = useState(false);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/">
            <SmartLabLogo showTagline={false} size="sm" />
          </Link>

          {/* City Picker - Desktop */}
          <div className="hidden md:block relative">
            <button
              onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-smooth"
            >
              <MapPin className="w-4 h-4 text-cyan-600" />
              <span className="text-sm font-medium text-slate-700">{selectedCity.name}</span>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${cityDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {cityDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-2"
                >
                  {cities.map(city => (
                    <button
                      key={city.id}
                      onClick={() => {
                        setSelectedCity(city);
                        setCityDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-50 transition-smooth ${
                        selectedCity.id === city.id ? 'text-cyan-600 font-medium' : 'text-slate-700'
                      }`}
                    >
                      {city.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search tests, packages, conditions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 border border-transparent focus:border-cyan-500 focus:bg-white transition-smooth text-sm"
              />
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {[
              { href: '/', label: 'Home' },
              { href: '/packages', label: 'Packages' },
              { href: '/labs', label: 'Find Labs' },
              { href: '/upload-prescription', label: 'Upload Rx' },
              { href: '/track-order', label: 'Track Order' },
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-cyan-600 hover:bg-slate-100 rounded-lg transition-smooth"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 rounded-xl hover:bg-slate-100 transition-smooth"
            >
              <ShoppingCart className="w-5 h-5 text-slate-600" />
              {cartItemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-cyan-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
                >
                  {cartItemCount}
                </motion.span>
              )}
            </Link>

            {/* Portal Dropdown */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setPortalDropdownOpen(!portalDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 transition-smooth"
              >
                <User className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-medium text-indigo-700">Portals</span>
                <ChevronDown className={`w-4 h-4 text-indigo-500 transition-transform ${portalDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {portalDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2"
                  >
                    <Link href="/admin" onClick={() => setPortalDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                      <span className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">🏥</span>
                      <div>
                        <div className="font-medium">Admin Portal</div>
                        <div className="text-xs text-slate-500">Master Management</div>
                      </div>
                    </Link>
                    <Link href="/lab-partner" onClick={() => setPortalDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                      <span className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center">🔬</span>
                      <div>
                        <div className="font-medium">Lab Partner</div>
                        <div className="text-xs text-slate-500">Franchise Dashboard</div>
                      </div>
                    </Link>
                    <Link href="/sample-boy" onClick={() => setPortalDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                      <span className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">🩸</span>
                      <div>
                        <div className="font-medium">Sample Boy</div>
                        <div className="text-xs text-slate-500">Pickup Management</div>
                      </div>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition-smooth"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-slate-200 py-4"
            >
              {/* Mobile Search */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search tests, packages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 border border-transparent focus:border-cyan-500 focus:bg-white transition-smooth text-sm"
                  />
                </div>
              </div>

              {/* Mobile City Picker */}
              <div className="mb-4">
                <button
                  onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 w-full"
                >
                  <MapPin className="w-4 h-4 text-cyan-600" />
                  <span className="text-sm font-medium text-slate-700">{selectedCity.name}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 ml-auto ${cityDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {cityDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="mt-2 bg-white rounded-xl shadow-lg border border-slate-200 py-2"
                    >
                      {cities.map(city => (
                        <button
                          key={city.id}
                          onClick={() => {
                            setSelectedCity(city);
                            setCityDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-50 ${
                            selectedCity.id === city.id ? 'text-cyan-600 font-medium' : 'text-slate-700'
                          }`}
                        >
                          {city.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Nav Links */}
              <nav className="space-y-1">
                {[
                  { href: '/', label: 'Home', icon: '🏠' },
                  { href: '/packages', label: 'Packages', icon: '📦' },
                  { href: '/labs', label: 'Find Labs', icon: '🔬' },
                  { href: '/upload-prescription', label: 'Upload Prescription', icon: '📄' },
                  { href: '/track-order', label: 'Track Order', icon: '📍' },
                  { href: '/cart', label: 'Cart', icon: '🛒' },
                ].map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 transition-smooth"
                  >
                    <span>{link.icon}</span>
                    <span className="font-medium text-slate-700">{link.label}</span>
                  </Link>
                ))}
              </nav>

              {/* Mobile Portal Links */}
              <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2 px-4">Portals</div>
                <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100">
                  <span className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-sm">🏥</span>
                  <span className="font-medium text-slate-700">Admin Portal</span>
                </Link>
                <Link href="/lab-partner" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100">
                  <span className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center text-sm">🔬</span>
                  <span className="font-medium text-slate-700">Lab Partner</span>
                </Link>
                <Link href="/sample-boy" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100">
                  <span className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-sm">🩸</span>
                  <span className="font-medium text-slate-700">Sample Boy</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}