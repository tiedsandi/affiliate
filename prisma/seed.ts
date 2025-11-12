import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clear existing data
  await prisma.review.deleteMany();
  await prisma.product.deleteMany();

  // Create sample products
  const product1 = await prisma.product.create({
    data: {
      name: 'Powerbank Anker 20.000mAh',
      slug: 'powerbank-anker-20000mah',
      category: 'Gadget',
      tags: JSON.stringify(['#ViralTikTok', '#BestValue', '#FastCharging']),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800',
        'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=800'
      ]),
      
      // Shopee
      shopeeUrl: 'https://shopee.co.id/...',
      shopeePrice: 299000,
      shopeeOriginalPrice: 459000,
      shopeeDiscount: 35,
      shopeeRating: 4.8,
      shopeeReviewCount: 12450,
      shopeeSold: 78920,
      shopeeShipping: 'Gratis Ongkir',
      shopeeAffiliateLink: 'https://shopee.co.id/affiliate/...',
      shopeeCommission: 0.03,
      
      // TikTok
      tiktokProductId: 'TT123456',
      tiktokPrice: 279000,
      tiktokOriginalPrice: 449000,
      tiktokDiscount: 38,
      tiktokRating: 4.9,
      tiktokReviewCount: 8234,
      tiktokSold: 45678,
      tiktokShipping: 'Gratis Ongkir',
      tiktokAffiliateLink: 'https://vt.tiktok.com/...',
      tiktokCommission: 0.12,
      
      // AI Analysis
      aiHighlights: JSON.stringify([
        'Kualitas build premium dan tahan lama',
        'Fast charging 18W berfungsi dengan baik',
        'Kapasitas sesuai klaim, bisa 4-5x full charge'
      ]),
      aiConcerns: JSON.stringify([
        'Agak berat (450gr) untuk dibawa travel ringan',
        'Harga slightly premium vs kompetitor lokal'
      ]),
      aiBestPlatform: 'tiktok',
      aiRecommendation: 'Lebih murah Rp 20.000 dengan rating lebih tinggi',
      
      specifications: JSON.stringify({
        'Kapasitas': '20.000mAh',
        'Input': '5V/2A, 9V/2A',
        'Output': '5V/3A, 9V/2A, 12V/1.5A',
        'Fast Charging': 'Yes (18W)',
        'Ports': '2x USB-A, 1x USB-C',
        'Berat': '450 gram'
      }),
      
      status: 'active',
    }
  });

  // Add reviews
  await prisma.review.createMany({
    data: [
      {
        productId: product1.id,
        platform: 'shopee',
        rating: 5,
        text: 'Powerbank nya bagus banget! Udah 2 tahun masih awet. Fast charging beneran work. Worth it!',
        author: 'Budi***',
        date: '2024-10-15',
        verified: true,
        helpful: 234
      },
      {
        productId: product1.id,
        platform: 'tiktok',
        rating: 5,
        text: 'Suka banget sama build quality nya. Meski agak berat tapi kualitas jelas beda. Rekomended!',
        author: 'Siti***',
        date: '2024-10-18',
        verified: true,
        helpful: 189
      }
    ]
  });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });