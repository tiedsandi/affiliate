import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Star, 
  TrendingUp, 
  ExternalLink, 
  Share2,
  CheckCircle2,
  AlertCircle,
  ChevronLeft
} from 'lucide-react';

// Dummy data - nanti diganti dengan database query
const getProduct = async (slug: string) => {
  // Simulate API call
  if (slug === 'powerbank-anker-20000mah') {
    return {
      id: '1',
      name: 'Powerbank Anker 20000mAh Fast Charging USB-C',
      slug: 'powerbank-anker-20000mah',
      category: 'Electronics',
      images: [
        '/placeholder-product.jpg',
        '/placeholder-product.jpg',
        '/placeholder-product.jpg',
      ],
      shopee: {
        url: 'https://shopee.co.id/...',
        price: 250000,
        originalPrice: 312500,
        discount: 20,
        rating: 4.8,
        reviewCount: 1234,
        sold: 5678,
        shipping: 'Gratis Ongkir',
        affiliateLink: 'https://shope.ee/...',
      },
      tiktok: {
        price: 245000,
        originalPrice: 288235,
        discount: 15,
        rating: 4.9,
        reviewCount: 567,
        sold: 2345,
        shipping: 'Gratis Ongkir',
        affiliateLink: 'https://vt.tiktok.com/...',
      },
      analysis: {
        highlights: [
          'Kapasitas besar 20000mAh, bisa charge HP 4-5x',
          'Fast charging support hingga 18W',
          'Build quality sangat baik, tahan lama',
          'Sudah include kabel USB-C',
        ],
        concerns: [
          'Agak berat untuk dibawa traveling (450g)',
          'Harga sedikit mahal dibanding kompetitor lokal',
        ],
        bestPlatform: 'tiktok',
        recommendation: 'Sangat recommended untuk yang sering traveling atau mobile. Lebih murah Rp 5.000 di TikTok Shop dengan kualitas yang sama.',
      },
      specifications: {
        'Kapasitas': '20000mAh',
        'Input': 'USB-C 18W',
        'Output': 'USB-A 18W, USB-C 20W',
        'Berat': '450g',
        'Dimensi': '14.5 x 6.8 x 2.6 cm',
        'Garansi': '18 bulan',
      },
      views: 1250,
      clicks: 89,
    };
  }
  return null;
};

interface ProductDetailPageProps {
  params: {
    slug: string;
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  const savings = Math.abs(product.shopee.price - product.tiktok.price);
  const bestDeal = product.shopee.price < product.tiktok.price ? 'shopee' : 'tiktok';

  return (
    <Container className="py-8">
      {/* Back Button */}
      <Link href="/products" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
        <ChevronLeft className="h-4 w-4 mr-1" />
        Kembali ke Produk
      </Link>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square relative bg-muted rounded-lg overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.slice(1).map((img, i) => (
              <div key={i} className="aspect-square relative bg-muted rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition">
                <Image src={img} alt={`${product.name} ${i + 2}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <Badge variant="secondary" className="mb-3">{product.category}</Badge>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">
                  {((product.shopee.rating + product.tiktok.rating) / 2).toFixed(1)}
                </span>
              </div>
              <span className="text-muted-foreground">
                {product.shopee.reviewCount + product.tiktok.reviewCount} reviews
              </span>
              <span className="text-muted-foreground">
                {product.views} views
              </span>
            </div>
          </div>

          {/* Price Comparison - KILLER FEATURE! */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Perbandingan Harga
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Shopee */}
              <div className={`p-4 rounded-lg ${bestDeal === 'shopee' ? 'bg-green-50 dark:bg-green-950 border-2 border-green-500' : 'bg-muted'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg">Shopee</span>
                    {bestDeal === 'shopee' && (
                      <Badge variant="default" className="bg-green-600">
                        Best Deal!
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{product.shopee.rating}</span>
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-2xl font-bold">
                    Rp {product.shopee.price.toLocaleString('id-ID')}
                  </span>
                  {product.shopee.discount > 0 && (
                    <>
                      <span className="text-sm text-muted-foreground line-through">
                        Rp {product.shopee.originalPrice.toLocaleString('id-ID')}
                      </span>
                      <Badge variant="destructive">{product.shopee.discount}% OFF</Badge>
                    </>
                  )}
                </div>
                <div className="text-sm text-muted-foreground mb-3">
                  {product.shopee.sold.toLocaleString('id-ID')} terjual • {product.shopee.shipping}
                </div>
                <Button className="w-full" size="lg" asChild>
                  <a href={product.shopee.affiliateLink} target="_blank" rel="noopener noreferrer">
                    Beli di Shopee
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              </div>

              {/* TikTok */}
              <div className={`p-4 rounded-lg ${bestDeal === 'tiktok' ? 'bg-green-50 dark:bg-green-950 border-2 border-green-500' : 'bg-muted'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg">TikTok Shop</span>
                    {bestDeal === 'tiktok' && (
                      <Badge variant="default" className="bg-green-600">
                        Best Deal!
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{product.tiktok.rating}</span>
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-2xl font-bold">
                    Rp {product.tiktok.price.toLocaleString('id-ID')}
                  </span>
                  {product.tiktok.discount > 0 && (
                    <>
                      <span className="text-sm text-muted-foreground line-through">
                        Rp {product.tiktok.originalPrice.toLocaleString('id-ID')}
                      </span>
                      <Badge variant="destructive">{product.tiktok.discount}% OFF</Badge>
                    </>
                  )}
                </div>
                <div className="text-sm text-muted-foreground mb-3">
                  {product.tiktok.sold.toLocaleString('id-ID')} terjual • {product.tiktok.shipping}
                </div>
                <Button className="w-full" size="lg" variant="outline" asChild>
                  <a href={product.tiktok.affiliateLink} target="_blank" rel="noopener noreferrer">
                    Beli di TikTok Shop
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              </div>

              {/* Savings */}
              {savings > 0 && (
                <div className="text-center p-3 bg-primary/10 rounded-lg">
                  <span className="text-sm font-medium">
                    💰 Hemat hingga <span className="text-primary font-bold">Rp {savings.toLocaleString('id-ID')}</span> dengan memilih platform terbaik!
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Share */}
          <Button variant="outline" className="w-full">
            <Share2 className="h-4 w-4 mr-2" />
            Bagikan Produk
          </Button>
        </div>
      </div>

      {/* AI Analysis */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              Kelebihan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {product.analysis.highlights.map((highlight, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              Perhatian
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {product.analysis.concerns.map((concern, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-orange-600 font-bold">!</span>
                  <span>{concern}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Recommendation */}
      <Card className="mb-12 bg-primary/5">
        <CardHeader>
          <CardTitle>🤖 Rekomendasi AI</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg leading-relaxed">{product.analysis.recommendation}</p>
        </CardContent>
      </Card>

      {/* Specifications */}
      <Card>
        <CardHeader>
          <CardTitle>Spesifikasi Produk</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between py-2">
                <span className="text-muted-foreground">{key}</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}
