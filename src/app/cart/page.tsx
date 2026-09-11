'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import FloatingMedicalElements from '@/components/FloatingMedicalElements';

export default function CartPage() {
  const { cart, removeFromCart, getCartTotal, clearCart } = useApp();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number; discountType: 'percentage' | 'fixed' } | null>(null);
  const [couponError, setCouponError] = useState('');

  const subtotal = getCartTotal();
  const discount = appliedCoupon ? 
    (appliedCoupon.discountType === 'percentage' 
      ? subtotal * (appliedCoupon.discount / 100) 
      : appliedCoupon.discount) 
    : 0;
  const total = subtotal - discount;

  const applyCoupon = () => {
    setCouponError('');
    if (couponCode.toUpperCase() === 'FIRST500') {
      setAppliedCoupon({ code: 'FIRST500', discount: 500, discountType: 'fixed' });
    } else if (couponCode.toUpperCase() === 'HEALTH20') {
      setAppliedCoupon({ code: 'HEALTH20', discount: 20, discountType: 'percentage' });
    } else {
      setCouponError('Invalid coupon code');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="relative min-h-screen">
        <FloatingMedicalElements />
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-slate-400" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Your Cart is Empty</h1>
            <p className="text-slate-600 mb-8">Browse our health packages and add some to your cart</p>
            <Link href="/packages">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-cyan-500 text-white font-semibold rounded-xl hover:bg-cyan-600 transition-smooth"
              >
                Browse Packages
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <FloatingMedicalElements />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-slate-900 mb-8">Shopping Cart</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {cart.map((item, index) => (
                  <motion.div
                    key={item.package.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
                  >
                    <div className="flex gap-4">
                      <div className="w-20 h-20 bg-cyan-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-3xl">🧪</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-slate-900">{item.package.name}</h3>
                            <p className="text-sm text-slate-500">{item.package.parameters.length} parameters included</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.package.id)}
                            className="p-2 text-slate-400 hover:text-red-500 transition-smooth"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="flex justify-between items-end mt-4">
                          <div>
                            <span className="text-sm text-slate-400 line-through">₹{item.package.originalPrice}</span>
                            <div className="text-xl font-bold text-cyan-600">₹{item.package.discountedPrice}</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-slate-600 font-medium">Qty: {item.quantity}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <button
                onClick={clearCart}
                className="text-sm text-slate-500 hover:text-red-500 transition-smooth"
              >
                Clear Cart
              </button>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Order Summary</h2>

                {/* Coupon Input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Apply Coupon</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                      className="flex-1 px-4 py-2 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white transition-smooth text-sm"
                    />
                    <button
                      onClick={applyCoupon}
                      className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-xl hover:bg-slate-800 transition-smooth"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && <p className="text-red-500 text-xs mt-1">{couponError}</p>}
                  {appliedCoupon && (
                    <p className="text-green-600 text-xs mt-1">Coupon applied: {appliedCoupon.code}</p>
                  )}
                </div>

                <div className="space-y-3 border-t border-slate-200 pt-4">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-semibold text-slate-900 pt-3 border-t border-slate-200">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>

                <Link href="/checkout">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-smooth flex items-center justify-center gap-2"
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>

                <Link href="/packages" className="block text-center mt-4 text-sm text-slate-600 hover:text-cyan-600 transition-smooth">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}