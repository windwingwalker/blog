# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js blog application (windwingwalker.xyz) with a TypeScript frontend, Material UI components, and AWS backend integration. The app features articles, authentication, a dashboard, and responsive design for different screen sizes.

## Build & Development Commands

```bash
# Development (runs on http://localhost:3000)
npm run dev

# Production build
npm run build

# Production server
npm run start

# Linting
npm run lint
```

**Node Version**: Requires Node.js >=24.12.0

## Architecture Overview

### State Management (Redux Toolkit)

Global state is managed in `shared/store.tsx` with three slices:
- `pathSlice`: Current page path tracking
- `userSlice`: User authentication state
- `articleSlice`: Article data state

Access state using typed hooks from `shared/hooks.tsx`:
```typescript
import { useAppDispatch, useAppSelector } from '../shared/hooks';
```

### Responsive Design System

The app uses a three-tier responsive system defined in `shared/constant.tsx`:
- **Small screens**: ≤768px (mobile)
- **Middle screens**: 769px-1023px (tablet)
- **Large screens**: ≥1024px (desktop)

Use the custom hooks from `functions/common.tsx`:
```typescript
const isSmallScreen = useSmallScreen();
const isMiddleScreen = useMiddleScreen();
const isLargeScreen = useLargeScreen();
```

UI behavior:
- Large screens: Persistent drawer + app bar
- Middle screens: Speed dial navigation
- Small screens: Minimal padding, no drawer

### Navigation System

Navigation configuration is centralized in `shared/constant.tsx` via `PAGE_NAV_MAPPING`. Each route has:
- `path`: URL path
- `navDisplayName`: Menu label
- `pageHeadingDisplayName`: Page header
- `icon`: Material UI icon
- `visibility`: "both", "admin", or "guest"

The drawer (`components/nav/drawer.tsx`) and speed dial (`components/nav/speedDial.tsx`) dynamically render based on this config and user state.

### AWS Integration

AWS services (S3, SSM, Cognito, SQS) are accessed via `functions/common.tsx` and `functions/auth.tsx`.

**Important**: AWS credentials use non-standard env var names due to Vercel limitations:
- `REACT_APP_AWS_ACCESS_KEY_ID` (not `AWS_ACCESS_KEY_ID`)
- `REACT_APP_AWS_SECRET_ACCESS_KEY` (not `AWS_SECRET_ACCESS_KEY`)

Common pattern for fetching data from S3:
```typescript
import { getJSONInJSObjectFromS3 } from '../functions/common';
const data = await getJSONInJSObjectFromS3('filename.json');
```

### API Routes

Next.js API routes (`pages/api/`) act as proxies to backend services:
- `article-reader-count.ts`: Tracks article views
- `asset-overview.ts`: Financial dashboard data

These routes forward requests to `api.windwingwalker.xyz` endpoints defined in `shared/constant.tsx`.

### Dynamic Routing

Article pages use Next.js dynamic routing:
- `pages/articles/index.tsx`: Article list page
- `pages/articles/[firstPublished].tsx`: Individual article page (uses publication date as slug)

### Theme & Styling

Material UI theme is configured in `shared/theme.tsx`. Custom colors defined in `shared/constant.tsx`:
- `JADEIITE`: #30716c (primary accent)
- `SAND`: #f4eddf (background)
- `CARBON`: #222222 (dark text)
- `MILK`: #f5f5f5 (light text)

Global styles in `styles/globals.css` and nprogress loader in `styles/nprogress.css`.

### Security Headers

`next.config.js` configures security headers:
- CSP (Content Security Policy)
- HSTS (Strict Transport Security)
- X-Frame-Options
- X-Content-Type-Options

All headers are applied to routes via `windwingwalker.xyz` domain.

## Folder Structure

- `pages/`: Next.js pages (file-based routing) and API routes
- `components/`: React UI components (presentational, no business logic)
- `functions/`: Pure functions for business logic (AWS, auth, utilities)
- `models/`: TypeScript type definitions (Article, Asset, User)
- `shared/`: Global state (Redux), constants, theme, hooks
- `data/`: Static JSON data (announcements, changelog)
- `public/`: Static assets (images, favicon)
- `styles/`: CSS files

## Key Patterns

### Component File Extensions
All component files use `.tsx` extension, even in `shared/` and `functions/`. This is unconventional but consistent across the codebase.

### Import Paths
Always use relative imports (e.g., `'../shared/constant'`). No path aliases are configured.

### Data Fetching
- Static data: Import from `data/` directory
- Backend data: Use API routes in `pages/api/` which proxy to backend
- AWS data: Use functions from `functions/common.tsx`

### Authentication
Login state managed in `userSlice.tsx`. Auth functions in `functions/auth.tsx` interact with AWS Cognito.

## Environment Variables

Follow Next.js conventions:
- `.env.development.local` (gitignored): Secrets for local dev
- `.env.development`: Non-secret defaults for dev
- `.env.production`: Non-secret defaults for production
- Vercel dashboard: Production secrets

`NODE_ENV` is set in package.json scripts and determines which env file loads.
