import { Package, City, Order, Franchise, Phlebotomist, Coupon, Report, AdminMetrics } from '@/types';

export const cities: City[] = [
  { id: 'jaipur', name: 'Jaipur', active: true },
  { id: 'delhi', name: 'Delhi', active: true },
  { id: 'mumbai', name: 'Mumbai', active: true },
  { id: 'bengaluru', name: 'Bengaluru', active: true },
  { id: 'hyderabad', name: 'Hyderabad', active: true },
  { id: 'chennai', name: 'Chennai', active: true },
];

export const packages: Package[] = [
  {
    id: 'full-body-1',
    name: 'Complete Health Checkup',
    category: 'full-body',
    originalPrice: 5999,
    discountedPrice: 2499,
    fastingRequired: true,
    description: 'Comprehensive health assessment covering all major organs',
    popular: true,
    parameters: [
      { id: 'p1', name: 'Hemoglobin', unit: 'g/dL', minNormal: 12, maxNormal: 17.5 },
      { id: 'p2', name: 'RBC Count', unit: 'million/μL', minNormal: 4.5, maxNormal: 6.5 },
      { id: 'p3', name: 'WBC Count', unit: '/μL', minNormal: 4000, maxNormal: 11000 },
      { id: 'p4', name: 'Platelets', unit: 'million/μL', minNormal: 150000, maxNormal: 450000 },
      { id: 'p5', name: 'Fasting Sugar', unit: 'mg/dL', minNormal: 70, maxNormal: 100 },
      { id: 'p6', name: 'HbA1c', unit: '%', minNormal: 4, maxNormal: 5.6 },
      { id: 'p7', name: 'Total Cholesterol', unit: 'mg/dL', minNormal: 0, maxNormal: 200 },
      { id: 'p8', name: 'HDL Cholesterol', unit: 'mg/dL', minNormal: 40, maxNormal: 60 },
      { id: 'p9', name: 'LDL Cholesterol', unit: 'mg/dL', minNormal: 0, maxNormal: 100 },
      { id: 'p10', name: 'Triglycerides', unit: 'mg/dL', minNormal: 0, maxNormal: 150 },
    ]
  },
  {
    id: 'diabetes-1',
    name: 'Diabetes Care Package',
    category: 'diabetes',
    originalPrice: 1999,
    discountedPrice: 999,
    fastingRequired: true,
    description: 'Complete diabetes monitoring and management package',
    popular: true,
    parameters: [
      { id: 'p1', name: 'Fasting Sugar', unit: 'mg/dL', minNormal: 70, maxNormal: 100 },
      { id: 'p2', name: 'Post Prandial Sugar', unit: 'mg/dL', minNormal: 70, maxNormal: 140 },
      { id: 'p3', name: 'HbA1c', unit: '%', minNormal: 4, maxNormal: 5.6 },
      { id: 'p4', name: 'Insulin Fasting', unit: 'μIU/mL', minNormal: 2.6, maxNormal: 24.9 },
      { id: 'p5', name: 'C-Peptide', unit: 'ng/mL', minNormal: 0.8, maxNormal: 3.1 },
    ]
  },
  {
    id: 'heart-1',
    name: 'Cardiac Risk Profile',
    category: 'heart',
    originalPrice: 3499,
    discountedPrice: 1799,
    fastingRequired: true,
    description: 'Comprehensive heart health assessment',
    popular: true,
    parameters: [
      { id: 'p1', name: 'Total Cholesterol', unit: 'mg/dL', minNormal: 0, maxNormal: 200 },
      { id: 'p2', name: 'HDL Cholesterol', unit: 'mg/dL', minNormal: 40, maxNormal: 60 },
      { id: 'p3', name: 'LDL Cholesterol', unit: 'mg/dL', minNormal: 0, maxNormal: 100 },
      { id: 'p4', name: 'VLDL Cholesterol', unit: 'mg/dL', minNormal: 0, maxNormal: 30 },
      { id: 'p5', name: 'Triglycerides', unit: 'mg/dL', minNormal: 0, maxNormal: 150 },
      { id: 'p6', name: 'Lipoprotein(a)', unit: 'mg/dL', minNormal: 0, maxNormal: 30 },
      { id: 'p7', name: 'Apolipoprotein A1', unit: 'mg/dL', minNormal: 120, maxNormal: 220 },
      { id: 'p8', name: 'Apolipoprotein B', unit: 'mg/dL', minNormal: 50, maxNormal: 130 },
    ]
  },
  {
    id: 'women-1',
    name: "Women's Wellness Package",
    category: 'women',
    originalPrice: 4999,
    discountedPrice: 2499,
    fastingRequired: false,
    description: 'Complete health checkup designed for women',
    popular: true,
    parameters: [
      { id: 'p1', name: 'Hemoglobin', unit: 'g/dL', minNormal: 12, maxNormal: 16 },
      { id: 'p2', name: 'TSH', unit: 'mIU/L', minNormal: 0.4, maxNormal: 4 },
      { id: 'p3', name: 'Vitamin D', unit: 'ng/mL', minNormal: 30, maxNormal: 100 },
      { id: 'p4', name: 'Vitamin B12', unit: 'pg/mL', minNormal: 200, maxNormal: 900 },
      { id: 'p5', name: 'Iron', unit: 'μg/dL', minNormal: 60, maxNormal: 170 },
      { id: 'p6', name: 'Ferritin', unit: 'ng/mL', minNormal: 13, maxNormal: 150 },
      { id: 'p7', name: 'Folic Acid', unit: 'ng/mL', minNormal: 3, maxNormal: 17 },
    ]
  },
  {
    id: 'senior-1',
    name: 'Senior Citizen Health Pack',
    category: 'senior',
    originalPrice: 6999,
    discountedPrice: 3499,
    fastingRequired: true,
    description: 'Comprehensive checkup for elderly health monitoring',
    popular: true,
    parameters: [
      { id: 'p1', name: 'CBC', unit: 'Complete', minNormal: 0, maxNormal: 1 },
      { id: 'p2', name: 'Kidney Function Test', unit: 'Complete', minNormal: 0, maxNormal: 1 },
      { id: 'p3', name: 'Liver Function Test', unit: 'Complete', minNormal: 0, maxNormal: 1 },
      { id: 'p4', name: 'Thyroid Profile', unit: 'Complete', minNormal: 0, maxNormal: 1 },
      { id: 'p5', name: 'Vitamin D', unit: 'ng/mL', minNormal: 30, maxNormal: 100 },
      { id: 'p6', name: 'Bone Mineral Density', unit: 'T-Score', minNormal: -1, maxNormal: 1 },
    ]
  },
  {
    id: 'liver-1',
    name: 'Liver Function Test',
    category: 'liver',
    originalPrice: 1499,
    discountedPrice: 799,
    fastingRequired: true,
    description: 'Complete liver health assessment',
    parameters: [
      { id: 'p1', name: 'SGPT/ALT', unit: 'U/L', minNormal: 7, maxNormal: 56 },
      { id: 'p2', name: 'SGOT/AST', unit: 'U/L', minNormal: 10, maxNormal: 40 },
      { id: 'p3', name: 'Bilirubin Total', unit: 'mg/dL', minNormal: 0.1, maxNormal: 1.2 },
      { id: 'p4', name: 'Bilirubin Direct', unit: 'mg/dL', minNormal: 0, maxNormal: 0.3 },
      { id: 'p5', name: 'Alkaline Phosphatase', unit: 'U/L', minNormal: 44, maxNormal: 147 },
      { id: 'p6', name: 'Total Protein', unit: 'g/dL', minNormal: 6, maxNormal: 8.3 },
      { id: 'p7', name: 'Albumin', unit: 'g/dL', minNormal: 3.5, maxNormal: 5.2 },
    ]
  },
  {
    id: 'kidney-1',
    name: 'Kidney Function Test',
    category: 'kidney',
    originalPrice: 1299,
    discountedPrice: 699,
    fastingRequired: true,
    description: 'Complete kidney health assessment',
    parameters: [
      { id: 'p1', name: 'Creatinine', unit: 'mg/dL', minNormal: 0.6, maxNormal: 1.2 },
      { id: 'p2', name: 'BUN', unit: 'mg/dL', minNormal: 7, maxNormal: 20 },
      { id: 'p3', name: 'Uric Acid', unit: 'mg/dL', minNormal: 3.5, maxNormal: 7.2 },
      { id: 'p4', name: 'eGFR', unit: 'mL/min', minNormal: 90, maxNormal: 120 },
      { id: 'p5', name: 'Calcium', unit: 'mg/dL', minNormal: 8.5, maxNormal: 10.5 },
      { id: 'p6', name: 'Phosphorus', unit: 'mg/dL', minNormal: 2.5, maxNormal: 4.5 },
    ]
  },
  {
    id: 'thyroid-1',
    name: 'Thyroid Profile',
    category: 'thyroid',
    originalPrice: 999,
    discountedPrice: 499,
    fastingRequired: false,
    description: 'Complete thyroid function assessment',
    parameters: [
      { id: 'p1', name: 'T3', unit: 'ng/mL', minNormal: 0.8, maxNormal: 2.0 },
      { id: 'p2', name: 'T4', unit: 'μg/dL', minNormal: 5.0, maxNormal: 12.0 },
      { id: 'p3', name: 'TSH', unit: 'mIU/L', minNormal: 0.4, maxNormal: 4.0 },
    ]
  },
  {
    id: 'vitamin-1',
    name: 'Vitamin Profile',
    category: 'vitamin',
    originalPrice: 2499,
    discountedPrice: 1299,
    fastingRequired: false,
    description: 'Essential vitamin levels assessment',
    parameters: [
      { id: 'p1', name: 'Vitamin D', unit: 'ng/mL', minNormal: 30, maxNormal: 100 },
      { id: 'p2', name: 'Vitamin B12', unit: 'pg/mL', minNormal: 200, maxNormal: 900 },
      { id: 'p3', name: 'Vitamin A', unit: 'μg/dL', minNormal: 20, maxNormal: 80 },
      { id: 'p4', name: 'Vitamin E', unit: 'mg/L', minNormal: 5, maxNormal: 20 },
      { id: 'p5', name: 'Folic Acid', unit: 'ng/mL', minNormal: 3, maxNormal: 17 },
    ]
  },
];

export const phlebotomists: Phlebotomist[] = [
  { id: 'ph1', name: 'Rajesh Kumar', phone: '+91 98765 43210', photo: '', vehicleNumber: 'RJ-01-AB-1234', sector: 'Central', franchiseId: 'f1', active: true },
  { id: 'ph2', name: 'Amit Singh', phone: '+91 98765 43211', photo: '', vehicleNumber: 'RJ-01-CD-5678', sector: 'West', franchiseId: 'f1', active: true },
  { id: 'ph3', name: 'Suresh Patel', phone: '+91 98765 43212', photo: '', vehicleNumber: 'DL-01-EF-9012', sector: 'North', franchiseId: 'f2', active: true },
  { id: 'ph4', name: 'Vijay Sharma', phone: '+91 98765 43213', photo: '', vehicleNumber: 'MH-01-GH-3456', sector: 'South', franchiseId: 'f3', active: true },
];

export const franchises: Franchise[] = [
  { id: 'f1', name: 'SmartLab Jaipur Central', cityId: 'jaipur', cityName: 'Jaipur', address: '123, MI Road, Jaipur', phone: '+91 141 123 4567', active: true, commission: 20, verified: true },
  { id: 'f2', name: 'SmartLab Delhi North', cityId: 'delhi', cityName: 'Delhi', address: '456, Connaught Place, Delhi', phone: '+91 11 2345 6789', active: true, commission: 18, verified: true },
  { id: 'f3', name: 'SmartLab Mumbai West', cityId: 'mumbai', cityName: 'Mumbai', address: '789, Andheri West, Mumbai', phone: '+91 22 3456 7890', active: true, commission: 22, verified: true },
  { id: 'f4', name: 'SmartLab Bengaluru South', cityId: 'bengaluru', cityName: 'Bengaluru', address: '321, Koramangala, Bengaluru', phone: '+91 80 4567 8901', active: true, commission: 19, verified: true },
];

export const orders: Order[] = [
  {
    id: 'ORD-001',
    packageId: 'full-body-1',
    packageName: 'Complete Health Checkup',
    patientName: 'Rahul Sharma',
    age: 35,
    gender: 'male',
    address: {
      fullName: 'Rahul Sharma',
      phone: '+91 98765 12345',
      addressLine1: '42, Vaishali Nagar',
      city: 'Jaipur',
      pincode: '302021'
    },
    slot: { date: '2025-09-12', timeSlot: '6:00 AM - 7:00 AM' },
    status: 'confirmed',
    createdAt: '2025-09-10T10:30:00Z',
    totalAmount: 2499
  },
  {
    id: 'ORD-002',
    packageId: 'diabetes-1',
    packageName: 'Diabetes Care Package',
    patientName: 'Priya Gupta',
    age: 42,
    gender: 'female',
    address: {
      fullName: 'Priya Gupta',
      phone: '+91 98765 12346',
      addressLine1: '78, Malviya Nagar',
      city: 'Jaipur',
      pincode: '302017'
    },
    slot: { date: '2025-09-11', timeSlot: '7:00 AM - 8:00 AM' },
    status: 'collected',
    phlebotomist: phlebotomists[0],
    createdAt: '2025-09-09T14:20:00Z',
    totalAmount: 999
  },
  {
    id: 'ORD-003',
    packageId: 'heart-1',
    packageName: 'Cardiac Risk Profile',
    patientName: 'Anil Kumar',
    age: 55,
    gender: 'male',
    address: {
      fullName: 'Anil Kumar',
      phone: '+91 98765 12347',
      addressLine1: '15, Jhotwara',
      city: 'Jaipur',
      pincode: '302012'
    },
    slot: { date: '2025-09-10', timeSlot: '6:00 AM - 7:00 AM' },
    status: 'collected',
    phlebotomist: phlebotomists[1],
    barcode: 'SL-20250910-001',
    createdAt: '2025-09-08T09:15:00Z',
    totalAmount: 1799
  },
  {
    id: 'ORD-004',
    packageId: 'women-1',
    packageName: "Women's Wellness Package",
    patientName: 'Sunita Devi',
    age: 38,
    gender: 'female',
    address: {
      fullName: 'Sunita Devi',
      phone: '+91 98765 12348',
      addressLine1: '92, Sanganer',
      city: 'Jaipur',
      pincode: '302011'
    },
    slot: { date: '2025-09-09', timeSlot: '8:00 AM - 9:00 AM' },
    status: 'testing',
    phlebotomist: phlebotomists[0],
    barcode: 'SL-20250909-002',
    createdAt: '2025-09-07T16:45:00Z',
    totalAmount: 2499
  },
  {
    id: 'ORD-005',
    packageId: 'full-body-1',
    packageName: 'Complete Health Checkup',
    patientName: 'Mohit Singh',
    age: 29,
    gender: 'male',
    address: {
      fullName: 'Mohit Singh',
      phone: '+91 98765 12349',
      addressLine1: '56, Sitapura',
      city: 'Jaipur',
      pincode: '302022'
    },
    slot: { date: '2025-09-08', timeSlot: '6:00 AM - 7:00 AM' },
    status: 'boy-assigned',
    phlebotomist: phlebotomists[0],
    createdAt: '2025-09-06T11:00:00Z',
    totalAmount: 2499
  },
  {
    id: 'ORD-006',
    packageId: 'full-body-1',
    packageName: 'Complete Health Checkup',
    patientName: 'Mohit Singh',
    age: 29,
    gender: 'male',
    address: {
      fullName: 'Mohit Singh',
      phone: '+91 98765 12349',
      addressLine1: '56, Sitapura',
      city: 'Jaipur',
      pincode: '302022'
    },
    slot: { date: '2025-09-08', timeSlot: '6:00 AM - 7:00 AM' },
    status: 'testing',
    phlebotomist: phlebotomists[1],
    barcode: 'SL-20250908-003',
    createdAt: '2025-09-06T11:00:00Z',
    totalAmount: 2499
  },
];

export const coupons: Coupon[] = [
  { id: 'c1', code: 'FIRST500', discountType: 'fixed', discountValue: 500, minCartValue: 1500, cityIds: [], expiresAt: '2025-12-31', active: true },
  { id: 'c2', code: 'HEALTH20', discountType: 'percentage', discountValue: 20, minCartValue: 2000, cityIds: ['jaipur', 'delhi'], expiresAt: '2025-11-30', active: true },
  { id: 'c3', code: 'DIWALI30', discountType: 'percentage', discountValue: 30, minCartValue: 2500, cityIds: [], expiresAt: '2025-10-31', active: true },
];

export const reports: Report[] = [
  {
    id: 'RPT-001',
    orderId: 'ORD-005',
    patientName: 'Mohit Singh',
    packageName: 'Complete Health Checkup',
    testDate: '2025-09-08',
    downloaded: false,
    parameters: [
      { parameterId: 'p1', parameterName: 'Hemoglobin', value: 15.2, unit: 'g/dL', minNormal: 12, maxNormal: 17.5, status: 'normal' },
      { parameterId: 'p2', parameterName: 'RBC Count', value: 5.1, unit: 'million/μL', minNormal: 4.5, maxNormal: 6.5, status: 'normal' },
      { parameterId: 'p3', parameterName: 'WBC Count', value: 7500, unit: '/μL', minNormal: 4000, maxNormal: 11000, status: 'normal' },
      { parameterId: 'p4', parameterName: 'Platelets', value: 280000, unit: 'million/μL', minNormal: 150000, maxNormal: 450000, status: 'normal' },
      { parameterId: 'p5', parameterName: 'Fasting Sugar', value: 92, unit: 'mg/dL', minNormal: 70, maxNormal: 100, status: 'normal' },
      { parameterId: 'p6', parameterName: 'HbA1c', value: 5.2, unit: '%', minNormal: 4, maxNormal: 5.6, status: 'normal' },
      { parameterId: 'p7', parameterName: 'Total Cholesterol', value: 185, unit: 'mg/dL', minNormal: 0, maxNormal: 200, status: 'normal' },
      { parameterId: 'p8', parameterName: 'HDL Cholesterol', value: 52, unit: 'mg/dL', minNormal: 40, maxNormal: 60, status: 'normal' },
      { parameterId: 'p9', parameterName: 'LDL Cholesterol', value: 110, unit: 'mg/dL', minNormal: 0, maxNormal: 100, status: 'borderline' },
      { parameterId: 'p10', parameterName: 'Triglycerides', value: 115, unit: 'mg/dL', minNormal: 0, maxNormal: 150, status: 'normal' },
    ],
    doctorComment: 'Overall health status is good. LDL cholesterol is slightly elevated. Maintain a healthy diet and exercise regularly. Review lipid profile after 3 months.'
  },
];

export const adminMetrics: AdminMetrics = {
  totalRevenue: 2456789,
  todayBookings: 156,
  activeCities: 6,
  verifiedLabs: 24,
  pendingCollections: 38,
};

export const timeSlots = [
  { id: 't1', time: '6:00 AM - 7:00 AM', available: true },
  { id: 't2', time: '7:00 AM - 8:00 AM', available: true },
  { id: 't3', time: '8:00 AM - 9:00 AM', available: true },
  { id: 't4', time: '9:00 AM - 10:00 AM', available: false },
  { id: 't5', time: '10:00 AM - 11:00 AM', available: true },
  { id: 't6', time: '11:00 AM - 12:00 PM', available: true },
  { id: 't7', time: '12:00 PM - 1:00 PM', available: true },
  { id: 't8', time: '2:00 PM - 3:00 PM', available: true },
  { id: 't9', time: '3:00 PM - 4:00 PM', available: true },
  { id: 't10', time: '4:00 PM - 5:00 PM', available: true },
  { id: 't11', time: '5:00 PM - 6:00 PM', available: false },
  { id: 't12', time: '6:00 PM - 7:00 PM', available: true },
];

export const categoryFilters = [
  { id: 'all', name: 'All Packages', icon: 'LayoutGrid' },
  { id: 'full-body', name: 'Full Body Checkup', icon: 'UserCheck' },
  { id: 'diabetes', name: 'Diabetes Care', icon: 'Droplet' },
  { id: 'heart', name: 'Heart Health', icon: 'Heart' },
  { id: 'women', name: "Women's Health", icon: 'User' },
  { id: 'senior', name: 'Senior Citizen', icon: 'Users' },
];

export const organCategories = [
  { id: 'liver', name: 'Liver', icon: 'HeartPulse', color: 'bg-amber-100 text-amber-600' },
  { id: 'kidney', name: 'Kidney', icon: 'Droplets', color: 'bg-purple-100 text-purple-600' },
  { id: 'thyroid', name: 'Thyroid', icon: 'Waves', color: 'bg-blue-100 text-blue-600' },
  { id: 'blood', name: 'Blood / CBC', icon: 'Droplet', color: 'bg-red-100 text-red-600' },
  { id: 'vitamin', name: 'Vitamin', icon: 'Sparkles', color: 'bg-green-100 text-green-600' },
  { id: 'heart', name: 'Heart', icon: 'Heart', color: 'bg-pink-100 text-pink-600' },
];