import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST() {
  // Create categories
  const clothing = await prisma.category.upsert({
    where: { slug: "clothing" },
    update: {},
    create: { name: "Clothing", slug: "clothing", description: "Luxury apparel" },
  });

  const bags = await prisma.category.upsert({
    where: { slug: "bags" },
    update: {},
    create: { name: "Bags", slug: "bags", description: "Designer handbags" },
  });

  const shoes = await prisma.category.upsert({
    where: { slug: "shoes" },
    update: {},
    create: { name: "Shoes", slug: "shoes", description: "Artisan footwear" },
  });

  const jewelry = await prisma.category.upsert({
    where: { slug: "jewelry" },
    update: {},
    create: { name: "Jewelry", slug: "jewelry", description: "Fine jewelry" },
  });

  const products = [
    {
      name: "Cashmere Oversized Sweater",
      slug: "cashmere-oversized-sweater",
      description: "Luxuriously soft pure cashmere sweater with a relaxed oversized silhouette. Crafted from the finest Mongolian cashmere.",
      price: 890,
      comparePrice: 1200,
      categoryId: clothing.id,
      sizes: "XS, S, M, L, XL",
      colors: "Ivory, Camel, Black, Charcoal",
      featured: true,
      inStock: true,
    },
    {
      name: "Silk Midi Dress",
      slug: "silk-midi-dress",
      description: "An elegant silk charmeuse midi dress with a subtle drape and fluid movement. Made in Italy.",
      price: 1450,
      categoryId: clothing.id,
      sizes: "XS, S, M, L",
      colors: "Champagne, Black, Dusty Rose",
      featured: true,
      inStock: true,
    },
    {
      name: "Tailored Wool Blazer",
      slug: "tailored-wool-blazer",
      description: "Impeccably tailored double-breasted blazer in premium Italian wool. Gold-tone buttons with logo engraving.",
      price: 1680,
      categoryId: clothing.id,
      sizes: "XS, S, M, L, XL",
      colors: "Navy, Black, Cream",
      featured: false,
      inStock: true,
    },
    {
      name: "Leather Trench Coat",
      slug: "leather-trench-coat",
      description: "Statement leather trench coat in buttery-soft lambskin. Classic belted silhouette with modern proportions.",
      price: 3200,
      comparePrice: 3800,
      categoryId: clothing.id,
      sizes: "S, M, L",
      colors: "Black, Cognac",
      featured: true,
      inStock: true,
    },
    {
      name: "Classic Leather Tote",
      slug: "classic-leather-tote",
      description: "Structured tote bag in pebbled calfskin leather. Handcrafted by Italian artisans.",
      price: 1850,
      categoryId: bags.id,
      colors: "Black, Tan, Burgundy",
      featured: true,
      inStock: true,
    },
    {
      name: "Mini Chain Crossbody",
      slug: "mini-chain-crossbody",
      description: "Compact crossbody bag with signature gold chain strap. Quilted lambskin leather with logo clasp closure.",
      price: 1290,
      categoryId: bags.id,
      colors: "Black, White, Rouge",
      featured: true,
      inStock: true,
    },
    {
      name: "Woven Clutch",
      slug: "woven-clutch",
      description: "Artisan-woven evening clutch in metallic leather strips. A statement piece for special occasions.",
      price: 980,
      categoryId: bags.id,
      colors: "Gold, Silver, Rose Gold",
      featured: false,
      inStock: true,
    },
    {
      name: "Suede Bucket Bag",
      slug: "suede-bucket-bag",
      description: "Relaxed bucket bag in luxurious Italian suede with leather drawstring closure.",
      price: 1150,
      categoryId: bags.id,
      colors: "Sand, Olive, Black",
      featured: false,
      inStock: true,
    },
    {
      name: "Leather Pointed Pumps",
      slug: "leather-pointed-pumps",
      description: "Elegant pointed-toe pumps in smooth Italian leather. 85mm stiletto heel with leather sole.",
      price: 750,
      categoryId: shoes.id,
      sizes: "35, 36, 37, 38, 39, 40, 41",
      colors: "Black, Nude, Red",
      featured: true,
      inStock: true,
    },
    {
      name: "Suede Ankle Boots",
      slug: "suede-ankle-boots",
      description: "Sleek ankle boots in premium suede with a sculpted 70mm block heel. Hand-finished in Portugal.",
      price: 890,
      categoryId: shoes.id,
      sizes: "36, 37, 38, 39, 40, 41",
      colors: "Black, Taupe, Chocolate",
      featured: true,
      inStock: true,
    },
    {
      name: "Crystal Embellished Sandals",
      slug: "crystal-embellished-sandals",
      description: "Show-stopping evening sandals with hand-placed crystal embellishments. Made in Italy.",
      price: 1380,
      categoryId: shoes.id,
      sizes: "35, 36, 37, 38, 39, 40",
      colors: "Silver, Gold, Black",
      featured: false,
      inStock: true,
    },
    {
      name: "Leather Loafers",
      slug: "leather-loafers",
      description: "Classic penny loafers reimagined in polished calfskin leather. Blake-stitched construction.",
      price: 650,
      categoryId: shoes.id,
      sizes: "36, 37, 38, 39, 40, 41, 42",
      colors: "Black, Burgundy, Cream",
      featured: false,
      inStock: true,
    },
    {
      name: "Gold Chain Necklace",
      slug: "gold-chain-necklace",
      description: "18k gold-plated chain necklace with a modern link design. Hypoallergenic and tarnish-resistant.",
      price: 420,
      categoryId: jewelry.id,
      featured: true,
      inStock: true,
    },
    {
      name: "Diamond Stud Earrings",
      slug: "diamond-stud-earrings",
      description: "Classic round brilliant diamond studs set in 18k white gold. 0.50ct, VS clarity, F color.",
      price: 2800,
      categoryId: jewelry.id,
      featured: true,
      inStock: true,
    },
    {
      name: "Pearl Drop Earrings",
      slug: "pearl-drop-earrings",
      description: "Elegant South Sea pearl drop earrings with 18k gold vermeil hooks. 10mm pearls.",
      price: 580,
      categoryId: jewelry.id,
      featured: false,
      inStock: true,
    },
    {
      name: "Signet Ring",
      slug: "signet-ring",
      description: "Modern signet ring in solid 925 sterling silver with 18k gold plating.",
      price: 340,
      categoryId: jewelry.id,
      sizes: "5, 6, 7, 8, 9",
      featured: false,
      inStock: true,
    },
  ];

  let created = 0;
  for (const product of products) {
    const existing = await prisma.product.findUnique({ where: { slug: product.slug } });
    if (!existing) {
      await prisma.product.create({ data: product });
      created++;
    }
  }

  return NextResponse.json({
    message: `Seed completed: 4 categories, ${created} new products created`,
  });
}
