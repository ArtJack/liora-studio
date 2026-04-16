import { prisma } from "@/lib/db";
import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    productId?: string;
    productSlug?: string;
    author?: string;
    rating?: number;
    body?: string;
  };

  if (
    !body.productId ||
    !body.author?.trim() ||
    !body.body?.trim() ||
    typeof body.rating !== "number" ||
    body.rating < 1 ||
    body.rating > 5
  ) {
    return Response.json(
      { error: "productId, author, rating (1-5), and body are required" },
      { status: 400 }
    );
  }

  try {
    await prisma.review.create({
      data: {
        productId: body.productId,
        author: body.author.trim(),
        rating: Math.round(body.rating),
        body: body.body.trim(),
      },
    });
  } catch {
    return Response.json({ error: "Failed to submit review" }, { status: 400 });
  }

  if (body.productSlug) {
    revalidatePath(`/product/${body.productSlug}`);
  }

  return Response.json({ ok: true });
}
