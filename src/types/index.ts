// Data Types for SmartLab

export interface Parameter {
  id: string;
  name: string;
  unit: string;
  minNormal: number;
  maxNormal: number;
  riskMin?: number;
  riskMax?: number;
}

export interface Package {
  id: string;
  name: string;
  category: 'full-body' | 'diabetes' | 'heart' | 'women' | 'senior' | 'liver' | 'kidney' | 'thyroid' | 'vitamin';
  parameters: Parameter[];
  originalPrice: number;
  discountedPrice: number;
  fastingRequired: boolean;
  description: string;
  popular?: boolean;
}

export interface City {
  id: string;
  name: string;
  active: boolean;
}

export interface Address {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  pincode: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface PatientInfo {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  notes?: string;
}

export interface Phlebotomist {
  id: string;
  name: string;
  phone: string;
  photo: string;
  vehicleNumber: string;
  sector: string;
  franchiseId: string;
  active: boolean;
}

export interface Order {
  id: string;
  packageId: string;
  packageName: string;
  patientName: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  address: Address;
  slot: {
    date: string;
    timeSlot: string;
  };
  status: 'confirmed' | 'boy-assigned' | 'collected' | 'testing' | 'completed';
  phlebotomist?: Phlebotomist;
  barcode?: string;
  createdAt: string;
  totalAmount: number;
}

export interface Franchise {
  id: string;
  name: string;
  cityId: string;
  cityName: string;
  address: string;
  phone: string;
  active: boolean;
  commission: number;
  verified: boolean;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minCartValue: number;
  cityIds: string[];
  expiresAt: string;
  active: boolean;
}

export interface TestResult {
  parameterId: string;
  parameterName: string;
  value: number;
  unit: string;
  minNormal: number;
  maxNormal: number;
  status: 'normal' | 'borderline' | 'high' | 'low';
}

export interface Report {
  id: string;
  orderId: string;
  patientName: string;
  packageName: string;
  testDate: string;
  parameters: TestResult[];
  doctorComment?: string;
  downloaded: boolean;
}

export interface AdminMetrics {
  totalRevenue: number;
  todayBookings: number;
  activeCities: number;
  verifiedLabs: number;
  pendingCollections: number;
}

export interface CartItem {
  package: Package;
  quantity: number;
}