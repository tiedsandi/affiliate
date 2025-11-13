# Database Documentation

## 📊 Database Schema

### Overview

Database menggunakan **Prisma ORM** dengan **SQLite** (development) dan **PostgreSQL** (production).

## 🗂️ Tables

### Product

Tabel utama untuk menyimpan data produk yang dikurasi.

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| `id` | String | Unique identifier (CUID) | PK |
| `name` | String | Nama produk | Required |
| `slug` | String | URL-friendly identifier | Unique, Required |
| `category` | String | Kategori produk | Required |
| `tags` | String | Array tags (JSON) | Default: `[]` |
| `images` | String | Array image URLs (JSON) | Default: `[]` |
| **Shopee Data** | | | |
| `shopeeUrl` | String? | Original product URL | Optional |
| `shopeePrice` | Int? | Harga saat ini (IDR) | Optional |
| `shopeeOriginalPrice` | Int? | Harga asli sebelum diskon | Optional |
| `shopeeDiscount` | Int? | Persentase diskon (%) | Optional |
| `shopeeRating` | Float? | Rating (1-5) | Optional |
| `shopeeReviewCount` | Int? | Jumlah review | Optional |
| `shopeeSold` | Int? | Jumlah terjual | Optional |
| `shopeeShipping` | String? | Info pengiriman | Optional |
| `shopeeAffiliateLink` | String? | Link affiliate | Optional |
| `shopeeCommission` | Float | Persentase komisi | Default: 0.03 (3%) |
| **TikTok Data** | | | |
| `tiktokProductId` | String? | TikTok product ID | Optional |
| `tiktokPrice` | Int? | Harga saat ini (IDR) | Optional |
| `tiktokOriginalPrice` | Int? | Harga asli sebelum diskon | Optional |
| `tiktokDiscount` | Int? | Persentase diskon (%) | Optional |
| `tiktokRating` | Float? | Rating (1-5) | Optional |
| `tiktokReviewCount` | Int? | Jumlah review | Optional |
| `tiktokSold` | Int? | Jumlah terjual | Optional |
| `tiktokShipping` | String? | Info pengiriman | Optional |
| `tiktokAffiliateLink` | String? | Link affiliate | Optional |
| `tiktokCommission` | Float? | Persentase komisi | Optional |
| **AI Analysis** | | | |
| `aiHighlights` | String | Array highlights (JSON) | Default: `[]` |
| `aiConcerns` | String | Array concerns (JSON) | Default: `[]` |
| `aiBestPlatform` | String? | "shopee" or "tiktok" | Optional |
| `aiRecommendation` | String? | AI recommendation text | Optional |
| **Specifications** | | | |
| `specifications` | String | Specs object (JSON) | Default: `{}` |
| **Stats** | | | |
| `views` | Int | Total page views | Default: 0 |
| `clicks` | Int | Total affiliate clicks | Default: 0 |
| `shopeeClicks` | Int | Shopee clicks | Default: 0 |
| `tiktokClicks` | Int | TikTok clicks | Default: 0 |
| `conversions` | Int | Estimated conversions | Default: 0 |
| **Metadata** | | | |
| `status` | String | "active", "inactive", "draft" | Default: "active" |
| `createdAt` | DateTime | Creation timestamp | Auto |
| `updatedAt` | DateTime | Last update timestamp | Auto |
| `lastScraped` | DateTime? | Last scraping timestamp | Optional |

**Relations:**
- `reviews` → One-to-Many with Review

**Indexes:**
- `slug` (unique)
- `category`
- `status`
- `createdAt`

---

### Review

Menyimpan reviews dari Shopee dan TikTok Shop.

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| `id` | String | Unique identifier (CUID) | PK |
| `productId` | String | Reference to Product | FK, Required |
| `platform` | String | "shopee" or "tiktok" | Required |
| `rating` | Int | Rating (1-5) | Required |
| `text` | String | Review content | Required |
| `author` | String | Reviewer name | Required |
| `date` | String | Review date | Required |
| `verified` | Boolean | Verified buyer? | Default: false |
| `helpful` | Int | Helpful count | Default: 0 |
| `images` | String | Review images (JSON array) | Default: `[]` |
| `createdAt` | DateTime | Timestamp | Auto |

**Relations:**
- `product` → Many-to-One with Product

**Indexes:**
- `productId`
- `platform`
- `rating`

**Cascade Delete:** When product is deleted, all reviews are deleted.

---

### Analytics

Daily analytics untuk tracking performance.

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| `id` | String | Unique identifier (CUID) | PK |
| `date` | DateTime | Analytics date | Default: now() |
| `views` | Int | Total views | Default: 0 |
| `clicks` | Int | Total clicks | Default: 0 |
| `shopeeClicks` | Int | Shopee clicks | Default: 0 |
| `tiktokClicks` | Int | TikTok clicks | Default: 0 |
| `estimatedRevenue` | Float | Revenue estimate (IDR) | Default: 0 |
| `topProducts` | String | Top products (JSON array) | Default: `[]` |

**Indexes:**
- `date`

**Notes:**
- Aggregated daily untuk performa query
- `topProducts` berisi array of `{ productId, views, clicks, revenue }`

---

### TwitterPost

Tracking Twitter posts untuk social media automation.

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| `id` | String | Unique identifier (CUID) | PK |
| `productId` | String | Reference to Product | Required |
| `tweetId` | String? | Twitter tweet ID | Optional |
| `content` | String | Tweet content | Required |
| `mediaUrls` | String | Media URLs (JSON array) | Default: `[]` |
| **Stats** | | | |
| `impressions` | Int | Total impressions | Default: 0 |
| `engagements` | Int | Total engagements | Default: 0 |
| `linkClicks` | Int | Link clicks | Default: 0 |
| **Schedule** | | | |
| `scheduledAt` | DateTime? | Scheduled time | Optional |
| `postedAt` | DateTime? | Actual post time | Optional |
| `status` | String | "draft", "scheduled", "posted", "failed" | Default: "draft" |
| `createdAt` | DateTime | Creation timestamp | Auto |
| `updatedAt` | DateTime | Last update timestamp | Auto |

**Indexes:**
- `productId`
- `status`
- `scheduledAt`

---

### ScrapeLog

Logging untuk monitoring scraper health.

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| `id` | String | Unique identifier (CUID) | PK |
| `platform` | String | "shopee" or "tiktok" | Required |
| `url` | String | Scraped URL | Required |
| `status` | String | "success" or "failed" | Required |
| `error` | String? | Error message (if failed) | Optional |
| `duration` | Int? | Scrape duration (ms) | Optional |
| `createdAt` | DateTime | Timestamp | Auto |

**Indexes:**
- `platform`
- `status`
- `createdAt`

**Notes:**
- Gunakan untuk monitoring scraper performance
- Cleanup logs older than 30 days (cron job)

---

## 🔗 Entity Relationship Diagram (ERD)

```
┌─────────────────────────────────────────────────────────────┐
│                         Product                              │
├─────────────────────────────────────────────────────────────┤
│ PK  id: String (CUID)                                       │
│ UK  slug: String                                            │
│     name: String                                            │
│     category: String                                        │
│     tags: String (JSON)                                     │
│     images: String (JSON)                                   │
│     shopeePrice: Int?                                       │
│     tiktokPrice: Int?                                       │
│     ... (shopee fields)                                     │
│     ... (tiktok fields)                                     │
│     aiHighlights: String (JSON)                             │
│     aiConcerns: String (JSON)                               │
│     views: Int                                              │
│     clicks: Int                                             │
│     status: String                                          │
│     createdAt: DateTime                                     │
│     updatedAt: DateTime                                     │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  │ 1:N
                  │
┌─────────────────▼───────────────────────────────────────────┐
│                         Review                               │
├─────────────────────────────────────────────────────────────┤
│ PK  id: String (CUID)                                       │
│ FK  productId: String                                       │
│     platform: String                                        │
│     rating: Int                                             │
│     text: String                                            │
│     author: String                                          │
│     verified: Boolean                                       │
│     helpful: Int                                            │
│     images: String (JSON)                                   │
│     createdAt: DateTime                                     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                        Analytics                             │
├─────────────────────────────────────────────────────────────┤
│ PK  id: String (CUID)                                       │
│ IDX date: DateTime                                          │
│     views: Int                                              │
│     clicks: Int                                             │
│     shopeeClicks: Int                                       │
│     tiktokClicks: Int                                       │
│     estimatedRevenue: Float                                 │
│     topProducts: String (JSON)                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                      TwitterPost                             │
├─────────────────────────────────────────────────────────────┤
│ PK  id: String (CUID)                                       │
│     productId: String (reference, not FK)                   │
│     tweetId: String?                                        │
│     content: String                                         │
│     mediaUrls: String (JSON)                                │
│     impressions: Int                                        │
│     engagements: Int                                        │
│     linkClicks: Int                                         │
│     scheduledAt: DateTime?                                  │
│     postedAt: DateTime?                                     │
│     status: String                                          │
│     createdAt: DateTime                                     │
│     updatedAt: DateTime                                     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                       ScrapeLog                              │
├─────────────────────────────────────────────────────────────┤
│ PK  id: String (CUID)                                       │
│ IDX platform: String                                        │
│     url: String                                             │
│ IDX status: String                                          │
│     error: String?                                          │
│     duration: Int?                                          │
│ IDX createdAt: DateTime                                     │
└─────────────────────────────────────────────────────────────┘
```

## 💾 Data Storage

### JSON Fields

Beberapa field menggunakan JSON string untuk fleksibilitas:

**tags** (Product)
```json
["gadget", "powerbank", "anker", "fast-charging"]
```

**images** (Product)
```json
[
  "https://cdn.cloudinary.com/...",
  "https://cdn.cloudinary.com/..."
]
```

**specifications** (Product)
```json
{
  "Capacity": "20000mAh",
  "Input": "USB-C 18W",
  "Output": "USB-A 18W, USB-C 20W",
  "Weight": "450g",
  "Warranty": "18 months"
}
```

**aiHighlights** (Product)
```json
[
  "Kapasitas besar 20000mAh",
  "Fast charging support",
  "Build quality sangat baik"
]
```

**aiConcerns** (Product)
```json
[
  "Agak berat untuk dibawa",
  "Harga di atas kompetitor lokal"
]
```

**topProducts** (Analytics)
```json
[
  {
    "productId": "clx123abc",
    "views": 1250,
    "clicks": 89,
    "revenue": 180000
  }
]
```

## 🔍 Common Queries

### Get Product with Reviews
```typescript
const product = await prisma.product.findUnique({
  where: { slug: 'powerbank-anker-20000mah' },
  include: {
    reviews: {
      where: { platform: 'shopee' },
      orderBy: { helpful: 'desc' },
      take: 10
    }
  }
});
```

### Get Trending Products
```typescript
const trending = await prisma.product.findMany({
  where: {
    status: 'active',
    createdAt: {
      gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // last 7 days
    }
  },
  orderBy: [
    { views: 'desc' },
    { clicks: 'desc' }
  ],
  take: 10
});
```

### Get Products by Category with Price Range
```typescript
const products = await prisma.product.findMany({
  where: {
    category: 'Electronics',
    status: 'active',
    OR: [
      {
        shopeePrice: {
          gte: 100000,
          lte: 500000
        }
      },
      {
        tiktokPrice: {
          gte: 100000,
          lte: 500000
        }
      }
    ]
  },
  orderBy: { createdAt: 'desc' }
});
```

### Track Affiliate Click
```typescript
await prisma.product.update({
  where: { id: productId },
  data: {
    clicks: { increment: 1 },
    shopeeClicks: platform === 'shopee' ? { increment: 1 } : undefined,
    tiktokClicks: platform === 'tiktok' ? { increment: 1 } : undefined
  }
});

// Also update daily analytics
const today = new Date();
today.setHours(0, 0, 0, 0);

await prisma.analytics.upsert({
  where: { date: today },
  update: {
    clicks: { increment: 1 },
    shopeeClicks: platform === 'shopee' ? { increment: 1 } : undefined,
    tiktokClicks: platform === 'tiktok' ? { increment: 1 } : undefined
  },
  create: {
    date: today,
    clicks: 1,
    shopeeClicks: platform === 'shopee' ? 1 : 0,
    tiktokClicks: platform === 'tiktok' ? 1 : 0
  }
});
```

### Get Daily Analytics
```typescript
const analytics = await prisma.analytics.findMany({
  where: {
    date: {
      gte: new Date('2025-01-01'),
      lte: new Date('2025-01-31')
    }
  },
  orderBy: { date: 'asc' }
});
```

### Cleanup Old Scrape Logs
```typescript
// Delete logs older than 30 days
const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

await prisma.scrapeLog.deleteMany({
  where: {
    createdAt: {
      lt: thirtyDaysAgo
    }
  }
});
```

## 🔄 Migrations

### Initial Migration
```bash
npx prisma migrate dev --name init
```

### Add New Field
```bash
# 1. Update schema.prisma
# 2. Create migration
npx prisma migrate dev --name add_field_name

# 3. Deploy to production
npx prisma migrate deploy
```

### Reset Database (Development Only!)
```bash
npx prisma migrate reset
```

## 🌱 Seeding

Seed data untuk development (lihat `prisma/seed.ts`):

```typescript
// Example seed data
const products = [
  {
    name: "Powerbank Anker 20000mAh",
    slug: "powerbank-anker-20000mah",
    category: "Electronics",
    tags: JSON.stringify(["gadget", "powerbank", "anker"]),
    shopeePrice: 250000,
    shopeeRating: 4.8,
    tiktokPrice: 245000,
    tiktokRating: 4.9
  },
  // ... more products
];

await prisma.product.createMany({ data: products });
```

Run seed:
```bash
npx prisma db seed
```

## 🔐 Database Security

### Environment Variables
```bash
# Development (SQLite)
DATABASE_URL="file:./dev.db"

# Production (PostgreSQL)
DATABASE_URL="postgresql://user:password@host:port/database?schema=public"
```

### Connection Pooling (Production)
```typescript
// Use connection pooling for serverless
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL + '?connection_limit=10'
    }
  }
});
```

### Row-Level Security (Future)
- Implement RLS in PostgreSQL for multi-tenant setup
- Separate public/admin data access

## 📊 Performance Optimization

### Indexes
```prisma
// Already indexed in schema
@@index([slug])
@@index([category])
@@index([status])
@@index([productId])
@@index([platform])
```

### Query Optimization Tips
1. Use `select` to limit returned fields
2. Use `include` wisely (avoid N+1)
3. Implement cursor-based pagination for large datasets
4. Use database views for complex queries
5. Cache frequently accessed data (Redis)

### Example: Optimized Product Listing
```typescript
const products = await prisma.product.findMany({
  where: { status: 'active' },
  select: {
    id: true,
    name: true,
    slug: true,
    images: true,
    shopeePrice: true,
    tiktokPrice: true,
    shopeeRating: true,
    tiktokRating: true,
    views: true
    // Don't include heavy fields like reviews
  },
  take: 20,
  skip: (page - 1) * 20
});
```

## 🔮 Future Enhancements

- [ ] Add full-text search (PostgreSQL `tsvector`)
- [ ] Implement soft delete (add `deletedAt` field)
- [ ] Add `User` table for personalization
- [ ] Add `Collection` table for curated lists
- [ ] Add `ComparisonSet` for saved comparisons
- [ ] Implement database replication for read scaling
- [ ] Add Redis cache layer
- [ ] Implement database backup strategy

## 📝 Notes

- Use CUID instead of UUID for better performance
- JSON fields trade normalization for flexibility
- Analytics table uses daily aggregation for performance
- Always use transactions for critical operations
- Monitor slow queries with Prisma Query Insights
