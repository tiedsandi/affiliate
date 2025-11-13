import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Star, TrendingUp, ExternalLink } from 'lucide-react';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    images: string[];
    category: string;
    shopeePrice?: number;
    tiktokPrice?: number;
    shopeeRating?: number;
    tiktokRating?: number;
    views: number;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  // Determine best price and platform
  const prices = [
    product.shopeePrice ? { platform: 'shopee', price: product.shopeePrice } : null,
    product.tiktokPrice ? { platform: 'tiktok', price: product.tiktokPrice } : null,
  ].filter(Boolean) as { platform: string; price: number }[];

  const bestDeal = prices.length > 0 
    ? prices.reduce((min, curr) => curr.price < min.price ? curr : min)
    : null;

  const savings = prices.length === 2 
    ? Math.abs(prices[0].price - prices[1].price)
    : 0;

  // Average rating
  const ratings = [product.shopeeRating, product.tiktokRating].filter(Boolean) as number[];
  const avgRating = ratings.length > 0
    ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length
    : 0;

  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="group overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No Image
            </div>
          )}
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {savings > 0 && (
              <Badge variant="destructive" className="text-xs">
                Hemat {formatPrice(savings)}
              </Badge>
            )}
            {product.views > 100 && (
              <Badge variant="secondary" className="text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                Trending
              </Badge>
            )}
          </div>
        </div>

        <CardContent className="p-4">
          {/* Category */}
          <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
          
          {/* Name */}
          <h3 className="font-semibold line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          {avgRating > 0 && (
            <div className="flex items-center gap-1 mb-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{avgRating.toFixed(1)}</span>
              <span className="text-xs text-muted-foreground">
                ({product.views} views)
              </span>
            </div>
          )}

          {/* Prices */}
          <div className="space-y-1">
            {product.shopeePrice && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Shopee:</span>
                <span className={bestDeal?.platform === 'shopee' ? 'font-bold text-green-600' : ''}>
                  {formatPrice(product.shopeePrice)}
                </span>
              </div>
            )}
            {product.tiktokPrice && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">TikTok:</span>
                <span className={bestDeal?.platform === 'tiktok' ? 'font-bold text-green-600' : ''}>
                  {formatPrice(product.tiktokPrice)}
                </span>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          {bestDeal && (
            <div className="w-full text-center text-xs text-muted-foreground">
              Terbaik di {bestDeal.platform === 'shopee' ? 'Shopee' : 'TikTok Shop'}
              <ExternalLink className="inline h-3 w-3 ml-1" />
            </div>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}

// Helper function
function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
