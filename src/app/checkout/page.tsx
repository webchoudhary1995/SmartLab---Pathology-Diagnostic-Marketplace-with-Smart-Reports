'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock, User, CreditCard, DollarSign, Smartphone, CheckCircle, ChevronLeft } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { timeSlots } from '@/data/mockData';
import FloatingMedicalElements from '@/components/FloatingMedicalElements';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getCartTotal, clearCart, createOrder, selectedCity } = useApp();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    city: selectedCity.name,
    pincode: '',
    date: '',
    timeSlot: '',
    patientName: '',
    patientAge: '',
    patientGender: 'male' as 'male' | 'female' | 'other',
    notes: '',
    paymentMethod: 'cod' as 'cod' | 'upi' | 'card',
  });
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = getCartTotal();
  const discount = couponApplied ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'HEALTH20') {
      setCouponApplied(true);
    }
  };

  const placeOrder = () => {
    const orderId = `ORD-${Date.now().toString().slice(-6)}`;
    createOrder({
      id: orderId,
      packageId: cart[0]?.package.id || '',
      packageName: cart[0]?.package.name || '',
      patientName: formData.patientName,
      age: parseInt(formData.patientAge),
      gender: formData.patientGender,
      address: {
        fullName: formData.fullName,
        phone: formData.phone,
        addressLine1: formData.addressLine1,
        addressLine2: formData.addressLine2,
        city: formData.city,
        pincode: formData.pincode,
      },
      slot: {
        date: formData.date,
        timeSlot: formData.timeSlot,
      },
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      totalAmount: total,
    });
    clearCart();
    setOrderPlaced(true);
  };

  useEffect(() => {
    if (cart.length === 0 && !orderPlaced) {
      router.push('/packages');
    }
  }, [cart.length, orderPlaced, router]);

  if (cart.length === 0 && !orderPlaced) {
    return null;
  }

  if (orderPlaced) {
    return (
      <div className="relative min-h-screen">
        <FloatingMedicalElements />
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center"
          >
            <CheckCircle className="w-12 h-12 text-green-600" />
          </motion.div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Order Placed Successfully!</h1>
          <p className="text-slate-600 mb-8">Your order has been confirmed. We will contact you shortly for sample collection.</p>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
            <p className="text-slate-500 text-sm">Order ID</p>
            <p className="text-2xl font-bold text-cyan-600">ORD-{Date.now().toString().slice(-6)}</p>
          </div>
          <div className="flex gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/track-order')}
              className="px-6 py-3 bg-cyan-500 text-white font-semibold rounded-xl hover:bg-cyan-600 transition-smooth"
            >
              Track Order
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-smooth"
            >
              Back to Home
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  const steps = [
    { number: 1, label: 'Address' },
    { number: 2, label: 'Schedule' },
    { number: 3, label: 'Patient Info' },
    { number: 4, label: 'Payment' },
  ];

  return (
    <div className="relative min-h-screen">
      <FloatingMedicalElements />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-smooth ${
                  currentStep >= step.number 
                    ? 'bg-cyan-500 text-white' 
                    : 'bg-slate-200 text-slate-500'
                }`}>
                  {currentStep > step.number ? <CheckCircle className="w-5 h-5" /> : step.number}
                </div>
                <span className={`text-xs mt-1 ${currentStep >= step.number ? 'text-cyan-600' : 'text-slate-500'}`}>
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 md:w-24 h-1 mx-2 rounded ${currentStep > step.number ? 'bg-cyan-500' : 'bg-slate-200'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            {/* Step 1: Address */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
              >
                <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-cyan-600" />
                  Pickup Address
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white transition-smooth"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white transition-smooth"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white transition-smooth"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Address Line 1</label>
                    <input
                      type="text"
                      name="addressLine1"
                      value={formData.addressLine1}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white transition-smooth"
                      placeholder="House No., Street, Area"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Address Line 2 (Optional)</label>
                    <input
                      type="text"
                      name="addressLine2"
                      value={formData.addressLine2}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white transition-smooth"
                      placeholder="Landmark"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white transition-smooth"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white transition-smooth"
                      placeholder="302001"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Schedule */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
              >
                <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-cyan-600" />
                  Select Date & Time Slot
                </h2>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Select Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white transition-smooth"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Available Time Slots</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.id}
                        onClick={() => slot.available && setFormData({ ...formData, timeSlot: slot.time })}
                        disabled={!slot.available}
                        className={`p-3 rounded-xl border-2 text-sm font-medium transition-smooth ${
                          formData.timeSlot === slot.time
                            ? 'border-cyan-500 bg-cyan-50 text-cyan-700'
                            : slot.available
                            ? 'border-slate-200 hover:border-slate-300 text-slate-700'
                            : 'border-slate-100 bg-slate-50 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Patient Info */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
              >
                <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
                  <User className="w-5 h-5 text-cyan-600" />
                  Patient Information
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Patient Name</label>
                    <input
                      type="text"
                      name="patientName"
                      value={formData.patientName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white transition-smooth"
                      placeholder="Name as per prescription"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Age</label>
                    <input
                      type="number"
                      name="patientAge"
                      value={formData.patientAge}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white transition-smooth"
                      placeholder="Years"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
                    <select
                      name="patientGender"
                      value={formData.patientGender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white transition-smooth"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Special Notes (Optional)</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white transition-smooth"
                      placeholder="Any specific instructions or medical conditions..."
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Payment */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
              >
                <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-cyan-600" />
                  Payment Method
                </h2>
                <div className="space-y-3">
                  {[
                    { id: 'cod', label: 'Cash on Collection', icon: DollarSign, desc: 'Pay when sample is collected' },
                    { id: 'upi', label: 'UPI', icon: Smartphone, desc: 'Pay via UPI app' },
                    { id: 'card', label: 'Credit / Debit Card', icon: CreditCard, desc: 'Visa, Mastercard, RuPay' },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-smooth ${
                        formData.paymentMethod === method.id
                          ? 'border-cyan-500 bg-cyan-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={formData.paymentMethod === method.id}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        formData.paymentMethod === method.id ? 'bg-cyan-500 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <method.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{method.label}</p>
                        <p className="text-sm text-slate-500">{method.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentStep(currentStep - 1)}
                disabled={currentStep === 1}
                className="px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <ChevronLeft className="w-5 h-5" />
                Back
              </motion.button>
              {currentStep < 4 ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="px-6 py-3 bg-cyan-500 text-white font-semibold rounded-xl hover:bg-cyan-600 transition-smooth flex items-center gap-2"
                >
                  Continue
                  <ChevronLeft className="w-5 h-5 rotate-180" />
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={placeOrder}
                  className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-smooth"
                >
                  Place Order • ₹{total.toLocaleString()}
                </motion.button>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-24">
              <h3 className="font-semibold text-slate-900 mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4">
                {cart.map((item) => (
                  <div key={item.package.id} className="flex justify-between text-sm">
                    <span className="text-slate-600">{item.package.name}</span>
                    <span className="font-medium">₹{(item.package.discountedPrice * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="mb-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon code"
                    className="flex-1 px-3 py-2 rounded-lg bg-slate-50 border border-transparent focus:border-cyan-500 text-sm"
                  />
                  <button
                    onClick={applyCoupon}
                    className="px-3 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-smooth"
                  >
                    Apply
                  </button>
                </div>
                {couponApplied && <p className="text-green-600 text-xs mt-1">10% discount applied!</p>}
              </div>
              <div className="border-t border-slate-200 pt-3 space-y-2">
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
                <div className="flex justify-between text-lg font-semibold text-slate-900">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}