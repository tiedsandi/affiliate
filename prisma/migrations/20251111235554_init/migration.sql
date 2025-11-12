-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "images" TEXT NOT NULL DEFAULT '[]',
    "shopeeUrl" TEXT,
    "shopeePrice" INTEGER,
    "shopeeOriginalPrice" INTEGER,
    "shopeeDiscount" INTEGER,
    "shopeeRating" REAL,
    "shopeeReviewCount" INTEGER,
    "shopeeSold" INTEGER,
    "shopeeShipping" TEXT,
    "shopeeAffiliateLink" TEXT,
    "shopeeCommission" REAL NOT NULL DEFAULT 0.03,
    "tiktokProductId" TEXT,
    "tiktokPrice" INTEGER,
    "tiktokOriginalPrice" INTEGER,
    "tiktokDiscount" INTEGER,
    "tiktokRating" REAL,
    "tiktokReviewCount" INTEGER,
    "tiktokSold" INTEGER,
    "tiktokShipping" TEXT,
    "tiktokAffiliateLink" TEXT,
    "tiktokCommission" REAL,
    "aiHighlights" TEXT NOT NULL DEFAULT '[]',
    "aiConcerns" TEXT NOT NULL DEFAULT '[]',
    "aiBestPlatform" TEXT,
    "aiRecommendation" TEXT,
    "specifications" TEXT NOT NULL DEFAULT '{}',
    "views" INTEGER NOT NULL DEFAULT 0,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "shopeeClicks" INTEGER NOT NULL DEFAULT 0,
    "tiktokClicks" INTEGER NOT NULL DEFAULT 0,
    "conversions" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "lastScraped" DATETIME
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "helpful" INTEGER NOT NULL DEFAULT 0,
    "images" TEXT NOT NULL DEFAULT '[]',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Analytics" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "views" INTEGER NOT NULL DEFAULT 0,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "shopeeClicks" INTEGER NOT NULL DEFAULT 0,
    "tiktokClicks" INTEGER NOT NULL DEFAULT 0,
    "estimatedRevenue" REAL NOT NULL DEFAULT 0,
    "topProducts" TEXT NOT NULL DEFAULT '[]'
);

-- CreateTable
CREATE TABLE "TwitterPost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "tweetId" TEXT,
    "content" TEXT NOT NULL,
    "mediaUrls" TEXT NOT NULL DEFAULT '[]',
    "impressions" INTEGER NOT NULL DEFAULT 0,
    "engagements" INTEGER NOT NULL DEFAULT 0,
    "linkClicks" INTEGER NOT NULL DEFAULT 0,
    "scheduledAt" DATETIME,
    "postedAt" DATETIME,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ScrapeLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "platform" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "error" TEXT,
    "duration" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- CreateIndex
CREATE INDEX "Review_productId_idx" ON "Review"("productId");

-- CreateIndex
CREATE INDEX "Review_platform_idx" ON "Review"("platform");

-- CreateIndex
CREATE INDEX "Analytics_date_idx" ON "Analytics"("date");

-- CreateIndex
CREATE INDEX "TwitterPost_productId_idx" ON "TwitterPost"("productId");

-- CreateIndex
CREATE INDEX "TwitterPost_status_idx" ON "TwitterPost"("status");

-- CreateIndex
CREATE INDEX "ScrapeLog_platform_idx" ON "ScrapeLog"("platform");

-- CreateIndex
CREATE INDEX "ScrapeLog_status_idx" ON "ScrapeLog"("status");

-- CreateIndex
CREATE INDEX "ScrapeLog_createdAt_idx" ON "ScrapeLog"("createdAt");
