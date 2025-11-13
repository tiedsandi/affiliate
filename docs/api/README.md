# API Documentation

## 📋 Overview

API endpoints untuk aplikasi affiliate Shopee-TikTok. Menggunakan Next.js App Router API routes.

## 🔑 Authentication

Untuk endpoint admin, gunakan environment variable `ADMIN_SECRET` untuk authentication.

```typescript
headers: {
  'Authorization': `Bearer ${process.env.ADMIN_SECRET}`
}
```

## 🌐 Public API Endpoints

### Products

#### `GET /api/products`
Ambil list produk dengan pagination dan filtering.

**Query Parameters:**
- `page` (number, default: 1) - Page number
- `limit` (number, default: 20, max: 100) - Items per page
- `category` (string) - Filter by category
- `tags` (string) - Comma-separated tags
- `platform` (string: 'shopee' | 'tiktok' | 'both') - Filter by platform availability
- `minPrice` (number) - Minimum price
- `maxPrice` (number) - Maximum price
- `minRating` (number) - Minimum rating (1-5)
- `sort` (string) - Sort by: 'newest', 'price-low', 'price-high', 'rating', 'popular'
- `search` (string) - Search query

**Response:**
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "clx123abc",
        "name": "Powerbank Anker 20000mAh",
        "slug": "powerbank-anker-20000mah",
        "category": "Electronics",
        "tags": ["gadget", "powerbank", "anker"],
        "images": ["https://..."],
        "shopeePrice": 250000,
        "shopeeDiscount": 20,
        "tiktokPrice": 245000,
        "tiktokDiscount": 15,
        "bestPlatform": "tiktok",
        "savings": 5000,
        "views": 1250,
        "shopeeRating": 4.8,
        "tiktokRating": 4.9,
        "createdAt": "2025-01-15T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 156,
      "totalPages": 8,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

#### `GET /api/products/[slug]`
Ambil detail produk lengkap berdasarkan slug.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "clx123abc",
    "name": "Powerbank Anker 20000mAh",
    "slug": "powerbank-anker-20000mah",
    "category": "Electronics",
    "tags": ["gadget", "powerbank", "anker"],
    "images": ["https://..."],
    
    "shopee": {
      "url": "https://shopee.co.id/...",
      "price": 250000,
      "originalPrice": 312500,
      "discount": 20,
      "rating": 4.8,
      "reviewCount": 1234,
      "sold": 5678,
      "shipping": "Gratis Ongkir",
      "affiliateLink": "https://...",
      "commission": 0.03
    },
    
    "tiktok": {
      "productId": "123456789",
      "price": 245000,
      "originalPrice": 288235,
      "discount": 15,
      "rating": 4.9,
      "reviewCount": 567,
      "sold": 2345,
      "shipping": "Gratis Ongkir",
      "affiliateLink": "https://...",
      "commission": 0.08
    },
    
    "analysis": {
      "highlights": [
        "Kapasitas besar 20000mAh",
        "Fast charging support",
        "Build quality sangat baik"
      ],
      "concerns": [
        "Agak berat untuk dibawa",
        "Harga di atas kompetitor lokal"
      ],
      "bestPlatform": "tiktok",
      "recommendation": "Sangat recommended untuk yang sering traveling. Lebih murah di TikTok Shop."
    },
    
    "specifications": {
      "Capacity": "20000mAh",
      "Input": "USB-C 18W",
      "Output": "USB-A 18W, USB-C 20W",
      "Weight": "450g",
      "Warranty": "18 months"
    },
    
    "stats": {
      "views": 1250,
      "clicks": 89,
      "shopeeClicks": 42,
      "tiktokClicks": 47,
      "conversions": 12
    },
    
    "createdAt": "2025-01-15T10:00:00Z",
    "updatedAt": "2025-01-16T08:30:00Z"
  }
}
```

#### `GET /api/products/[slug]/reviews`
Ambil reviews untuk produk tertentu.

**Query Parameters:**
- `platform` (string: 'shopee' | 'tiktok' | 'all') - Filter by platform
- `minRating` (number) - Minimum rating
- `limit` (number, default: 20, max: 100)
- `page` (number, default: 1)

**Response:**
```json
{
  "success": true,
  "data": {
    "reviews": [
      {
        "id": "rev123",
        "platform": "shopee",
        "rating": 5,
        "text": "Bagus banget! Awet dan cepat chargenya.",
        "author": "User123",
        "date": "2025-01-10",
        "verified": true,
        "helpful": 15,
        "images": ["https://..."]
      }
    ],
    "stats": {
      "totalReviews": 1801,
      "averageRating": 4.85,
      "breakdown": {
        "5": 1234,
        "4": 456,
        "3": 89,
        "2": 15,
        "1": 7
      }
    },
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 1801,
      "totalPages": 91
    }
  }
}
```

#### `POST /api/products/[slug]/track-click`
Track affiliate link click (untuk analytics).

**Body:**
```json
{
  "platform": "tiktok"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "redirectUrl": "https://affiliate.tiktokshop.com/..."
  }
}
```

### Search

#### `GET /api/search`
AI-powered search dengan natural language processing.

**Query Parameters:**
- `q` (string, required) - Search query
- `limit` (number, default: 20)

**Example:** `/api/search?q=powerbank awet budget 200rb`

**Response:**
```json
{
  "success": true,
  "data": {
    "query": "powerbank awet budget 200rb",
    "filters": {
      "category": "Electronics",
      "maxPrice": 200000,
      "tags": ["powerbank", "durable"]
    },
    "products": [...],
    "total": 12
  }
}
```

### Categories

#### `GET /api/categories`
Ambil list semua kategori dengan product count.

**Response:**
```json
{
  "success": true,
  "data": {
    "categories": [
      {
        "name": "Electronics",
        "slug": "electronics",
        "count": 145,
        "icon": "🔌"
      },
      {
        "name": "Fashion",
        "slug": "fashion",
        "count": 89,
        "icon": "👕"
      }
    ]
  }
}
```

### Analytics (Public)

#### `GET /api/analytics/trending`
Ambil trending products berdasarkan views dan clicks.

**Query Parameters:**
- `period` (string: 'today' | 'week' | 'month') - Time period
- `limit` (number, default: 10)

**Response:**
```json
{
  "success": true,
  "data": {
    "trending": [
      {
        "product": {...},
        "views": 1250,
        "clicks": 89,
        "ctr": 7.12,
        "rank": 1
      }
    ]
  }
}
```

## 🔐 Admin API Endpoints

### Products Management

#### `POST /api/admin/products`
Create new product (manual atau dari scraper).

**Headers:**
```
Authorization: Bearer {ADMIN_SECRET}
```

**Body:**
```json
{
  "name": "Powerbank Anker 20000mAh",
  "category": "Electronics",
  "tags": ["gadget", "powerbank"],
  "images": ["https://..."],
  "shopee": {
    "url": "https://shopee.co.id/...",
    "affiliateLink": "https://..."
  },
  "tiktok": {
    "productId": "123456789"
  },
  "status": "active"
}
```

#### `PUT /api/admin/products/[id]`
Update product data.

#### `DELETE /api/admin/products/[id]`
Soft delete product (set status to inactive).

#### `POST /api/admin/products/[id]/scrape`
Trigger scraping untuk update harga dan review terbaru.

**Response:**
```json
{
  "success": true,
  "data": {
    "updated": true,
    "changes": {
      "shopeePrice": {
        "old": 250000,
        "new": 240000
      },
      "tiktokRating": {
        "old": 4.8,
        "new": 4.9
      }
    }
  }
}
```

### Scraper

#### `POST /api/admin/scraper/shopee`
Scrape product dari Shopee URL.

**Body:**
```json
{
  "url": "https://shopee.co.id/product/123456789",
  "affiliateLink": "https://shope.ee/..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "name": "Powerbank Anker 20000mAh",
    "price": 250000,
    "originalPrice": 312500,
    "discount": 20,
    "rating": 4.8,
    "reviewCount": 1234,
    "sold": 5678,
    "images": ["https://..."],
    "specifications": {...}
  }
}
```

#### `POST /api/admin/scraper/tiktok`
Scrape product dari TikTok Shop.

**Body:**
```json
{
  "productId": "123456789"
}
```

### AI Processing

#### `POST /api/admin/ai/analyze-reviews`
Analyze reviews menggunakan AI untuk extract highlights dan concerns.

**Body:**
```json
{
  "productId": "clx123abc"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "highlights": [
      "Kapasitas besar 20000mAh",
      "Fast charging support",
      "Build quality sangat baik"
    ],
    "concerns": [
      "Agak berat untuk dibawa"
    ],
    "recommendation": "Sangat recommended untuk traveling",
    "bestPlatform": "tiktok"
  }
}
```

#### `POST /api/admin/ai/generate-content`
Generate social media content untuk produk.

**Body:**
```json
{
  "productId": "clx123abc",
  "platform": "twitter",
  "style": "casual"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "content": "🔋 Powerbank Anker 20000mAh lagi diskon!\n\nShopee: Rp 250K\nTikTok: Rp 245K ✅\n\nHemat 5rb + review 4.9⭐\n\nLink: [URL]",
    "hashtags": ["#Powerbank", "#GadgetMurah", "#TikTokShop"],
    "suggestedImages": ["https://..."]
  }
}
```

### Twitter Integration

#### `GET /api/admin/twitter/posts`
Ambil list Twitter posts yang sudah dibuat.

**Query Parameters:**
- `status` (string: 'draft' | 'scheduled' | 'posted')
- `page` (number)
- `limit` (number)

#### `POST /api/admin/twitter/posts`
Create new Twitter post.

**Body:**
```json
{
  "productId": "clx123abc",
  "content": "Tweet content...",
  "mediaUrls": ["https://..."],
  "scheduledAt": "2025-01-20T10:00:00Z"
}
```

#### `POST /api/admin/twitter/posts/[id]/publish`
Publish Twitter post immediately atau schedule.

### Analytics (Admin)

#### `GET /api/admin/analytics/dashboard`
Ambil dashboard analytics overview.

**Query Parameters:**
- `startDate` (ISO date)
- `endDate` (ISO date)

**Response:**
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalViews": 15234,
      "totalClicks": 1089,
      "ctr": 7.15,
      "estimatedRevenue": 2450000,
      "conversions": 156
    },
    "platformBreakdown": {
      "shopee": {
        "clicks": 523,
        "conversions": 78,
        "revenue": 1200000
      },
      "tiktok": {
        "clicks": 566,
        "conversions": 78,
        "revenue": 1250000
      }
    },
    "topProducts": [
      {
        "product": {...},
        "views": 1250,
        "clicks": 89,
        "conversions": 12,
        "revenue": 180000
      }
    ],
    "chart": [
      {
        "date": "2025-01-15",
        "views": 523,
        "clicks": 45,
        "revenue": 125000
      }
    ]
  }
}
```

#### `GET /api/admin/analytics/products/[id]`
Detailed analytics untuk specific product.

#### `GET /api/admin/analytics/export`
Export analytics data as CSV.

**Query Parameters:**
- `startDate` (ISO date)
- `endDate` (ISO date)
- `format` (string: 'csv' | 'json')

### Scrape Logs

#### `GET /api/admin/logs/scraper`
Ambil scraper logs untuk monitoring.

**Query Parameters:**
- `platform` (string: 'shopee' | 'tiktok')
- `status` (string: 'success' | 'failed')
- `page` (number)
- `limit` (number)

**Response:**
```json
{
  "success": true,
  "data": {
    "logs": [
      {
        "id": "log123",
        "platform": "shopee",
        "url": "https://...",
        "status": "success",
        "duration": 2345,
        "createdAt": "2025-01-15T10:30:00Z"
      }
    ],
    "stats": {
      "totalScrapes": 1234,
      "successRate": 98.5,
      "avgDuration": 2100
    }
  }
}
```

## 🔄 Webhooks

### Shopee Webhook (Future)
Handle updates dari Shopee affiliate API.

#### `POST /api/webhooks/shopee`

### TikTok Webhook (Future)
Handle updates dari TikTok Shop Creator Center.

#### `POST /api/webhooks/tiktok`

## ⚠️ Error Responses

All API endpoints follow consistent error response format:

```json
{
  "success": false,
  "error": {
    "code": "PRODUCT_NOT_FOUND",
    "message": "Product with slug 'invalid-slug' not found",
    "statusCode": 404
  }
}
```

### Common Error Codes

- `400` - Bad Request (validation error)
- `401` - Unauthorized (missing/invalid auth)
- `404` - Not Found
- `429` - Rate Limit Exceeded
- `500` - Internal Server Error

## 🔒 Rate Limiting

Public API endpoints:
- 100 requests per minute per IP
- 1000 requests per hour per IP

Admin API endpoints:
- 1000 requests per minute
- No hourly limit

## 📦 Response Format

All successful responses follow this format:

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "timestamp": "2025-01-15T10:00:00Z",
    "version": "1.0"
  }
}
```

## 🧪 Testing

Use Postman collection: `docs/api/postman-collection.json` (TODO)

Base URL (development): `http://localhost:3000`
Base URL (production): `https://your-domain.com`

## 📝 Notes

- All dates are in ISO 8601 format (UTC)
- All prices are in Indonesian Rupiah (IDR)
- Images are served from CDN (Cloudinary/Vercel)
- Affiliate links are tracked through redirect
