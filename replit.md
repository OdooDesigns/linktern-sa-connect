# Linktern - Internship Marketplace Platform

## Overview

Linktern is a modern internship marketplace platform connecting students with employers in Saudi Arabia. The application is built as a full-stack web application using a React frontend with Express.js backend, featuring a clean, professional design system with blue accents.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: React Context API for authentication, TanStack Query for server state
- **UI Framework**: Custom design system built on Radix UI primitives with Tailwind CSS
- **Build Tool**: Vite for development and production builds
- **Styling**: Tailwind CSS with CSS variables for theming

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development**: Hot reloading with Vite middleware integration
- **Storage**: In-memory storage implementation with interface for future database integration

### Database Architecture
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema**: Centralized schema definitions in `/shared/schema.ts`
- **Migrations**: Drizzle Kit for database migrations
- **Current State**: Uses in-memory storage with database interface ready for implementation

## Key Components

### Authentication System
- Context-based authentication with localStorage persistence
- Role-based access control (student/employer)
- Protected routes with role-specific redirects
- Mock authentication for development/demo purposes

### User Interface Components
- Comprehensive UI component library based on shadcn/ui
- Responsive design with mobile-first approach
- Custom design tokens following a professional blue color scheme
- Accessible components using Radix UI primitives

### Routing and Navigation
- Client-side routing with Wouter
- Role-based navigation menus
- Protected route wrapper components
- 404 error handling

### Forms and Validation
- React Hook Form integration
- Zod schema validation
- Type-safe form handling
- Consistent error messaging

## Data Flow

### Authentication Flow
1. User submits login/register form
2. AuthContext validates credentials (currently mock implementation)
3. User data stored in localStorage and context
4. Protected routes check authentication status
5. Navigation updates based on user role

### Application State
- Global auth state managed through React Context
- Server state managed with TanStack Query
- Local component state for UI interactions
- Form state managed by React Hook Form

### API Communication
- REST API structure ready for implementation
- Centralized API routes in `/server/routes.ts`
- Storage interface abstraction for easy database integration

## External Dependencies

### UI and Styling
- Radix UI for accessible primitive components
- Tailwind CSS for utility-first styling
- Lucide React for consistent iconography
- Class Variance Authority for component variants

### Development Tools
- Vite for fast development and building
- TypeScript for type safety
- ESLint and Prettier configurations (implied)
- Replit-specific development tooling

### Database and ORM
- Drizzle ORM for type-safe database operations
- Neon Database serverless for PostgreSQL hosting
- Drizzle Kit for schema management and migrations

### Authentication (Ready for Implementation)
- Interface prepared for session management
- Type definitions for user roles and profiles
- Storage abstraction for user data

## Deployment Strategy

### Development Environment
- Vite development server with HMR
- Express server with middleware integration
- In-memory storage for rapid prototyping
- Environment variable configuration

### Production Build
- Vite builds optimized React bundle
- esbuild compiles server code
- Static assets served from Express
- Environment-based configuration

### Database Integration (Planned)
- PostgreSQL database with Drizzle ORM
- Environment variable for database URL
- Migration system for schema changes
- Connection pooling for production

### Key Architectural Decisions

1. **Monorepo Structure**: Single repository with shared types and schemas between client and server
2. **Type Safety**: Full TypeScript implementation with shared type definitions
3. **Component Architecture**: Atomic design with reusable UI components
4. **Storage Abstraction**: Interface-based storage design allowing easy transition from in-memory to database
5. **Role-Based Design**: Clear separation between student and employer user flows
6. **Mobile-First**: Responsive design with mobile optimization
7. **Development Experience**: Hot reloading and fast development feedback loops

The application is currently in a development-ready state with mock data and in-memory storage, designed to easily integrate with a PostgreSQL database when deployed to production.