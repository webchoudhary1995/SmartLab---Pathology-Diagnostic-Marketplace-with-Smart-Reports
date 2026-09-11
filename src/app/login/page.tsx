'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Smartphone } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [userType, setUserType] = useState('customer');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - redirect based on user type
    if (userType === 'admin') {
      router.push('/admin');
    } else if (userType === 'lab-partner') {
      router.push('/lab-partner');
    } else if (userType === 'sample-boy') {
      router.push('/sample-boy');
    } else {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-indigo-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🏥</span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 mt-4">Welcome Back</h1>
          <p className="text-slate-600">Sign in to your account</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
          {/* User Type Selector */}
          <div className="flex p-1 bg-slate-100 rounded-xl mb-6">
            {[
              { value: 'customer', label: 'Customer' },
              { value: 'admin', label: 'Admin' },
              { value: 'lab-partner', label: 'Lab Partner' },
              { value: 'sample-boy', label: 'Sample Boy' },
            ].map(type => (
              <button
                key={type.value}
                onClick={() => setUserType(type.value)}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-smooth ${
                  userType === type.value
                    ? 'bg-white text-cyan-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email or Phone</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white transition-smooth"
                  placeholder="Enter your email or phone"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white transition-smooth"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300" />
                <span className="text-slate-600">Remember me</span>
              </label>
              <a href="#" className="text-cyan-600 hover:text-cyan-700 font-medium">
                Forgot password?
              </a>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-smooth flex items-center justify-center gap-2"
            >
              Sign In
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-600">
              Don't have an account?{' '}
              <Link href="/register" className="text-cyan-600 hover:text-cyan-700 font-medium">
                Sign up
              </Link>
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-slate-50 rounded-xl">
            <p className="text-xs font-medium text-slate-500 mb-2">Demo Credentials:</p>
            <p className="text-xs text-slate-400">Email: demo@smartlab.com</p>
            <p className="text-xs text-slate-400">Password: demo123</p>
          </div>
        </div>

        {/* Back to Website */}
        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-slate-500 hover:text-cyan-600">
            ← Back to Website
          </Link>
        </div>
      </motion.div>
    </div>
  );
}