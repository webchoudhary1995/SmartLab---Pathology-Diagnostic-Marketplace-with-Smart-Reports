'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
import SmartLabLogo from './SmartLabLogo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Footer */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <SmartLabLogo showTagline={true} size="md" />
            <p className="text-sm text-slate-600 leading-relaxed">
              SmartLab brings accurate lab tests to your doorstep. 100% NABL accredited labs, 
              certified phlebotomists, and smart visual reports.
            </p>
            <div className="flex gap-3">
              {['f', 't', 'i', 'in'].map((icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-cyan-100 hover:text-cyan-600 transition-smooth text-sm font-bold"
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: '/packages', label: 'Health Packages' },
                { href: '/labs', label: 'Find Labs' },
                { href: '/track-order', label: 'Track Order' },
                { href: '/my-reports', label: 'My Reports' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact Us' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-600 hover:text-cyan-600 transition-smooth">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Services</h3>
            <ul className="space-y-2">
              {[
                { href: '/packages?category=full-body', label: 'Full Body Checkup' },
                { href: '/packages?category=diabetes', label: 'Diabetes Testing' },
                { href: '/packages?category=heart', label: 'Cardiac Screening' },
                { href: '/packages?category=women', label: "Women's Health" },
                { href: '/packages?category=senior', label: 'Senior Citizen Care' },
                { href: '/upload-prescription', label: 'Upload Prescription' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-600 hover:text-cyan-600 transition-smooth">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-600">
                  123, Healthcare Ave, MI Road<br />
                  Jaipur, Rajasthan 302001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-cyan-600 flex-shrink-0" />
                <a href="tel:+919876543210" className="text-sm text-slate-600 hover:text-cyan-600">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-cyan-600 flex-shrink-0" />
                <a href="mailto:care@smartlab.com" className="text-sm text-slate-600 hover:text-cyan-600">
                  care@smartlab.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Partner Portal Links */}
        <div className="py-6 border-t border-slate-200">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/admin" className="text-sm text-slate-500 hover:text-cyan-600 transition-smooth">
              Admin Portal
            </Link>
            <span className="text-slate-300">|</span>
            <Link href="/lab-partner" className="text-sm text-slate-500 hover:text-cyan-600 transition-smooth">
              Lab Partner Portal
            </Link>
            <span className="text-slate-300">|</span>
            <Link href="/sample-boy" className="text-sm text-slate-500 hover:text-cyan-600 transition-smooth">
              Sample Boy Portal
            </Link>
            <span className="text-slate-300">|</span>
            <Link href="/partner" className="text-sm text-slate-500 hover:text-cyan-600 transition-smooth">
              Partner With Us
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-4 border-t border-slate-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              © {currentYear} SmartLab. All rights reserved.
            </p>
            <div className="flex gap-4">
              {[
                { href: '/privacy', label: 'Privacy Policy' },
                { href: '/terms', label: 'Terms of Service' },
                { href: '/faq', label: 'FAQs' },
              ].map(link => (
                <Link key={link.href} href={link.href} className="text-sm text-slate-500 hover:text-cyan-600 transition-smooth">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}