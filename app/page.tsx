import { Search, TrendingUp, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/layout/Container';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="mb-4">
              <TrendingUp className="h-3 w-3 mr-1" />
              Platform Perbandingan Harga Terbaik
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Temukan Deal Terbaik dari
              <span className="text-primary"> Shopee</span> &
              <span className="text-primary"> TikTok Shop</span>
            </h1>
            
            <p className="text-xl text-muted-foreground">
              Bandingkan harga, baca review AI-powered, dan hemat lebih banyak untuk setiap belanjaan online kamu.
            </p>

            {/* Search Bar */}
            <div className="flex gap-2 max-w-xl mx-auto mt-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Cari produk, misalnya: powerbank 20000mah..."
                  className="pl-10 h-12"
                />
              </div>
              <Button size="lg" className="h-12">
                Cari
              </Button>
            </div>

            {/* Quick Tags */}
            <div className="flex flex-wrap gap-2 justify-center pt-4">
              <Badge variant="outline">📱 Gadget</Badge>
              <Badge variant="outline">👕 Fashion</Badge>
              <Badge variant="outline">🏠 Home & Living</Badge>
              <Badge variant="outline">💄 Beauty</Badge>
              <Badge variant="outline">⚡ Flash Sale</Badge>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-muted/50">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">150+</div>
              <div className="text-muted-foreground">Produk Terkurasi</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">4.8</div>
              <div className="text-muted-foreground">Rating Rata-rata</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">10K+</div>
              <div className="text-muted-foreground">Pengguna Puas</div>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Products - Placeholder */}
      <section className="py-16">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">Produk Trending</h2>
              <p className="text-muted-foreground mt-2">
                Produk paling populer minggu ini
              </p>
            </div>
            <Button variant="outline">
              Lihat Semua
            </Button>
          </div>

          {/* Placeholder Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-square rounded-lg bg-muted animate-pulse"
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Categories */}
      <section className="py-16 bg-muted/50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Jelajahi Kategori</h2>
            <p className="text-muted-foreground mt-2">
              Temukan produk berdasarkan kategori favoritmu
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <div
                key={category.name}
                className="flex flex-col items-center justify-center p-6 bg-background rounded-lg hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <div className="font-medium text-center">{category.name}</div>
                <div className="text-sm text-muted-foreground">
                  {category.count} produk
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <Container>
          <div className="bg-primary text-primary-foreground rounded-2xl p-12 text-center space-y-6">
            <ShoppingBag className="h-16 w-16 mx-auto" />
            <h2 className="text-3xl font-bold">
              Siap Hemat Lebih Banyak?
            </h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Mulai bandingkan harga dan temukan deal terbaik untuk produk favoritmu. 
              Gratis dan tanpa perlu daftar!
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Button size="lg" variant="secondary">
                Lihat Semua Produk
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Cara Kerja
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

// Dummy data
const categories = [
  { name: 'Electronics', icon: '📱', count: 45 },
  { name: 'Fashion', icon: '👕', count: 38 },
  { name: 'Home & Living', icon: '🏠', count: 29 },
  { name: 'Beauty', icon: '💄', count: 22 },
  { name: 'Sports', icon: '⚽', count: 15 },
  { name: 'Books', icon: '📚', count: 12 },
];
