import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const allowedCategorySlugs = ["rings", "earrings", "brooches", "necklaces", "bracelets", "gift-sets"];

  // Clean up non-canonical categories and any products that still belong to them.
  await prisma.product.deleteMany({
    where: {
      category: {
        slug: { notIn: allowedCategorySlugs },
      },
    },
  });
  await prisma.category.deleteMany({
    where: {
      slug: { notIn: allowedCategorySlugs },
    },
  });

  // Rebuild the canonical jewelry collection.
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});

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

  const mysteryBox = await prisma.category.upsert({
    where: { slug: "gift-sets" },
    update: { name: "Mystery Box", description: "Mystery bags, curated boxes, and surprise jewelry bundles" },
    create: { name: "Mystery Box", slug: "gift-sets", description: "Mystery bags, curated boxes, and surprise jewelry bundles" },
  });

  const products = [
    // --- Rings ---
    {
      name: "Diamond Solitaire Engagement Ring",
      slug: "diamond-solitaire-engagement-ring",
      description: "Classic round brilliant solitaire on a white gold-tone plated band. Designed for a timeless bridal look with polished finish and statement sparkle.",
      price: 3200,
      comparePrice: 4500,
      categoryId: rings.id,
      sizes: "5, 6, 7, 8, 9",
      material: "White Gold-Tone Plated Brass",
      gemstone: "Diamond",
      weight: 3.8,
      featured: true,
      inStock: true,
    },
    {
      name: "Rose Gold Signet Ring",
      slug: "rose-gold-signet-ring",
      description: "Modern signet ring in polished rose gold-tone plating with a brushed face. A contemporary take on a timeless classic.",
      price: 480,
      categoryId: rings.id,
      sizes: "5, 6, 7, 8, 9, 10",
      material: "Rose Gold-Tone Plated Brass",
      weight: 5.2,
      featured: false,
      inStock: true,
    },
    {
      name: "Sapphire Halo Ring",
      slug: "sapphire-halo-ring",
      description: "Vivid blue sapphire-style center stone surrounded by a halo of micro-pavé crystals. Finished in a platinum-tone plated setting for high contrast shine.",
      price: 2750,
      categoryId: rings.id,
      sizes: "5, 6, 7, 8",
      material: "Platinum-Tone Plated Brass",
      gemstone: "Sapphire-Style Stone, Crystal",
      weight: 4.1,
      featured: true,
      inStock: true,
    },

    // --- Earrings ---
    {
      name: "Diamond Stud Earrings",
      slug: "diamond-stud-earrings",
      description: "Classic round brilliant-style studs in a white gold-tone plated setting. A polished everyday pair with bright, light-catching sparkle.",
      price: 1850,
      categoryId: earrings.id,
      material: "White Gold-Tone Plated Brass",
      gemstone: "Diamond-Style Stone",
      weight: 1.8,
      featured: true,
      inStock: true,
    },
    {
      name: "Pearl Drop Earrings",
      slug: "pearl-drop-earrings",
      description: "Lustrous pearl drops on polished gold-tone plated hooks. A soft, elegant silhouette designed for day-to-evening wear.",
      price: 380,
      categoryId: earrings.id,
      material: "Gold-Tone Plated Brass",
      gemstone: "Pearl",
      weight: 2.4,
      featured: false,
      inStock: true,
    },
    {
      name: "Gold Hoop Earrings",
      slug: "gold-hoop-earrings",
      description: "Sleek gold-tone plated hoops with a polished finish. Lightweight, bright, and easy to wear all day.",
      price: 320,
      comparePrice: 420,
      categoryId: earrings.id,
      material: "Gold-Tone Plated Brass",
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
      material: "Silver-Tone Plated Brass",
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
      description: "Gold-tone plated chain necklace with a modern link design. Clean, polished, and easy to layer at 18 inches.",
      price: 280,
      categoryId: necklaces.id,
      material: "Gold-Tone Plated Brass",
      weight: 8.5,
      featured: true,
      inStock: true,
    },
    {
      name: "Diamond Pendant Necklace",
      slug: "diamond-pendant-necklace",
      description: "Delicate pendant necklace on a white gold-tone plated chain. Designed to give everyday outfits a clean point of sparkle.",
      price: 950,
      categoryId: necklaces.id,
      material: "White Gold-Tone Plated Brass",
      gemstone: "Diamond-Style Stone",
      weight: 2.8,
      featured: true,
      inStock: true,
    },
    {
      name: "Layered Pearl Choker",
      slug: "layered-pearl-choker",
      description: "Triple-strand pearl choker with a polished gold-tone plated clasp. A modern take on classic evening styling.",
      price: 420,
      comparePrice: 560,
      categoryId: necklaces.id,
      material: "Gold-Tone Plated Brass",
      gemstone: "Pearl",
      weight: 22.0,
      featured: false,
      inStock: true,
    },

    // --- Bracelets ---
    {
      name: "Tennis Bracelet",
      slug: "diamond-tennis-bracelet",
      description: "Classic tennis bracelet with bright stone detailing in a white gold-tone plated setting. Designed for high shine and formal polish.",
      price: 4200,
      comparePrice: 5500,
      categoryId: bracelets.id,
      sizes: "6.5, 7, 7.5",
      material: "White Gold-Tone Plated Brass",
      gemstone: "Diamond-Style Stone",
      weight: 9.5,
      featured: true,
      inStock: true,
    },
    {
      name: "Gold Cuff Bracelet",
      slug: "gold-cuff-bracelet",
      description: "Minimalist open cuff bracelet in hammered gold-tone plating. Adjustable, bold, and easy to style alone or layered.",
      price: 680,
      categoryId: bracelets.id,
      material: "Gold-Tone Plated Brass",
      weight: 18.0,
      featured: true,
      inStock: true,
    },
    {
      name: "Beaded Gemstone Bracelet",
      slug: "beaded-gemstone-bracelet",
      description: "Stretch bracelet with turquoise- and lapis-tone beads plus silver-tone plated accents. An easy statement piece with soft color contrast.",
      price: 95,
      categoryId: bracelets.id,
      material: "Silver-Tone Plated Brass",
      gemstone: "Turquoise-Style Beads, Lapis-Style Beads",
      weight: 14.0,
      featured: false,
      inStock: true,
    },

    // --- Mystery Box ---
    {
      name: "Jewelry Mystery Bag",
      slug: "jewelry-mystery-bag",
      description: "A surprise selection of plated jewelry chosen from current LIORA STUDIO pieces. Expect a mix of polished staples and statement accents, packed for gifting or self-treating.",
      price: 78,
      comparePrice: 120,
      categoryId: mysteryBox.id,
      material: "Mixed Plated Finishes",
      gemstone: "Varied Decorative Stones",
      featured: true,
      inStock: true,
    },
    {
      name: "Curated Jewelry Gift Box",
      slug: "curated-jewelry-gift-box",
      description: "A higher-value gift set with multiple plated pieces selected to wear together. Designed as an easy elevated present with variety, polish, and gift-ready presentation.",
      price: 222,
      comparePrice: 320,
      categoryId: mysteryBox.id,
      material: "Mixed Plated Finishes",
      gemstone: "Varied Decorative Stones",
      featured: true,
      inStock: true,
    },
  ];

  for (const product of products) {
    const imageUrl = `/images/products/${product.slug}.jpg`;
    await prisma.product.create({
      data: {
        ...product,
        images: {
          create: [{ url: imageUrl, position: 0 }]
        }
      }
    });
  }

  console.log(`Seed completed: 6 categories, ${products.length} jewelry products seeded with unique images.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
