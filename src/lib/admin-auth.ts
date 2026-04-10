import { createHmac, timingSafeEqual } from "crypto";

export const COOKIE_NAME = "admin_session";
const TOKEN_PAYLOAD = "admin:authenticated";

function getSecret(): string {
  const user = process.env.ADMIN_USERNAME ?? "admin";
  const pass = process.env.ADMIN_PASSWORD ?? "";
  return `${user}:${pass}`;
}

export function generateToken(): string {
  return createHmac("sha256", getSecret()).update(TOKEN_PAYLOAD).digest("hex");
}

export function validateToken(token: string): boolean {
  const expected = generateToken();
  if (token.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(token), Buffer.from(expected));
}

export function verifyCredentials(username: string, password: string): boolean {
  const expectedUser = process.env.ADMIN_USERNAME ?? "admin";
  const expectedPass = process.env.ADMIN_PASSWORD ?? "";
  return username === expectedUser && password === expectedPass;
}
