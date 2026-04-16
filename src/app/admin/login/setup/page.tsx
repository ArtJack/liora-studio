import { getTotpUri } from "@/lib/admin-auth";
import Image from "next/image";
import * as QRCode from "qrcode";

export default async function SetupPage() {
  const uri = getTotpUri();
  const qrDataUrl = await QRCode.toDataURL(uri, {
    width: 256,
    margin: 2,
    color: { dark: "#1a1a1a", light: "#ffffff" },
  });

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm text-center">
        <h1 className="text-sm tracking-[0.3em] uppercase text-muted">
          LIORA STUDIO
        </h1>
        <p className="mt-2 text-xs text-muted/60 mb-8">
          Set Up Google Authenticator
        </p>

        <div className="surface-panel rounded-2xl p-6 mb-6">
          <p className="text-sm text-muted mb-4">
            Scan this QR code with Google Authenticator:
          </p>
          <Image
            src={qrDataUrl}
            alt="TOTP QR Code"
            width={256}
            height={256}
            className="mx-auto rounded-xl"
            unoptimized
          />
        </div>

        <p className="text-xs text-muted/60 mb-4">
          After scanning, delete this setup page bookmark. <br />
          You only need to do this once.
        </p>

        <a
          href="/admin/login"
          className="inline-block rounded-xl bg-foreground px-8 py-3 text-sm uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-90"
        >
          Go to Login
        </a>
      </div>
    </div>
  );
}
