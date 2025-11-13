# Features Documentation

> **Note**: Fokus MVP adalah **Backend First**. UI menyesuaikan dengan payload scraping.

---

## 🌐 Public Website Features (Simple MVP)

### Homepage
- **Hero Section**
  - Search bar (text-based)
  - Quick category tags
  
- **Featured Products Grid**
  - Trending/newest products
  - Platform badges (Shopee/TikTok)
  - Quick price comparison
  
- **Category Grid**
  - Visual category cards
  - Product count per category
  
- **Simple Stats Bar**
  - Total products
  - Shopee vs TikTok count

### Product Detail Page (KILLER FEATURE!)
- **Image Gallery**
  - Multiple product images from scraping
  - Simple carousel

- **Price Comparison** 🔥
  - Side-by-side: Shopee vs TikTok Shop
  - Show price, discount, rating, sold count
  - Savings calculator
  - Best deal indicator (AI recommendation)
  - Affiliate link buttons

- **AI Analysis**
  - Highlights (extracted from reviews)
  - Concerns (extracted from reviews)
  - Platform recommendation with reason

- **Reviews Section**
  - Top reviews from both platforms
  - Filter by platform
  - Rating breakdown

- **Specifications Table**
  - Product specs (scraped data)

### Product Listing Page
- **Filters**
  - Category
  - Platform (Shopee/TikTok/Both)
  - Sort by: Price, Rating, Newest
  
- **Product Grid**
  - Product cards with basic info
  - Quick view price comparison
  - Pagination

### Search
- Simple text search (name, category)
- No advanced NLP (keep it simple for MVP)

---

## 🛠️ Admin Dashboard Features

### Dashboard Home
- **Stats Cards**
  - Total products
  - Active/Inactive count
  - Total views/clicks
  - Estimated revenue
  
- **Recent Activity**
  - Recently added products
  - Failed scrapes

### Product Management
- **Add Product via URL**
  - Input Shopee URL → auto-scrape
  - Input TikTok URL → auto-scrape
  - Auto-fill form with scraped data
  - Option to edit before save
  
- **Product List Table**
  - Search & filter
  - Sort by date, views, clicks
  - Bulk actions (activate/deactivate/delete)
  - Quick edit inline
  - Status indicator (active/inactive)
  
- **Edit Product**
  - Update product info
  - Re-scrape data (refresh prices)
  - Regenerate AI analysis
  - View analytics

### Content Generator (AI)
- **Tweet Generator**
  - Select product
  - Generate tweet (3 variations)
  - Preview with character count
  - Copy to clipboard or post directly (manual for MVP)
  
- **Content Ideas**
  - AI suggest content themes
  - Product bundling ideas

### Analytics
- **Overview Stats**
  - Total views, clicks, revenue
  - Date range selector
  
- **Product Performance**
  - Top performing products
  - Views vs clicks comparison
  - Revenue per product
  
- **Platform Comparison**
  - Shopee vs TikTok clicks
  - Commission comparison

### Settings
- **API Keys**
  - Gemini AI API key
  - Twitter API keys (future)
  
- **Scraping Settings**
  - Auto-refresh interval
  - Max retries

---

## 🤖 AI Features

### Review Analysis (Gemini AI)
- **Input**: Array of reviews (from scraping)
- **Process**:
  - Sentiment analysis
  - Extract positive points (highlights)
  - Extract negative points (concerns)
  - Identify key themes
- **Output**: 
  - `highlights`: ["Point 1", "Point 2", ...]
  - `concerns`: ["Issue 1", "Issue 2", ...]
  - `recommendation`: "shopee" or "tiktok" + reason

### Platform Recommendation
- **Factors**:
  - Price difference
  - Rating difference
  - Review sentiment
  - Shipping cost
  - Commission (for admin view)
- **Output**: Best platform + explanation

### Content Generation
- **Tweet Generator**
  - Input: Product data
  - Output: Engaging tweet (max 280 chars)
  - Includes: product name, highlight, price, link
  
---

## ❌ Features NOT in MVP (Removed)

### Removed untuk simplicity:
- ❌ Advanced NLP search
- ❌ Comparison tool (3 products side-by-side)
- ❌ Blog/Collections pages
- ❌ Wishlist feature
- ❌ User accounts
- ❌ Auto-posting scheduler (manual untuk MVP)
- ❌ PWA / Installable app
- ❌ Dark mode toggle
- ❌ Social share buttons (just focus on Twitter)
- ❌ Chrome extension
- ❌ Price drop alerts

### Bisa ditambah Post-MVP:
- Twitter auto-posting bot
- Email/Telegram notifications
- More platforms (Tokopedia, Lazada)
- User reviews & ratings
- Community features

---

## 🎯 Core MVP Features (Final List)

### Public Site:
1. ✅ Homepage (hero + product grid)
2. ✅ Product listing (with filters)
3. ✅ Product detail (price comparison + AI analysis)
4. ✅ Simple search

### Admin Dashboard:
5. ✅ Stats dashboard
6. ✅ Add product via URL (scraper)
7. ✅ Product CRUD
8. ✅ AI content generator
9. ✅ Basic analytics

### Backend:
10. ✅ Shopee scraper
11. ✅ TikTok scraper
12. ✅ Gemini AI integration
13. ✅ API routes (CRUD)
14. ✅ Database (Prisma + PostgreSQL)
  - Select category & add tags
  - Click "Analyze with AI" → get highlights/concerns
  - Save as draft or publish immediately

- **Method 2: TikTok Product ID**
  - Enter TikTok Shop product ID
  - Auto-fetch via API (if available) or manual input
  - Input affiliate link
  - Select category & tags
  - AI analysis

- **Method 3: Manual Input**
  - Fill all fields manually
  - Upload images
  - Enter specifications
  - Add both Shopee & TikTok data if available

- **Method 4: Dual Platform** (BEST!)
  - Add Shopee URL + TikTok ID
  - System scrapes both
  - Auto-compare prices
  - AI suggests best platform

#### Product List (Table View)
- **Columns**:
  - Thumbnail
  - Name
  - Category
  - Shopee Price | TikTok Price
  - Rating (⭐)
  - Views | Clicks
  - Status (Active/Inactive/Draft)
  - Last Updated
  - Actions

- **Filters**:
  - Status (All/Active/Inactive/Draft)
  - Category
  - Platform (Both/Shopee Only/TikTok Only)
  - Date range
  - Performance (High/Medium/Low CTR)

- **Search**: By name, slug, tags

- **Sort**: 
  - Name (A-Z)
  - Views (High-Low)
  - Clicks (High-Low)
  - Latest added
  - Last updated

- **Bulk Actions**:
  - ✅ Activate selected
  - ❌ Deactivate selected
  - 🔄 Refresh prices (re-scrape)
  - 🗑️ Delete selected
  - 🏷️ Add tags to selected
  - 📂 Change category

- **Per-Product Actions**:
  - 👁️ View on website
  - ✏️ Edit
  - 🔄 Refresh data
  - 📊 View analytics
  - 🐦 Generate tweet
  - 📋 Duplicate
  - 🗑️ Delete

#### Edit Product
- **Basic Info Tab**:
  - Name, slug, category
  - Tags (multi-select)
  - Status toggle
  - Images gallery (add/remove/reorder)

- **Shopee Data Tab**:
  - URL, affiliate link
  - Price, original price, discount
  - Rating, review count, sold count
  - Shipping info
  - Commission percentage
  - Last scraped timestamp
  - 🔄 Refresh button

- **TikTok Data Tab**:
  - Product ID, affiliate link
  - Price, original price, discount
  - Rating, review count, sold count
  - Shipping info
  - Commission percentage
  - Last scraped timestamp
  - 🔄 Refresh button

- **AI Analysis Tab**:
  - Highlights (editable list)
  - Concerns (editable list)
  - Best platform recommendation
  - Overall recommendation text
  - 🤖 Re-analyze button

- **Specifications Tab**:
  - Key-value pairs
  - Add/remove fields
  - Markdown support

- **Reviews Tab** (Read-only, from scraper):
  - Filter by platform
  - Sort by rating/date/helpful
  - View review text & images
  - 🔄 Refresh reviews

- **Analytics Tab**:
  - Views over time (chart)
  - Clicks over time (chart)
  - Shopee vs TikTok clicks
  - CTR, conversion estimate
  - Revenue estimate

#### Bulk Import (Power User Feature)
- **Input**: Paste multiple URLs (one per line)
- **Process**:
  - Validate URLs
  - Queue for scraping
  - Show progress (5/10 completed)
  - Error handling (invalid URL, scrape failed)
- **Output**: 
  - Success count
  - Failed list with reasons
  - Auto-redirect to product list

### Content Generator

#### AI Tweet Generator
- **Select Product**:
  - Dropdown atau autocomplete
  - Show product thumbnail & name
  - Quick stats (price, rating)

- **Choose Style**:
  - 🔥 Viral (hype, FOMO, emoji-heavy)
  - 📖 Informative (specs, comparison, detailed)
  - ⭐ Review-based (testimonial, rating, pros/cons)
  - 💰 Deal Alert (discount focus, savings highlight)

- **Generate**:
  - Click "Generate 3 Variations"
  - AI creates 3 different tweets
  - Character count indicator (280 max)
  - Emoji suggestions
  - Hashtag suggestions

- **Preview**:
  - Mock Twitter card preview
  - Show image attachment
  - Link preview card

- **Edit**:
  - Inline editing
  - Add/remove hashtags
  - Attach custom images
  - Shorten links

- **Actions**:
  - 📤 Post Now
  - 📅 Schedule
  - 💾 Save as Draft
  - 🔄 Regenerate
  - 📋 Copy Text

#### Tweet Templates
- **Create Template**:
  - Name template
  - Write template with placeholders:
    - `{product_name}`
    - `{shopee_price}`
    - `{tiktok_price}`
    - `{savings}`
    - `{rating}`
    - `{highlight_1}`
  - Example: "🔥 {product_name} cuma {shopee_price}!\n\n✅ Rating {rating}⭐\n✅ {highlight_1}\n\nLink: {link}"

- **Use Template**:
  - Select template
  - Choose product
  - Auto-fill placeholders
  - Edit if needed
  - Post or schedule

#### Schedule Posts
- **Single Post**:
  - Pick date (calendar)
  - Pick time (dropdown: 09:00, 12:00, 15:00, 18:00, 21:00)
  - Preview scheduled time
  - Save to queue

- **Recurring Posts** (Future):
  - Daily at specific time
  - Weekly (choose days)
  - Best time auto (AI suggests based on past performance)

- **Bulk Schedule**:
  - Upload CSV (product_id, content, scheduled_time)
  - Preview all posts
  - Confirm & schedule

#### Content Calendar
- **Calendar View**:
  - Month/Week/Day view
  - Color-coded by status:
    - 🟡 Draft
    - 🔵 Scheduled
    - 🟢 Posted
    - 🔴 Failed
  
- **List View**:
  - Table with columns:
    - Thumbnail
    - Content (truncated)
    - Product Name
    - Platform (Twitter/Instagram)
    - Scheduled Time
    - Status
    - Actions

- **Actions**:
  - ✏️ Edit scheduled post
  - 🗑️ Delete
  - 📤 Post now (if scheduled)
  - 📋 Duplicate
  - 📊 View performance (if posted)

- **Filters**:
  - Status (All/Draft/Scheduled/Posted/Failed)
  - Date range
  - Product
  - Performance (High/Low engagement)

#### Post History
- **List of Posted Tweets**:
  - Content
  - Posted time
  - Stats: Impressions, Engagements, Link Clicks
  - CTR calculation
  - Revenue attributed
  
- **Performance Analysis**:
  - Best performing tweets (by engagement)
  - Worst performing (to learn)
  - Optimal posting times heatmap
  - Hashtag performance

#### Content Ideas (AI-Powered)
- **Trending Products Alert**:
  - AI suggests products with rising views
  - "Product X views up 150% → Create post?"

- **Comparison Posts**:
  - "Powerbank A vs Powerbank B" comparison
  - Side-by-side template

- **Seasonal Content**:
  - "Back to School Essentials"
  - "Ramadan Gift Guide"
  - "Year End Sale Roundup"

- **Hashtag Suggestions**:
  - AI analyzes trending hashtags
  - Suggests relevant ones for each post

### Analytics Dashboard

#### Overview Tab
- **Date Range Selector**:
  - Quick options: Today, Yesterday, Last 7 days, Last 30 days, This Month, Last Month
  - Custom range picker

- **Summary Stats** (with trend indicators):
  - 👁️ Total Views: 15,234 (↑ 12% vs last period)
  - 🖱️ Total Clicks: 1,089 (↑ 8%)
  - 📊 CTR: 7.15% (↓ 2%)
  - 💰 Estimated Revenue: Rp 2,450,000 (↑ 15%)
  - ✅ Conversions: 156 (↑ 10%)
  - 🏆 Top Product: [Name] (89 clicks)

- **Charts**:
  - **Traffic Over Time**: Line chart (views, clicks, conversions)
  - **Platform Breakdown**: Donut chart (Shopee 48%, TikTok 52%)
  - **Revenue by Category**: Bar chart
  - **Hourly Heatmap**: Best traffic times

- **Traffic Sources** (if tracked):
  - Direct: 45%
  - Organic Search: 30%
  - Social Media: 20%
  - Referral: 5%

- **Conversion Funnel**:
  - Views → Clicks → Conversions
  - Visual funnel chart with drop-off rates

#### Product Analytics Tab
- **Top Performing Products**:
  - Table with:
    - Product Name
    - Views
    - Clicks
    - CTR
    - Conversions
    - Revenue
    - Rank (↑↓)
  
- **Filters**:
  - Category
  - Platform (Both/Shopee/TikTok)
  - Date range
  - Sort by (Views/Clicks/Revenue)

- **Per-Product Deep Dive** (click to view):
  - Views/Clicks trend chart
  - Platform breakdown (Shopee vs TikTok clicks)
  - Revenue attribution
  - Best performing tweets for this product
  - Review sentiment over time
  - Competitor comparison (if available)

- **Underperforming Products Alert**:
  - Products with <1% CTR
  - Products with zero clicks (last 7 days)
  - Suggested actions: refresh data, improve description, create tweet

#### Platform Comparison Tab
- **Shopee vs TikTok**:
  - Side-by-side comparison cards:
    - Total Clicks
    - Average Commission Rate
    - Estimated Revenue
    - Conversion Rate
    - Average Order Value (if available)

- **Trend Chart**:
  - Line chart showing clicks over time for both platforms
  - Identify which platform is growing faster

- **Best Sellers per Platform**:
  - Top 10 products on Shopee
  - Top 10 products on TikTok
  - Compare overlap

- **Insights**:
  - "TikTok clicks are up 23% this week"
  - "Shopee has higher conversion rate (4.2% vs 3.1%)"
  - "Electronics perform better on Shopee"
  - "Fashion performs better on TikTok"

#### Twitter Analytics Tab
- **Overview**:
  - Total Tweets Posted: 145
  - Total Impressions: 234,567
  - Total Engagements: 12,345
  - Engagement Rate: 5.27%
  - Total Link Clicks: 1,234
  - Link CTR: 0.53%

- **Best Performing Tweets**:
  - Table sorted by engagement
  - Columns: Tweet, Posted, Impressions, Engagements, Link Clicks, Product
  - Click to see full tweet + stats

- **Worst Performing** (to learn):
  - Identify patterns (time, style, product type)

- **Posting Times Analysis**:
  - Heatmap: Best times to post (day × hour)
  - Recommendation: "Post at 12 PM or 6 PM for best results"

- **Hashtag Performance**:
  - List of hashtags used
  - Average engagement per hashtag
  - Trending hashtags in niche

- **Content Style Analysis**:
  - Which style performs best:
    - Viral: 6.2% engagement
    - Informative: 4.8%
    - Review: 5.5%
    - Deal Alert: 7.1% ✅ Best!

#### Category Analytics Tab
- **Performance by Category**:
  - Table: Category, Products, Views, Clicks, CTR, Revenue
  - Sort by revenue to find most profitable

- **Category Trends**:
  - Growing categories (↑ views/clicks)
  - Declining categories (↓)
  - Seasonal patterns

- **Recommendations**:
  - "Add more products in 'Electronics' (high CTR: 8.2%)"
  - "Consider removing 'Books' (low CTR: 1.1%)"

#### Export & Reports
- **Export Options**:
  - CSV (raw data)
  - PDF (formatted report with charts)
  - Excel (with pivot tables)
  - Date range selection
  - Choose metrics to include

- **Automated Reports** (Future):
  - Weekly email summary
  - Monthly performance report
  - Alert on significant changes (spike or drop)

- **Shareable Links** (Future):
  - Generate public dashboard link (read-only)
  - For sharing with partners/investors

#### Custom Dashboards (Future)
- **Create Custom Views**:
  - Drag & drop widgets
  - Choose metrics to display
  - Save multiple dashboard layouts
  - Examples: "Daily Morning Briefing", "Weekly Review", "Month-End Report"

### Settings
- **API Keys Management**
  - Shopee credentials
  - TikTok API keys
  - Gemini AI key
  - Twitter API keys
  - Test connection buttons

- **Website Settings**
  - Site name, URL, description
  - Social links
  - SEO meta tags
  - Google Analytics ID

- **Auto-Posting Rules**
  - Enable/disable
  - Schedule frequency
  - Posting times
  - Content style preferences
  - Filter criteria (rating, sold, discount)

### Scraper Tools

#### Manual Scrape
- **Single Product Scraper**:
  - Input: URL (Shopee or TikTok)
  - Click "Scrape Now"
  - Live progress indicator
  - Preview scraped data before saving
  - Options:
    - Save as new product
    - Update existing product
    - Just preview (don't save)

- **Batch Scraper**:
  - Upload CSV with URLs
  - Or paste multiple URLs
  - Queue for batch processing
  - Progress: "Processing 5/10..."
  - Results summary: Success vs Failed
  - Export failed URLs for retry

#### Auto-Scrape Settings
- **Schedule Configuration**:
  - Enable/Disable auto-scraping
  - Frequency: 
    - Every 6 hours
    - Every 12 hours
    - Daily at specific time
    - Custom cron expression
  
- **Scrape Targets**:
  - All active products
  - Only products with clicks (last 7 days)
  - Specific categories
  - Products with price change detection

- **What to Update**:
  - ✅ Price & discount
  - ✅ Stock status
  - ✅ Rating & review count
  - ✅ Sold count
  - ❌ Reviews (too heavy, manual trigger only)

- **Notifications**:
  - Email when price drops significantly (>20%)
  - Alert when product out of stock
  - Daily scrape summary

#### Scrape History & Logs
- **Log Table**:
  - Timestamp
  - Platform (Shopee/TikTok)
  - URL
  - Status (Success/Failed)
  - Duration (ms)
  - Error message (if failed)
  - Actions: Retry, View Details

- **Filters**:
  - Platform
  - Status (All/Success/Failed)
  - Date range

- **Statistics**:
  - Total scrapes (all time)
  - Success rate: 98.5%
  - Average duration: 2.1s
  - Failed scrapes today: 2

- **Failed Scrapes Actions**:
  - Retry all failed
  - Identify problematic URLs
  - Debug mode (show raw HTML)

#### Price Change Alerts
- **Price Drop Detected**:
  - Show products with price drops
  - Old price → New price
  - % discount increase
  - Suggested action: "Create tweet about this deal!"

- **Price History** (per product):
  - Line chart showing price over time
  - Both Shopee & TikTok
  - Identify best time to promote

#### Debug Tools (Advanced)
- **Test Scraper**:
  - Input URL
  - Run scraper with verbose logs
  - Show extracted HTML elements
  - Show parsing steps
  - Useful for debugging when scraper breaks

- **Selector Tester**:
  - Test CSS selectors on live pages
  - Update scraper selectors if site structure changes

- **Rate Limiting Info**:
  - Requests per minute
  - Current usage
  - Cooldown timer
  - Warning if approaching limit

---

## 🤖 AI Features

### Review Analysis
- **Input**: Product reviews (scraped)
- **Process**: 
  - Sentiment analysis
  - Extract highlights (positive points)
  - Extract concerns (negative points)
  - Identify common themes
- **Output**: Structured insights

### Platform Recommendation
- **Input**: Product data from both platforms
- **Process**:
  - Compare prices
  - Compare ratings & reviews
  - Consider shipping
  - Factor in commission (for admin view)
- **Output**: Best platform + reason

### Content Generation
- **Tweet Generator**
  - Input: Product data
  - Output: Engaging tweet (3 variations)
  - Style: Viral, informative, review-based
  - Include: stats, highlights, links

- **SEO Content**
  - Generate meta descriptions
  - Suggest blog post titles
  - Create product descriptions

### Smart Search
- **Natural Language Processing**
  - Parse user intent
  - Extract: category, features, budget
  - Auto-apply filters
  - Rank results by relevance

---

## 🔐 Security & Privacy

- **No User Accounts** (for public)
  - No PII collected
  - localStorage only (client-side)
  
- **Admin Protection**
  - Basic auth (username/password)
  - Rate limiting on API
  - CSRF protection

- **Data Privacy**
  - No user tracking beyond analytics
  - Affiliate links disclosed
  - Cookie consent (if needed)

---

## 📊 Analytics & Tracking

### User Analytics (Anonymous)
- Page views
- Session duration
- Click-through rate
- Bounce rate
- Traffic sources

### Affiliate Tracking
- Link clicks per platform
- Conversion estimation
- Revenue per product
- Best performing categories

### Content Performance
- Tweet impressions
- Engagement rate
- Link clicks from social
- Best posting times

---

## 🚀 Future Features (Post-MVP)

### Phase 2
- [ ] Email/Telegram alerts (price drops)
- [ ] Wishlist sync across devices
- [ ] User reviews & ratings
- [ ] Comparison history

### Phase 3
- [ ] Chrome extension (price tracker)
- [ ] Mobile app (React Native)
- [ ] Instagram integration
- [ ] TikTok video integration

### Phase 4
- [ ] Affiliate program for users
- [ ] Community features
- [ ] Live shopping integration
- [ ] AI chatbot for recommendations