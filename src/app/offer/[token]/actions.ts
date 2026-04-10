"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function respondToCounter(token: string, accept: boolean) {
  const offer = await prisma.offer.findUnique({ where: { token } });

  if (!offer || offer.status !== "countered") {
    throw new Error("This offer cannot be updated.");
  }

  await prisma.offer.update({
    where: { token },
    data: { status: accept ? "counter_accepted" : "counter_rejected" },
  });

  revalidatePath(`/offer/${token}`);
  revalidatePath("/admin/offers");
}
