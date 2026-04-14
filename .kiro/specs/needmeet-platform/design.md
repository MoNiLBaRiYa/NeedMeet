# Design Document: NeedMeet Platform

## Overview

NeedMeet is a two-phase on-demand professional services booking platform that connects customers with verified professionals across multiple service categories. The platform is designed with a clear separation between a frontend-focused MVP (Phase 1) and a production-ready full-stack application (Phase 2).

### Design Philosophy

The design follows a progressive enhancement approach:
- **Phase 1 (MVP)**: Demonstrates complete user flows with mock data, focusing on UI/UX excellence and navigation patterns
- **Phase 2 (Full Product)**: Transforms the MVP into a scalable, production-ready platform with real backend infrastructure, payments, and advanced features

### Key Design Principles

1. **Separation of Concerns**: Clear boundaries between presentation, business logic, and data layers
2. **Scalability First**: Architecture designed to handle growth from prototype to production
3. **Security by Design**: Authentication, authorization, and data protection built into every layer
4. **User Experience**: Responsive, intuitive interfaces optimized for mobile-first usage
5. **Maintainability**: Modular code structure enabling easy feature additions and updates

---

## PHASE 1: MVP Architecture

### Technology Stack

- **Frontend Framework**: Nuxt 3 (Vue 3 with Composition API)
- **Authentication**: Firebase Authentication
- **State Management**: Pinia (recommended) or Vuex
- **Styling**: Tailwind CSS
- **Mock Data**: JSON files + Browser LocalStorage
- **Routing**: Nuxt 3 File-based Routing
- **Build Tool**: Vite (bundled with Nuxt 3)

### Project Structure

```
needmeet-mvp/
├── .nuxt/                    # Auto-generated Nuxt files
├── assets/                   # Static assets (CSS, images)
│   ├── css/
│   │   └── tailwind.css
│   └── images/
│       ├── categories/
│       └── professionals/
├── components/               # Reusable Vue components
│   ├── common/
│   │   ├── Navbar.vue
│   │   ├── Footer.vue
│   │   ├── Button.vue
│   │   └── Card.vue
│   ├── auth/
│   │   ├── LoginForm.vue
│   │   ├── RegisterForm.vue
│   │   └── RoleSelector.vue
│   ├── booking/
│   │   ├── BookingForm.vue
│   │   ├── TimeSlotPicker.vue
│   │   └── BookingConfirmation.vue
│   ├── professional/
│   │   ├── ProfileCard.vue
│   │   ├── ProfileDetail.vue
│   │   ├── RatingDisplay.vue
│   │   └── ReviewList.vue
│   └── dashboard/
│       ├── CustomerBookingList.vue
│       ├── ProfessionalRequestList.vue
│       └── StatsCard.vue
├── composables/              # Reusable composition functions
│   ├── useAuth.js
│   ├── useBooking.js
│   ├── useMockData.js
│   └── useLocalStorage.js
├── layouts/                  # Layout templates
│   ├── default.vue
│   ├── auth.vue
│   └── dashboard.vue
├── pages/                    # File-based routing
│   ├── index.vue            # Home page with categories
│   ├── login.vue
│   ├── register.vue
│   ├── categories/
│   │   └── [slug].vue       # Dynamic category page
│   ├── professionals/
│   │   └── [id].vue         # Professional profile page
│   ├── booking/
│   │   └── [professionalId].vue
│   ├── dashboard/
│   │   ├── customer.vue
│   │   └── professional.vue
│   └── profile.vue
├── plugins/                  # Nuxt plugins
│   └── firebase.client.js
├── public/                   # Public static files
│   └── mock-data/
│       ├── categories.json
│       ├── professionals.json
│       ├── bookings.json
│       └── reviews.json
├── stores/                   # Pinia stores
│   ├── auth.js
│   ├── booking.js
│   ├── professional.js
│   └── user.js
├── types/                    # JavaScript type definitions
│   ├── user.js
│   ├── booking.js
│   ├── professional.js
│   └── category.js
├── utils/                    # Utility functions
│   ├── mockApi.js
│   ├── validators.js
│   └── formatters.js
├── .env                      # Environment variables
├── nuxt.config.js           # Nuxt configuration
├── tailwind.config.js       # Tailwind configuration
├── jsconfig.json            # JavaScript configuration
└── package.json
```

### Component Architecture

#### Core Components

**1. Authentication Components**
- `LoginForm.vue`: Email/password login with Firebase
- `RegisterForm.vue`: User registration with role selection
- `RoleSelector.vue`: Customer vs Professional role picker

**2. Navigation Components**
- `Navbar.vue`: Top navigation with auth state, logo, dashboard link
- `Footer.vue`: Footer with links and info
- `Breadcrumb.vue`: Navigation breadcrumb trail

**3. Category & Listing Components**
- `CategoryGrid.vue`: Display service categories with icons
- `ProfessionalCard.vue`: Professional listing card with rating, distance, price
- `FilterBar.vue`: Search and filter controls

**4. Professional Profile Components**
- `ProfileHeader.vue`: Name, photo, rating, verification badge
- `ServiceDetails.vue`: Service description, pricing, availability
- `ReviewList.vue`: Display mock reviews
- `RatingDisplay.vue`: Star rating visualization

**5. Booking Components**
- `BookingForm.vue`: Date/time selection form
- `TimeSlotPicker.vue`: Available time slot selector
- `BookingConfirmation.vue`: Confirmation message display

**6. Dashboard Components**
- `CustomerBookingList.vue`: List of customer bookings
- `ProfessionalRequestList.vue`: List of professional requests
- `StatsCard.vue`: Display metrics (bookings, earnings)
- `BookingCard.vue`: Individual booking display

### Routing Structure

```
/ (index)                          → Home page with category grid
/login                             → Login page
/register                          → Registration page
/categories/[slug]                 → Category listing (e.g., /categories/beauty)
/professionals/[id]                → Professional profile detail
/booking/[professionalId]          → Booking form
/dashboard/customer                → Customer dashboard
/dashboard/professional            → Professional dashboard
/profile                           → User profile settings
```

### State Management Design (Pinia)

**Auth Store** (`stores/auth.js`)
```javascript
interface AuthState {
  user: User | null
  isAuthenticated: boolean
  userRole: 'customer' | 'professional' | null
  loading: boolean
}

Actions:
- login(email, password)
- register(email, password, role)
- logout()
- resetPassword(email)
```

**Booking Store** (`stores/booking.js`)
```javascript
interface BookingState {
  bookings: Booking[]
  currentBooking: Booking | null
  loading: boolean
}

Actions:
- createBooking(bookingData)
- getBookings(userId)
- updateBookingStatus(bookingId, status)
- loadMockBookings()
```

**Professional Store** (`stores/professional.js`)
```javascript
interface ProfessionalState {
  professionals: Professional[]
  selectedProfessional: Professional | null
  categories: Category[]
  filters: FilterOptions
}

Actions:
- loadProfessionals(categorySlug)
- getProfessionalById(id)
- filterProfessionals(filters)
- loadMockData()
```

### Mock Data Structure

**professionals.json**
```json
{
  "professionals": [
    {
      "id": "prof_001",
      "name": "John Doe",
      "category": "beauty",
      "services": ["Haircut", "Styling"],
      "bio": "Professional stylist with 10 years experience",
      "rating": 4.8,
      "reviewCount": 127,
      "priceRange": "₹500-₹2000",
      "distance": "2.5 km",
      "availability": ["Mon", "Tue", "Wed", "Thu", "Fri"],
      "profileImage": "/images/professionals/prof_001.jpg",
      "verified": true
    }
  ]
}
```

**bookings.json**
```json
{
  "bookings": [
    {
      "id": "book_001",
      "customerId": "cust_001",
      "professionalId": "prof_001",
      "service": "Haircut",
      "date": "2024-02-15",
      "time": "10:00 AM",
      "status": "confirmed",
      "price": "₹800"
    }
  ]
}
```

### Firebase Authentication Integration

**Plugin Setup** (`plugins/firebase.client.js`)
```javascript
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

export default defineNuxtPlugin(() => {
  const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID
  }
  
  const app = initializeApp(config)
  const auth = getAuth(app)
  
  return {
    provide: {
      auth
    }
  }
})
```

**Auth Composable** (`composables/useAuth.js`)
```javascript
export const useAuth = () => {
  const { $auth } = useNuxtApp()
  const authStore = useAuthStore()
  
  const login = async (email: string, password: string) => {
    // Firebase signInWithEmailAndPassword
  }
  
  const register = async (email: string, password: string, role: string) => {
    // Firebase createUserWithEmailAndPassword
    // Store role in localStorage
  }
  
  const logout = async () => {
    // Firebase signOut
  }
  
  return { login, register, logout }
}
```

### Mock API Layer

**Mock API Utility** (`utils/mockApi.js`)
```javascript
export class MockAPI {
  static async getProfessionals(category?: string) {
    const data = await import('~/public/mock-data/professionals.json')
    return category 
      ? data.professionals.filter(p => p.category === category)
      : data.professionals
  }
  
  static async getProfessionalById(id: string) {
    const data = await import('~/public/mock-data/professionals.json')
    return data.professionals.find(p => p.id === id)
  }
  
  static async createBooking(bookingData: any) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Store in localStorage
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]')
    const newBooking = {
      id: `book_${Date.now()}`,
      ...bookingData,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    }
    bookings.push(newBooking)
    localStorage.setItem('bookings', JSON.stringify(bookings))
    
    return newBooking
  }
}
```

### Responsive Design Patterns

**Breakpoints** (Tailwind CSS)
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'sm': '640px',   // Mobile landscape
      'md': '768px',   // Tablet
      'lg': '1024px',  // Desktop
      'xl': '1280px',  // Large desktop
    }
  }
}
```

**Mobile-First Component Example**
```vue
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <!-- Professional cards -->
  </div>
</template>
```

### Navigation Flow

```
Home (/)
  ↓ Click Category
Category Listing (/categories/beauty)
  ↓ Click Professional
Professional Profile (/professionals/prof_001)
  ↓ Click "Book Now"
Booking Form (/booking/prof_001)
  ↓ Submit Booking
Booking Confirmation
  ↓ Redirect
Customer Dashboard (/dashboard/customer)
```

---

## PHASE 2: Full Product Architecture

### Technology Stack

**Backend**
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT + Firebase Admin SDK
- **Real-time**: Socket.io (WebSockets)
- **Payment**: Razorpay/Stripe SDK
- **Cloud Storage**: AWS S3 or Cloudinary
- **Caching**: Redis
- **Notifications**: Firebase Cloud Messaging + Twilio (SMS)
- **Voice Calls**: Twilio or WebRTC
- **Task Queue**: Bull (Redis-based)
- **Logging**: Winston + Morgan
- **Monitoring**: New Relic or Datadog

**Frontend** (Enhanced from Phase 1)
- Same Nuxt 3 stack
- Replace mock APIs with real API calls
- Add Socket.io client for real-time features
- Add payment SDK integration

**Infrastructure**
- **Hosting**: AWS EC2 / DigitalOcean / Heroku
- **Load Balancer**: Nginx or AWS ELB
- **CDN**: CloudFlare or AWS CloudFront
- **Database**: MongoDB Atlas (managed) or self-hosted with replication
- **Cache**: Redis Cloud or self-hosted
- **CI/CD**: GitHub Actions or GitLab CI

### Backend Project Structure

```
needmeet-backend/
├── src/
│   ├── config/              # Configuration files
│   │   ├── database.js
│   │   ├── redis.js
│   │   ├── firebase.js
│   │   ├── payment.js
│   │   └── env.js
│   ├── models/              # Mongoose models
│   │   ├── User.js
│   │   ├── Professional.js
│   │   ├── Booking.js
│   │   ├── Service.js
│   │   ├── Review.js
│   │   ├── Transaction.js
│   │   ├── Dispute.js
│   │   ├── Notification.js
│   │   └── Chat.js
│   ├── controllers/         # Route controllers
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── professionalController.js
│   │   ├── bookingController.js
│   │   ├── paymentController.js
│   │   ├── reviewController.js
│   │   ├── chatController.js
│   │   ├── adminController.js
│   │   └── disputeController.js
│   ├── routes/              # Express routes
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── professionals.js
│   │   ├── bookings.js
│   │   ├── payments.js
│   │   ├── reviews.js
│   │   ├── admin.js
│   │   └── index.js
│   ├── middleware/          # Express middleware
│   │   ├── auth.js
│   │   ├── validation.js
│   │   ├── errorHandler.js
│   │   ├── rateLimiter.js
│   │   ├── roleCheck.js
│   │   └── upload.js
│   ├── services/            # Business logic layer
│   │   ├── authService.js
│   │   ├── bookingService.js
│   │   ├── paymentService.js
│   │   ├── notificationService.js
│   │   ├── smsService.js
│   │   ├── emailService.js
│   │   ├── storageService.js
│   │   ├── verificationService.js
│   │   ├── locationService.js
│   │   └── cacheService.js
│   ├── utils/               # Utility functions
│   │   ├── jwt.js
│   │   ├── encryption.js
│   │   ├── validators.js
│   │   ├── logger.js
│   │   └── helpers.js
│   ├── jobs/                # Background jobs
│   │   ├── bookingTimeout.js
│   │   ├── notificationQueue.js
│   │   └── paymentProcessor.js
│   ├── sockets/             # WebSocket handlers
│   │   ├── chatHandler.js
│   │   ├── notificationHandler.js
│   │   └── index.js
│   ├── types/               # JavaScript types
│   │   ├── express.d.js
│   │   ├── models.js
│   │   └── api.js
│   ├── validators/          # Request validation schemas
│   │   ├── authValidators.js
│   │   ├── bookingValidators.js
│   │   └── userValidators.js
│   └── app.js               # Express app setup
├── tests/                   # Test files
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .env.example
├── .env
├── package.json
├── jsconfig.json
└── README.md
```


## Components and Interfaces

### Phase 1: Frontend Components

#### Authentication Components

**LoginForm.vue**
```javascript
interface LoginFormProps {
  redirectTo?: string
}

interface LoginFormEmits {
  (e: 'success', user: User): void
  (e: 'error', error: Error): void
}

Methods:
- handleLogin(): Promise<void>
- validateForm(): boolean
```

**RegisterForm.vue**
```javascript
interface RegisterFormProps {
  initialRole?: 'customer' | 'professional'
}

interface RegisterFormData {
  email: string
  password: string
  confirmPassword: string
  role: 'customer' | 'professional'
  acceptTerms: boolean
}

Methods:
- handleRegister(): Promise<void>
- validatePassword(): boolean
```

#### Booking Components

**BookingForm.vue**
```javascript
interface BookingFormProps {
  professional: Professional
  service: Service
}

interface BookingFormData {
  date: string
  timeSlot: string
  notes?: string
}

Methods:
- loadAvailableSlots(date: string): Promise<TimeSlot[]>
- submitBooking(): Promise<Booking>
- validateBooking(): boolean
```

#### Dashboard Components

**CustomerBookingList.vue**
```javascript
interface CustomerBookingListProps {
  userId: string
}

Computed:
- upcomingBookings: Booking[]
- pastBookings: Booking[]
- pendingBookings: Booking[]

Methods:
- cancelBooking(bookingId: string): Promise<void>
- viewDetails(bookingId: string): void
```

### Phase 2: Backend API Interfaces

#### RESTful API Endpoints

**Authentication Endpoints**

```
POST /api/auth/register
Request Body:
{
  "email": "user@example.com",
  "password": "securePassword123",
  "phone": "+919876543210",
  "role": "customer" | "professional",
  "name": "John Doe"
}

Response (201):
{
  "success": true,
  "data": {
    "userId": "user_123",
    "email": "user@example.com",
    "role": "customer",
    "token": "jwt_token_here"
  },
  "message": "Registration successful. Please verify your phone."
}

POST /api/auth/verify-phone
Request Body:
{
  "userId": "user_123",
  "code": "123456"
}

Response (200):
{
  "success": true,
  "message": "Phone verified successfully"
}

POST /api/auth/login
Request Body:
{
  "email": "user@example.com",
  "password": "securePassword123"
}

Response (200):
{
  "success": true,
  "data": {
    "userId": "user_123",
    "email": "user@example.com",
    "role": "customer",
    "token": "jwt_token_here",
    "refreshToken": "refresh_token_here"
  }
}

POST /api/auth/refresh-token
Request Body:
{
  "refreshToken": "refresh_token_here"
}

Response (200):
{
  "success": true,
  "data": {
    "token": "new_jwt_token",
    "refreshToken": "new_refresh_token"
  }
}

POST /api/auth/forgot-password
Request Body:
{
  "email": "user@example.com"
}

Response (200):
{
  "success": true,
  "message": "Password reset link sent to email"
}
```

**Professional Endpoints**

```
GET /api/professionals/search
Query Parameters:
- category: string (optional)
- lat: number (required)
- lng: number (required)
- radius: number (default: 10, max: 50) in km
- minRating: number (optional, 1-5)
- minPrice: number (optional)
- maxPrice: number (optional)
- sortBy: "distance" | "rating" | "price" (default: "distance")
- page: number (default: 1)
- limit: number (default: 20)

Response (200):
{
  "success": true,
  "data": {
    "professionals": [
      {
        "id": "prof_123",
        "name": "John Doe",
        "profileImage": "https://cdn.example.com/prof_123.jpg",
        "category": "beauty",
        "services": ["Haircut", "Styling"],
        "rating": 4.8,
        "reviewCount": 127,
        "priceRange": "₹500-₹2000",
        "distance": 2.5,
        "verified": true,
        "responseTime": "< 10 min",
        "completionRate": 98
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 45,
      "pages": 3
    }
  }
}

GET /api/professionals/:id
Response (200):
{
  "success": true,
  "data": {
    "id": "prof_123",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+919876543210",
    "profileImage": "https://cdn.example.com/prof_123.jpg",
    "bio": "Professional stylist with 10 years experience",
    "category": "beauty",
    "services": [
      {
        "id": "svc_001",
        "name": "Haircut",
        "description": "Professional haircut service",
        "price": 800,
        "duration": 60
      }
    ],
    "rating": 4.8,
    "reviewCount": 127,
    "verified": true,
    "certifications": [
      {
        "name": "Professional Stylist Certificate",
        "issuer": "Beauty Academy",
        "year": 2015
      }
    ],
    "portfolio": [
      "https://cdn.example.com/portfolio1.jpg",
      "https://cdn.example.com/portfolio2.jpg"
    ],
    "availability": {
      "monday": ["09:00-12:00", "14:00-18:00"],
      "tuesday": ["09:00-12:00", "14:00-18:00"]
    },
    "serviceArea": {
      "lat": 28.6139,
      "lng": 77.2090,
      "radius": 10
    }
  }
}

POST /api/professionals/profile
Headers: Authorization: Bearer <token>
Request Body:
{
  "bio": "Updated bio",
  "services": [
    {
      "name": "Haircut",
      "description": "Professional haircut",
      "price": 800,
      "duration": 60
    }
  ],
  "availability": {
    "monday": ["09:00-12:00", "14:00-18:00"]
  }
}

Response (200):
{
  "success": true,
  "data": { /* updated professional object */ }
}

POST /api/professionals/upload-portfolio
Headers: Authorization: Bearer <token>
Content-Type: multipart/form-data
Request Body:
- images: File[] (max 10 files, 5MB each)

Response (200):
{
  "success": true,
  "data": {
    "urls": [
      "https://cdn.example.com/portfolio1.jpg",
      "https://cdn.example.com/portfolio2.jpg"
    ]
  }
}
```

**Booking Endpoints**

```
POST /api/bookings
Headers: Authorization: Bearer <token>
Request Body:
{
  "professionalId": "prof_123",
  "serviceId": "svc_001",
  "date": "2024-02-15",
  "timeSlot": "10:00-11:00",
  "notes": "Please bring styling products",
  "location": {
    "address": "123 Main St, City",
    "lat": 28.6139,
    "lng": 77.2090
  }
}

Response (201):
{
  "success": true,
  "data": {
    "bookingId": "book_123",
    "status": "pending",
    "professional": { /* professional details */ },
    "service": { /* service details */ },
    "scheduledAt": "2024-02-15T10:00:00Z",
    "totalAmount": 808,
    "breakdown": {
      "servicePrice": 800,
      "bookingFee": 8,
      "total": 808
    },
    "paymentRequired": true
  }
}

GET /api/bookings
Headers: Authorization: Bearer <token>
Query Parameters:
- status: "pending" | "confirmed" | "completed" | "cancelled" (optional)
- page: number
- limit: number

Response (200):
{
  "success": true,
  "data": {
    "bookings": [
      {
        "id": "book_123",
        "professional": { /* professional details */ },
        "service": { /* service details */ },
        "scheduledAt": "2024-02-15T10:00:00Z",
        "status": "confirmed",
        "totalAmount": 808,
        "createdAt": "2024-02-10T14:30:00Z"
      }
    ],
    "pagination": { /* pagination info */ }
  }
}

GET /api/bookings/:id
Headers: Authorization: Bearer <token>
Response (200):
{
  "success": true,
  "data": {
    "id": "book_123",
    "customer": { /* customer details */ },
    "professional": { /* professional details */ },
    "service": { /* service details */ },
    "scheduledAt": "2024-02-15T10:00:00Z",
    "status": "confirmed",
    "location": { /* location details */ },
    "notes": "Please bring styling products",
    "payment": {
      "status": "completed",
      "amount": 808,
      "transactionId": "txn_123"
    },
    "timeline": [
      {
        "status": "created",
        "timestamp": "2024-02-10T14:30:00Z"
      },
      {
        "status": "confirmed",
        "timestamp": "2024-02-10T14:35:00Z"
      }
    ]
  }
}

PATCH /api/bookings/:id/status
Headers: Authorization: Bearer <token>
Request Body:
{
  "status": "confirmed" | "rejected" | "completed" | "cancelled",
  "reason": "Optional cancellation/rejection reason"
}

Response (200):
{
  "success": true,
  "data": {
    "bookingId": "book_123",
    "status": "confirmed",
    "updatedAt": "2024-02-10T14:35:00Z"
  }
}

DELETE /api/bookings/:id
Headers: Authorization: Bearer <token>
Response (200):
{
  "success": true,
  "message": "Booking cancelled successfully"
}
```

**Payment Endpoints**

```
POST /api/payments/create-order
Headers: Authorization: Bearer <token>
Request Body:
{
  "bookingId": "book_123",
  "amount": 808
}

Response (200):
{
  "success": true,
  "data": {
    "orderId": "order_123",
    "amount": 808,
    "currency": "INR",
    "razorpayOrderId": "order_xyz_razorpay",
    "key": "rzp_test_key"
  }
}

POST /api/payments/verify
Headers: Authorization: Bearer <token>
Request Body:
{
  "orderId": "order_123",
  "paymentId": "pay_xyz_razorpay",
  "signature": "signature_hash"
}

Response (200):
{
  "success": true,
  "data": {
    "transactionId": "txn_123",
    "status": "completed",
    "bookingId": "book_123"
  }
}

POST /api/payments/refund
Headers: Authorization: Bearer <token>
Request Body:
{
  "transactionId": "txn_123",
  "amount": 808,
  "reason": "Service cancelled"
}

Response (200):
{
  "success": true,
  "data": {
    "refundId": "refund_123",
    "status": "processing",
    "estimatedTime": "5-7 business days"
  }
}

GET /api/payments/transactions
Headers: Authorization: Bearer <token>
Query Parameters:
- startDate: ISO date string
- endDate: ISO date string
- page: number
- limit: number

Response (200):
{
  "success": true,
  "data": {
    "transactions": [
      {
        "id": "txn_123",
        "bookingId": "book_123",
        "amount": 808,
        "type": "booking_payment",
        "status": "completed",
        "createdAt": "2024-02-10T14:40:00Z"
      }
    ],
    "summary": {
      "totalEarnings": 50000,
      "totalCommission": 500,
      "netEarnings": 49500
    }
  }
}
```

**Review Endpoints**

```
POST /api/reviews
Headers: Authorization: Bearer <token>
Request Body:
{
  "bookingId": "book_123",
  "professionalId": "prof_123",
  "rating": 5,
  "comment": "Excellent service! Highly recommended."
}

Response (201):
{
  "success": true,
  "data": {
    "reviewId": "rev_123",
    "rating": 5,
    "comment": "Excellent service! Highly recommended.",
    "createdAt": "2024-02-16T10:00:00Z"
  }
}

GET /api/reviews/professional/:professionalId
Query Parameters:
- page: number
- limit: number
- sortBy: "recent" | "rating"

Response (200):
{
  "success": true,
  "data": {
    "reviews": [
      {
        "id": "rev_123",
        "customer": {
          "name": "Jane Smith",
          "profileImage": "https://cdn.example.com/customer.jpg"
        },
        "rating": 5,
        "comment": "Excellent service!",
        "createdAt": "2024-02-16T10:00:00Z",
        "professionalResponse": {
          "comment": "Thank you for your feedback!",
          "createdAt": "2024-02-16T12:00:00Z"
        }
      }
    ],
    "summary": {
      "averageRating": 4.8,
      "totalReviews": 127,
      "ratingDistribution": {
        "5": 100,
        "4": 20,
        "3": 5,
        "2": 1,
        "1": 1
      }
    }
  }
}

POST /api/reviews/:id/response
Headers: Authorization: Bearer <token>
Request Body:
{
  "comment": "Thank you for your feedback!"
}

Response (200):
{
  "success": true,
  "data": {
    "reviewId": "rev_123",
    "response": {
      "comment": "Thank you for your feedback!",
      "createdAt": "2024-02-16T12:00:00Z"
    }
  }
}
```

**Admin Endpoints**

```
GET /api/admin/dashboard
Headers: Authorization: Bearer <admin_token>
Response (200):
{
  "success": true,
  "data": {
    "metrics": {
      "totalUsers": 10000,
      "totalCustomers": 7000,
      "totalProfessionals": 3000,
      "activeBookings": 150,
      "completedBookings": 5000,
      "totalRevenue": 500000,
      "platformCommission": 5000
    },
    "recentActivity": [
      {
        "type": "booking_created",
        "timestamp": "2024-02-10T14:30:00Z",
        "details": { /* activity details */ }
      }
    ]
  }
}

GET /api/admin/verifications/pending
Headers: Authorization: Bearer <admin_token>
Response (200):
{
  "success": true,
  "data": {
    "verifications": [
      {
        "id": "ver_123",
        "professionalId": "prof_123",
        "professional": {
          "name": "John Doe",
          "email": "john@example.com",
          "category": "beauty"
        },
        "documents": [
          {
            "type": "id_proof",
            "url": "https://cdn.example.com/id_proof.jpg"
          },
          {
            "type": "certification",
            "url": "https://cdn.example.com/cert.jpg"
          }
        ],
        "submittedAt": "2024-02-10T10:00:00Z"
      }
    ]
  }
}

POST /api/admin/verifications/:id/approve
Headers: Authorization: Bearer <admin_token>
Request Body:
{
  "notes": "All documents verified"
}

Response (200):
{
  "success": true,
  "message": "Professional verified successfully"
}

POST /api/admin/verifications/:id/reject
Headers: Authorization: Bearer <admin_token>
Request Body:
{
  "reason": "Invalid ID proof",
  "notes": "Please resubmit with valid documents"
}

Response (200):
{
  "success": true,
  "message": "Verification rejected"
}

GET /api/admin/disputes
Headers: Authorization: Bearer <admin_token>
Query Parameters:
- status: "pending" | "resolved"
- page: number
- limit: number

Response (200):
{
  "success": true,
  "data": {
    "disputes": [
      {
        "id": "disp_123",
        "bookingId": "book_123",
        "reportedBy": "customer",
        "reason": "Service not completed",
        "status": "pending",
        "createdAt": "2024-02-16T10:00:00Z"
      }
    ]
  }
}

POST /api/admin/disputes/:id/resolve
Headers: Authorization: Bearer <admin_token>
Request Body:
{
  "resolution": "refund_customer",
  "refundAmount": 808,
  "notes": "Customer complaint valid"
}

Response (200):
{
  "success": true,
  "message": "Dispute resolved successfully"
}
```

#### WebSocket Events

**Chat Events**

```javascript
// Client → Server
socket.emit('join_chat', {
  bookingId: 'book_123',
  userId: 'user_123'
})

socket.emit('send_message', {
  bookingId: 'book_123',
  message: 'Hello, when can you arrive?',
  type: 'text' | 'image'
})

socket.emit('typing', {
  bookingId: 'book_123',
  userId: 'user_123'
})

// Server → Client
socket.on('message_received', (data) => {
  // {
  //   messageId: 'msg_123',
  //   bookingId: 'book_123',
  //   senderId: 'user_456',
  //   senderName: 'John Doe',
  //   message: 'I can arrive at 10 AM',
  //   type: 'text',
  //   timestamp: '2024-02-10T14:30:00Z'
  // }
})

socket.on('user_typing', (data) => {
  // {
  //   bookingId: 'book_123',
  //   userId: 'user_456',
  //   userName: 'John Doe'
  // }
})

socket.on('user_online', (data) => {
  // {
  //   userId: 'user_456',
  //   status: 'online'
  // }
})
```

**Notification Events**

```javascript
// Server → Client
socket.on('booking_update', (data) => {
  // {
  //   bookingId: 'book_123',
  //   status: 'confirmed',
  //   message: 'Your booking has been confirmed'
  // }
})

socket.on('payment_update', (data) => {
  // {
  //   transactionId: 'txn_123',
  //   status: 'completed',
  //   message: 'Payment successful'
  // }
})

socket.on('new_review', (data) => {
  // {
  //   reviewId: 'rev_123',
  //   rating: 5,
  //   message: 'You received a new 5-star review'
  // }
})
```



## Data Models

### Phase 1: Mock Data Structures

Phase 1 uses JavaScript interfaces to define data shapes for mock data stored in JSON files and localStorage.

**User Interface**
```javascript
interface User {
  id: string
  email: string
  role: 'customer' | 'professional'
  name: string
  phone?: string
  profileImage?: string
  createdAt: string
}
```

**Professional Interface**
```javascript
interface Professional {
  id: string
  userId: string
  name: string
  email: string
  phone: string
  profileImage: string
  bio: string
  category: ServiceCategory
  services: string[]
  rating: number
  reviewCount: number
  priceRange: string
  distance: string // Mock distance like "2.5 km"
  availability: string[] // Days of week
  verified: boolean
  location: {
    address: string
    lat: number
    lng: number
  }
}

type ServiceCategory = 'home' | 'beauty' | 'business' | 'event' | 'automotive' | 'educational' | 'health'
```

**Booking Interface**
```javascript
interface Booking {
  id: string
  customerId: string
  professionalId: string
  professionalName: string
  professionalImage: string
  service: string
  date: string
  time: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  price: string
  location: string
  notes?: string
  createdAt: string
}
```

**Review Interface**
```javascript
interface Review {
  id: string
  professionalId: string
  customerId: string
  customerName: string
  customerImage: string
  rating: number
  comment: string
  createdAt: string
}
```

### Phase 2: MongoDB Schema Definitions

Phase 2 uses Mongoose schemas for MongoDB with proper validation, indexes, and relationships.

**User Model** (`models/User.js`)
```javascript
import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  email: string
  password: string
  phone: string
  phoneVerified: boolean
  role: 'customer' | 'professional' | 'admin'
  name: string
  profileImage?: string
  isActive: boolean
  isBlocked: boolean
  lastLogin?: Date
  failedLoginAttempts: number
  accountLockedUntil?: Date
  referralCode: string
  referredBy?: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  password: {
    type: String,
    required: true,
    select: false // Don't return password by default
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  phoneVerified: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ['customer', 'professional', 'admin'],
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  profileImage: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  lastLogin: {
    type: Date
  },
  failedLoginAttempts: {
    type: Number,
    default: 0
  },
  accountLockedUntil: {
    type: Date
  },
  referralCode: {
    type: String,
    unique: true,
    index: true
  },
  referredBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

// Indexes
UserSchema.index({ email: 1, role: 1 })
UserSchema.index({ referralCode: 1 })

export default mongoose.model<IUser>('User', UserSchema)
```

**Professional Model** (`models/Professional.js`)
```javascript
import mongoose, { Schema, Document } from 'mongoose'

export interface IService {
  id: string
  name: string
  description: string
  price: number
  duration: number // in minutes
  category: string
}

export interface ICertification {
  name: string
  issuer: string
  year: number
  documentUrl: string
}

export interface IAvailability {
  [day: string]: string[] // e.g., { "monday": ["09:00-12:00", "14:00-18:00"] }
}

export interface IProfessional extends Document {
  userId: mongoose.Types.ObjectId
  bio: string
  category: string
  services: IService[]
  rating: number
  reviewCount: number
  verified: boolean
  verificationStatus: 'pending' | 'approved' | 'rejected'
  verificationDocuments: {
    idProof?: string
    addressProof?: string
    certifications?: string[]
  }
  certifications: ICertification[]
  portfolio: string[]
  availability: IAvailability
  serviceArea: {
    type: 'Point'
    coordinates: [number, number] // [longitude, latitude]
    radius: number // in km
  }
  responseTime: number // average in minutes
  completionRate: number // percentage
  totalBookings: number
  totalEarnings: number
  isAvailable: boolean
  createdAt: Date
  updatedAt: Date
}

const ServiceSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  duration: { type: Number, required: true, min: 15 },
  category: { type: String, required: true }
})

const CertificationSchema = new Schema({
  name: { type: String, required: true },
  issuer: { type: String, required: true },
  year: { type: Number, required: true },
  documentUrl: { type: String, required: true }
})

const ProfessionalSchema = new Schema<IProfessional>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
    index: true
  },
  bio: {
    type: String,
    maxlength: 1000
  },
  category: {
    type: String,
    required: true,
    enum: ['home', 'beauty', 'business', 'event', 'automotive', 'educational', 'health'],
    index: true
  },
  services: [ServiceSchema],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
    index: true
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  verified: {
    type: Boolean,
    default: false,
    index: true
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
    index: true
  },
  verificationDocuments: {
    idProof: String,
    addressProof: String,
    certifications: [String]
  },
  certifications: [CertificationSchema],
  portfolio: [String],
  availability: {
    type: Map,
    of: [String]
  },
  serviceArea: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true,
      index: '2dsphere' // Geospatial index for location queries
    },
    radius: {
      type: Number,
      default: 10,
      min: 1,
      max: 50
    }
  },
  responseTime: {
    type: Number,
    default: 0
  },
  completionRate: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  totalBookings: {
    type: Number,
    default: 0
  },
  totalEarnings: {
    type: Number,
    default: 0
  },
  isAvailable: {
    type: Boolean,
    default: true,
    index: true
  }
}, {
  timestamps: true
})

// Compound indexes for efficient queries
ProfessionalSchema.index({ category: 1, verified: 1, isAvailable: 1 })
ProfessionalSchema.index({ rating: -1, reviewCount: -1 })
ProfessionalSchema.index({ 'serviceArea.coordinates': '2dsphere' })

export default mongoose.model<IProfessional>('Professional', ProfessionalSchema)
```

**Booking Model** (`models/Booking.js`)
```javascript
import mongoose, { Schema, Document } from 'mongoose'

export interface IBooking extends Document {
  customerId: mongoose.Types.ObjectId
  professionalId: mongoose.Types.ObjectId
  serviceId: string
  serviceName: string
  servicePrice: number
  scheduledAt: Date
  duration: number
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'disputed'
  location: {
    address: string
    coordinates: {
      type: 'Point'
      coordinates: [number, number]
    }
  }
  notes?: string
  cancellationReason?: string
  cancelledBy?: 'customer' | 'professional' | 'system'
  cancelledAt?: Date
  confirmedAt?: Date
  completedAt?: Date
  payment: {
    transactionId?: mongoose.Types.ObjectId
    status: 'pending' | 'completed' | 'refunded' | 'failed'
    amount: number
    bookingFee: number
    commission: number
    netAmount: number
  }
  timeline: Array<{
    status: string
    timestamp: Date
    note?: string
  }>
  autoRejectAt?: Date
  createdAt: Date
  updatedAt: Date
}

const BookingSchema = new Schema<IBooking>({
  customerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  professionalId: {
    type: Schema.Types.ObjectId,
    ref: 'Professional',
    required: true,
    index: true
  },
  serviceId: {
    type: String,
    required: true
  },
  serviceName: {
    type: String,
    required: true
  },
  servicePrice: {
    type: Number,
    required: true,
    min: 0
  },
  scheduledAt: {
    type: Date,
    required: true,
    index: true
  },
  duration: {
    type: Number,
    required: true,
    min: 15
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'disputed'],
    default: 'pending',
    index: true
  },
  location: {
    address: {
      type: String,
      required: true
    },
    coordinates: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number],
        required: true
      }
    }
  },
  notes: {
    type: String,
    maxlength: 500
  },
  cancellationReason: String,
  cancelledBy: {
    type: String,
    enum: ['customer', 'professional', 'system']
  },
  cancelledAt: Date,
  confirmedAt: Date,
  completedAt: Date,
  payment: {
    transactionId: {
      type: Schema.Types.ObjectId,
      ref: 'Transaction'
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'refunded', 'failed'],
      default: 'pending'
    },
    amount: {
      type: Number,
      required: true
    },
    bookingFee: {
      type: Number,
      required: true
    },
    commission: {
      type: Number,
      required: true
    },
    netAmount: {
      type: Number,
      required: true
    }
  },
  timeline: [{
    status: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    note: String
  }],
  autoRejectAt: {
    type: Date,
    index: true
  }
}, {
  timestamps: true
})

// Compound indexes
BookingSchema.index({ customerId: 1, status: 1, scheduledAt: -1 })
BookingSchema.index({ professionalId: 1, status: 1, scheduledAt: -1 })
BookingSchema.index({ status: 1, autoRejectAt: 1 })

export default mongoose.model<IBooking>('Booking', BookingSchema)
```

**Transaction Model** (`models/Transaction.js`)
```javascript
import mongoose, { Schema, Document } from 'mongoose'

export interface ITransaction extends Document {
  bookingId: mongoose.Types.ObjectId
  customerId: mongoose.Types.ObjectId
  professionalId: mongoose.Types.ObjectId
  type: 'booking_payment' | 'refund' | 'commission' | 'payout'
  amount: number
  currency: string
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'
  paymentGateway: 'razorpay' | 'stripe'
  gatewayOrderId?: string
  gatewayPaymentId?: string
  gatewaySignature?: string
  refundId?: string
  refundAmount?: number
  refundReason?: string
  metadata: {
    bookingFee?: number
    commission?: number
    commissionRate?: number
    netAmount?: number
  }
  createdAt: Date
  updatedAt: Date
}

const TransactionSchema = new Schema<ITransaction>({
  bookingId: {
    type: Schema.Types.ObjectId,
    ref: 'Booking',
    required: true,
    index: true
  },
  customerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  professionalId: {
    type: Schema.Types.ObjectId,
    ref: 'Professional',
    required: true,
    index: true
  },
  type: {
    type: String,
    enum: ['booking_payment', 'refund', 'commission', 'payout'],
    required: true,
    index: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'INR'
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
    default: 'pending',
    index: true
  },
  paymentGateway: {
    type: String,
    enum: ['razorpay', 'stripe'],
    required: true
  },
  gatewayOrderId: String,
  gatewayPaymentId: String,
  gatewaySignature: String,
  refundId: String,
  refundAmount: Number,
  refundReason: String,
  metadata: {
    bookingFee: Number,
    commission: Number,
    commissionRate: Number,
    netAmount: Number
  }
}, {
  timestamps: true
})

// Indexes
TransactionSchema.index({ customerId: 1, createdAt: -1 })
TransactionSchema.index({ professionalId: 1, type: 1, createdAt: -1 })
TransactionSchema.index({ status: 1, createdAt: -1 })

export default mongoose.model<ITransaction>('Transaction', TransactionSchema)
```

**Review Model** (`models/Review.js`)
```javascript
import mongoose, { Schema, Document } from 'mongoose'

export interface IReview extends Document {
  bookingId: mongoose.Types.ObjectId
  customerId: mongoose.Types.ObjectId
  professionalId: mongoose.Types.ObjectId
  rating: number
  comment: string
  professionalResponse?: {
    comment: string
    createdAt: Date
  }
  isVisible: boolean
  flaggedBy?: mongoose.Types.ObjectId
  flagReason?: string
  createdAt: Date
  updatedAt: Date
}

const ReviewSchema = new Schema<IReview>({
  bookingId: {
    type: Schema.Types.ObjectId,
    ref: 'Booking',
    required: true,
    unique: true,
    index: true
  },
  customerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  professionalId: {
    type: Schema.Types.ObjectId,
    ref: 'Professional',
    required: true,
    index: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true,
    maxlength: 500
  },
  professionalResponse: {
    comment: {
      type: String,
      maxlength: 500
    },
    createdAt: Date
  },
  isVisible: {
    type: Boolean,
    default: true,
    index: true
  },
  flaggedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  flagReason: String
}, {
  timestamps: true
})

// Indexes
ReviewSchema.index({ professionalId: 1, isVisible: 1, createdAt: -1 })
ReviewSchema.index({ rating: -1 })

export default mongoose.model<IReview>('Review', ReviewSchema)
```

**Chat Model** (`models/Chat.js`)
```javascript
import mongoose, { Schema, Document } from 'mongoose'

export interface IMessage {
  senderId: mongoose.Types.ObjectId
  message: string
  type: 'text' | 'image'
  imageUrl?: string
  timestamp: Date
  read: boolean
}

export interface IChat extends Document {
  bookingId: mongoose.Types.ObjectId
  participants: mongoose.Types.ObjectId[]
  messages: IMessage[]
  lastMessage?: string
  lastMessageAt?: Date
  createdAt: Date
  updatedAt: Date
}

const MessageSchema = new Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true,
    maxlength: 1000
  },
  type: {
    type: String,
    enum: ['text', 'image'],
    default: 'text'
  },
  imageUrl: String,
  timestamp: {
    type: Date,
    default: Date.now
  },
  read: {
    type: Boolean,
    default: false
  }
})

const ChatSchema = new Schema<IChat>({
  bookingId: {
    type: Schema.Types.ObjectId,
    ref: 'Booking',
    required: true,
    unique: true,
    index: true
  },
  participants: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  messages: [MessageSchema],
  lastMessage: String,
  lastMessageAt: Date
}, {
  timestamps: true
})

// Indexes
ChatSchema.index({ participants: 1, lastMessageAt: -1 })

export default mongoose.model<IChat>('Chat', ChatSchema)
```

**Dispute Model** (`models/Dispute.js`)
```javascript
import mongoose, { Schema, Document } from 'mongoose'

export interface IDispute extends Document {
  bookingId: mongoose.Types.ObjectId
  reportedBy: mongoose.Types.ObjectId
  reportedAgainst: mongoose.Types.ObjectId
  reporterRole: 'customer' | 'professional'
  reason: string
  description: string
  evidence: string[]
  status: 'pending' | 'under_review' | 'resolved' | 'closed'
  resolution?: {
    action: 'refund_customer' | 'pay_professional' | 'no_action' | 'partial_refund'
    refundAmount?: number
    notes: string
    resolvedBy: mongoose.Types.ObjectId
    resolvedAt: Date
  }
  adminNotes?: string
  createdAt: Date
  updatedAt: Date
}

const DisputeSchema = new Schema<IDispute>({
  bookingId: {
    type: Schema.Types.ObjectId,
    ref: 'Booking',
    required: true,
    index: true
  },
  reportedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reportedAgainst: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reporterRole: {
    type: String,
    enum: ['customer', 'professional'],
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  evidence: [String],
  status: {
    type: String,
    enum: ['pending', 'under_review', 'resolved', 'closed'],
    default: 'pending',
    index: true
  },
  resolution: {
    action: {
      type: String,
      enum: ['refund_customer', 'pay_professional', 'no_action', 'partial_refund']
    },
    refundAmount: Number,
    notes: String,
    resolvedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    resolvedAt: Date
  },
  adminNotes: String
}, {
  timestamps: true
})

// Indexes
DisputeSchema.index({ status: 1, createdAt: -1 })
DisputeSchema.index({ bookingId: 1 })

export default mongoose.model<IDispute>('Dispute', DisputeSchema)
```

**Notification Model** (`models/Notification.js`)
```javascript
import mongoose, { Schema, Document } from 'mongoose'

export interface INotification extends Document {
  userId: mongoose.Types.ObjectId
  type: 'booking' | 'payment' | 'review' | 'verification' | 'chat' | 'system'
  title: string
  message: string
  data?: any
  read: boolean
  sentVia: ('push' | 'sms' | 'email')[]
  createdAt: Date
}

const NotificationSchema = new Schema<INotification>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  type: {
    type: String,
    enum: ['booking', 'payment', 'review', 'verification', 'chat', 'system'],
    required: true,
    index: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  data: Schema.Types.Mixed,
  read: {
    type: Boolean,
    default: false,
    index: true
  },
  sentVia: [{
    type: String,
    enum: ['push', 'sms', 'email']
  }]
}, {
  timestamps: true
})

// Indexes
NotificationSchema.index({ userId: 1, read: 1, createdAt: -1 })

export default mongoose.model<INotification>('Notification', NotificationSchema)
```

**Referral Model** (`models/Referral.js`)
```javascript
import mongoose, { Schema, Document } from 'mongoose'

export interface IReferral extends Document {
  referrerId: mongoose.Types.ObjectId
  referredUserId: mongoose.Types.ObjectId
  referralCode: string
  status: 'pending' | 'completed' | 'expired'
  bonusAmount: number
  bonusCredited: boolean
  creditedAt?: Date
  createdAt: Date
  updatedAt: Date
}

const ReferralSchema = new Schema<IReferral>({
  referrerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  referredUserId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  referralCode: {
    type: String,
    required: true,
    index: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'expired'],
    default: 'pending',
    index: true
  },
  bonusAmount: {
    type: Number,
    default: 0
  },
  bonusCredited: {
    type: Boolean,
    default: false
  },
  creditedAt: Date
}, {
  timestamps: true
})

// Indexes
ReferralSchema.index({ referrerId: 1, status: 1 })

export default mongoose.model<IReferral>('Referral', ReferralSchema)
```

### Database Relationships

```
User (1) ←→ (1) Professional
User (1) ←→ (many) Booking (as customer)
Professional (1) ←→ (many) Booking
Booking (1) ←→ (1) Transaction
Booking (1) ←→ (0..1) Review
Booking (1) ←→ (0..1) Chat
Booking (1) ←→ (0..many) Dispute
User (1) ←→ (many) Notification
User (1) ←→ (many) Referral (as referrer)
User (1) ←→ (0..1) Referral (as referred)
```

### Data Validation Rules

**Phase 1 (Client-side)**
- Email: Valid email format
- Password: Minimum 8 characters, at least 1 uppercase, 1 lowercase, 1 number
- Phone: 10 digits (Indian format)
- Rating: 1-5 stars
- Booking date: Future date only
- Price: Positive numbers only

**Phase 2 (Server-side + Database)**
- All Phase 1 validations
- Unique constraints: email, phone, referral code
- Geospatial validation: Valid coordinates
- Enum validation: Status fields, roles, categories
- Range validation: Rating (1-5), commission (0-100%)
- String length limits: Bio (1000), comments (500), messages (1000)
- File size limits: Images (5MB), documents (10MB)
- Date validation: Booking dates must be future, cancellation within allowed window



## Error Handling

### Phase 1: Client-Side Error Handling

**Authentication Errors**
```javascript
// composables/useAuth.js
export const useAuth = () => {
  const handleAuthError = (error: any) => {
    const errorMessages: Record<string, string> = {
      'auth/user-not-found': 'No account found with this email',
      'auth/wrong-password': 'Incorrect password',
      'auth/email-already-in-use': 'Email already registered',
      'auth/weak-password': 'Password must be at least 8 characters',
      'auth/invalid-email': 'Invalid email format',
      'auth/too-many-requests': 'Too many attempts. Please try again later'
    }
    
    return errorMessages[error.code] || 'An error occurred. Please try again.'
  }
  
  return { handleAuthError }
}
```

**Form Validation Errors**
```javascript
// utils/validators.js
export const validateBookingForm = (data: BookingFormData): ValidationResult => {
  const errors: string[] = []
  
  if (!data.date) {
    errors.push('Please select a date')
  } else if (new Date(data.date) < new Date()) {
    errors.push('Date must be in the future')
  }
  
  if (!data.timeSlot) {
    errors.push('Please select a time slot')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}
```

**Network Error Handling**
```javascript
// utils/mockApi.js
export class MockAPI {
  static async handleRequest<T>(fn: () => Promise<T>): Promise<ApiResponse<T>> {
    try {
      const data = await fn()
      return {
        success: true,
        data
      }
    } catch (error) {
      console.error('API Error:', error)
      return {
        success: false,
        error: 'Something went wrong. Please try again.'
      }
    }
  }
}
```

**User-Friendly Error Display**
```vue
<!-- components/common/ErrorAlert.vue -->
<template>
  <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
    <div class="flex items-center">
      <svg class="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
      </svg>
      <p class="text-red-800 text-sm">{{ error }}</p>
    </div>
  </div>
</template>
```

### Phase 2: Comprehensive Error Handling

**Error Response Structure**
```javascript
// types/api.js
export interface ApiError {
  success: false
  error: {
    code: string
    message: string
    details?: any
    timestamp: string
    path: string
  }
}

export interface ApiSuccess<T> {
  success: true
  data: T
  message?: string
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError
```

**Global Error Handler Middleware**
```javascript
// middleware/errorHandler.js
import { Request, Response, NextFunction } from 'express'
import { logger } from '../utils/logger'

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code: string,
    public details?: any
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log error
  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    userId: req.user?.id
  })
  
  // Handle known errors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message,
        details: err.details,
        timestamp: new Date().toISOString(),
        path: req.path
      }
    })
  }
  
  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: err.message,
        timestamp: new Date().toISOString(),
        path: req.path
      }
    })
  }
  
  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      error: {
        code: 'INVALID_TOKEN',
        message: 'Invalid authentication token',
        timestamp: new Date().toISOString(),
        path: req.path
      }
    })
  }
  
  // Handle unknown errors
  return res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred',
      timestamp: new Date().toISOString(),
      path: req.path
    }
  })
}
```

**Error Codes and Messages**
```javascript
// utils/errorCodes.js
export const ErrorCodes = {
  // Authentication errors (1000-1099)
  INVALID_CREDENTIALS: { code: 'AUTH_1001', message: 'Invalid email or password', status: 401 },
  ACCOUNT_LOCKED: { code: 'AUTH_1002', message: 'Account locked due to multiple failed attempts', status: 403 },
  PHONE_NOT_VERIFIED: { code: 'AUTH_1003', message: 'Phone number not verified', status: 403 },
  INVALID_TOKEN: { code: 'AUTH_1004', message: 'Invalid or expired token', status: 401 },
  
  // User errors (2000-2099)
  USER_NOT_FOUND: { code: 'USER_2001', message: 'User not found', status: 404 },
  USER_ALREADY_EXISTS: { code: 'USER_2002', message: 'User already exists', status: 409 },
  USER_BLOCKED: { code: 'USER_2003', message: 'User account is blocked', status: 403 },
  
  // Professional errors (3000-3099)
  PROFESSIONAL_NOT_FOUND: { code: 'PROF_3001', message: 'Professional not found', status: 404 },
  PROFESSIONAL_NOT_VERIFIED: { code: 'PROF_3002', message: 'Professional not verified', status: 403 },
  PROFESSIONAL_UNAVAILABLE: { code: 'PROF_3003', message: 'Professional is not available', status: 400 },
  
  // Booking errors (4000-4099)
  BOOKING_NOT_FOUND: { code: 'BOOK_4001', message: 'Booking not found', status: 404 },
  BOOKING_ALREADY_EXISTS: { code: 'BOOK_4002', message: 'Booking already exists for this time slot', status: 409 },
  BOOKING_CANNOT_CANCEL: { code: 'BOOK_4003', message: 'Booking cannot be cancelled at this time', status: 400 },
  INVALID_TIME_SLOT: { code: 'BOOK_4004', message: 'Invalid or unavailable time slot', status: 400 },
  BOOKING_EXPIRED: { code: 'BOOK_4005', message: 'Booking request expired', status: 400 },
  
  // Payment errors (5000-5099)
  PAYMENT_FAILED: { code: 'PAY_5001', message: 'Payment processing failed', status: 400 },
  PAYMENT_NOT_FOUND: { code: 'PAY_5002', message: 'Payment record not found', status: 404 },
  REFUND_FAILED: { code: 'PAY_5003', message: 'Refund processing failed', status: 400 },
  INSUFFICIENT_BALANCE: { code: 'PAY_5004', message: 'Insufficient balance', status: 400 },
  
  // Review errors (6000-6099)
  REVIEW_ALREADY_EXISTS: { code: 'REV_6001', message: 'Review already submitted for this booking', status: 409 },
  REVIEW_NOT_ALLOWED: { code: 'REV_6002', message: 'Cannot review incomplete booking', status: 400 },
  
  // Validation errors (7000-7099)
  VALIDATION_ERROR: { code: 'VAL_7001', message: 'Validation failed', status: 400 },
  INVALID_INPUT: { code: 'VAL_7002', message: 'Invalid input data', status: 400 },
  MISSING_REQUIRED_FIELD: { code: 'VAL_7003', message: 'Required field missing', status: 400 },
  
  // System errors (9000-9099)
  INTERNAL_ERROR: { code: 'SYS_9001', message: 'Internal server error', status: 500 },
  SERVICE_UNAVAILABLE: { code: 'SYS_9002', message: 'Service temporarily unavailable', status: 503 },
  DATABASE_ERROR: { code: 'SYS_9003', message: 'Database operation failed', status: 500 }
}
```

**Service-Level Error Handling**
```javascript
// services/bookingService.js
import { AppError } from '../middleware/errorHandler'
import { ErrorCodes } from '../utils/errorCodes'

export class BookingService {
  async createBooking(data: CreateBookingDto) {
    // Validate professional exists and is verified
    const professional = await Professional.findById(data.professionalId)
    if (!professional) {
      throw new AppError(
        ErrorCodes.PROFESSIONAL_NOT_FOUND.status,
        ErrorCodes.PROFESSIONAL_NOT_FOUND.message,
        ErrorCodes.PROFESSIONAL_NOT_FOUND.code
      )
    }
    
    if (!professional.verified) {
      throw new AppError(
        ErrorCodes.PROFESSIONAL_NOT_VERIFIED.status,
        ErrorCodes.PROFESSIONAL_NOT_VERIFIED.message,
        ErrorCodes.PROFESSIONAL_NOT_VERIFIED.code
      )
    }
    
    // Validate time slot availability
    const existingBooking = await Booking.findOne({
      professionalId: data.professionalId,
      scheduledAt: data.scheduledAt,
      status: { $in: ['pending', 'confirmed'] }
    })
    
    if (existingBooking) {
      throw new AppError(
        ErrorCodes.BOOKING_ALREADY_EXISTS.status,
        ErrorCodes.BOOKING_ALREADY_EXISTS.message,
        ErrorCodes.BOOKING_ALREADY_EXISTS.code,
        { suggestedSlots: await this.getAvailableSlots(data.professionalId, data.date) }
      )
    }
    
    // Create booking with error handling
    try {
      const booking = await Booking.create(data)
      return booking
    } catch (error) {
      logger.error('Booking creation failed', { error, data })
      throw new AppError(
        ErrorCodes.DATABASE_ERROR.status,
        ErrorCodes.DATABASE_ERROR.message,
        ErrorCodes.DATABASE_ERROR.code
      )
    }
  }
}
```

**Payment Gateway Error Handling**
```javascript
// services/paymentService.js
export class PaymentService {
  async processPayment(orderId: string, paymentDetails: any) {
    try {
      // Razorpay payment verification
      const isValid = this.verifyPaymentSignature(paymentDetails)
      
      if (!isValid) {
        throw new AppError(
          ErrorCodes.PAYMENT_FAILED.status,
          'Payment verification failed',
          ErrorCodes.PAYMENT_FAILED.code
        )
      }
      
      // Update transaction status
      const transaction = await Transaction.findOneAndUpdate(
        { gatewayOrderId: orderId },
        {
          status: 'completed',
          gatewayPaymentId: paymentDetails.paymentId,
          gatewaySignature: paymentDetails.signature
        },
        { new: true }
      )
      
      return transaction
    } catch (error) {
      // Log payment failure
      logger.error('Payment processing failed', {
        orderId,
        error: error.message,
        stack: error.stack
      })
      
      // Update transaction status to failed
      await Transaction.findOneAndUpdate(
        { gatewayOrderId: orderId },
        { status: 'failed' }
      )
      
      if (error instanceof AppError) {
        throw error
      }
      
      throw new AppError(
        ErrorCodes.PAYMENT_FAILED.status,
        ErrorCodes.PAYMENT_FAILED.message,
        ErrorCodes.PAYMENT_FAILED.code,
        { originalError: error.message }
      )
    }
  }
}
```

**Retry Logic for External Services**
```javascript
// utils/retry.js
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error
      
      if (attempt < maxRetries - 1) {
        const delay = baseDelay * Math.pow(2, attempt)
        logger.warn(`Retry attempt ${attempt + 1} after ${delay}ms`, { error })
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
  }
  
  throw lastError
}

// Usage in notification service
export class NotificationService {
  async sendSMS(phone: string, message: string) {
    return retryWithBackoff(
      async () => {
        const result = await twilioClient.messages.create({
          to: phone,
          from: process.env.TWILIO_PHONE,
          body: message
        })
        return result
      },
      3,
      1000
    )
  }
}
```

**Circuit Breaker Pattern**
```javascript
// utils/circuitBreaker.js
export class CircuitBreaker {
  private failureCount = 0
  private lastFailureTime?: number
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED'
  
  constructor(
    private threshold: number = 5,
    private timeout: number = 60000 // 1 minute
  ) {}
  
  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime! > this.timeout) {
        this.state = 'HALF_OPEN'
      } else {
        throw new AppError(
          ErrorCodes.SERVICE_UNAVAILABLE.status,
          ErrorCodes.SERVICE_UNAVAILABLE.message,
          ErrorCodes.SERVICE_UNAVAILABLE.code
        )
      }
    }
    
    try {
      const result = await fn()
      this.onSuccess()
      return result
    } catch (error) {
      this.onFailure()
      throw error
    }
  }
  
  private onSuccess() {
    this.failureCount = 0
    this.state = 'CLOSED'
  }
  
  private onFailure() {
    this.failureCount++
    this.lastFailureTime = Date.now()
    
    if (this.failureCount >= this.threshold) {
      this.state = 'OPEN'
      logger.error('Circuit breaker opened', { failureCount: this.failureCount })
    }
  }
}
```



## Testing Strategy

### Why Property-Based Testing Does Not Apply

Property-based testing (PBT) is not appropriate for the NeedMeet platform because:

1. **UI-Heavy Application**: Most Phase 1 requirements involve UI rendering, navigation flows, and visual feedback, which are better tested with snapshot tests and visual regression testing.

2. **CRUD Operations**: Phase 2 backend primarily consists of database CRUD operations (create users, read bookings, update statuses, delete records) that are better validated with example-based integration tests.

3. **External Service Integration**: The platform heavily relies on external services (Firebase Auth, Razorpay/Stripe payments, Twilio SMS, AWS S3 storage, WebSocket connections) where behavior doesn't vary meaningfully with input and PBT would be cost-prohibitive.

4. **Side-Effect Operations**: Many operations are side-effect-only (sending notifications, uploading files, triggering webhooks) with no return values to assert universal properties on.

5. **Workflow Orchestration**: The booking flow, payment processing, and dispute resolution are complex workflows with state machines that are better tested with scenario-based integration tests.

Instead, we will use a comprehensive testing strategy combining unit tests, integration tests, end-to-end tests, and manual testing.

### Phase 1: MVP Testing Strategy

**1. Unit Tests (Vitest)**

Test individual components and composables in isolation.

```javascript
// tests/unit/components/BookingForm.spec.js
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import BookingForm from '@/components/booking/BookingForm.vue'

describe('BookingForm', () => {
  it('renders date and time slot pickers', () => {
    const wrapper = mount(BookingForm, {
      props: {
        professional: mockProfessional,
        service: mockService
      }
    })
    
    expect(wrapper.find('[data-testid="date-picker"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="time-slot-picker"]').exists()).toBe(true)
  })
  
  it('validates required fields before submission', async () => {
    const wrapper = mount(BookingForm, {
      props: {
        professional: mockProfessional,
        service: mockService
      }
    })
    
    await wrapper.find('form').trigger('submit')
    
    expect(wrapper.find('[data-testid="error-message"]').text()).toContain('Please select a date')
  })
  
  it('emits booking data on valid submission', async () => {
    const wrapper = mount(BookingForm, {
      props: {
        professional: mockProfessional,
        service: mockService
      }
    })
    
    await wrapper.find('[data-testid="date-picker"]').setValue('2024-03-15')
    await wrapper.find('[data-testid="time-slot"]').setValue('10:00-11:00')
    await wrapper.find('form').trigger('submit')
    
    expect(wrapper.emitted('submit')).toBeTruthy()
    expect(wrapper.emitted('submit')[0][0]).toMatchObject({
      date: '2024-03-15',
      timeSlot: '10:00-11:00'
    })
  })
})
```

```javascript
// tests/unit/composables/useAuth.spec.js
import { describe, it, expect, vi } from 'vitest'
import { useAuth } from '@/composables/useAuth'

describe('useAuth', () => {
  it('handles successful login', async () => {
    const { login } = useAuth()
    
    const result = await login('test@example.com', 'password123')
    
    expect(result.success).toBe(true)
    expect(result.user).toBeDefined()
  })
  
  it('handles login with invalid credentials', async () => {
    const { login } = useAuth()
    
    const result = await login('test@example.com', 'wrongpassword')
    
    expect(result.success).toBe(false)
    expect(result.error).toContain('Invalid credentials')
  })
})
```

**2. Component Snapshot Tests**

```javascript
// tests/unit/components/ProfessionalCard.spec.js
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProfessionalCard from '@/components/professional/ProfileCard.vue'

describe('ProfessionalCard', () => {
  it('matches snapshot', () => {
    const wrapper = mount(ProfessionalCard, {
      props: {
        professional: {
          id: 'prof_001',
          name: 'John Doe',
          category: 'beauty',
          rating: 4.8,
          reviewCount: 127,
          priceRange: '₹500-₹2000',
          distance: '2.5 km',
          verified: true
        }
      }
    })
    
    expect(wrapper.html()).toMatchSnapshot()
  })
})
```

**3. Integration Tests (Playwright/Cypress)**

Test complete user flows from end to end.

```javascript
// tests/e2e/booking-flow.spec.js
import { test, expect } from '@playwright/test'

test.describe('Booking Flow', () => {
  test('complete booking journey from home to confirmation', async ({ page }) => {
    // Navigate to home page
    await page.goto('/')
    
    // Click on Beauty category
    await page.click('[data-testid="category-beauty"]')
    await expect(page).toHaveURL('/categories/beauty')
    
    // Click on first professional
    await page.click('[data-testid="professional-card"]:first-child')
    await expect(page).toHaveURL(/\/professionals\/prof_\d+/)
    
    // Click Book Now button
    await page.click('[data-testid="book-now-button"]')
    await expect(page).toHaveURL(/\/booking\/prof_\d+/)
    
    // Fill booking form
    await page.fill('[data-testid="date-picker"]', '2024-03-15')
    await page.click('[data-testid="time-slot-10:00"]')
    await page.fill('[data-testid="notes"]', 'Please bring styling products')
    
    // Submit booking
    await page.click('[data-testid="submit-booking"]')
    
    // Verify confirmation message
    await expect(page.locator('[data-testid="confirmation-message"]')).toBeVisible()
    await expect(page.locator('[data-testid="confirmation-message"]')).toContainText('Booking confirmed')
    
    // Verify redirect to dashboard
    await expect(page).toHaveURL('/dashboard/customer')
    
    // Verify booking appears in dashboard
    await expect(page.locator('[data-testid="booking-list"]')).toContainText('John Doe')
  })
  
  test('authentication flow', async ({ page }) => {
    await page.goto('/login')
    
    // Fill login form
    await page.fill('[data-testid="email-input"]', 'test@example.com')
    await page.fill('[data-testid="password-input"]', 'password123')
    await page.click('[data-testid="login-button"]')
    
    // Verify redirect to dashboard
    await expect(page).toHaveURL('/dashboard/customer')
  })
})
```

**4. Responsive Design Tests**

```javascript
// tests/e2e/responsive.spec.js
import { test, expect, devices } from '@playwright/test'

test.describe('Responsive Design', () => {
  test('mobile view', async ({ page }) => {
    await page.setViewportSize(devices['iPhone 12'].viewport)
    await page.goto('/')
    
    // Verify mobile navigation
    await expect(page.locator('[data-testid="mobile-menu-button"]')).toBeVisible()
    
    // Verify category grid is single column
    const categoryGrid = page.locator('[data-testid="category-grid"]')
    await expect(categoryGrid).toHaveCSS('grid-template-columns', /1fr/)
  })
  
  test('tablet view', async ({ page }) => {
    await page.setViewportSize(devices['iPad'].viewport)
    await page.goto('/')
    
    // Verify category grid is two columns
    const categoryGrid = page.locator('[data-testid="category-grid"]')
    await expect(categoryGrid).toHaveCSS('grid-template-columns', /repeat\(2/)
  })
  
  test('desktop view', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.goto('/')
    
    // Verify category grid is three columns
    const categoryGrid = page.locator('[data-testid="category-grid"]')
    await expect(categoryGrid).toHaveCSS('grid-template-columns', /repeat\(3/)
  })
})
```

**5. Accessibility Tests**

```javascript
// tests/a11y/accessibility.spec.js
import { test, expect } from '@playwright/test'
import { injectAxe, checkA11y } from 'axe-playwright'

test.describe('Accessibility', () => {
  test('home page meets WCAG standards', async ({ page }) => {
    await page.goto('/')
    await injectAxe(page)
    await checkA11y(page)
  })
  
  test('booking form is keyboard navigable', async ({ page }) => {
    await page.goto('/booking/prof_001')
    
    // Tab through form fields
    await page.keyboard.press('Tab')
    await expect(page.locator('[data-testid="date-picker"]')).toBeFocused()
    
    await page.keyboard.press('Tab')
    await expect(page.locator('[data-testid="time-slot-picker"]')).toBeFocused()
  })
})
```

### Phase 2: Full Product Testing Strategy

**1. Unit Tests (Jest/Vitest)**

Test individual functions, services, and utilities.

```javascript
// tests/unit/services/bookingService.spec.js
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { BookingService } from '@/services/bookingService'
import { Professional, Booking } from '@/models'

describe('BookingService', () => {
  let bookingService: BookingService
  
  beforeEach(() => {
    bookingService = new BookingService()
  })
  
  afterEach(async () => {
    await Booking.deleteMany({})
    await Professional.deleteMany({})
  })
  
  it('creates booking with valid data', async () => {
    const professional = await Professional.create(mockProfessionalData)
    
    const bookingData = {
      customerId: 'customer_123',
      professionalId: professional._id,
      serviceId: 'svc_001',
      scheduledAt: new Date('2024-03-15T10:00:00Z'),
      location: mockLocation
    }
    
    const booking = await bookingService.createBooking(bookingData)
    
    expect(booking).toBeDefined()
    expect(booking.status).toBe('pending')
    expect(booking.professionalId.toString()).toBe(professional._id.toString())
  })
  
  it('throws error when professional not found', async () => {
    const bookingData = {
      customerId: 'customer_123',
      professionalId: 'invalid_id',
      serviceId: 'svc_001',
      scheduledAt: new Date('2024-03-15T10:00:00Z'),
      location: mockLocation
    }
    
    await expect(bookingService.createBooking(bookingData))
      .rejects
      .toThrow('Professional not found')
  })
  
  it('prevents double booking', async () => {
    const professional = await Professional.create(mockProfessionalData)
    const scheduledAt = new Date('2024-03-15T10:00:00Z')
    
    // Create first booking
    await Booking.create({
      customerId: 'customer_123',
      professionalId: professional._id,
      serviceId: 'svc_001',
      scheduledAt,
      status: 'confirmed'
    })
    
    // Attempt second booking at same time
    const bookingData = {
      customerId: 'customer_456',
      professionalId: professional._id,
      serviceId: 'svc_001',
      scheduledAt,
      location: mockLocation
    }
    
    await expect(bookingService.createBooking(bookingData))
      .rejects
      .toThrow('Booking already exists for this time slot')
  })
})
```

```javascript
// tests/unit/services/paymentService.spec.js
import { describe, it, expect, vi } from 'vitest'
import { PaymentService } from '@/services/paymentService'

describe('PaymentService', () => {
  it('calculates standard service fees correctly', () => {
    const paymentService = new PaymentService()
    
    const result = paymentService.calculateFees({
      servicePrice: 1000,
      serviceType: 'standard'
    })
    
    expect(result).toEqual({
      servicePrice: 1000,
      bookingFee: 10, // 1%
      commission: 10, // 1%
      total: 1010,
      professionalEarnings: 990
    })
  })
  
  it('calculates educational service fees correctly for first booking', () => {
    const paymentService = new PaymentService()
    
    const result = paymentService.calculateFees({
      servicePrice: 1000,
      serviceType: 'educational',
      isFirstBooking: true
    })
    
    expect(result).toEqual({
      servicePrice: 1000,
      bookingFee: 50, // Fixed ₹50
      commission: 100, // 10%
      total: 1050,
      professionalEarnings: 900
    })
  })
  
  it('calculates educational service fees correctly for repeat booking', () => {
    const paymentService = new PaymentService()
    
    const result = paymentService.calculateFees({
      servicePrice: 1000,
      serviceType: 'educational',
      isFirstBooking: false
    })
    
    expect(result).toEqual({
      servicePrice: 1000,
      bookingFee: 0, // No fee for repeat
      commission: 100, // 10%
      total: 1000,
      professionalEarnings: 900
    })
  })
})
```

**2. Integration Tests**

Test API endpoints with real database connections.

```javascript
// tests/integration/api/bookings.spec.js
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import app from '@/app'
import { connectDB, disconnectDB } from '@/config/database'

describe('Booking API', () => {
  let authToken: string
  let professionalId: string
  
  beforeAll(async () => {
    await connectDB()
    
    // Create test user and get auth token
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'password123',
        phone: '+919876543210',
        role: 'customer',
        name: 'Test User'
      })
    
    authToken = response.body.data.token
    
    // Create test professional
    const profResponse = await request(app)
      .post('/api/professionals/profile')
      .set('Authorization', `Bearer ${authToken}`)
      .send(mockProfessionalData)
    
    professionalId = profResponse.body.data.id
  })
  
  afterAll(async () => {
    await disconnectDB()
  })
  
  it('POST /api/bookings - creates booking successfully', async () => {
    const response = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        professionalId,
        serviceId: 'svc_001',
        date: '2024-03-15',
        timeSlot: '10:00-11:00',
        location: mockLocation
      })
    
    expect(response.status).toBe(201)
    expect(response.body.success).toBe(true)
    expect(response.body.data.bookingId).toBeDefined()
    expect(response.body.data.status).toBe('pending')
  })
  
  it('POST /api/bookings - returns 401 without auth token', async () => {
    const response = await request(app)
      .post('/api/bookings')
      .send({
        professionalId,
        serviceId: 'svc_001',
        date: '2024-03-15',
        timeSlot: '10:00-11:00'
      })
    
    expect(response.status).toBe(401)
    expect(response.body.success).toBe(false)
  })
  
  it('GET /api/bookings - returns user bookings', async () => {
    const response = await request(app)
      .get('/api/bookings')
      .set('Authorization', `Bearer ${authToken}`)
    
    expect(response.status).toBe(200)
    expect(response.body.success).toBe(true)
    expect(Array.isArray(response.body.data.bookings)).toBe(true)
  })
  
  it('PATCH /api/bookings/:id/status - updates booking status', async () => {
    // Create booking first
    const createResponse = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${authToken}`)
      .send(mockBookingData)
    
    const bookingId = createResponse.body.data.bookingId
    
    // Update status
    const response = await request(app)
      .patch(`/api/bookings/${bookingId}/status`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ status: 'confirmed' })
    
    expect(response.status).toBe(200)
    expect(response.body.data.status).toBe('confirmed')
  })
})
```

**3. WebSocket Tests**

```javascript
// tests/integration/sockets/chat.spec.js
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { io, Socket } from 'socket.io-client'
import { startServer, stopServer } from '@/server'

describe('Chat WebSocket', () => {
  let clientSocket: Socket
  let serverUrl: string
  
  beforeAll(async () => {
    serverUrl = await startServer()
  })
  
  afterAll(async () => {
    await stopServer()
  })
  
  it('connects to chat room', (done) => {
    clientSocket = io(serverUrl, {
      auth: { token: mockAuthToken }
    })
    
    clientSocket.on('connect', () => {
      expect(clientSocket.connected).toBe(true)
      done()
    })
  })
  
  it('sends and receives messages', (done) => {
    clientSocket.emit('join_chat', {
      bookingId: 'book_123',
      userId: 'user_123'
    })
    
    clientSocket.on('message_received', (data) => {
      expect(data.message).toBe('Hello')
      expect(data.senderId).toBe('user_123')
      done()
    })
    
    clientSocket.emit('send_message', {
      bookingId: 'book_123',
      message: 'Hello',
      type: 'text'
    })
  })
})
```

**4. Payment Integration Tests**

```javascript
// tests/integration/payments/razorpay.spec.js
import { describe, it, expect } from 'vitest'
import { PaymentService } from '@/services/paymentService'

describe('Razorpay Integration', () => {
  it('creates order successfully', async () => {
    const paymentService = new PaymentService()
    
    const order = await paymentService.createOrder({
      amount: 1010,
      currency: 'INR',
      bookingId: 'book_123'
    })
    
    expect(order.orderId).toBeDefined()
    expect(order.razorpayOrderId).toBeDefined()
    expect(order.amount).toBe(1010)
  })
  
  it('verifies payment signature', async () => {
    const paymentService = new PaymentService()
    
    const isValid = paymentService.verifyPaymentSignature({
      orderId: 'order_123',
      paymentId: 'pay_123',
      signature: 'valid_signature_hash'
    })
    
    expect(isValid).toBe(true)
  })
  
  it('processes refund successfully', async () => {
    const paymentService = new PaymentService()
    
    const refund = await paymentService.processRefund({
      transactionId: 'txn_123',
      amount: 1010,
      reason: 'Service cancelled'
    })
    
    expect(refund.refundId).toBeDefined()
    expect(refund.status).toBe('processing')
  })
})
```

**5. Load and Performance Tests (k6)**

```javascript
// tests/load/booking-flow.js
import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
  stages: [
    { duration: '2m', target: 100 }, // Ramp up to 100 users
    { duration: '5m', target: 100 }, // Stay at 100 users
    { duration: '2m', target: 0 },   // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests under 500ms
    http_req_failed: ['rate<0.01'],   // Less than 1% failure rate
  },
}

export default function () {
  // Login
  const loginRes = http.post('http://localhost:3000/api/auth/login', {
    email: 'test@example.com',
    password: 'password123',
  })
  
  check(loginRes, {
    'login successful': (r) => r.status === 200,
  })
  
  const token = loginRes.json('data.token')
  
  // Search professionals
  const searchRes = http.get(
    'http://localhost:3000/api/professionals/search?lat=28.6139&lng=77.2090',
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
  
  check(searchRes, {
    'search successful': (r) => r.status === 200,
    'response time OK': (r) => r.timings.duration < 500,
  })
  
  sleep(1)
}
```

**6. Security Tests**

```javascript
// tests/security/auth.spec.js
import { describe, it, expect } from 'vitest'
import request from 'supertest'
import app from '@/app'

describe('Security Tests', () => {
  it('prevents SQL injection in search', async () => {
    const response = await request(app)
      .get('/api/professionals/search')
      .query({ category: "'; DROP TABLE users; --" })
    
    expect(response.status).not.toBe(500)
    // Should sanitize input and return safe results
  })
  
  it('prevents XSS in review comments', async () => {
    const response = await request(app)
      .post('/api/reviews')
      .set('Authorization', `Bearer ${mockToken}`)
      .send({
        bookingId: 'book_123',
        rating: 5,
        comment: '<script>alert("XSS")</script>'
      })
    
    expect(response.status).toBe(201)
    // Comment should be sanitized
    expect(response.body.data.comment).not.toContain('<script>')
  })
  
  it('enforces rate limiting', async () => {
    const requests = []
    
    // Send 100 requests rapidly
    for (let i = 0; i < 100; i++) {
      requests.push(
        request(app).post('/api/auth/login').send({
          email: 'test@example.com',
          password: 'password123'
        })
      )
    }
    
    const responses = await Promise.all(requests)
    const rateLimited = responses.filter(r => r.status === 429)
    
    expect(rateLimited.length).toBeGreaterThan(0)
  })
})
```

### Test Coverage Goals

**Phase 1 (MVP)**
- Unit test coverage: 70%+
- Component coverage: 80%+
- E2E test coverage: All critical user flows
- Accessibility: WCAG 2.1 AA compliance

**Phase 2 (Full Product)**
- Unit test coverage: 80%+
- Integration test coverage: 90%+
- API endpoint coverage: 100%
- Critical path E2E coverage: 100%
- Load test: Support 10,000 concurrent users
- Security: Pass OWASP Top 10 checks

### Continuous Integration

```yaml
# .github/workflows/test.yml
name: Test Suite

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      mongodb:
        image: mongo:6
        ports:
          - 27017:27017
      redis:
        image: redis:7
        ports:
          - 6379:6379
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run unit tests
        run: npm run test:unit
      
      - name: Run integration tests
        run: npm run test:integration
        env:
          MONGODB_URI: mongodb://localhost:27017/test
          REDIS_URL: redis://localhost:6379
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
```



## Upgrade Roadmap: Phase 1 → Phase 2

### Migration Strategy

The transition from MVP to full product follows a systematic approach to minimize disruption and ensure data integrity.

### Step 1: Backend Infrastructure Setup (Week 1-2)

**1.1 Server Setup**
```bash
# Initialize Node.js backend project
mkdir needmeet-backend
cd needmeet-backend
npm init -y
npm install express mongoose dotenv cors helmet morgan winston

# Project structure
mkdir -p src/{config,models,controllers,routes,middleware,services,utils}
```

**1.2 Database Setup**
- Set up MongoDB Atlas cluster or local MongoDB instance
- Create database indexes for optimal query performance
- Set up Redis for caching and session management

**1.3 Environment Configuration**
```env
# .env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/needmeet
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d

# Firebase
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email

# Payment Gateway
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret

# AWS S3
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_BUCKET_NAME=needmeet-uploads
AWS_REGION=ap-south-1

# Twilio
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE=+1234567890

# Frontend URL
FRONTEND_URL=http://localhost:3001
```

### Step 2: API Development (Week 3-6)

**2.1 Authentication Migration**
- Replace Firebase client SDK with Firebase Admin SDK on backend
- Implement JWT token generation and validation
- Add phone verification with Twilio SMS
- Implement refresh token mechanism

**2.2 Core API Endpoints**
- Implement all RESTful endpoints (auth, users, professionals, bookings, payments, reviews)
- Add request validation middleware
- Implement error handling
- Add API rate limiting

**2.3 Database Models**
- Create all Mongoose models with proper schemas
- Add indexes for frequently queried fields
- Implement geospatial indexing for location-based queries

### Step 3: Frontend Migration (Week 7-8)

**3.1 Replace Mock APIs**
```javascript
// Before (Phase 1)
// utils/mockApi.js
export const getProfessionals = async () => {
  const data = await import('~/public/mock-data/professionals.json')
  return data.professionals
}

// After (Phase 2)
// utils/api.js
export const getProfessionals = async (params: SearchParams) => {
  const response = await fetch(`${API_BASE_URL}/api/professionals/search`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
      'Content-Type': 'application/json'
    },
    params
  })
  return response.json()
}
```

**3.2 Update Pinia Stores**
```javascript
// Before (Phase 1)
export const useProfessionalStore = defineStore('professional', {
  actions: {
    async loadProfessionals() {
      this.professionals = await MockAPI.getProfessionals()
    }
  }
})

// After (Phase 2)
export const useProfessionalStore = defineStore('professional', {
  actions: {
    async loadProfessionals(params: SearchParams) {
      const response = await api.getProfessionals(params)
      this.professionals = response.data.professionals
    }
  }
})
```

**3.3 Add Real Location Services**
```javascript
// composables/useLocation.js
export const useLocation = () => {
  const getCurrentLocation = (): Promise<Coordinates> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'))
      }
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => reject(error)
      )
    })
  }
  
  return { getCurrentLocation }
}
```

### Step 4: Real-Time Features (Week 9-10)

**4.1 WebSocket Integration**
```javascript
// Backend: sockets/index.js
import { Server } from 'socket.io'
import { verifyToken } from '../utils/jwt'

export const initializeSocket = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true
    }
  })
  
  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token
    try {
      const user = await verifyToken(token)
      socket.data.user = user
      next()
    } catch (error) {
      next(new Error('Authentication error'))
    }
  })
  
  io.on('connection', (socket) => {
    console.log('User connected:', socket.data.user.id)
    
    socket.on('join_chat', (data) => {
      socket.join(`booking_${data.bookingId}`)
    })
    
    socket.on('send_message', async (data) => {
      // Save message to database
      const message = await Chat.addMessage(data)
      
      // Broadcast to room
      io.to(`booking_${data.bookingId}`).emit('message_received', message)
    })
  })
  
  return io
}
```

```javascript
// Frontend: plugins/socket.client.js
import { io } from 'socket.io-client'

export default defineNuxtPlugin(() => {
  const authStore = useAuthStore()
  
  const socket = io(process.env.API_BASE_URL, {
    auth: {
      token: authStore.token
    }
  })
  
  return {
    provide: {
      socket
    }
  }
})
```

**4.2 Notification System**
```javascript
// services/notificationService.js
import admin from 'firebase-admin'
import twilio from 'twilio'

export class NotificationService {
  private fcm = admin.messaging()
  private smsClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  
  async sendPushNotification(userId: string, notification: NotificationData) {
    const user = await User.findById(userId)
    if (!user.fcmToken) return
    
    await this.fcm.send({
      token: user.fcmToken,
      notification: {
        title: notification.title,
        body: notification.message
      },
      data: notification.data
    })
  }
  
  async sendSMS(phone: string, message: string) {
    await this.smsClient.messages.create({
      to: phone,
      from: process.env.TWILIO_PHONE,
      body: message
    })
  }
}
```

### Step 5: Payment Integration (Week 11-12)

**5.1 Razorpay Setup**
```javascript
// services/paymentService.js
import Razorpay from 'razorpay'
import crypto from 'crypto'

export class PaymentService {
  private razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  })
  
  async createOrder(amount: number, bookingId: string) {
    const order = await this.razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: bookingId,
      notes: {
        bookingId
      }
    })
    
    return order
  }
  
  verifyPaymentSignature(data: PaymentVerificationData): boolean {
    const { orderId, paymentId, signature } = data
    const body = orderId + '|' + paymentId
    
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex')
    
    return expectedSignature === signature
  }
}
```

**5.2 Frontend Payment Integration**
```javascript
// composables/usePayment.js
export const usePayment = () => {
  const processPayment = async (bookingId: string, amount: number) => {
    // Create order on backend
    const { data } = await api.createPaymentOrder({ bookingId, amount })
    
    // Initialize Razorpay
    const options = {
      key: data.key,
      amount: data.amount,
      currency: data.currency,
      order_id: data.razorpayOrderId,
      name: 'NeedMeet',
      description: 'Service Booking Payment',
      handler: async (response: any) => {
        // Verify payment on backend
        await api.verifyPayment({
          orderId: data.orderId,
          paymentId: response.razorpay_payment_id,
          signature: response.razorpay_signature
        })
      },
      prefill: {
        email: user.value.email,
        contact: user.value.phone
      }
    }
    
    const razorpay = new window.Razorpay(options)
    razorpay.open()
  }
  
  return { processPayment }
}
```

### Step 6: Cloud Storage Integration (Week 13)

**6.1 AWS S3 Setup**
```javascript
// services/storageService.js
import AWS from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid'

export class StorageService {
  private s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  })
  
  async uploadFile(file: Express.Multer.File, folder: string): Promise<string> {
    const key = `${folder}/${uuidv4()}-${file.originalname}`
    
    await this.s3.upload({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read'
    }).promise()
    
    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
  }
  
  async deleteFile(url: string): Promise<void> {
    const key = url.split('.com/')[1]
    
    await this.s3.deleteObject({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key
    }).promise()
  }
}
```

**6.2 File Upload Middleware**
```javascript
// middleware/upload.js
import multer from 'multer'

const storage = multer.memoryStorage()

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type'))
    }
  }
})
```

### Step 7: Admin Dashboard (Week 14-15)

**7.1 Admin Routes**
```javascript
// routes/admin.js
import express from 'express'
import { auth, roleCheck } from '../middleware'
import { AdminController } from '../controllers/adminController'

const router = express.Router()

router.use(auth, roleCheck(['admin']))

router.get('/dashboard', AdminController.getDashboard)
router.get('/verifications/pending', AdminController.getPendingVerifications)
router.post('/verifications/:id/approve', AdminController.approveVerification)
router.post('/verifications/:id/reject', AdminController.rejectVerification)
router.get('/disputes', AdminController.getDisputes)
router.post('/disputes/:id/resolve', AdminController.resolveDispute)
router.get('/users', AdminController.getUsers)
router.patch('/users/:id/block', AdminController.blockUser)

export default router
```

### Step 8: Performance Optimization (Week 16)

**8.1 Redis Caching**
```javascript
// services/cacheService.js
import Redis from 'ioredis'

export class CacheService {
  private redis = new Redis(process.env.REDIS_URL)
  
  async get<T>(key: string): Promise<T | null> {
    const data = await this.redis.get(key)
    return data ? JSON.parse(data) : null
  }
  
  async set(key: string, value: any, ttl: number = 3600): Promise<void> {
    await this.redis.setex(key, ttl, JSON.stringify(value))
  }
  
  async del(key: string): Promise<void> {
    await this.redis.del(key)
  }
  
  async clearPattern(pattern: string): Promise<void> {
    const keys = await this.redis.keys(pattern)
    if (keys.length > 0) {
      await this.redis.del(...keys)
    }
  }
}
```

**8.2 Database Indexing**
```javascript
// Run after all models are created
async function createIndexes() {
  await User.createIndexes()
  await Professional.createIndexes()
  await Booking.createIndexes()
  await Transaction.createIndexes()
  await Review.createIndexes()
  
  console.log('All indexes created successfully')
}
```

**8.3 Query Optimization**
```javascript
// Before: N+1 query problem
const bookings = await Booking.find({ customerId })
for (const booking of bookings) {
  booking.professional = await Professional.findById(booking.professionalId)
}

// After: Use populate
const bookings = await Booking.find({ customerId })
  .populate('professionalId')
  .populate('customerId')
  .lean()
```

### Step 9: Testing & QA (Week 17-18)

- Run complete test suite (unit, integration, E2E)
- Perform load testing with k6
- Conduct security audit
- Test payment flows with test credentials
- Verify all WebSocket connections
- Test notification delivery (push, SMS, email)
- Validate file uploads and cloud storage
- Test admin dashboard functionality

### Step 10: Deployment (Week 19-20)

**10.1 Production Environment Setup**
- Set up production MongoDB cluster with replication
- Configure Redis cluster
- Set up AWS S3 bucket with proper permissions
- Configure CDN (CloudFlare)
- Set up load balancer (Nginx)
- Configure SSL certificates
- Set up monitoring (New Relic/Datadog)
- Configure logging aggregation

**10.2 Deployment Checklist**
- [ ] All environment variables configured
- [ ] Database migrations completed
- [ ] Indexes created
- [ ] SSL certificates installed
- [ ] CDN configured
- [ ] Monitoring dashboards set up
- [ ] Backup strategy implemented
- [ ] Disaster recovery plan documented
- [ ] Load balancer configured
- [ ] Rate limiting enabled
- [ ] Security headers configured
- [ ] CORS properly configured

### Data Migration Strategy

**Migrating Mock Data to Real Database**

```javascript
// scripts/migrate-mock-data.js
import { User, Professional, Booking } from './models'
import mockUsers from './mock-data/users.json'
import mockProfessionals from './mock-data/professionals.json'
import mockBookings from './mock-data/bookings.json'

async function migrateData() {
  console.log('Starting data migration...')
  
  // Migrate users
  for (const user of mockUsers) {
    await User.create({
      email: user.email,
      password: await hashPassword('defaultPassword123'),
      phone: user.phone,
      role: user.role,
      name: user.name,
      phoneVerified: true
    })
  }
  
  // Migrate professionals
  for (const prof of mockProfessionals) {
    const user = await User.findOne({ email: prof.email })
    await Professional.create({
      userId: user._id,
      bio: prof.bio,
      category: prof.category,
      services: prof.services,
      verified: true,
      serviceArea: {
        type: 'Point',
        coordinates: [prof.location.lng, prof.location.lat],
        radius: 10
      }
    })
  }
  
  console.log('Data migration completed')
}
```

### Rollback Plan

If issues arise during migration:

1. **Database Rollback**: Restore from backup taken before migration
2. **Code Rollback**: Revert to Phase 1 codebase using Git
3. **DNS Rollback**: Point domain back to Phase 1 deployment
4. **Communication**: Notify users of temporary service interruption

### Post-Migration Monitoring

**Week 1 After Launch**
- Monitor error rates (target: <1%)
- Track API response times (target: <500ms for 95th percentile)
- Monitor database performance
- Track payment success rates (target: >99%)
- Monitor WebSocket connection stability
- Track notification delivery rates

**Week 2-4 After Launch**
- Analyze user feedback
- Identify performance bottlenecks
- Optimize slow queries
- Fine-tune caching strategy
- Adjust rate limits based on usage patterns



## Deployment Architecture

### Phase 1: MVP Deployment

**Hosting Options**
1. **Vercel** (Recommended for Nuxt 3)
   - Zero-config deployment
   - Automatic HTTPS
   - Global CDN
   - Free tier available

2. **Netlify**
   - Similar features to Vercel
   - Good Nuxt 3 support
   - Free tier available

3. **Firebase Hosting**
   - Integrated with Firebase Auth
   - Global CDN
   - Free tier available

**Deployment Steps (Vercel)**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

**Environment Variables (Vercel)**
```
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
```

### Phase 2: Production Deployment Architecture

```
                                    ┌─────────────────┐
                                    │   CloudFlare    │
                                    │      CDN        │
                                    └────────┬────────┘
                                             │
                                    ┌────────▼────────┐
                                    │  Load Balancer  │
                                    │     (Nginx)     │
                                    └────────┬────────┘
                                             │
                        ┌────────────────────┼────────────────────┐
                        │                    │                    │
                ┌───────▼────────┐  ┌───────▼────────┐  ┌───────▼────────┐
                │   App Server   │  │   App Server   │  │   App Server   │
                │   (Node.js)    │  │   (Node.js)    │  │   (Node.js)    │
                └───────┬────────┘  └───────┬────────┘  └───────┬────────┘
                        │                    │                    │
                        └────────────────────┼────────────────────┘
                                             │
                        ┌────────────────────┼────────────────────┐
                        │                    │                    │
                ┌───────▼────────┐  ┌───────▼────────┐  ┌───────▼────────┐
                │    MongoDB     │  │     Redis      │  │    AWS S3      │
                │    Primary     │  │     Cache      │  │  File Storage  │
                └───────┬────────┘  └────────────────┘  └────────────────┘
                        │
                ┌───────▼────────┐
                │    MongoDB     │
                │   Secondary    │
                └────────────────┘
```

### Infrastructure Components

**1. Application Servers**
```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=${MONGODB_URI}
      - REDIS_URL=${REDIS_URL}
    depends_on:
      - mongodb
      - redis
    restart: always
    deploy:
      replicas: 3
      resources:
        limits:
          cpus: '1'
          memory: 1G

  mongodb:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    restart: always

  redis:
    image: redis:7
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: always

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    restart: always

volumes:
  mongodb_data:
  redis_data:
```

**2. Nginx Load Balancer Configuration**
```nginx
# nginx.conf
upstream backend {
    least_conn;
    server app1:3000;
    server app2:3000;
    server app3:3000;
}

server {
    listen 80;
    server_name needmeet.com www.needmeet.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name needmeet.com www.needmeet.com;

    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss;

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;
    limit_req zone=api_limit burst=20 nodelay;

    location / {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # WebSocket support
    location /socket.io/ {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Static files caching
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**3. MongoDB Replication Setup**
```javascript
// Initialize replica set
rs.initiate({
  _id: "needmeet-rs",
  members: [
    { _id: 0, host: "mongodb-primary:27017", priority: 2 },
    { _id: 1, host: "mongodb-secondary1:27017", priority: 1 },
    { _id: 2, host: "mongodb-secondary2:27017", priority: 1 }
  ]
})
```

**4. Redis Cluster Configuration**
```conf
# redis.conf
cluster-enabled yes
cluster-config-file nodes.conf
cluster-node-timeout 5000
appendonly yes
maxmemory 2gb
maxmemory-policy allkeys-lru
```

### CI/CD Pipeline

**GitHub Actions Workflow**
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Run linter
        run: npm run lint

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build Docker image
        run: docker build -t needmeet-backend:${{ github.sha }} .
      
      - name: Push to Docker Hub
        run: |
          echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
          docker push needmeet-backend:${{ github.sha }}

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to production
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.PRODUCTION_HOST }}
          username: ${{ secrets.PRODUCTION_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /var/www/needmeet
            docker-compose pull
            docker-compose up -d
            docker system prune -f
```

### Monitoring and Logging

**1. Application Monitoring (New Relic)**
```javascript
// app.js
import newrelic from 'newrelic'

// New Relic will automatically instrument the application
```

**2. Logging Configuration (Winston)**
```javascript
// utils/logger.js
import winston from 'winston'

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'needmeet-backend' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
})
```

**3. Health Check Endpoint**
```javascript
// routes/health.js
import express from 'express'
import mongoose from 'mongoose'
import redis from '../config/redis'

const router = express.Router()

router.get('/health', async (req, res) => {
  const health = {
    uptime: process.uptime(),
    timestamp: Date.now(),
    status: 'OK',
    checks: {
      database: 'unknown',
      redis: 'unknown'
    }
  }

  try {
    // Check MongoDB
    if (mongoose.connection.readyState === 1) {
      health.checks.database = 'connected'
    } else {
      health.checks.database = 'disconnected'
      health.status = 'ERROR'
    }

    // Check Redis
    await redis.ping()
    health.checks.redis = 'connected'
  } catch (error) {
    health.checks.redis = 'disconnected'
    health.status = 'ERROR'
  }

  const statusCode = health.status === 'OK' ? 200 : 503
  res.status(statusCode).json(health)
})

export default router
```

**4. Metrics Dashboard (Grafana)**
```yaml
# docker-compose.monitoring.yml
version: '3.8'

services:
  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus

  grafana:
    image: grafana/grafana
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana_data:/var/lib/grafana
    depends_on:
      - prometheus

volumes:
  prometheus_data:
  grafana_data:
```

### Backup Strategy

**1. Database Backups**
```bash
#!/bin/bash
# scripts/backup-mongodb.sh

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/mongodb"
MONGODB_URI="mongodb://localhost:27017"
DATABASE_NAME="needmeet"

# Create backup
mongodump --uri="$MONGODB_URI" --db="$DATABASE_NAME" --out="$BACKUP_DIR/$TIMESTAMP"

# Compress backup
tar -czf "$BACKUP_DIR/$TIMESTAMP.tar.gz" -C "$BACKUP_DIR" "$TIMESTAMP"
rm -rf "$BACKUP_DIR/$TIMESTAMP"

# Upload to S3
aws s3 cp "$BACKUP_DIR/$TIMESTAMP.tar.gz" "s3://needmeet-backups/mongodb/"

# Keep only last 30 days of backups
find "$BACKUP_DIR" -name "*.tar.gz" -mtime +30 -delete

echo "Backup completed: $TIMESTAMP"
```

**2. Automated Backup Schedule (Cron)**
```cron
# Run daily at 2 AM
0 2 * * * /var/www/needmeet/scripts/backup-mongodb.sh >> /var/log/backup.log 2>&1
```

### Disaster Recovery Plan

**Recovery Time Objective (RTO)**: 4 hours  
**Recovery Point Objective (RPO)**: 24 hours

**Recovery Steps**
1. Restore MongoDB from latest backup
2. Restore Redis cache (optional, will rebuild)
3. Deploy application from last known good commit
4. Verify all services are running
5. Run smoke tests
6. Update DNS if needed
7. Monitor for issues

### Scaling Strategy

**Horizontal Scaling**
- Add more application server instances behind load balancer
- Use MongoDB sharding for database scaling
- Implement Redis cluster for cache scaling

**Vertical Scaling**
- Increase server resources (CPU, RAM)
- Optimize database queries and indexes
- Implement more aggressive caching

**Auto-Scaling Configuration (AWS)**
```yaml
# Auto-scaling policy
ScalingPolicy:
  Type: AWS::AutoScaling::ScalingPolicy
  Properties:
    AutoScalingGroupName: !Ref AppServerGroup
    PolicyType: TargetTrackingScaling
    TargetTrackingConfiguration:
      PredefinedMetricSpecification:
        PredefinedMetricType: ASGAverageCPUUtilization
      TargetValue: 70.0
```

### Security Hardening

**1. Firewall Rules**
```bash
# Allow only necessary ports
ufw allow 22/tcp   # SSH
ufw allow 80/tcp   # HTTP
ufw allow 443/tcp  # HTTPS
ufw enable
```

**2. SSL/TLS Configuration**
```bash
# Install Certbot for Let's Encrypt
sudo apt-get install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d needmeet.com -d www.needmeet.com

# Auto-renewal
sudo certbot renew --dry-run
```

**3. Environment Variables Security**
```bash
# Use secrets management
# AWS Secrets Manager, HashiCorp Vault, or encrypted .env files

# Never commit .env to version control
echo ".env" >> .gitignore
```

**4. Database Security**
```javascript
// Enable authentication
use admin
db.createUser({
  user: "needmeet_admin",
  pwd: "strong_password_here",
  roles: [ { role: "readWrite", db: "needmeet" } ]
})

// Enable encryption at rest
mongod --enableEncryption --encryptionKeyFile /path/to/keyfile
```

### Cost Optimization

**Phase 1 (MVP)**
- Vercel/Netlify: Free tier
- Firebase Auth: Free tier (up to 10k users)
- Total: $0/month

**Phase 2 (Production - Estimated)**
- AWS EC2 (3 t3.medium instances): $75/month
- MongoDB Atlas (M10 cluster): $60/month
- Redis Cloud (1GB): $15/month
- AWS S3 + CloudFront: $20/month
- Twilio SMS: $50/month (estimated)
- Domain + SSL: $15/month
- Monitoring (New Relic): $99/month
- **Total: ~$334/month**

**Optimization Tips**
- Use reserved instances for predictable workloads (30-50% savings)
- Implement aggressive caching to reduce database queries
- Use CDN for static assets
- Compress images before upload
- Monitor and optimize slow queries
- Use spot instances for non-critical workloads

