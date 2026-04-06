# AssignBridge Frontend

## Project Overview

**AssignBridge** is a smart assignment management platform built with Next.js 16 (App Router). It provides role-based dashboards for three user types: **Admin**, **Teacher**, and **Student**. The platform enables managing classes, creating/publishing assignments, submitting work, and grading.

### Tech Stack

| Category                | Technology                        |
| ----------------------- | --------------------------------- |
| **Framework**           | Next.js 16 (App Router, React 19) |
| **Language**            | TypeScript 5                      |
| **Styling**             | Tailwind CSS v4                   |
| **UI Components**       | shadcn/ui (radix-nova style)      |
| **Icons**               | Lucide React                      |
| **Animations**          | Framer Motion                     |
| **Charts**              | Recharts                          |
| **State/Data Fetching** | TanStack React Query v5           |
| **Forms**               | React Hook Form + Zod validation  |
| **Theme**               | next-themes (dark/light mode)     |

### Architecture

```
app/
  (auth)/          # Authentication routes (login, signup)
  (dashboard)/     # Protected dashboard area
    admin/         # Admin-specific pages
    teacher/       # Teacher-specific pages
    student/       # Student-specific pages
    dashboard/     # Shared dashboard
    profile/       # User profile
  (marketing)/     # Public/marketing pages
  layout.tsx       # Root layout with ThemeProvider
  globals.css      # Global styles + Tailwind config

components/
  app-shell/       # Header and shell components
  assignments/     # Assignment-related UI
  auth/            # Authentication forms
  layout/          # Sidebar, Topbar
  providers/       # React context providers
  shared/          # Shared UI (status badges, etc.)
  ui/              # shadcn/ui base components

lib/
  api/             # API client functions (fetch-based)
  data/            # Static/mock data
  hooks/queries/   # TanStack Query hooks
  types/           # TypeScript type definitions
  validations/     # Zod schemas
  utils.ts         # cn() class merge utility
```

## Key Concepts

### Role-Based Access

The app supports three roles defined in `lib/types/user.ts`:

- **admin** — Full system access
- **teacher** — Create/manage assignments and grade submissions
- **student** — View and submit assignments

Roles are stored in `localStorage` (`user` key) and read by the dashboard layout to render role-specific sidebar navigation and header badges.

### API Communication

- API base URL: `NEXT_PUBLIC_API_URL` env var, defaults to `http://localhost:8080/api`
- Auth token stored in `localStorage` under `auth_token`
- API clients in `lib/api/` use a typed `request<T>()` helper that attaches Bearer tokens
- TanStack Query hooks in `lib/hooks/queries/` wrap the API clients

### Route Protection

`proxy.ts` (middleware) protects routes:

- Public routes: `/`, `/login`, `/signup`, `/forgot-password`
- All other routes require `auth_token` cookie or Authorization header
- Redirects unauthenticated users to `/login` with a `redirect` query param

## Building and Running

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

## Development Conventions

- **Strict TypeScript** — `strict: true` in tsconfig; all files use `.ts`/`.tsx`
- **Path aliases** — `@/*` maps to project root (e.g., `@/lib/utils`)
- **shadcn/ui** — UI components follow shadcn conventions; new components added via `npx shadcn@latest add <component>`
- **Tailwind v4** — Uses new CSS `@theme` directive instead of config file; design tokens in `globals.css`
- **cn() utility** — Use `cn()` from `@/lib/utils` for conditional class merging
- **Client components** — Marked with `"use client"` directive; interactive components (hooks, state, effects) must be client components
- **React Query** — Use hooks from `lib/hooks/queries/` for data fetching instead of raw `fetch` in components

## Notable Files

| File                         | Purpose                                                |
| ---------------------------- | ------------------------------------------------------ |
| `app/layout.tsx`             | Root layout with fonts, ThemeProvider, ClientProviders |
| `app/(dashboard)/layout.tsx` | Dashboard shell with Sidebar + Topbar                  |
| `lib/api/assignments.ts`     | Typed API client for assignments CRUD                  |
| `lib/types/assignment.ts`    | Core types: Assignment, Submission, User, etc.         |
| `lib/utils.ts`               | `cn()` class merge utility                             |
| `proxy.ts`                   | Middleware for route protection                        |
| `components.json`            | shadcn/ui configuration                                |
