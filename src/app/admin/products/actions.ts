"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function validateProduct(formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const price = parseFloat(formData.get("price") as string);
  const comparePriceRaw = formData.get("comparePrice") as string;
  const comparePrice =
    comparePriceRaw && comparePriceRaw.trim() !== ""
      ? parseFloat(comparePriceRaw)
      : null;
  const categoryId = formData.get("categoryId") as string;
  const sizes = formData.get("sizes") as string;
  const colors = formData.get("colors") as string;
  const material = formData.get("material") as string;
  const gemstone = formData.get("gemstone") as string;
  const weightRaw = formData.get("weight") as string;
  const weight =
    weightRaw && weightRaw.trim() !== "" ? parseFloat(weightRaw) : null;
  const featured = formData.get("featured") === "on";
  const inStock = formData.get("inStock") === "on";
  const imageUrls = formData.getAll("imageUrls") as string[];

  if (!name) throw new Error("Product name is required");
  if (!description) throw new Error("Description is required");
  if (isNaN(price) || price < 0) throw new Error("Price must be a non-negative number");
  if (comparePrice !== null && (isNaN(comparePrice) || comparePrice < 0))
    throw new Error("Compare price must be a non-negative number");
  if (weight !== null && (isNaN(weight) || weight < 0))
    throw new Error("Weight must be a non-negative number");
  if (!categoryId) throw new Error("Category is required");

  return {
    name,
    description,
    price,
    comparePrice,
    categoryId,
    sizes: sizes || null,
    colors: colors || null,
    material: material || null,
    gemstone: gemstone || null,
    weight,
    featured,
    inStock,
    imageUrls: imageUrls.filter((url) => url.trim()),
  };
}

function revalidateAll() {
  revalidatePath("/admin/products");
  revalidatePath("/");
  revalidatePath("/shop");
}

export async function createProduct(formData: FormData) {
  const data = validateProduct(formData);
  const slug = slugify(data.name) + "-" + Date.now().toString(36);

  await prisma.product.create({
    data: {
      name: data.name,
      slug,
      description: data.description,
      price: data.price,
      comparePrice: data.comparePrice,
      categoryId: data.categoryId,
      sizes: data.sizes,
      colors: data.colors,
      material: data.material,
      gemstone: data.gemstone,
      weight: data.weight,
      featured: data.featured,
      inStock: data.inStock,
      images: {
        create: data.imageUrls.map((url, i) => ({ url: url.trim(), position: i })),
      },
    },
  });

  revalidateAll();
  redirect("/admin/products");
}

export async function updateProduct(id: string, formData: FormData) {
  const data = validateProduct(formData);

  await prisma.productImage.deleteMany({ where: { productId: id } });

  await prisma.product.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      comparePrice: data.comparePrice,
      categoryId: data.categoryId,
      sizes: data.sizes,
      colors: data.colors,
      material: data.material,
      gemstone: data.gemstone,
      weight: data.weight,
      featured: data.featured,
      inStock: data.inStock,
      images: {
        create: data.imageUrls.map((url, i) => ({ url: url.trim(), position: i })),
      },
    },
  });

  revalidateAll();
  redirect("/admin/products");
}
