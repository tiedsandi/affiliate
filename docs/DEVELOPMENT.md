# Development Workflow

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (recommend 20 LTS)
- npm or pnpm
- Git
- VS Code (recommended)

### Initial Setup

```bash
# 1. Clone repository
git clone <repo-url>
cd affiliate-shopee-tiktok

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env.local

# Edit .env.local with your values:
# DATABASE_URL="file:./dev.db"
# ADMIN_SECRET="your-secret-here"
# OPENAI_API_KEY="sk-..."

# 4. Setup database
npx prisma generate
npx prisma db push
npx prisma db seed  # Optional: seed with sample data

# 5. Run development server
npm run dev

# Open http://localhost:3000
```

### Project Structure Quick Reference

```
app/              → Next.js pages & API routes
components/       → React components
lib/              → Utilities, helpers, services
prisma/           → Database schema & migrations
docs/             → Documentation (you are here!)
public/           → Static assets
```

## 🛠️ Development Workflow

### Daily Workflow

1. **Pull latest changes**
   ```bash
   git pull origin main
   ```

2. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Start dev server**
   ```bash
   npm run dev
   ```

4. **Make changes** (code, test, commit)

5. **Commit with descriptive message**
   ```bash
   git add .
   git commit -m "feat: add price comparison component"
   ```

6. **Push to remote**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create Pull Request** (if team project)

### Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new feature
fix: fix bug
docs: update documentation
style: formatting, missing semicolons, etc.
refactor: code restructuring
test: add tests
chore: update dependencies, config
```

Examples:
```
feat: add product comparison modal
fix: scraper failing on out-of-stock products
docs: update API documentation
refactor: optimize product query performance
```

## 📝 Common Development Tasks

### Database

#### Add new field to Product
```bash
# 1. Edit prisma/schema.prisma
# Add field, e.g.:
# newField String?

# 2. Push changes to DB
npx prisma db push

# 3. Regenerate Prisma Client
npx prisma generate
```

#### View database in GUI
```bash
npx prisma studio
# Opens at http://localhost:5555
```

#### Reset database (development only!)
```bash
npx prisma migrate reset
# This will delete all data!
```

### Creating New Components

#### 1. UI Component (shadcn)
```bash
npx shadcn@latest add [component-name]
# Example: npx shadcn@latest add dialog
```

#### 2. Feature Component
```bash
# Create file: components/products/ProductCard.tsx
```

```typescript
import { Card } from '@/components/ui/card';

interface ProductCardProps {
  product: {
    name: string;
    price: number;
    image: string;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>Rp {product.price.toLocaleString('id-ID')}</p>
    </Card>
  );
}
```

### Creating New API Endpoints

#### Example: GET /api/products/trending

```typescript
// app/api/products/trending/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const products = await prisma.product.findMany({
      where: { status: 'active' },
      orderBy: [
        { views: 'desc' },
        { clicks: 'desc' }
      ],
      take: 10
    });
    
    return NextResponse.json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error('Error fetching trending:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch trending products' 
      },
      { status: 500 }
    );
  }
}
```

### Adding New Page

#### Example: Category Page

```typescript
// app/categories/[slug]/page.tsx
import { prisma } from '@/lib/db';
import { ProductGrid } from '@/components/products/ProductGrid';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const products = await prisma.product.findMany({
    where: {
      category: params.slug,
      status: 'active'
    }
  });
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        {params.slug}
      </h1>
      <ProductGrid products={products} />
    </div>
  );
}

// Generate static params (optional, for SSG)
export async function generateStaticParams() {
  const categories = await prisma.product.findMany({
    select: { category: true },
    distinct: ['category']
  });
  
  return categories.map(c => ({
    slug: c.category.toLowerCase()
  }));
}
```

### Working with AI (OpenAI)

```typescript
// lib/ai/analyze-reviews.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function analyzeReviews(reviews: string[]) {
  const prompt = `Analyze these product reviews and provide:
1. 3 highlights (positive aspects)
2. 3 concerns (negative aspects)
3. Overall recommendation (1-2 sentences)

Reviews:
${reviews.join('\n---\n')}

Return JSON format:
{
  "highlights": [...],
  "concerns": [...],
  "recommendation": "..."
}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are a product review analyzer." },
      { role: "user", content: prompt }
    ],
    temperature: 0.3,
    response_format: { type: "json_object" }
  });
  
  return JSON.parse(completion.choices[0].message.content!);
}
```

### Web Scraping

```typescript
// lib/scraper/shopee.ts
import puppeteer from 'puppeteer';

export async function scrapeShopeeProduct(url: string) {
  const browser = await puppeteer.launch({ 
    headless: true 
  });
  
  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    // Extract data
    const data = await page.evaluate(() => {
      return {
        name: document.querySelector('.product-name')?.textContent,
        price: document.querySelector('.price')?.textContent,
        // ... more selectors
      };
    });
    
    return data;
  } finally {
    await browser.close();
  }
}
```

## 🧪 Testing

### Manual Testing Checklist

#### New Feature
- [ ] Feature works as expected
- [ ] No console errors
- [ ] Responsive on mobile
- [ ] Fast loading (<3s)
- [ ] Accessible (keyboard navigation, screen reader)

#### Before Commit
- [ ] No TypeScript errors: `npm run build`
- [ ] No ESLint warnings: `npm run lint`
- [ ] Database schema in sync: `npx prisma generate`
- [ ] Test in dev environment

### Automated Testing (Future)

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e
```

## 🐛 Debugging

### Common Issues

#### "Prisma Client not found"
```bash
npx prisma generate
```

#### Port already in use (3000)
```bash
# Kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

#### Database out of sync
```bash
npx prisma db push
```

#### Environment variables not loading
- Make sure file is named `.env.local` (not `.env`)
- Restart dev server after changing env vars
- Check no typos in variable names

### Debug Mode

```typescript
// Enable verbose logging
const DEBUG = process.env.NODE_ENV === 'development';

if (DEBUG) {
  console.log('Debug info:', data);
}
```

### VS Code Debugging

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev"
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    }
  ]
}
```

## 📦 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import repository
   - Configure project

3. **Set Environment Variables**
   - Add all vars from `.env.local`
   - Use Production values (PostgreSQL URL, etc.)

4. **Deploy**
   - Vercel auto-deploys on push to `main`
   - Preview deployments for PRs

### Pre-Deployment Checklist

- [ ] Update `DATABASE_URL` to production (PostgreSQL)
- [ ] Run migrations: `npx prisma migrate deploy`
- [ ] Set all required env vars in Vercel
- [ ] Test build locally: `npm run build`
- [ ] Update `next.config.ts` if needed (domains, etc.)
- [ ] Check `.env.example` is up to date

### Database Migration (Production)

```bash
# From local machine, connected to prod DB
DATABASE_URL="postgresql://..." npx prisma migrate deploy
```

Or use Vercel CLI:
```bash
vercel env pull .env.production
npx prisma migrate deploy
```

## 🔧 Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run format           # Format with Prettier (if configured)

# Database
npx prisma studio        # Open Prisma Studio
npx prisma generate      # Generate Prisma Client
npx prisma db push       # Push schema changes
npx prisma db seed       # Seed database
npx prisma migrate dev   # Create migration
npx prisma migrate reset # Reset DB (dev only!)

# Dependencies
npm install              # Install deps
npm update               # Update deps
npm outdated             # Check outdated packages
npm audit                # Security audit

# Git
git status               # Check status
git log --oneline        # View commits
git branch               # List branches
git checkout -b feat/X   # Create branch
git merge main           # Merge main into current
```

## 📚 Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)

### Learning
- [Next.js Learn](https://nextjs.org/learn)
- [Prisma Quickstart](https://www.prisma.io/docs/getting-started/quickstart)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

### Tools
- [Excalidraw](https://excalidraw.com/) - Diagrams
- [Figma](https://www.figma.com/) - Design
- [Postman](https://www.postman.com/) - API testing

## 💡 Tips & Best Practices

### Performance
- Use Server Components by default (no 'use client' unless needed)
- Optimize images with Next.js `<Image>` component
- Implement pagination for large lists
- Use `loading.tsx` for better UX
- Cache expensive operations

### Code Quality
- Follow TypeScript strict mode
- Use ESLint + Prettier
- Write descriptive variable names
- Add comments for complex logic
- Keep functions small and focused
- DRY (Don't Repeat Yourself)

### Security
- Never commit `.env.local`
- Validate all user inputs (Zod)
- Use parameterized queries (Prisma does this)
- Rate limit API endpoints
- Sanitize output to prevent XSS

### Git
- Commit often, small commits
- Write clear commit messages
- Create feature branches
- Don't commit node_modules
- Keep `.gitignore` updated

## 🎯 Next Steps

After setup, start with:

1. **Explore existing code**: Read through `app/`, `components/`, `lib/`
2. **Run the app**: `npm run dev` and browse around
3. **Open Prisma Studio**: See the database
4. **Pick a task**: Check TODO.md or project board
5. **Make a small change**: Add a console.log, change text
6. **Commit**: Practice the git workflow

Happy coding! 🚀
