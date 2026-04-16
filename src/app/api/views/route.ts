import { prisma } from "@/lib/db";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { productId?: string };

  if (!body.productId || typeof body.productId !== "string") {
    return Response.json({ error: "productId is required" }, { status: 400 });
  }

  try {
    await prisma.productView.create({
      data: { productId: body.productId },
    });
  } catch {
    return Response.json({ error: "Invalid productId" }, { status: 400 });
  }

  return Response.json({ ok: true });
}
