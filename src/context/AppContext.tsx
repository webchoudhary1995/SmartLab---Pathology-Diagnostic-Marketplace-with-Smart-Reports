'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Package, City, CartItem, Order, Franchise, Phlebotomist, Coupon } from '@/types';
import { packages as mockPackages, cities as mockCities, orders as mockOrders, franchises as mockFranchises, phlebotomists as mockPhlebotomists, coupons as mockCoupons } from '@/data/mockData';

interface AppState {
  selectedCity: City;
  cart: CartItem[];
  orders: Order[];
  packages: Package[];
  cities: City[];
  franchises: Franchise[];
  phlebotomists: Phlebotomist[];
  coupons: Coupon[];
}

interface AppContextType extends AppState {
  setSelectedCity: (city: City) => void;
  addToCart: (packageItem: Package) => void;
  removeFromCart: (packageId: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  applyCoupon: (code: string) => Coupon | null;
  createOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status'], phlebotomist?: Phlebotomist, barcode?: string) => void;
  getOrderById: (orderId: string) => Order | undefined;
  getOrdersByStatus: (status: Order['status']) => Order[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedCity, setSelectedCity] = useState<City>(mockCities[0]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [packages] = useState<Package[]>(mockPackages);
  const [cities] = useState<City[]>(mockCities);
  const [franchises] = useState<Franchise[]>(mockFranchises);
  const [phlebotomists] = useState<Phlebotomist[]>(mockPhlebotomists);
  const [coupons] = useState<Coupon[]>(mockCoupons);

  const addToCart = useCallback((packageItem: Package) => {
    setCart(prev => {
      const existing = prev.find(item => item.package.id === packageItem.id);
      if (existing) {
        return prev.map(item =>
          item.package.id === packageItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { package: packageItem, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((packageId: string) => {
    setCart(prev => prev.filter(item => item.package.id !== packageId));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const getCartTotal = useCallback(() => {
    return cart.reduce((total, item) => total + (item.package.discountedPrice * item.quantity), 0);
  }, [cart]);

  const applyCoupon = useCallback((code: string): Coupon | null => {
    const coupon = coupons.find(c => c.code.toUpperCase() === code.toUpperCase() && c.active);
    if (coupon) {
      const cartTotal = getCartTotal();
      if (cartTotal >= coupon.minCartValue) {
        return coupon;
      }
    }
    return null;
  }, [coupons, getCartTotal]);

  const createOrder = useCallback((order: Order) => {
    setOrders(prev => [...prev, order]);
  }, []);

  const updateOrderStatus = useCallback((orderId: string, status: Order['status'], phlebotomist?: Phlebotomist, barcode?: string) => {
    setOrders(prev => prev.map(order =>
      order.id === orderId
        ? { ...order, status, phlebotomist: phlebotomist || order.phlebotomist, barcode: barcode || order.barcode }
        : order
    ));
  }, []);

  const getOrderById = useCallback((orderId: string) => {
    return orders.find(order => order.id === orderId);
  }, [orders]);

  const getOrdersByStatus = useCallback((status: Order['status']) => {
    return orders.filter(order => order.status === status);
  }, [orders]);

  return (
    <AppContext.Provider value={{
      selectedCity,
      cart,
      orders,
      packages,
      cities,
      franchises,
      phlebotomists,
      coupons,
      setSelectedCity,
      addToCart,
      removeFromCart,
      clearCart,
      getCartTotal,
      applyCoupon,
      createOrder,
      updateOrderStatus,
      getOrderById,
      getOrdersByStatus,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}