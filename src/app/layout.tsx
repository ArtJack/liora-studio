import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart-context";
import { Header } from "@/components/header";
import { Marquee } from "@/components/marquee";
import { Footer } from "@/components/footer";
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
  title: "LIORA STUDIO USA — Luxury Fashion & Accessories",
  description:
    "Discover curated luxury fashion, designer bags, shoes, and fine jewelry at LIORA STUDIO.",
  openGraph: {
    title: "LIORA STUDIO",
    description: "Discover curated luxury fashion.",
    url: "https://www.liorastudiousa.com",
    siteName: "LIORA STUDIO",
    images: [
      {
        url: "/images/products/classic-leather-tote.png",
        width: 800,
        height: 800,
        alt: "LIORA STUDIO - Designer Bags",
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
        <script src="/theme-init.js" suppressHydrationWarning />
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
