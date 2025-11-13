# 🛒 Affiliate Shopee & TikTok Shop

> Platform affiliate marketing yang membandingkan harga produk di Shopee dan TikTok Shop, dengan AI-powered insights dan content automation.

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-brightgreen)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8)](https://tailwindcss.com/)

---

## 🎯 What is This?

Website affiliate yang membantu user menemukan **deal terbaik** untuk produk viral dengan:
- 💰 **Price Comparison**: Bandingkan harga Shopee vs TikTok Shop
- 🤖 **AI Analysis**: Review analysis otomatis & rekomendasi platform terbaik
- 📊 **Smart Analytics**: Track performance & optimize affiliate strategy
- 🚀 **Content Automation**: Generate social media content otomatis

**Target**: Rp 1-5 juta/bulan (3 bulan pertama) dari affiliate commission.

---

## ✨ Key Features

### For Users (Public Website)
- ✅ Browse curated products with price comparison
- ✅ AI-powered product insights (pros, cons, recommendation)
- ✅ Platform recommendation (best deal: Shopee or TikTok?)
- ✅ Search & filter products
- ✅ Category browsing
- ✅ Direct affiliate links

### For Admin (Dashboard)
- 📦 Product management (add, edit, delete)
- 🔄 Auto-scraping (Shopee & TikTok)
- 🤖 AI content generation (tweets, captions)
- 📊 Analytics dashboard (views, clicks, revenue)
- 🐦 Twitter integration (schedule posts)
- 📈 Performance tracking per product

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (recommend 20 LTS)
- npm or pnpm
- Git

### Installation

```bash
# 1. Clone repository
git clone <your-repo-url>
cd affiliate-shopee-tiktok

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env.local

# Edit .env.local:
# DATABASE_URL="file:./dev.db"
# ADMIN_SECRET="your-secret-key"
# OPENAI_API_KEY="sk-..."
# (See .env.example for all variables)

# 4. Setup database
npx prisma generate
npx prisma db push
npx prisma db seed  # Optional: add sample data

# 5. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 📂 Project Structure

```
affiliate-shopee-tiktok/
├── app/                    # Next.js App Router
│   ├── (public)/          # Public website pages
│   │   ├── page.tsx       # Homepage
│   │   ├── products/      # Product pages
│   │   └── search/        # Search page
│   ├── admin/             # Admin dashboard
│   └── api/               # API endpoints
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── products/         # Product components
│   └── admin/            # Admin components
├── lib/                   # Utilities & services
│   ├── db.ts             # Prisma client
│   ├── scraper/          # Web scraping logic
│   ├── ai/               # AI integration
│   └── validators/       # Zod schemas
├── prisma/                # Database
│   ├── schema.prisma     # Schema definition
│   └── migrations/       # Migration files
├── docs/                  # Documentation
└── public/                # Static assets
```

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router, SSR)
- **Language**: TypeScript
- **Database**: PostgreSQL (prod) / SQLite (dev)
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **AI**: OpenAI GPT-4
- **Scraping**: Puppeteer
- **Hosting**: Vercel
- **Storage**: Cloudinary

**See [docs/TECHSTACK.md](./docs/TECHSTACK.md) for detailed reasoning.**

---

## 📖 Documentation

Comprehensive documentation available in `/docs`:

- 📋 **[Project Overview](./docs/PROJECTOVERVIEW.md)** - Goals, monetization, USP
- 🗺️ **[Roadmap](./docs/ROADMAP.md)** - MVP timeline & implementation plan
- 💻 **[Development Guide](./docs/DEVELOPMENT.md)** - Setup, workflow, debugging
- 🏗️ **[Architecture](./docs/architecture/README.md)** - System design & data flow
- 🗄️ **[Database](./docs/database/README.md)** - Schema, queries, optimization
- 🌐 **[API Docs](./docs/api/README.md)** - Endpoints & examples
- ✨ **[Features](./docs/features/README.md)** - Complete feature list

**Start here**: [docs/README.md](./docs/README.md)

---

## 🧪 Development

### Available Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint

# Database
npx prisma studio        # Open database GUI
npx prisma generate      # Generate Prisma Client
npx prisma db push       # Push schema changes
npx prisma db seed       # Seed database
npx prisma migrate dev   # Create migration

# Useful
npm run db:reset         # Reset database (dev only!)
```

### Environment Variables

Create `.env.local` with:

```bash
# Database
DATABASE_URL="file:./dev.db"

# Admin
ADMIN_SECRET="your-secret-key"

# OpenAI
OPENAI_API_KEY="sk-..."

# Affiliate (optional for MVP)
SHOPEE_AFFILIATE_ID="..."
TIKTOK_AFFILIATE_ID="..."

# See .env.example for all variables
```

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Set environment variables
4. Deploy!

Vercel auto-deploys on every push to `main` branch.

**See [docs/DEVELOPMENT.md#deployment](./docs/DEVELOPMENT.md#deployment) for details.**

---

## 🎯 Roadmap

**Current Phase**: Week 1 - Foundation ✅

### MVP Timeline (6 weeks)
- **Week 1**: Foundation & database ✅
- **Week 2**: Public website (product pages)
- **Week 3**: Admin dashboard (product management)
- **Week 4**: Web scraping (auto-update prices)
- **Week 5**: AI features (review analysis, content generation)
- **Week 6**: Polish & launch 🚀

**Target Launch**: End of December 2025

**See [docs/ROADMAP.md](./docs/ROADMAP.md) for detailed timeline.**

---

## 🤝 Contributing

This is a personal project, but feedback and suggestions are welcome!

### How to Contribute
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Commit Convention
Follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation
- `style:` formatting
- `refactor:` code restructuring
- `test:` add tests
- `chore:` maintenance

---

## 📝 License

MIT License - see [LICENSE](./LICENSE) file for details.

Feel free to use this project as reference for your own work!

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - Amazing React framework
- [Prisma](https://www.prisma.io/) - Excellent database ORM
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Vercel](https://vercel.com/) - Deployment platform
- [OpenAI](https://openai.com/) - AI capabilities

---

## 📞 Contact & Support

**Questions?** Check [docs/](./docs/) or create an issue.

**Found a bug?** Create an issue with details.

**Feature request?** Add to discussions or TODO.md.

---

## 🔗 Links

- 📚 [Full Documentation](./docs/README.md)
- 🎯 [Project Overview](./docs/PROJECTOVERVIEW.md)
- 🗺️ [Roadmap](./docs/ROADMAP.md)
- ✅ [TODO List](./TODO.md)

---

**Built with ❤️ by [Your Name]**

**Last Updated**: 2025-11-15
