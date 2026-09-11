'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Building2, FlaskConical, Tag, FileText, DollarSign, LogOut, Menu } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/franchises', label: 'Franchises', icon: Building2 },
  { href: '/admin/tests', label: 'Tests', icon: FlaskConical },
  { href: '/admin/blog', label: 'Blog', icon: FileText },
  { href: '/admin/coupons', label: 'Coupons', icon: Tag },
  { href: '/admin/payouts', label: 'Payouts', icon: DollarSign },
];

export default function AdminHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-amber-600 to-orange-600 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <span className="text-xl font-bold">🏥</span>
            </div>
            <div>
              <span className="font-bold text-xl">SmartLab</span>
              <span className="text-xs block text-amber-100">Admin Portal</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(item => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-smooth flex items-center gap-2 ${
                    isActive ? 'bg-white/20' : 'hover:bg-white/10'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm text-white/80 hover:text-white hidden sm:block">
              View Website
            </Link>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-smooth">
              <LogOut className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-white/20">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 hover:bg-white/10 rounded-lg"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}