"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_NAME, generateToken, verifyTotpCode } from "@/lib/admin-auth";

export async function loginAction(
  _prevState: { error?: string } | null,
  formData: FormData
) {
  const code = formData.get("code") as string;

  if (!code || !verifyTotpCode(code.trim())) {
    return { error: "Invalid code. Try again." };
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, generateToken(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    secure: process.env.NODE_ENV === "production",
  });

  redirect("/admin");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  redirect("/admin/login");
}
