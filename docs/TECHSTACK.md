# Tech Stack Decisions

## Core Framework: Next.js 15

### Why Next.js?
✅ **Pros:**
- Server-side rendering (SSR) out of the box → SEO-friendly
- File-based routing → simple structure
- API Routes → backend + frontend in one repo
- Image optimization → faster loading
- Great DX (Developer Experience)
- Vercel deployment → zero config

❌ **Alternatives Considered:**
- **Plain React (CRA/Vite)**: No SSR, bad for SEO
- **Remix**: Good but smaller ecosystem
- **Astro**: Great for static, but we need dynamic content

**Decision**: Next.js for SEO, performance, and DX.

---

## Database: PostgreSQL (Prod) + SQLite (Dev)

### Why PostgreSQL?
✅ **Pros:**
- Reliable, battle-tested
- Great for relational data (products, reviews, analytics)
- Free tier on Supabase/Neon
- Excellent Prisma support
- Full-text search capabilities

❌ **Alternatives Considered:**
- **MongoDB**: NoSQL is overkill, harder to query relations
- **MySQL**: Similar to PostgreSQL, but Postgres has better JSON support
- **Supabase (with auth/storage)**: Could use in future, but keep it simple for MVP

**Decision**: PostgreSQL for production, SQLite for local dev (faster setup).

---

## ORM: Prisma

### Why Prisma?
✅ **Pros:**
- Type-safe queries (auto-generated TypeScript types!)
- Great DX (Prisma Studio for GUI)
- Migration system
- Connection pooling
- Auto-completion in IDE

❌ **Alternatives Considered:**
- **Raw SQL**: Too verbose, no type safety
- **TypeORM**: More complex, worse DX
- **Drizzle**: Newer, less mature

**Decision**: Prisma for DX and type safety.

---

## Styling: Tailwind CSS

### Why Tailwind?
✅ **Pros:**
- Utility-first → fast development
- No CSS file management
- Consistent design tokens
- Responsive design is easy
- Small bundle size (PurgeCSS)
- shadcn/ui components built with Tailwind

❌ **Alternatives Considered:**
- **CSS Modules**: More verbose
- **Styled Components**: Runtime cost, SSR issues
- **Plain CSS**: Hard to maintain

**Decision**: Tailwind for speed and maintainability.

---

## UI Components: shadcn/ui

### Why shadcn/ui?
✅ **Pros:**
- Copy-paste components (not npm package!)
- Full control over code
- Built on Radix UI (accessible)
- Tailwind-based
- Beautiful defaults
- Easy customization

❌ **Alternatives Considered:**
- **Material UI**: Too opinionated, heavy
- **Chakra UI**: Good but heavier bundle
- **Headless UI**: Need to style everything
- **Build from scratch**: Too time-consuming

**Decision**: shadcn/ui for flexibility and DX.

---

## AI: OpenAI GPT-4

### Why OpenAI?
✅ **Pros:**
- Best-in-class language model
- JSON mode for structured outputs
- Great for content generation
- Reliable API

❌ **Alternatives Considered:**
- **Anthropic Claude**: Similar quality, but OpenAI has better docs
- **Google Gemini**: Free tier! Good alternative
- **Open-source LLMs (Llama)**: Need to host, more complex

**Decision**: Start with OpenAI, can switch to Gemini if cost is issue.

---

## Web Scraping: Puppeteer

### Why Puppeteer?
✅ **Pros:**
- Full Chrome automation
- Handle JavaScript-rendered content
- Maintained by Google
- Good documentation

❌ **Alternatives Considered:**
- **Cheerio**: Fast but can't handle JS-heavy sites
- **Playwright**: Similar to Puppeteer, slight overkill
- **Selenium**: Older, slower

**Decision**: Puppeteer for reliability with JS-heavy e-commerce sites.

---

## Authentication: Simple Secret-Based (MVP)

### Why Simple Auth?
✅ **Pros for MVP:**
- Single admin user (you!)
- No user management complexity
- Environment variable = secure enough
- Fast to implement

❌ **Future Upgrade:**
- **NextAuth.js**: For multi-user admin
- **Clerk**: Full auth solution
- **Supabase Auth**: If we use Supabase

**Decision**: Simple for MVP, upgrade later if needed.

---

## Form Validation: Zod

### Why Zod?
✅ **Pros:**
- Type-safe schema validation
- Works on both client & server
- Great DX (autocomplete)
- Integrates with React Hook Form

❌ **Alternatives Considered:**
- **Yup**: Less type-safe
- **Joi**: Node.js only, not isomorphic

**Decision**: Zod for full-stack type safety.

---

## State Management: React Context + Server Components

### Why This Approach?
✅ **Pros:**
- Server Components = no client state for most pages
- Context for global UI state (theme, modals)
- Simpler than Redux

❌ **Alternatives Considered:**
- **Redux**: Overkill for this project
- **Zustand**: Good, but we don't need much client state
- **Jotai/Recoil**: Atomic state not needed

**Decision**: Keep it simple with Context + Server Components.

---

## Hosting: Vercel

### Why Vercel?
✅ **Pros:**
- Built by Next.js team → perfect integration
- Zero-config deployment
- Automatic HTTPS + CDN
- Preview deployments for PRs
- Edge Functions
- Free tier is generous

❌ **Alternatives Considered:**
- **Railway**: Good but more expensive
- **Netlify**: Not as Next.js-optimized
- **AWS/GCP**: Too complex to manage
- **DigitalOcean**: Need to manage infrastructure

**Decision**: Vercel for simplicity and DX.

---

## Database Hosting: Supabase/Neon

### Why Supabase?
✅ **Pros:**
- Free PostgreSQL hosting
- Connection pooling
- Good DX (dashboard)
- Room to grow (auth, storage, realtime)

### Why Neon?
✅ **Pros:**
- Serverless PostgreSQL
- Scale to zero (cost-effective)
- Branch databases (for preview deploys)

**Decision**: Try Supabase first (free tier), upgrade to Neon if needed.

---

## Image Storage: Cloudinary

### Why Cloudinary?
✅ **Pros:**
- Free tier (10GB storage, 25GB bandwidth)
- Auto image optimization
- Transformations on-the-fly
- CDN included
- Easy API

❌ **Alternatives Considered:**
- **Vercel Blob**: New, less mature
- **AWS S3 + CloudFront**: Complex setup
- **Store in DB**: Bad practice

**Decision**: Cloudinary for simplicity and features.

---

## Analytics: Vercel Analytics + Custom

### Why This Combo?
✅ **Pros:**
- Vercel Analytics: Web Vitals, easy setup
- Custom tracking: Affiliate clicks, conversions
- Store custom analytics in database

❌ **Alternatives Considered:**
- **Google Analytics**: Privacy concerns, slow
- **Plausible**: Paid
- **Mixpanel**: Overkill

**Decision**: Hybrid approach for full control.

---

## Error Tracking: Sentry (Optional)

### Why Sentry?
✅ **Pros:**
- Free tier (5K errors/month)
- Great error reports
- Source maps support
- Performance monitoring

**Decision**: Add if errors become frequent, not critical for MVP.

---

## Twitter API: Official Twitter API v2

### Why Official API?
✅ **Pros:**
- Reliable
- Free tier (Basic plan)
- Can post tweets

❌ **Cons:**
- Rate limits
- Need approval (might take time)

❌ **Alternatives:**
- **Manual posting**: Too tedious
- **Buffer/Hootsuite**: Need subscription

**Decision**: Apply for Twitter API, fallback to manual posting if not approved quickly.

---

## Cron Jobs: Vercel Cron

### Why Vercel Cron?
✅ **Pros:**
- Built into Vercel
- No extra service needed
- Simple config (vercel.json)
- Free

❌ **Alternatives Considered:**
- **Node-cron**: Need always-running server
- **External service (Cron-job.org)**: Less integrated

**Decision**: Vercel Cron for simplicity.

---

## Summary: The Stack

```
┌─────────────────────────────────────┐
│ Frontend: Next.js 15 + React 19     │
│ Styling: Tailwind CSS + shadcn/ui   │
│ Backend: Next.js API Routes         │
│ Database: PostgreSQL (Supabase)     │
│ ORM: Prisma                         │
│ AI: OpenAI GPT-4                    │
│ Scraping: Puppeteer                 │
│ Hosting: Vercel                     │
│ Storage: Cloudinary                 │
│ Validation: Zod                     │
│ Cron: Vercel Cron                   │
│ Twitter: Official API v2            │
└─────────────────────────────────────┘
```

**Philosophy**: Choose boring, proven technology. Optimize for:
1. **Developer Experience** (DX) → ship faster
2. **Simplicity** → easier to maintain
3. **Type Safety** → fewer bugs
4. **Cost** → free/cheap for MVP

---

## Future Considerations

### When to Upgrade/Change?

**Redis/Upstash (Caching):**
- When: Database queries become slow
- Why: Cache frequently accessed data

**CDN (CloudFlare):**
- When: Traffic grows significantly
- Why: Better global performance

**Microservices:**
- When: Scraper or AI is slowing down web server
- Why: Separate concerns, scale independently

**Message Queue (BullMQ/Inngest):**
- When: Scraping becomes unreliable
- Why: Better job processing, retries

**Separate Frontend/Backend:**
- When: Never (unless team grows large)
- Why: Monorepo is simpler for solo/small team

---

## Key Trade-offs

| Decision | Trade-off | Reasoning |
|----------|-----------|-----------|
| Next.js over Remix | Smaller ecosystem | Larger community, better Vercel integration |
| PostgreSQL over MongoDB | Schema rigidity | Better for relational data, can still use JSON |
| Puppeteer over Cheerio | Slower, heavier | E-commerce sites need JS rendering |
| Vercel over AWS | Less control | DX and speed matter more than max flexibility |
| OpenAI over open-source | Cost | Quality and reliability worth it for MVP |

---

## Learning Resources

If you're new to any of these:

- **Next.js**: [nextjs.org/learn](https://nextjs.org/learn)
- **Prisma**: [prisma.io/docs](https://www.prisma.io/docs)
- **Tailwind**: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **TypeScript**: [typescriptlang.org/docs](https://www.typescriptlang.org/docs)
- **Zod**: [zod.dev](https://zod.dev)

---

**Last Updated**: 2025-11-15
**Review Date**: After MVP launch (check if choices still make sense)
