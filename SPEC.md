# SmartLab - Diagnostic & Pathology Lab Marketplace System

## Project Overview
- **Project Name**: SmartLab
- **Type**: Full-stack Healthcare Web Application (Next.js 15 App Router)
- **Core Functionality**: A comprehensive diagnostic marketplace connecting patients with certified pathology labs, featuring smart booking, real-time tracking, and intelligent health report generation
- **Target Users**: Patients seeking lab tests, Lab Franchise Partners, Sample Collection Boys (Phlebotomists), Master Administrators

---

## UI/UX Specification

### Layout Structure

#### Global Layout
- **Header**: Fixed top navigation with logo, city picker, search bar, nav links, and user actions
- **Main Content**: Full-width content area with responsive padding
- **Footer**: Multi-column footer with branding, quick links, legal pages

#### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Visual Design

#### Color Palette
| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Primary Cyan | #06B6D4 | Primary buttons, active states, highlights |
| Fresh Mint | #10B981 | Success states, normal health indicators |
| Vibrant Indigo | #4F46E5 | Secondary buttons, links, accents |
| Soft Amber | #F59E0B | Warnings, pending states |
| Danger Red | #EF4444 | High-risk indicators, errors |
| Slate 50 | #F8FAFC | Primary background |
| White | #FFFFFF | Card backgrounds, content areas |
| Slate 200 | #E2E8F0 | Borders, dividers |
| Slate 400 | #94A3B8 | Secondary text |
| Slate 900 | #0F172A | Primary text |

#### Typography
- **Font Family**: "Plus Jakarta Sans" (Google Fonts)
- **Headings**: 
  - H1: 48px, 700 weight
  - H2: 36px, 600 weight
  - H3: 24px, 600 weight
  - H4: 20px, 500 weight
- **Body**: 16px, 400 weight
- **Small**: 14px, 400 weight

#### Spacing System
- Base unit: 4px
- Section padding: 80px vertical, 24px horizontal
- Card padding: 24px
- Component gaps: 16px / 24px

#### Visual Effects
- Card shadows: `0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)`
- Hover shadows: `0 10px 15px -3px rgba(0,0,0,0.1)`
- Border radius: 16px (cards), 12px (buttons), 8px (inputs)
- Transitions: 200ms ease-in-out
- Glassmorphism: `bg-white/80 backdrop-blur-md`

### Components

#### SmartLabLogo (SVG)
- Dynamic SVG component rendering the brand logo
- Uses gradient: Cyan (#06B6D4) to Indigo (#4F46E5)
- Renders in header, footer, reports, invoices

#### Navigation Components
- **CityPicker**: Dropdown with cities (Jaipur, Delhi, Mumbai, Bengaluru) + auto-detect badge
- **SearchBar**: Expandable search with autocomplete suggestions
- **NavLinks**: Home, Packages, Find Labs, Upload Prescription, Track Order
- **CartBadge**: Animated counter for cart items
- **UserMenu**: Login/Profile dropdown

#### Cards
- **PackageCard**: Test title, parameter count, pricing, fasting badge, CTA
- **MetricCard**: Icon, value, label, trend indicator
- **OrderCard**: Status, patient info, actions

#### Forms
- **Input Fields**: Rounded borders, floating labels
- **Select Dropdowns**: Custom styled with icons
- **DatePicker**: Calendar popup for slot selection
- **FileUploader**: Drag-and-drop zone with preview

#### Status Indicators
- **StepIndicator**: Animated progress bar for order tracking
- **StatusBadge**: Color-coded status pills (confirmed, collected, testing, completed)
- **ParameterMeter**: Color-coded progress bars (green/yellow/red)

---

## Functionality Specification

### 1. Customer Portal (Main Website)

#### Pages
1. **Home Page** (`/`)
   - Header with navigation
   - Hero section with prescription upload
   - Popular packages section with filter tabs
   - Organ/disease category grid
   - Footer

2. **Packages Page** (`/packages`)
   - Category filter tabs
   - Package grid with search
   - Package detail modal/drawer

3. **Find Labs Page** (`/labs`)
   - City-based lab search
   - Lab cards with ratings and certifications

4. **Checkout Page** (`/checkout`)
   - Address form with map pin
   - Slot booking calendar
   - Coupon code application
   - Patient information form
   - Payment options

5. **Track Order Page** (`/track-order`)
   - Order ID input
   - Step-by-step status timeline
   - Phlebotomist info display

6. **My Reports Page** (`/my-reports`)
   - Report list with dates
   - Detailed report viewer with parameter meters
   - PDF download button

7. **Upload Prescription** (`/upload-prescription`)
   - Drag-and-drop file upload
   - Contact form for callback

8. **Cart Page** (`/cart`)
   - Package list with quantities
   - Price summary
   - Checkout CTA

#### Static Pages
- `/about` - About Us
- `/partner` - Franchise Onboarding
- `/faq` - FAQs
- `/privacy` - Privacy Policy
- `/contact` - Contact Us

### 2. Master Admin Portal (`/admin`)

#### Pages
1. **Dashboard** (`/admin`)
   - Metric cards (revenue, bookings, cities, labs, pending)
   - Revenue chart
   - City performance table

2. **Franchises** (`/admin/franchises`)
   - City/lab management table
   - Add new franchise form
   - Active/inactive toggle

3. **Tests Management** (`/admin/tests`)
   - Test/package builder
   - Parameter configuration form
   - Risk threshold settings

4. **Coupons** (`/admin/coupons`)
   - Coupon list
   - Create coupon form with constraints

5. **Payouts** (`/admin/payouts`)
   - Payout table
   - Release commission interface

### 3. Lab Partner Portal (`/lab-partner`)

#### Pages
1. **Dashboard** (`/lab-partner`)
   - Today's pending orders
   - Samples received
   - Reports pending approval

2. **Packages** (`/lab-partner/packages`)
   - Master package list
   - Enable/disable toggle
   - Local pricing adjustment

3. **Dispatch** (`/lab-partner/dispatch`)
   - Unassigned orders table
   - Assign to phlebotomist form

4. **Fleet** (`/lab-partner/fleet`)
   - Phlebotomist management
   - Add/edit phlebotomist forms

5. **Reports** (`/lab-partner/reports`)
   - Pending reports list
   - Result input form with real-time flagging

### 4. Sample Boy Portal (`/sample-boy`)

#### Pages
1. **Dashboard** (`/sample-boy`)
   - Today's assigned pickups
   - Address and time slot display
   - Call and navigation buttons
   - Sample collection verification

---

## Data Models

### Package
```typescript
{
  id: string
  name: string
  category: 'full-body' | 'diabetes' | 'heart' | 'women' | 'senior'
  parameters: Parameter[]
  originalPrice: number
  discountedPrice: number
  fastingRequired: boolean
  description: string
}
```

### Parameter
```typescript
{
  id: string
  name: string
  unit: string
  minNormal: number
  maxNormal: number
  riskMin: number
  riskMax: number
}
```

### Order
```typescript
{
  id: string
  packageId: string
  patientName: string
  age: number
  gender: 'male' | 'female' | 'other'
  address: Address
  slot: { date: string, timeSlot: string }
  status: 'confirmed' | 'boy-assigned' | 'collected' | 'testing' | 'completed'
  phlebotomistId?: string
  barcode?: string
}
```

### City
```typescript
{
  id: string
  name: string
  active: boolean
  franchises: Franchise[]
}
```

### Franchise
```typescript
{
  id: string
  name: string
  cityId: string
  address: string
  phone: string
  active: boolean
  commission: number
}
```

### Phlebotomist
```typescript
{
  id: string
  name: string
  phone: string
  vehicleNumber: string
  sector: string
  franchiseId: string
  active: boolean
}
```

---

## Acceptance Criteria

### Visual Checkpoints
- [ ] Logo renders correctly with gradient across all pages
- [ ] Color palette matches specification (cyan, mint, indigo, amber)
- [ ] All cards have proper shadows and rounded corners
- [ ] Smooth micro-animations on hover and page transitions
- [ ] Responsive layout works on mobile, tablet, desktop
- [ ] Glassmorphism effects on overlays

### Functional Checkpoints
- [ ] City picker changes location context
- [ ] Search returns filtered results
- [ ] Package booking flow completes end-to-step
- [ ] Order tracking shows step-by-step status
- [ ] Report viewer displays parameter meters with color coding
- [ ] Admin dashboard displays all metrics
- [ ] Lab partner can assign orders to phlebotomists
- [ ] Sample boy can mark collections complete

### Navigation Checkpoints
- [ ] All header links navigate correctly
- [ ] Portal switching works (Customer/Admin/Lab/ Sample Boy)
- [ ] All modals and drawers open/close properly
- [ ] Tab switches function in all sections

---

## Technical Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State**: React Context + Hooks
- **Components**: Custom reusable component library