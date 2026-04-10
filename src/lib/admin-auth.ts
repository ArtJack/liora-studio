import { createHmac, timingSafeEqual } from "crypto";
import { TOTP } from "otpauth";

export const COOKIE_NAME = "admin_session";

// TOTP secret - set via TOTP_SECRET env var
// Generate one with: npx -y otpauth-migration generate
function getTotpSecret(): string {
  return process.env.TOTP_SECRET ?? "";
}

function getTotp(): TOTP {
  return new TOTP({
    issuer: "LIORA STUDIO",
    label: "Admin",
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret: getTotpSecret(),
  });
}

/** Verify a 6-digit TOTP code (allows 1 window of drift) */
export function verifyTotpCode(code: string): boolean {
  const totp = getTotp();
  const delta = totp.validate({ token: code, window: 1 });
  return delta !== null;
}

/** Generate the otpauth:// URI for QR code scanning */
export function getTotpUri(): string {
  return getTotp().toString();
}

// Session token management
function getSessionSecret(): string {
  return process.env.TOTP_SECRET ?? "fallback";
}

export function generateToken(): string {
  return createHmac("sha256", getSessionSecret())
    .update("admin:authenticated")
    .digest("hex");
}

export function validateToken(token: string): boolean {
  const expected = generateToken();
  if (token.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(token), Buffer.from(expected));
}
