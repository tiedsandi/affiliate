import { Suspense } from 'react';
import { Container } from '@/components/layout/Container';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { SlidersHorizontal } from 'lucide-react';

// Dummy data untuk testing
const dummyProducts = [
  {
    id: '1',
    name: 'Powerbank Anker 20000mAh Fast Charging USB-C',
    slug: 'powerbank-anker-20000mah',
    images: ['/placeholder-product.jpg'],
    category: 'Electronics',
    shopeePrice: 250000,
    tiktokPrice: 245000,
    shopeeRating: 4.8,
    tiktokRating: 4.9,
    views: 1250,
  },
  {
    id: '2',
    name: 'TWS Earbuds Bluetooth 5.0 Wireless',
    slug: 'tws-earbuds-bluetooth',
    images: ['/placeholder-product.jpg'],
    category: 'Electronics',
    shopeePrice: 150000,
    tiktokPrice: 155000,
    shopeeRating: 4.5,
    tiktokRating: 4.6,
    views: 890,
  },
  {
    id: '3',
    name: 'Smartwatch Sport Waterproof IP68',
    slug: 'smartwatch-sport-waterproof',
    images: ['/placeholder-product.jpg'],
    category: 'Electronics',
    shopeePrice: 320000,
    tiktokPrice: 299000,
    shopeeRating: 4.7,
    tiktokRating: 4.8,
    views: 2100,
  },
  {
    id: '4',
    name: 'Tas Ransel Laptop Anti Air 15.6 inch',
    slug: 'tas-ransel-laptop-anti-air',
    images: ['/placeholder-product.jpg'],
    category: 'Fashion',
    shopeePrice: 180000,
    tiktokPrice: 175000,
    shopeeRating: 4.6,
    tiktokRating: 4.7,
    views: 650,
  },
  {
    id: '5',
    name: 'Mouse Gaming RGB 6400 DPI',
    slug: 'mouse-gaming-rgb-6400dpi',
    images: ['/placeholder-product.jpg'],
    category: 'Electronics',
    shopeePrice: 125000,
    tiktokPrice: 130000,
    shopeeRating: 4.4,
    tiktokRating: 4.5,
    views: 450,
  },
  {
    id: '6',
    name: 'Keyboard Mechanical RGB Backlight',
    slug: 'keyboard-mechanical-rgb',
    images: ['/placeholder-product.jpg'],
    category: 'Electronics',
    shopeePrice: 450000,
    tiktokPrice: 440000,
    shopeeRating: 4.9,
    tiktokRating: 4.8,
    views: 1800,
  },
  {
    id: '7',
    name: 'Tumbler Stainless 500ml Thermos',
    slug: 'tumbler-stainless-500ml',
    images: ['/placeholder-product.jpg'],
    category: 'Home & Living',
    shopeePrice: 85000,
    tiktokPrice: 80000,
    shopeeRating: 4.3,
    tiktokRating: 4.4,
    views: 320,
  },
  {
    id: '8',
    name: 'Hoodie Oversize Unisex Premium',
    slug: 'hoodie-oversize-unisex',
    images: ['/placeholder-product.jpg'],
    category: 'Fashion',
    shopeePrice: 135000,
    tiktokPrice: 139000,
    shopeeRating: 4.7,
    tiktokRating: 4.6,
    views: 980,
  },
];

export default function ProductsPage() {
  return (
    <Container className="py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Semua Produk</h1>
        <p className="text-muted-foreground">
          Temukan produk terbaik dengan harga termurah
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 p-4 bg-muted/50 rounded-lg">
        <div className="flex-1">
          <label className="text-sm font-medium mb-2 block">Kategori</label>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Pilih kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Kategori</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="fashion">Fashion</SelectItem>
              <SelectItem value="home">Home & Living</SelectItem>
              <SelectItem value="beauty">Beauty</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1">
          <label className="text-sm font-medium mb-2 block">Urutkan</label>
          <Select defaultValue="newest">
            <SelectTrigger>
              <SelectValue placeholder="Urutkan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Terbaru</SelectItem>
              <SelectItem value="popular">Paling Populer</SelectItem>
              <SelectItem value="price-low">Harga: Rendah ke Tinggi</SelectItem>
              <SelectItem value="price-high">Harga: Tinggi ke Rendah</SelectItem>
              <SelectItem value="rating">Rating Tertinggi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1">
          <label className="text-sm font-medium mb-2 block">Platform</label>
          <Select defaultValue="both">
            <SelectTrigger>
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="both">Semua Platform</SelectItem>
              <SelectItem value="shopee">Shopee Saja</SelectItem>
              <SelectItem value="tiktok">TikTok Saja</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end">
          <Button variant="outline" className="w-full sm:w-auto">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filter Lanjutan
          </Button>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-sm text-muted-foreground">
        Menampilkan <span className="font-medium text-foreground">{dummyProducts.length}</span> produk
      </div>

      {/* Product Grid */}
      <Suspense fallback={<ProductGridSkeleton />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {dummyProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Suspense>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2">
        <Button variant="outline" disabled>
          Sebelumnya
        </Button>
        <Button variant="default">1</Button>
        <Button variant="outline">2</Button>
        <Button variant="outline">3</Button>
        <span className="px-2">...</span>
        <Button variant="outline">10</Button>
        <Button variant="outline">
          Selanjutnya
        </Button>
      </div>
    </Container>
  );
}

// Loading skeleton
function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="aspect-square w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}
