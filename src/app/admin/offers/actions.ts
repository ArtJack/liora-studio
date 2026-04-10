"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function acceptOffer(id: string) {
  await prisma.offer.update({
    where: { id },
    data: { status: "accepted" },
  });
  revalidatePath("/admin/offers");
  revalidatePath(`/admin/offers/${id}`);
}

export async function rejectOffer(id: string) {
  await prisma.offer.update({
    where: { id },
    data: { status: "rejected" },
  });
  revalidatePath("/admin/offers");
  revalidatePath(`/admin/offers/${id}`);
}

export async function counterOffer(id: string, counterPrice: number, adminNote?: string) {
  if (isNaN(counterPrice) || counterPrice <= 0) {
    throw new Error("Counter price must be a positive number");
  }
  await prisma.offer.update({
    where: { id },
    data: {
      status: "countered",
      counterPrice,
      adminNote: adminNote?.trim() || null,
    },
  });
  revalidatePath("/admin/offers");
  revalidatePath(`/admin/offers/${id}`);
}
