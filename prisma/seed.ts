import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({ url: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
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
    // Clothing
    {
      name: "Cashmere Oversized Sweater",
      slug: "cashmere-oversized-sweater",
      description: "Luxuriously soft pure cashmere sweater with a relaxed oversized silhouette. Perfect for layering or wearing on its own. Crafted from the finest Mongolian cashmere.",
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
      description: "An elegant silk charmeuse midi dress with a subtle drape and fluid movement. Features delicate spaghetti straps and a cowl neckline. Made in Italy.",
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
      description: "Impeccably tailored double-breasted blazer in premium Italian wool. A timeless investment piece for any wardrobe. Gold-tone buttons with logo engraving.",
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
      description: "Statement leather trench coat in buttery-soft lambskin. Classic belted silhouette with modern proportions. Fully lined in silk.",
      price: 3200,
      comparePrice: 3800,
      categoryId: clothing.id,
      sizes: "S, M, L",
      colors: "Black, Cognac",
      featured: true,
      inStock: true,
    },

    // Bags
    {
      name: "Classic Leather Tote",
      slug: "classic-leather-tote",
      description: "Structured tote bag in pebbled calfskin leather. Spacious interior with zip pocket and magnetic closure. Handcrafted by Italian artisans.",
      price: 1850,
      categoryId: bags.id,
      colors: "Black, Tan, Burgundy",
      featured: true,
      inStock: true,
    },
    {
      name: "Mini Chain Crossbody",
      slug: "mini-chain-crossbody",
      description: "Compact crossbody bag with signature gold chain strap. Quilted lambskin leather with logo clasp closure. Perfect for day to evening.",
      price: 1290,
      categoryId: bags.id,
      colors: "Black, White, Rouge",
      featured: true,
      inStock: true,
    },
    {
      name: "Woven Clutch",
      slug: "woven-clutch",
      description: "Artisan-woven evening clutch in metallic leather strips. Features a hidden chain strap and satin-lined interior. A statement piece for special occasions.",
      price: 980,
      categoryId: bags.id,
      colors: "Gold, Silver, Rose Gold",
      featured: false,
      inStock: true,
    },
    {
      name: "Suede Bucket Bag",
      slug: "suede-bucket-bag",
      description: "Relaxed bucket bag in luxurious Italian suede with leather drawstring closure. Includes a removable inner pouch. Casual luxury at its finest.",
      price: 1150,
      categoryId: bags.id,
      colors: "Sand, Olive, Black",
      featured: false,
      inStock: true,
    },

    // Shoes
    {
      name: "Leather Pointed Pumps",
      slug: "leather-pointed-pumps",
      description: "Elegant pointed-toe pumps in smooth Italian leather. 85mm stiletto heel with leather sole. The quintessential luxury pump.",
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
      description: "Sleek ankle boots in premium suede with a sculpted 70mm block heel. Side zip closure and almond toe. Hand-finished in Portugal.",
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
      description: "Show-stopping evening sandals with hand-placed crystal embellishments. Delicate ankle strap and 100mm heel. Made in Italy.",
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
      description: "Classic penny loafers reimagined in polished calfskin leather. Blake-stitched construction for flexibility and comfort. A versatile wardrobe staple.",
      price: 650,
      categoryId: shoes.id,
      sizes: "36, 37, 38, 39, 40, 41, 42",
      colors: "Black, Burgundy, Cream",
      featured: false,
      inStock: true,
    },
    {
      name: "Satin Slingback Pumps",
      slug: "satin-slingback-pumps",
      description: "Elegant satin slingback pumps with a pointed toe and structured kitten heel. A sophisticated choice for evening wear.",
      price: 820,
      categoryId: shoes.id,
      sizes: "36, 37, 38, 39, 40, 41",
      colors: "Emerald, Black, Champagne",
      featured: false,
      inStock: true,
    },
    {
      name: "Leather Chelsea Boots",
      slug: "leather-chelsea-boots",
      description: "Classic Chelsea boots in rich calf leather featuring elasticated side panels and a durable rubber stacked sole.",
      price: 950,
      categoryId: shoes.id,
      sizes: "37, 38, 39, 40, 41, 42",
      colors: "Black, Oxblood",
      featured: true,
      inStock: true,
    },

    // Jewelry
    {
      name: "Gold Chain Necklace",
      slug: "gold-chain-necklace",
      description: "18k gold-plated chain necklace with a modern link design. Adjustable length from 16 to 18 inches. Hypoallergenic and tarnish-resistant.",
      price: 420,
      categoryId: jewelry.id,
      featured: true,
      inStock: true,
    },
    {
      name: "Diamond Stud Earrings",
      slug: "diamond-stud-earrings",
      description: "Classic round brilliant diamond studs set in 18k white gold. Total carat weight 0.50ct, VS clarity, F color. Butterfly back closures.",
      price: 2800,
      categoryId: jewelry.id,
      featured: true,
      inStock: true,
    },
    {
      name: "Pearl Drop Earrings",
      slug: "pearl-drop-earrings",
      description: "Elegant South Sea pearl drop earrings with 18k gold vermeil hooks. 10mm pearls with exceptional lustre. A timeless addition to any collection.",
      price: 580,
      categoryId: jewelry.id,
      featured: false,
      inStock: true,
    },
    {
      name: "Signet Ring",
      slug: "signet-ring",
      description: "Modern signet ring in solid 925 sterling silver with 18k gold plating. Subtle engraved logo detail. Available in multiple sizes.",
      price: 340,
      categoryId: jewelry.id,
      sizes: "5, 6, 7, 8, 9",
      featured: false,
      inStock: true,
    },
    {
      name: "Sapphire Pendant Necklace",
      slug: "sapphire-pendant-necklace",
      description: "A stunning 1.5 carat deep blue sapphire surrounded by a halo of micro-pave diamonds, set in 18k white gold.",
      price: 1200,
      categoryId: jewelry.id,
      featured: true,
      inStock: true,
    },
    {
      name: "Gold Hoop Earrings",
      slug: "gold-hoop-earrings",
      description: "Chunky yet lightweight 14k solid gold hoop earrings. The perfect everyday statement piece.",
      price: 450,
      categoryId: jewelry.id,
      featured: false,
      inStock: true,
    },
  ];

  for (const product of products) {
    // Dynamically assign image URLs based on exact slugs we generated/downloaded
    const ext = ["cashmere-oversized-sweater", "silk-midi-dress", "tailored-wool-blazer", "leather-trench-coat", "classic-leather-tote", "mini-chain-crossbody"].includes(product.slug) ? "png" : "jpg";
    const imageUrl = `/images/products/${product.slug}.${ext}`;
    
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        images: {
          deleteMany: {},
          create: [{ url: imageUrl, position: 0 }]
        }
      },
      create: {
        ...product,
        images: {
          create: [{ url: imageUrl, position: 0 }]
        }
      }
    });
  }

  console.log("Seed completed: 4 categories, 16 products");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
