import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      productId?: string;
      customerName?: string;
      customerEmail?: string;
      offerPrice?: number;
    };

    const { productId, customerName, customerEmail, offerPrice } = body;

    if (!productId || !customerName?.trim() || !customerEmail?.trim() || !offerPrice) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (offerPrice <= 0) {
      return NextResponse.json(
        { error: "Offer price must be a positive number" },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const offer = await prisma.offer.create({
      data: {
        productId,
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim(),
        offerPrice,
      },
    });

    return NextResponse.json({ success: true, token: offer.token });
  } catch {
    return NextResponse.json(
      { error: "Failed to create offer" },
      { status: 500 }
    );
  }
}
