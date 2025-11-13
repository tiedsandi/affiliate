# MVP Roadmap & Implementation Plan

## 🎯 MVP Goals

Build a functional affiliate website in **4-6 weeks** with:
- ✅ 50+ curated products (Shopee + TikTok)
- ✅ Price comparison feature
- ✅ AI-powered insights
- ✅ Basic admin dashboard
- ✅ Auto-scraping (daily)
- ✅ Twitter integration (manual posting)

**Launch Target**: End of December 2025

---

## 📅 Timeline

### Week 1: Foundation (Nov 15-21)
**Goal**: Setup project structure, database, basic UI

**Tasks**:
- [x] Project setup (Next.js + dependencies) ✅
- [x] Database schema design ✅
- [x] Prisma setup + migrations ✅
- [ ] Basic layout components (Header, Footer)
- [ ] Homepage wireframe
- [ ] Product card component
- [ ] Setup Tailwind + shadcn/ui
- [ ] Environment variables configuration

**Deliverable**: Empty website with navigation and basic styling

---

### Week 2: Core Features - Public Site (Nov 22-28)
**Goal**: Users can view products and compare prices

**Tasks**:
- [ ] Product listing page (with pagination)
- [ ] Product detail page
- [ ] Price comparison UI (Shopee vs TikTok)
- [ ] Category filtering
- [ ] Basic search (text-based)
- [ ] Affiliate link tracking (click counter)
- [ ] Responsive design (mobile-first)

**Deliverable**: Functional public website (read-only)

---

### Week 3: Admin Dashboard (Nov 29 - Dec 5)
**Goal**: Admin can add and manage products

**Tasks**:
- [ ] Admin authentication (simple secret-based)
- [ ] Admin layout + navigation
- [ ] Dashboard home (stats overview)
- [ ] Add product form (manual input)
- [ ] Product list (CRUD operations)
- [ ] Edit product page
- [ ] Delete product (soft delete)
- [ ] Bulk actions (activate/deactivate)

**Deliverable**: Admin can manage product catalog

---

### Week 4: Web Scraping (Dec 6-12)
**Goal**: Auto-scrape product data from Shopee and TikTok

**Tasks**:
- [ ] Puppeteer setup
- [ ] Shopee scraper (product page)
  - Name, price, images, rating, reviews, specs
- [ ] TikTok scraper (product page)
  - Same as Shopee
- [ ] Scraper API endpoints
- [ ] Add product via URL (admin)
- [ ] Auto-refresh prices (cron job)
- [ ] Scrape logging (success/failure tracking)
- [ ] Error handling + retry logic

**Deliverable**: Admin can add products by pasting URLs

---

### Week 5: AI Features (Dec 13-19)
**Goal**: AI analyzes reviews and generates content

**Tasks**:
- [ ] OpenAI API setup
- [ ] Review analysis function
  - Extract highlights (pros)
  - Extract concerns (cons)
  - Overall recommendation
- [ ] Platform recommendation (best deal)
- [ ] AI content generator (tweets)
- [ ] Manual trigger in admin (per product)
- [ ] Display AI insights on product page

**Deliverable**: Products have AI-generated insights

---

### Week 6: Polish & Launch (Dec 20-26)
**Goal**: Production-ready MVP

**Tasks**:
- [ ] SEO optimization
  - Meta tags
  - Sitemap
  - robots.txt
  - Open Graph images
- [ ] Performance optimization
  - Image optimization
  - Lazy loading
  - Code splitting
- [ ] Analytics setup
  - Vercel Analytics
  - Custom click tracking
- [ ] Error handling + logging
- [ ] Admin analytics dashboard
- [ ] Twitter posting (manual for MVP)
- [ ] Content creation (write first 50 products)
- [ ] Deploy to Vercel
- [ ] Setup custom domain (optional)
- [ ] Soft launch + testing

**Deliverable**: Live website ready for traffic!

---

## 🏗️ Implementation Details

### Phase 1: Database Setup

```bash
# 1. Create schema
# Already done in prisma/schema.prisma ✅

# 2. Initialize database
npx prisma db push

# 3. Create seed data
# Edit prisma/seed.ts
npx prisma db seed
```

**Seed Data Ideas**:
- 10 sample products
- Mix of Shopee-only, TikTok-only, and both
- Various categories (Electronics, Fashion, Home)
- Sample reviews

---

### Phase 2: Public Pages Implementation Order

1. **Homepage** (`app/page.tsx`)
   - Hero section with search bar
   - Featured products (top 6)
   - Category grid (6 categories)
   - Stats bar

2. **Product Listing** (`app/products/page.tsx`)
   - Grid of product cards
   - Pagination (20 per page)
   - Basic filters (category)
   - Sort options (newest, price, rating)

3. **Product Detail** (`app/products/[slug]/page.tsx`)
   - Image gallery
   - Price comparison card
   - AI insights card
   - Specifications
   - CTA buttons (affiliate links)
   - Reviews section

4. **Search** (`app/search/page.tsx`)
   - Simple text search (MVP)
   - Results grid
   - Filters

---

### Phase 3: Admin Implementation Order

1. **Auth Middleware** (`lib/auth.ts`)
   ```typescript
   export function requireAuth(req) {
     const token = req.headers.get('authorization');
     if (token !== `Bearer ${process.env.ADMIN_SECRET}`) {
       throw new Error('Unauthorized');
     }
   }
   ```

2. **Dashboard** (`app/admin/page.tsx`)
   - Stats cards (views, clicks, revenue)
   - Recent products
   - Quick actions

3. **Product Management** (`app/admin/products/...`)
   - List page (table with actions)
   - Add page (form)
   - Edit page (form with tabs)

---

### Phase 4: Scraper Implementation

**Priority Order**:
1. Shopee scraper (more stable site structure)
2. TikTok scraper (more dynamic, might be trickier)
3. Error handling
4. Cron job setup

**Testing Strategy**:
- Test with 5 different product types
- Handle edge cases (out of stock, no reviews, etc.)
- Rate limiting (don't get blocked!)

---

### Phase 5: AI Integration

**Cost Estimation**:
- GPT-4: ~$0.03 per 1K tokens
- Average product analysis: ~2K tokens = $0.06
- 100 products = $6 (one-time per product)
- **Budget**: $50 for MVP testing

**Optimization**:
- Use GPT-3.5-turbo for cheaper option ($0.002/1K tokens)
- Cache AI results (don't re-analyze every time)
- Batch processing

---

## 📦 Post-MVP Features (Phase 2)

### Priority 1 (January 2026)
- [ ] Advanced search (natural language AI)
- [ ] User favorites (localStorage)
- [ ] Share buttons (Twitter, WhatsApp)
- [ ] Email notifications (price drops)
- [ ] Twitter auto-posting (scheduled)

### Priority 2 (February 2026)
- [ ] Collections/Curated lists
- [ ] Comparison tool (side-by-side)
- [ ] Blog/SEO content
- [ ] Mobile app (PWA)
- [ ] Admin analytics enhancements

### Priority 3 (March 2026+)
- [ ] User accounts & reviews
- [ ] Affiliate program for users
- [ ] Chrome extension (price tracker)
- [ ] Instagram integration
- [ ] Sponsored posts feature

---

## 🎯 Success Metrics (First 3 Months)

### Month 1 (December)
- [ ] 100+ products curated
- [ ] 100+ daily visitors
- [ ] 50+ affiliate clicks
- [ ] Rp 500K+ revenue

### Month 2 (January)
- [ ] 200+ products
- [ ] 500+ daily visitors
- [ ] 200+ affiliate clicks
- [ ] Rp 2M+ revenue

### Month 3 (February)
- [ ] 300+ products
- [ ] 1,000+ daily visitors
- [ ] 500+ affiliate clicks
- [ ] Rp 5M+ revenue

---

## 🚧 Known Challenges & Mitigation

### Challenge 1: Scraper Breaking
**Risk**: E-commerce sites update their HTML structure
**Mitigation**: 
- Modular scraper design (easy to update selectors)
- Scrape logs for monitoring
- Fallback to manual input

### Challenge 2: Twitter API Approval
**Risk**: API approval might take weeks
**Mitigation**:
- Start manual posting (MVP)
- Apply early
- Have content ready to post manually

### Challenge 3: AI Costs
**Risk**: OpenAI costs add up quickly
**Mitigation**:
- Use GPT-3.5-turbo (cheaper)
- Cache results aggressively
- Consider Google Gemini (free tier)

### Challenge 4: Affiliate Link Tracking
**Risk**: Can't verify actual purchases (privacy)
**Mitigation**:
- Track clicks as proxy
- Estimate conversions (industry avg: 3-5%)
- Focus on click optimization

### Challenge 5: SEO Competition
**Risk**: Hard to rank against established sites
**Mitigation**:
- Focus on long-tail keywords
- Unique value prop (AI insights)
- Content marketing (Twitter, blog)
- Target niche categories first

---

## 📝 Daily Development Checklist

**Morning**:
- [ ] Pull latest code
- [ ] Check Prisma Studio (data health)
- [ ] Review yesterday's progress

**During Work**:
- [ ] Commit every 1-2 hours
- [ ] Test changes immediately
- [ ] Write TODO comments for later
- [ ] Update docs if architecture changes

**End of Day**:
- [ ] Push all commits
- [ ] Update this roadmap (mark completed tasks)
- [ ] Note blockers in TODO.md
- [ ] Test full user flow (public + admin)

---

## 🎉 Launch Checklist

### Pre-Launch (1 week before)
- [ ] 50+ products with complete data
- [ ] All images optimized
- [ ] SEO meta tags on all pages
- [ ] Test on mobile devices
- [ ] Test affiliate links (all working)
- [ ] Analytics setup verified
- [ ] Error tracking (Sentry) configured
- [ ] Backup database
- [ ] Write launch announcement (Twitter)

### Launch Day
- [ ] Deploy to production
- [ ] Verify DNS settings
- [ ] Test all critical paths
- [ ] Post launch announcement
- [ ] Monitor analytics
- [ ] Monitor error logs
- [ ] Respond to feedback

### Post-Launch (First Week)
- [ ] Daily monitoring
- [ ] Fix critical bugs immediately
- [ ] Gather user feedback
- [ ] Plan iteration 1
- [ ] Content posting schedule
- [ ] Analyze traffic sources
- [ ] Optimize based on data

---

## 🔗 Quick Links

- **Figma Design**: [Link TBD]
- **Project Board**: [GitHub Projects/Trello TBD]
- **Analytics**: [Vercel Dashboard]
- **Database**: [Supabase/Prisma Studio]
- **Deployment**: [Vercel Dashboard]

---

## 📞 Need Help?

**Stuck on something?** Document it in `docs/ISSUES.md`

**Found a bug?** Create issue in GitHub or note in TODO.md

**Feature idea?** Add to `docs/BACKLOG.md`

---

**Last Updated**: 2025-11-15
**Current Phase**: Week 1 - Foundation ✅
**Next Milestone**: Basic UI components by Nov 21

Let's build this! 🚀
