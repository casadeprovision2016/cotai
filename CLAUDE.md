# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **Neuro-IA MVP** - a full-stack AI-powered platform for Brazilian public procurement document processing and management. The system consists of two main applications:

1. **Frontend** (`frontend/`) - Next.js 15 application with React 19
2. **AI Service** (documented in `ai-service.md`) - FastAPI backend with advanced document processing capabilities
3. **Example User Management** (`exemplo-user-management/`) - Supabase authentication reference implementation

## Development Commands

### Frontend Development
```bash
cd frontend/
npm run dev          # Start development server with Turbopack
npm run build        # Build for production with Turbopack
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Example User Management
```bash
cd exemplo-user-management/
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run Next.js lint
```

## Architecture Overview

### Frontend Stack
- **Next.js 15.5.2** with App Router and Turbopack
- **React 19.1.0** with latest features
- **TypeScript 5** for type safety
- **Tailwind CSS 4** for styling
- **ESLint 9** with Next.js configuration

### Authentication & Database
- **Supabase** for authentication, database, and storage
- **PostgreSQL** with Row Level Security (RLS)
- **Real-time subscriptions** for collaborative features

### AI Processing Pipeline
- **FastAPI** backend with async processing
- **Ollama + Llama 3.2** for local LLM inference
- **Docling (IBM) + EasyOCR** for document OCR
- **Milvus** vector database for RAG system
- **MinIO** for secure document storage

## Key Architectural Patterns

### Frontend Architecture
- **App Router** with file-based routing in `src/app/`
- **Server/Client Components** separation
- **Middleware** for authentication and route protection
- **API Routes** as proxies to AI service (security boundary)

### Authentication Flow
- **Supabase Auth** with email/password and magic links
- **HttpOnly cookies** for SSR sessions
- **JWT tokens** for API authentication
- **Role-based access control (RBAC)** with company-based permissions

### Document Processing Pipeline
1. **Upload** → Secure file validation and storage
2. **OCR** → Multi-engine text extraction (Docling → EasyOCR fallback)
3. **Classification** → AI-powered document type detection
4. **Extraction** → Structured data extraction from text
5. **Risk Analysis** → Compliance and legal risk scoring
6. **Indexing** → Vector embeddings for semantic search

### Key Components and Services

#### Frontend Services (`src/services/`)
- `supabaseService.ts` - Database operations
- `aiProcessingService.ts` - AI pipeline orchestration
- `secureStorageService.ts` - File upload with encryption
- `rbacService.ts` - Role-based access control
- `databaseChecker.ts` - Database health checks

#### Core Features
- **CotAI Kanban** - Drag-and-drop quotation management
- **NLIC Search** - PNCP integration for public procurement data
- **User Management** - Company registration with document validation
- **Real-time Sync** - Collaborative updates via Supabase Realtime

## Development Patterns

### Component Structure
- Use **Server Components** by default for data fetching
- Mark components as `"use client"` only when needed for interactivity
- Implement proper loading and error boundaries
- Follow **mobile-first** responsive design

### Data Flow
- **Server Actions** for mutations
- **Supabase Client** for real-time subscriptions
- **API Routes** for external service integration (PNCP, AI service)
- **React Query/SWR** for client-side caching (when implemented)

### Security Practices
- Never expose `service_role` keys in frontend
- Use **signed URLs** for file uploads to Supabase Storage
- Implement **rate limiting** on public endpoints
- Validate all inputs both client and server-side
- Use **RLS policies** for data access control

## Key Integrations

### PNCP (Brazilian Public Procurement Portal)
- Proxy all PNCP API calls through Next.js API routes
- Implement caching and rate limiting
- Handle date format conversions (YYYYMMDD)
- Support advanced filtering and pagination

### Supabase Configuration
- **Database**: PostgreSQL with RLS enabled
- **Auth**: Email/password with customizable email templates
- **Storage**: Private buckets with signed URL access
- **Realtime**: For collaborative features

### AI Service Integration
- All AI operations proxied through `/api/ai-proxy/**`
- Async processing with status polling
- Multi-step document analysis pipeline
- RAG system for intelligent document queries

## Database Schema Essentials

### Core Tables
- `users` - Supabase auth users
- `companies` - Business entity registration
- `company_members` - User-company relationships with roles
- `boards`, `lists`, `cards` - Kanban structure
- `documents`, `attachments` - File management
- `audit_log` - Comprehensive activity tracking

### Security Policies
All tables use **Row Level Security** with policies based on:
- Company membership verification
- User role permissions
- Data visibility rules

## Testing Strategy

### Frontend Testing
- Use **Jest + React Testing Library** for unit tests
- **Playwright** for E2E testing (when implemented)
- **Storybook** for component documentation (when implemented)

### API Testing
- **pytest** for AI service testing
- **Supabase local development** for database testing

## Environment Configuration

### Required Environment Variables
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# AI Service
AI_SERVICE_BASE_URL=http://localhost:8000
AI_SERVICE_API_KEY=your-ai-service-key

# Application
NEXTAUTH_SECRET=your-nextauth-secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Common Development Tasks

### Adding New Features
1. Design database schema changes with RLS policies
2. Create API routes for external service integration
3. Implement server actions for data mutations
4. Build UI components with proper TypeScript types
5. Add client-side validation with server-side enforcement

### File Upload Flow
1. Request signed upload URL from `/api/storage/signed-url`
2. Upload directly to Supabase Storage
3. Trigger server-side processing via webhook/API
4. Update database with file metadata and processing status

### Authentication Integration
1. Use `useAuth` hook for client-side auth state
2. Implement `useAccessControl` for permission checking
3. Protect API routes with middleware
4. Use server-side auth for SSR pages

## Code Conventions

### TypeScript
- Strict mode enabled
- Use interfaces for object shapes
- Implement proper error handling with custom exceptions
- Leverage Next.js built-in TypeScript support

### Styling
- **Tailwind CSS** with design system approach
- Responsive design with mobile-first methodology
- Dark mode support (when implemented)
- Consistent spacing and typography scales

### Error Handling
- Comprehensive error boundaries in React
- Structured error responses from API routes
- User-friendly error messages with actionable feedback
- Proper logging for debugging and monitoring

## Deployment Considerations

### Production Checklist
- Environment variables properly configured
- Database migrations applied
- AI service health checks passing
- CDN configured for static assets
- SSL certificates installed
- Monitoring and alerting configured

### Performance Optimization
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Database query optimization
- Caching strategy for API responses
- Bundle size monitoring

This project follows modern full-stack development practices with a focus on security, scalability, and user experience in the Brazilian public procurement domain.