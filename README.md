# PropertyOS - Frontend Application

## 🏗️ Overview

This is the frontend application for GreyZone PropertyOS - an advanced, enterprise-grade Property Management Operating System built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript 5.0+
- **Styling**: Tailwind CSS + shadcn/ui
- **Components**: Radix UI primitives
- **Animation**: Framer Motion
- **State**: Zustand
- **Forms**: React Hook Form + Zod
- **API**: Axios with React Query
- **Charts**: Recharts

## 📁 Project Structure

```
property-management-frontend/
├── app/                    # Next.js 14 App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── components/            # Reusable components
├── lib/                   # Utilities & configurations
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript definitions
├── public/               # Static assets
└── package.json          # Dependencies
```

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+ LTS
- npm or pnpm

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks
- `npm test` - Run tests

## 🔗 API Integration

This frontend connects to the backend API at:
- Development: `http://localhost:3001`
- Production: `https://api.propertyos.com`

## 🎨 Design System

Following Apple-inspired design principles with:
- Professional color palette
- Consistent spacing and typography
- Smooth animations and micro-interactions
- Mobile-first responsive design
- Accessibility compliance (WCAG 2.1 AA)

## 🏢 User Roles

- **Landlord**: Property portfolio management
- **Manager**: Day-to-day operations
- **Tenant**: Rent payments and requests
- **Vendor**: Maintenance and services

## 📱 Features

### Core Functionality
- Property portfolio management
- Tenant lifecycle management
- Maintenance request system
- Payment processing
- Vendor marketplace
- Real-time communication
- Financial reporting

### Advanced Features
- AI-powered vendor matching
- Predictive maintenance alerts
- Executive dashboards
- Mobile-responsive design
- Progressive Web App

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Deploy to Vercel
vercel --prod
```

### Docker
```bash
# Build Docker image
docker build -t propertyos-frontend .

# Run container
docker run -p 3000:3000 propertyos-frontend
```

## 🔧 Environment Variables

Create `.env.local` file:
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
NEXT_PUBLIC_APP_ENV=development
```

## 📄 License

Proprietary software owned by Caulcrick Investments Group