"use client";

import Link from "next/link";
import { ShoppingBag, Menu, X, Moon, Sun } from "lucide-react";
import { useCart } from "./cart-context";
import { CartDrawer } from "./cart-drawer";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { useTheme } from "./theme-provider";

const navLinks = [
  { href: "/shop", label: "Shop All" },
  { href: "/shop?category=rings", label: "Rings" },
  { href: "/shop?category=earrings", label: "Earrings" },
  { href: "/shop?category=necklaces", label: "Necklaces" },
  { href: "/shop?category=bracelets", label: "Bracelets" },
  { href: "/shop?category=brooches", label: "Brooches" },
  { href: "/shop?category=gift-sets", label: "Mystery Box" },
];

export function Header() {
  const { totalItems, setIsOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border/70 bg-surface/70 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid h-15 grid-cols-[40px_minmax(0,1fr)_auto] items-center gap-3 sm:h-16 lg:h-[4.75rem] lg:grid-cols-[272px_minmax(0,1fr)_auto] xl:grid-cols-[292px_minmax(0,1fr)_auto]">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-background/60 text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 lg:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <Link
              href="/"
              className="min-w-0 text-center lg:justify-self-start"
            >
              <h1 className="truncate px-2 text-[14px] font-light tracking-[0.2em] text-foreground sm:px-0 sm:text-xl sm:tracking-[0.32em] lg:text-[1.5rem] xl:text-[1.55rem]">
                LIORA STUDIO
              </h1>
            </Link>

            <nav className="hidden items-center justify-center gap-4 pl-4 xl:gap-6 xl:pl-0 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[10px] uppercase tracking-[0.16em] text-muted hover:text-foreground xl:text-[11px] xl:tracking-[0.2em]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center justify-end gap-2 lg:justify-self-end">
              <button
                onClick={toggleTheme}
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-background/60 text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 sm:hidden"
                aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} theme`}
                title={resolvedTheme === "dark" ? "Light mode" : "Dark mode"}
              >
                {resolvedTheme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
              </button>
              <div className="hidden sm:block">
                <ThemeToggle />
              </div>
              <button
                onClick={() => setIsOpen(true)}
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-background/60 text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                aria-label="Open cart"
              >
                <ShoppingBag size={18} />
                {totalItems > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-medium text-white">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <nav className="border-t border-border/70 bg-surface px-4 py-4 lg:hidden">
            <div className="mb-3 flex justify-center">
              <ThemeToggle />
            </div>
            <div className="space-y-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-xl border border-transparent px-4 py-2.5 text-sm tracking-[0.14em] text-muted hover:border-border/70 hover:bg-background/40 hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      <CartDrawer />
    </>
  );
}
