# Affiliate Shopee & TikTok Shop - Documentation

> Aplikasi affiliate marketing yang membandingkan harga produk di Shopee dan TikTok Shop, dengan AI-powered content generation dan analytics.

---

## 📚 Documentation Index

### 🎯 Overview & Planning
- **[Project Overview](./PROJECTOVERVIEW.md)** - Tujuan, monetization strategy, USP, dan success metrics
- **[Roadmap](./ROADMAP.md)** - MVP timeline, implementation plan, dan launch checklist
- **[Tech Stack Decisions](./TECHSTACK.md)** - Technology choices dan reasoning

### 🚀 Development
- **[Development Guide](./DEVELOPMENT.md)** - Setup, workflow, common tasks, dan debugging
- **[Architecture](./architecture/README.md)** - System design, data flow, dan deployment strategy

### 📦 Technical Documentation
- **[Database Schema](./database/README.md)** - Tables, relationships, queries, dan optimization
- **[API Documentation](./api/README.md)** - Endpoints, request/response formats, dan examples
- **[Features](./features/README.md)** - Public website dan admin dashboard features

---

## 🚀 Quick Start

```bash
# 1. Clone & Install
git clone <repo-url>
cd affiliate-shopee-tiktok
npm install

# 2. Setup Environment
cp .env.example .env.local
# Edit .env.local with your values

# 3. Database Setup
npx prisma generate
npx prisma db push
npx prisma db seed

# 4. Run Development Server
npm run dev
# Open http://localhost:3000
```

**Next Steps**: Read [Development Guide](./DEVELOPMENT.md) for detailed workflow.

---

## 🎯 Project Structure

```
affiliate-shopee-tiktok/
├── app/                    # Next.js App Router (pages & API)
│   ├── (public)/          # Public website pages
│   ├── admin/             # Admin dashboard
│   └── api/               # API endpoints
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── products/         # Product-related components
│   └── admin/            # Admin components
├── lib/                   # Libraries & utilities
│   ├── db.ts             # Prisma client
│   ├── scraper/          # Web scraping logic
│   ├── ai/               # AI/OpenAI integration
│   └── validators/       # Zod schemas
├── prisma/                # Database
│   ├── schema.prisma     # Database schema
│   └── migrations/       # Migration files
└── docs/                  # Documentation (you are here!)
```

---

## 🛠️ Tech Stack

| Category | Technology | Why? |
|----------|-----------|------|
| **Framework** | Next.js 15 | SSR, SEO, DX |
| **Database** | PostgreSQL | Relational data, reliable |
| **ORM** | Prisma | Type-safe, great DX |
| **Styling** | Tailwind CSS | Fast development |
| **UI Components** | shadcn/ui | Flexible, beautiful |
| **AI** | OpenAI GPT-4 | Content generation, analysis |
| **Scraping** | Puppeteer | JS-heavy e-commerce sites |
| **Hosting** | Vercel | Zero-config, great DX |
| **Storage** | Cloudinary | Image optimization |

**See [Tech Stack Decisions](./TECHSTACK.md) for detailed reasoning.**

---

## 📖 Key Concepts

### The Business Model
1. **Curate** viral products from Shopee & TikTok Shop
2. **Compare** prices between platforms
3. **Recommend** best deal (with AI analysis)
4. **Earn** affiliate commission when users buy
5. **Automate** content creation for social media

### Unique Selling Points
- 🎯 **Dual Platform Comparison** (Shopee vs TikTok)
- 🤖 **AI-Powered Insights** (review analysis, content generation)
- 💰 **Full Transparency** (show savings, disclose affiliate)
- ⚡ **Fast & Simple** (no account needed)

### Target Users
- **Public**: Deal hunters, online shoppers (18-35 years old)
- **Admin**: Content creator (you!) managing products & content

---

## 🔗 Important Links

### Documentation
- 📋 [Project Overview](./PROJECTOVERVIEW.md) - Start here!
- 🚀 [Roadmap](./ROADMAP.md) - MVP plan & timeline
- 💻 [Development Guide](./DEVELOPMENT.md) - How to develop
- 🏗️ [Architecture](./architecture/README.md) - System design
- 🗄️ [Database](./database/README.md) - Schema & queries
- 🌐 [API Docs](./api/README.md) - Endpoints reference
- ✨ [Features](./features/README.md) - What the app does

### External Resources
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)

---

## 🎯 Current Status

**Phase**: Week 1 - Foundation ✅
**Progress**: 
- [x] Project structure setup
- [x] Database schema designed
- [x] Documentation completed
- [ ] Basic UI components
- [ ] First product page

**Next Milestone**: Basic website UI by Nov 21, 2025

See [Roadmap](./ROADMAP.md) for detailed timeline.

---

## 🐛 Troubleshooting

### Common Issues

**"Prisma Client not found"**
```bash
npx prisma generate
```

**Port 3000 already in use**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Database out of sync**
```bash
npx prisma db push
```

**More help**: See [Development Guide](./DEVELOPMENT.md#debugging)

---

## � Contributing Guidelines

### For Solo Development
1. Work on feature branches
2. Commit often with clear messages
3. Test before merging to main
4. Update docs when adding features

### Commit Convention
```
feat: add new feature
fix: fix bug
docs: update documentation
style: formatting
refactor: code restructuring
test: add tests
chore: dependencies, config
```

---

## 📞 Support & Feedback

**Questions?** Create an issue or check existing documentation.

**Bug Found?** Note in `TODO.md` or create GitHub issue.

**Feature Idea?** Add to feature backlog.

---

## 📄 License

MIT License - feel free to use this for your own projects!

---

## 🙏 Acknowledgments

- **Next.js** team for amazing framework
- **Prisma** for excellent ORM
- **shadcn** for beautiful UI components
- **Vercel** for hosting platform
- **OpenAI** for AI capabilities

---

## 🔄 Documentation Updates

| Date | Update |
|------|--------|
| 2025-11-15 | Initial documentation complete |
| TBD | API examples added |
| TBD | Deployment guide |

---

**Ready to build?** Start with [Development Guide](./DEVELOPMENT.md) 🚀