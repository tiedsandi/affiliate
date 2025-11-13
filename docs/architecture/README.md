# Architecture Documentation

## 🏗️ System Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                          USERS                                   │
│  (Website Visitors)              (Admin/Content Creator)         │
└────────────┬───────────────────────────────┬────────────────────┘
             │                               │
             │                               │
    ┌────────▼────────┐            ┌────────▼────────┐
    │  Public Website  │            │  Admin Dashboard │
    │   (Next.js SSR)  │            │   (Next.js CSR)  │
    └────────┬─────────┘            └────────┬─────────┘
             │                               │
             └───────────────┬───────────────┘
                             │
                    ┌────────▼────────┐
                    │   API Routes    │
                    │  (Next.js API)  │
                    └────────┬────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
   ┌────▼────┐        ┌──────▼──────┐      ┌────▼────┐
   │ Prisma  │        │  AI Service │      │ Scraper │
   │   ORM   │        │  (OpenAI)   │      │ Service │
   └────┬────┘        └─────────────┘      └────┬────┘
        │                                        │
   ┌────▼─────┐                          ┌──────▼──────┐
   │ SQLite/  │                          │  External   │
   │PostgreSQL│                          │    APIs     │
   └──────────┘                          │ • Shopee    │
                                         │ • TikTok    │
                                         │ • Twitter   │
                                         └─────────────┘
```

## 🎯 Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **State Management**: React Context + Server Components
- **Forms**: React Hook Form + Zod
- **HTTP Client**: Native fetch (Server Actions)

### Backend
- **Runtime**: Node.js
- **Framework**: Next.js API Routes
- **Database**: SQLite (dev) → PostgreSQL (production)
- **ORM**: Prisma
- **Validation**: Zod
- **Authentication**: JWT + Environment Variables

### AI & Automation
- **LLM**: OpenAI GPT-4 (for content & analysis)
- **Web Scraping**: Puppeteer / Playwright
- **Image Processing**: Sharp
- **Cron Jobs**: Node-cron / Vercel Cron

### Infrastructure (Production)
- **Hosting**: Vercel
- **Database**: Supabase (PostgreSQL)
- **Storage**: Cloudinary (images)
- **CDN**: Vercel Edge Network
- **Analytics**: Vercel Analytics
- **Monitoring**: Sentry (error tracking)

## 📂 Project Structure

```
affiliate-shopee-tiktok/
├── app/                          # Next.js App Router
│   ├── (public)/                 # Public pages (layout wrapper)
│   │   ├── page.tsx              # Homepage
│   │   ├── products/
│   │   │   ├── page.tsx          # Products listing
│   │   │   └── [slug]/           # Product detail
│   │   │       └── page.tsx
│   │   ├── search/               # Search page
│   │   ├── categories/           # Category pages
│   │   └── compare/              # Comparison tool
│   │
│   ├── admin/                    # Admin dashboard (protected)
│   │   ├── layout.tsx            # Admin layout
│   │   ├── page.tsx              # Dashboard home
│   │   ├── products/             # Product management
│   │   ├── scraper/              # Scraping tools
│   │   ├── content/              # Content generator
│   │   ├── twitter/              # Twitter scheduler
│   │   └── analytics/            # Analytics dashboard
│   │
│   ├── api/                      # API Routes
│   │   ├── products/             # Product endpoints
│   │   ├── search/               # Search endpoint
│   │   ├── admin/                # Admin endpoints
│   │   ├── webhooks/             # Webhook handlers
│   │   └── cron/                 # Scheduled jobs
│   │
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
│
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   ├── layout/                   # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── products/                 # Product components
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── PriceComparison.tsx
│   │   └── ReviewList.tsx
│   ├── search/                   # Search components
│   │   ├── SearchBar.tsx
│   │   └── FilterPanel.tsx
│   └── admin/                    # Admin components
│       ├── Sidebar.tsx
│       └── StatsCard.tsx
│
├── lib/                          # Utility libraries
│   ├── db.ts                     # Prisma client
│   ├── utils.ts                  # Helper functions
│   ├── api/                      # API utilities
│   │   ├── products.ts           # Product queries
│   │   ├── search.ts             # Search logic
│   │   └── analytics.ts          # Analytics helpers
│   ├── scraper/                  # Web scraping
│   │   ├── shopee.ts
│   │   └── tiktok.ts
│   ├── ai/                       # AI services
│   │   ├── openai.ts             # OpenAI client
│   │   ├── analyze-reviews.ts   # Review analysis
│   │   └── generate-content.ts  # Content generation
│   ├── twitter/                  # Twitter integration
│   │   ├── client.ts
│   │   └── scheduler.ts
│   └── validators/               # Zod schemas
│       ├── product.ts
│       └── search.ts
│
├── prisma/                       # Database
│   ├── schema.prisma             # Database schema
│   ├── seed.ts                   # Seed data
│   └── migrations/               # Migration files
│
├── public/                       # Static assets
│   ├── images/
│   └── icons/
│
├── docs/                         # Documentation
│   ├── README.md
│   ├── PROJECTOVERVIEW.md
│   ├── api/
│   ├── architecture/
│   ├── database/
│   └── features/
│
├── .env.local                    # Environment variables
├── next.config.ts                # Next.js config
├── tsconfig.json                 # TypeScript config
├── tailwind.config.ts            # Tailwind config
└── package.json                  # Dependencies
```

## 🔄 Data Flow

### Public Website Flow

```
User Request (SSR)
    ↓
Next.js Server Component
    ↓
Prisma Query (Database)
    ↓
Transform Data
    ↓
Render HTML (Server)
    ↓
Send to Browser
    ↓
Hydrate (React)
```

### Admin Dashboard Flow

```
Admin Action (CSR)
    ↓
API Route Call
    ↓
Authentication Check
    ↓
Business Logic
    ↓
Database Operation (Prisma)
    ↓
Response
    ↓
Update UI (React State)
```

### Scraping Flow

```
Admin Triggers Scrape
    ↓
API: /api/admin/scraper/[platform]
    ↓
Launch Headless Browser (Puppeteer)
    ↓
Navigate to Product Page
    ↓
Extract Data (Price, Rating, Reviews, etc.)
    ↓
Save to Database (Prisma)
    ↓
Create Scrape Log
    ↓
Return Success Response
```

### AI Analysis Flow

```
Admin Triggers AI Analysis
    ↓
API: /api/admin/ai/analyze-reviews
    ↓
Fetch Product Reviews (Database)
    ↓
Prepare Prompt
    ↓
Call OpenAI API
    ↓
Parse AI Response
    ↓
Update Product (highlights, concerns, recommendation)
    ↓
Save to Database
    ↓
Return Results
```

### Affiliate Click Tracking

```
User Clicks "Beli di Shopee"
    ↓
Client: POST /api/products/[slug]/track-click
    ↓
Server: Update Click Count (Database)
    ↓
Server: Log Analytics Event
    ↓
Server: Return Redirect URL
    ↓
Client: window.open(affiliateLink)
    ↓
User Redirected to Platform
```

## 🔐 Security Architecture

### Authentication & Authorization

```typescript
// Admin authentication middleware
export function withAuth(handler: NextApiHandler) {
  return async (req: NextRequest) => {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (token !== process.env.ADMIN_SECRET) {
      return Response.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    return handler(req);
  };
}
```

### Environment Variables

```bash
# Database
DATABASE_URL="postgresql://..."

# Admin
ADMIN_SECRET="your-secret-key"
ADMIN_EMAIL="admin@example.com"

# OpenAI
OPENAI_API_KEY="sk-..."

# Affiliate
SHOPEE_AFFILIATE_ID="..."
TIKTOK_AFFILIATE_ID="..."

# Twitter (optional)
TWITTER_API_KEY="..."
TWITTER_API_SECRET="..."
TWITTER_ACCESS_TOKEN="..."
TWITTER_ACCESS_SECRET="..."

# Cloudinary
CLOUDINARY_URL="cloudinary://..."

# Analytics
SENTRY_DSN="..."
```

### Data Validation

All inputs validated using Zod:

```typescript
// Example: Product creation schema
export const createProductSchema = z.object({
  name: z.string().min(3).max(200),
  category: z.string(),
  tags: z.array(z.string()),
  shopee: z.object({
    url: z.string().url(),
    affiliateLink: z.string().url()
  }).optional(),
  tiktok: z.object({
    productId: z.string()
  }).optional()
});
```

## 🚀 Deployment Strategy

### Development
```bash
npm run dev          # Start dev server
npm run db:push      # Push schema changes
npm run db:studio    # Open Prisma Studio
```

### Staging (Vercel Preview)
- Auto-deploy on PR
- Use staging database
- Preview URLs for testing

### Production (Vercel)
- Deploy from `main` branch
- Production database (PostgreSQL)
- Environment variables in Vercel
- Automatic SSL/CDN

### Database Migrations

```bash
# Development
npx prisma db push

# Production
npx prisma migrate deploy
```

## ⚡ Performance Optimization

### Server-Side Rendering (SSR)
- Product pages pre-rendered on server
- Fast initial page load
- SEO-friendly

### Static Generation (SSG) - Future
- Generate static pages for popular products
- Update via ISR (Incremental Static Regeneration)
- Ultra-fast page loads

### Caching Strategy
```typescript
// Example: Cache product detail for 5 minutes
export const revalidate = 300;

export async function generateMetadata({ params }) {
  const product = await getProduct(params.slug);
  return {
    title: product.name,
    description: product.description
  };
}
```

### Database Optimization
- Indexed fields: slug, category, createdAt
- Pagination for large datasets
- Eager loading for relations

### Image Optimization
- Next.js Image component (automatic optimization)
- Cloudinary for transformations
- WebP format
- Lazy loading

### API Route Optimization
- Edge Runtime for simple endpoints
- Streaming responses for large data
- Rate limiting to prevent abuse

## 📊 Monitoring & Logging

### Error Tracking (Sentry)
```typescript
import * as Sentry from '@sentry/nextjs';

try {
  // risky operation
} catch (error) {
  Sentry.captureException(error);
  throw error;
}
```

### Analytics
- Vercel Analytics (Web Vitals)
- Custom events for affiliate clicks
- Conversion tracking

### Logs
```typescript
// Scrape logs saved to database
await prisma.scrapeLog.create({
  data: {
    platform: 'shopee',
    url: productUrl,
    status: 'success',
    duration: 2345
  }
});
```

## 🔄 Cron Jobs

### Scheduled Tasks (Vercel Cron)

```typescript
// app/api/cron/scrape-products/route.ts
// Runs every 6 hours
export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Get all active products
  const products = await prisma.product.findMany({
    where: { status: 'active' }
  });
  
  // Scrape each product
  for (const product of products) {
    await scrapeAndUpdateProduct(product.id);
  }
  
  return Response.json({ success: true, updated: products.length });
}
```

### Cron Schedule (vercel.json)
```json
{
  "crons": [
    {
      "path": "/api/cron/scrape-products",
      "schedule": "0 */6 * * *"
    },
    {
      "path": "/api/cron/cleanup-logs",
      "schedule": "0 0 * * *"
    }
  ]
}
```

## 🧪 Testing Strategy

### Unit Tests (Jest)
- Utility functions
- Validators
- Business logic

### Integration Tests
- API endpoints
- Database operations
- Scraper functionality

### E2E Tests (Playwright) - Future
- User flows
- Admin workflows
- Critical paths

## 🔮 Scalability Considerations

### Current Architecture (MVP)
- Monolithic Next.js app
- SQLite/PostgreSQL database
- Vercel hosting
- **Supports**: 10K-100K monthly visitors

### Future Scaling Options

**Phase 1: Optimize Current Stack**
- Add Redis for caching
- CDN for static assets
- Database read replicas

**Phase 2: Microservices (if needed)**
```
Frontend (Next.js) → API Gateway
                         ↓
    ┌────────────────────┼────────────────────┐
    ↓                    ↓                    ↓
Product Service    Scraper Service    Analytics Service
    ↓                    ↓                    ↓
PostgreSQL         Job Queue          Time-Series DB
```

**Phase 3: Serverless + Edge**
- Edge functions for global distribution
- Serverless scrapers (AWS Lambda)
- Managed services (Supabase, PlanetScale)

## 📝 Notes

- Keep architecture simple for MVP
- Optimize only when needed (measure first)
- Prioritize developer experience
- Document architectural decisions (ADR)
