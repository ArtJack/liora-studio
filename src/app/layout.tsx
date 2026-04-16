import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart-context";
import { Header } from "@/components/header";
import { Marquee } from "@/components/marquee";
import { Footer } from "@/components/footer";
import { ThemeScript } from "@/components/theme-script";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.liorastudiousa.com"),
  title: "LIORA STUDIO USA — Curated Jewelry",
  description:
    "Shop curated plated jewelry — rings, earrings, necklaces, bracelets, brooches, and anklets at LIORA STUDIO.",
  openGraph: {
    title: "LIORA STUDIO",
    description: "Curated plated jewelry — rings, earrings, necklaces, bracelets, brooches, and anklets.",
    url: "https://www.liorastudiousa.com",
    siteName: "LIORA STUDIO",
    images: [
      {
        url: "/images/products/diamond-pendant-necklace.jpg",
        width: 1200,
        height: 1200,
        alt: "LIORA STUDIO curated jewelry collection",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <CartProvider>
            <Header />
            <Marquee />
            <main className="site-main flex-1 relative">{children}</main>
            <Footer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
