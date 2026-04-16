import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST() {
  // Create 6 jewelry categories
  const rings = await prisma.category.upsert({
    where: { slug: "rings" },
    update: {},
    create: { name: "Rings", slug: "rings", description: "Elegant rings for every occasion" },
  });

  const earrings = await prisma.category.upsert({
    where: { slug: "earrings" },
    update: {},
    create: { name: "Earrings", slug: "earrings", description: "Statement and everyday earrings" },
  });

  const brooches = await prisma.category.upsert({
    where: { slug: "brooches" },
    update: {},
    create: { name: "Brooches", slug: "brooches", description: "Timeless decorative brooches" },
  });

  const necklaces = await prisma.category.upsert({
    where: { slug: "necklaces" },
    update: {},
    create: { name: "Necklaces", slug: "necklaces", description: "Chains, pendants, and chokers" },
  });

  const bracelets = await prisma.category.upsert({
    where: { slug: "bracelets" },
    update: {},
    create: { name: "Bracelets", slug: "bracelets", description: "Bangles, cuffs, and chain bracelets" },
  });

  const anklets = await prisma.category.upsert({
    where: { slug: "anklets" },
    update: {},
    create: { name: "Anklets", slug: "anklets", description: "Delicate ankle jewelry" },
  });

  const products = [
    // --- Rings ---
    {
      name: "Diamond Solitaire Engagement Ring",
      slug: "diamond-solitaire-engagement-ring",
      description: "Classic round brilliant diamond solitaire set in 18k white gold. 1.0ct, VS1 clarity, F color. Timeless elegance for that special moment.",
      price: 3200,
      comparePrice: 4500,
      categoryId: rings.id,
      sizes: "5, 6, 7, 8, 9",
      material: "18k White Gold",
      gemstone: "Diamond",
      weight: 3.8,
      featured: true,
      inStock: true,
    },
    {
      name: "Rose Gold Signet Ring",
      slug: "rose-gold-signet-ring",
      description: "Modern signet ring in polished 14k rose gold with a brushed matte face. A contemporary take on a timeless classic.",
      price: 480,
      categoryId: rings.id,
      sizes: "5, 6, 7, 8, 9, 10",
      material: "14k Rose Gold",
      weight: 5.2,
      featured: false,
      inStock: true,
    },
    {
      name: "Sapphire Halo Ring",
      slug: "sapphire-halo-ring",
      description: "Vivid blue sapphire surrounded by a halo of micro-pavé diamonds. Set in platinum for lasting brilliance.",
      price: 2750,
      categoryId: rings.id,
      sizes: "5, 6, 7, 8",
      material: "Platinum",
      gemstone: "Sapphire, Diamond",
      weight: 4.1,
      featured: true,
      inStock: true,
    },

    // --- Earrings ---
    {
      name: "Diamond Stud Earrings",
      slug: "diamond-stud-earrings",
      description: "Classic round brilliant diamond studs in 18k white gold. 0.50ct total weight, VS clarity, F color. The perfect everyday luxury.",
      price: 1850,
      categoryId: earrings.id,
      material: "18k White Gold",
      gemstone: "Diamond",
      weight: 1.8,
      featured: true,
      inStock: true,
    },
    {
      name: "Pearl Drop Earrings",
      slug: "pearl-drop-earrings",
      description: "Lustrous South Sea pearl drops on 18k gold vermeil hooks. 10mm freshwater pearls with a natural iridescent sheen.",
      price: 380,
      categoryId: earrings.id,
      material: "18k Gold Vermeil",
      gemstone: "Pearl",
      weight: 2.4,
      featured: false,
      inStock: true,
    },
    {
      name: "Gold Hoop Earrings",
      slug: "gold-hoop-earrings",
      description: "Sleek 14k gold hoops with a polished finish. 30mm diameter, lightweight and comfortable for all-day wear.",
      price: 320,
      comparePrice: 420,
      categoryId: earrings.id,
      material: "14k Gold",
      weight: 3.0,
      featured: true,
      inStock: true,
    },

    // --- Brooches ---
    {
      name: "Crystal Flower Brooch",
      slug: "crystal-flower-brooch",
      description: "Hand-set Swarovski crystals in a blooming flower design. Gold-plated brass base with secure pin clasp.",
      price: 165,
      categoryId: brooches.id,
      material: "Gold-Plated Brass",
      gemstone: "Crystal",
      weight: 12.5,
      featured: true,
      inStock: true,
    },
    {
      name: "Vintage Enamel Butterfly Brooch",
      slug: "vintage-enamel-butterfly-brooch",
      description: "Vibrant hand-painted enamel butterfly with rhinestone accents. A statement piece inspired by Art Nouveau design.",
      price: 120,
      categoryId: brooches.id,
      material: "Sterling Silver",
      gemstone: "Rhinestone",
      weight: 8.3,
      featured: false,
      inStock: true,
    },
    {
      name: "Pearl Cluster Brooch",
      slug: "pearl-cluster-brooch",
      description: "Elegant cluster of freshwater pearls and cubic zirconia on rhodium-plated brass. Perfect for bridal or formal wear.",
      price: 210,
      comparePrice: 280,
      categoryId: brooches.id,
      material: "Rhodium-Plated Brass",
      gemstone: "Pearl, Cubic Zirconia",
      weight: 15.0,
      featured: false,
      inStock: true,
    },

    // --- Necklaces ---
    {
      name: "Gold Chain Necklace",
      slug: "gold-chain-necklace",
      description: "18k gold-plated chain necklace with a modern link design. Hypoallergenic and tarnish-resistant. 18 inches.",
      price: 280,
      categoryId: necklaces.id,
      material: "18k Gold Plated",
      weight: 8.5,
      featured: true,
      inStock: true,
    },
    {
      name: "Diamond Pendant Necklace",
      slug: "diamond-pendant-necklace",
      description: "Delicate 0.25ct diamond pendant on a 16-inch 14k white gold chain. A subtle sparkle for everyday elegance.",
      price: 950,
      categoryId: necklaces.id,
      material: "14k White Gold",
      gemstone: "Diamond",
      weight: 2.8,
      featured: true,
      inStock: true,
    },
    {
      name: "Layered Pearl Choker",
      slug: "layered-pearl-choker",
      description: "Triple-strand freshwater pearl choker with gold-filled clasp. Adjustable 14-16 inches. Modern meets classic.",
      price: 420,
      comparePrice: 560,
      categoryId: necklaces.id,
      material: "Gold Filled",
      gemstone: "Pearl",
      weight: 22.0,
      featured: false,
      inStock: true,
    },

    // --- Bracelets ---
    {
      name: "Tennis Bracelet",
      slug: "diamond-tennis-bracelet",
      description: "Classic diamond tennis bracelet with 3.0ct total weight in 14k white gold. Secure box clasp with safety latch.",
      price: 4200,
      comparePrice: 5500,
      categoryId: bracelets.id,
      sizes: "6.5, 7, 7.5",
      material: "14k White Gold",
      gemstone: "Diamond",
      weight: 9.5,
      featured: true,
      inStock: true,
    },
    {
      name: "Gold Cuff Bracelet",
      slug: "gold-cuff-bracelet",
      description: "Minimalist open cuff bracelet in hammered 14k gold. Adjustable fit for most wrist sizes. Bold yet refined.",
      price: 680,
      categoryId: bracelets.id,
      material: "14k Gold",
      weight: 18.0,
      featured: true,
      inStock: true,
    },
    {
      name: "Beaded Gemstone Bracelet",
      slug: "beaded-gemstone-bracelet",
      description: "Stretch bracelet with natural turquoise and lapis lazuli beads. Sterling silver accent beads. One size fits most.",
      price: 95,
      categoryId: bracelets.id,
      material: "Sterling Silver",
      gemstone: "Turquoise, Lapis Lazuli",
      weight: 14.0,
      featured: false,
      inStock: true,
    },

    // --- Anklets ---
    {
      name: "Dainty Gold Chain Anklet",
      slug: "dainty-gold-chain-anklet",
      description: "Delicate cable chain anklet in 14k gold fill. Adjustable 9-10.5 inches with lobster clasp. Perfect for summer.",
      price: 85,
      categoryId: anklets.id,
      material: "14k Gold Fill",
      weight: 1.5,
      featured: true,
      inStock: true,
    },
    {
      name: "Silver Charm Anklet",
      slug: "silver-charm-anklet",
      description: "Sterling silver anklet with dangling star and moon charms. Adjustable 9-11 inches. Bohemian-chic style.",
      price: 65,
      categoryId: anklets.id,
      material: "Sterling Silver",
      weight: 3.2,
      featured: false,
      inStock: true,
    },
    {
      name: "Layered Crystal Anklet",
      slug: "layered-crystal-anklet",
      description: "Double-strand anklet with hand-set cubic zirconia stations on gold-plated chain. Adjustable with 2-inch extender.",
      price: 110,
      comparePrice: 150,
      categoryId: anklets.id,
      material: "Gold Plated",
      gemstone: "Cubic Zirconia",
      weight: 4.0,
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
    message: `Seed completed: 6 categories, ${created} new products created`,
  });
}
