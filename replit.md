# Safar Saarthi - Tourist Safety Application

## Overview

Safar Saarthi is a proactive tourist safety ecosystem built as a full-stack web application. The app provides real-time safety alerts, emergency assistance, location sharing, and safety tips for travelers. It features a mobile-first design with components for safety mapping, SOS functionality, digital tourist ID generation, and comprehensive safety information management.

The application is designed to help tourists stay safe by providing location-based safety information, emergency contacts, real-time alerts, and quick access to emergency services. It includes both user-facing features and administrative capabilities for managing safety data.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite build system
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom design system based on travel and safety app patterns
- **State Management**: TanStack Query for server state management and React hooks for local state
- **Routing**: Wouter for lightweight client-side routing
- **Mobile-First Design**: Responsive design optimized for mobile devices with bottom navigation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Session Management**: Express sessions with PostgreSQL store
- **Authentication**: Replit Auth integration with OpenID Connect

### Database Design
- **Primary Database**: PostgreSQL with Neon serverless hosting
- **Schema Management**: Drizzle migrations for version control
- **Core Tables**:
  - `users` - User authentication and profile data
  - `safety_alerts` - Real-time safety warnings and notifications
  - `safety_tips` - Educational safety content categorized by type
  - `emergency_contacts` - Location-based emergency service information
  - `user_preferences` - Personalized user settings and preferences
  - `sessions` - Authentication session storage

### Key Features
- **Emergency SOS System**: One-tap emergency assistance with location sharing
- **Safety Mapping**: Interactive map showing safe zones, risk areas, and emergency services
- **Real-time Alerts**: Location-based safety notifications and warnings
- **Digital Tourist ID**: QR code generation for tourist identification
- **Safety Tips Library**: Categorized safety advice and travel guidelines
- **User Preferences**: Customizable settings for notifications and language

### Design System
- **Color Palette**: Safety-focused colors (Safety Red, Trust Blue, Success Green)
- **Typography**: Inter font family for optimal readability
- **Components**: Travel app-inspired design with emergency service accessibility
- **Layout**: Mobile-first with consistent spacing (4, 8, 16, 24px units)

### Security & Authentication
- **Authentication Provider**: Replit Auth with OpenID Connect
- **Session Security**: Secure session cookies with PostgreSQL storage
- **API Protection**: Authenticated routes for sensitive operations
- **Data Validation**: Type-safe schema validation with Drizzle and Zod

## External Dependencies

### Core Infrastructure
- **Database**: Neon PostgreSQL serverless database
- **Authentication**: Replit Auth service for user authentication
- **Build Tools**: Vite for frontend bundling and development server

### Frontend Libraries
- **UI Framework**: React 18 with TypeScript
- **Component Library**: Radix UI primitives with Shadcn/ui components
- **Styling**: Tailwind CSS with PostCSS processing
- **State Management**: TanStack Query for API data management
- **Routing**: Wouter for lightweight client-side navigation
- **QR Code Generation**: qrcode library for digital ID functionality
- **Date Handling**: date-fns for date manipulation

### Backend Dependencies
- **Web Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL adapter
- **Session Management**: express-session with connect-pg-simple
- **Authentication**: passport with openid-client for Replit Auth
- **HTTP Client**: Built-in fetch for API requests

### Development Tools
- **TypeScript**: For type safety across the application
- **ESBuild**: For server-side bundling in production
- **PostCSS**: For CSS processing and optimization
- **Development Server**: Vite dev server with HMR support