import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/70 bg-[color-mix(in_srgb,var(--color-foreground)_96%,transparent)] text-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <h2 className="mb-3 text-[16px] font-light tracking-[0.3em] sm:mb-4 sm:text-lg sm:tracking-[0.35em]">LIORA STUDIO</h2>
            <p className="text-sm leading-relaxed text-background/60">
              Curated plated jewelry chosen for polish, finish, and lasting style.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:contents">
            <div>
              <h3 className="mb-3 text-[11px] uppercase tracking-[0.22em] text-background/40 sm:mb-4 sm:text-xs sm:tracking-[0.2em]">Shop</h3>
              <ul className="space-y-2 sm:space-y-2.5">
                {[
                  { label: "Rings", slug: "rings" },
                  { label: "Earrings", slug: "earrings" },
                  { label: "Necklaces", slug: "necklaces" },
                  { label: "Bracelets", slug: "bracelets" },
                  { label: "Brooches", slug: "brooches" },
                  { label: "Mystery Box", slug: "mystery-box" },
                ].map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/shop?category=${item.slug}`}
                      className="text-sm text-background/60 hover:text-background"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-[11px] uppercase tracking-[0.22em] text-background/40 sm:mb-4 sm:text-xs sm:tracking-[0.2em]">Info</h3>
              <ul className="space-y-2 sm:space-y-2.5">
                {[
                  { label: "Jewelry Care", href: "/care" },
                  { label: "Shipping", href: "#" },
                  { label: "Returns", href: "#" },
                  { label: "Contact", href: "mailto:hello@liorastudiousa.com" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm text-background/60 hover:text-background">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:col-start-4">
            <h3 className="mb-3 text-[11px] uppercase tracking-[0.22em] text-background/40 sm:mb-4 sm:text-xs sm:tracking-[0.2em]">Contact</h3>
            <p className="text-sm leading-relaxed text-background/60">
              hello@liorastudiousa.com
              <br />
              Mon - Fri, 9am - 6pm
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-background/10 pt-6 sm:mt-12 sm:pt-8">
          <div className="flex flex-wrap items-center justify-center gap-4 text-background/40 md:justify-start">
            <span className="text-[10px] uppercase tracking-[0.18em]">We accept</span>
            <div className="flex items-center gap-2">
              {/* Visa */}
              <svg viewBox="0 0 50 32" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="50" height="32" rx="5" fill="currentColor" fillOpacity="0.12"/>
                <path d="M21.5 20.5h-2.7l1.7-10.5h2.7l-1.7 10.5zm-4.8 0l-2.5-7.2-.3 1.5-.9-4.8h-2.8l-.05.2c1.2.3 2.3.8 3.1 1.3l2.3 8.9h2.8l4.3-10.5h-2.8l-3.2 10.6zm19.8-10.5h-2.2c-.7 0-1.2.2-1.5.8l-4.2 9.7h2.9l.6-1.6h3.6l.3 1.6h2.6l-2.1-10.5zm-3.5 6.8l1.5-4 .8 4h-2.3zm-7.2-2.7c0-.6.5-1.2 1.7-1.2.8 0 1.4.1 1.4.1l.3-2.1s-.6-.2-1.7-.2c-2.8 0-4.5 1.5-4.5 3.6 0 1.6 1.4 2.4 2.4 3 1.1.5 1.4.9 1.4 1.3 0 .7-.8 1-1.6 1-.9 0-1.8-.3-1.8-.3l-.3 2.2s.8.3 2.2.3c3 0 4.7-1.5 4.7-3.7 0-1.9-2.2-2.5-2.2-3z" fill="currentColor" fillOpacity="0.7"/>
              </svg>
              {/* Mastercard */}
              <svg viewBox="0 0 50 32" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="50" height="32" rx="5" fill="currentColor" fillOpacity="0.12"/>
                <circle cx="20" cy="16" r="8" fill="currentColor" fillOpacity="0.25"/>
                <circle cx="30" cy="16" r="8" fill="currentColor" fillOpacity="0.25"/>
                <path d="M25 9.6a8 8 0 000 12.8 8 8 0 000-12.8z" fill="currentColor" fillOpacity="0.35"/>
              </svg>
              {/* Amex */}
              <svg viewBox="0 0 50 32" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="50" height="32" rx="5" fill="currentColor" fillOpacity="0.12"/>
                <text x="25" y="18.5" textAnchor="middle" fill="currentColor" fillOpacity="0.6" fontSize="8.5" fontWeight="800" fontFamily="system-ui,sans-serif" letterSpacing="0.5">AMEX</text>
              </svg>
              {/* PayPal */}
              <svg viewBox="0 0 50 32" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="50" height="32" rx="5" fill="currentColor" fillOpacity="0.12"/>
                <path d="M20 10h4c2.2 0 3.5 1 3.3 3-.3 2.5-2 3.5-4.2 3.5h-1.2l-.6 3.5h-2.2l1-10z" fill="currentColor" fillOpacity="0.5"/>
                <path d="M22 11.5h3c1.5 0 2.2.7 2 2-.2 1.5-1.2 2-2.6 2h-1l-.5 3h-1.6l.7-7z" fill="currentColor" fillOpacity="0.3"/>
              </svg>
              {/* Apple Pay */}
              <svg viewBox="0 0 50 32" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="50" height="32" rx="5" fill="currentColor" fillOpacity="0.12"/>
                <path d="M18.5 11.5c-.5.6-1.3 1-2 1-.1-.8.3-1.6.7-2.1.5-.6 1.3-1 2-1 .1.8-.2 1.5-.7 2.1z" fill="currentColor" fillOpacity="0.6"/>
                <path d="M16.5 12.6c-1.1-.1-2.1.6-2.6.6s-1.4-.6-2.3-.6c-1.2 0-2.3.7-2.9 1.8-1.2 2.1-.3 5.3.9 7 .6.9 1.3 1.8 2.2 1.8s1.2-.6 2.3-.6 1.4.6 2.3.6 1.5-.9 2.1-1.8c.4-.6.7-1.3.8-1.3 0 0-1.6-.6-1.6-2.4 0-1.5 1.2-2.2 1.3-2.2-.7-1.1-1.8-1.8-2.5-1.9z" fill="currentColor" fillOpacity="0.6" transform="translate(9,-2) scale(0.85)"/>
                <text x="32" y="19" textAnchor="middle" fill="currentColor" fillOpacity="0.6" fontSize="9" fontWeight="600" fontFamily="system-ui,sans-serif">Pay</text>
              </svg>
            </div>
          </div>
          <div className="mt-5 flex flex-col gap-3 text-center sm:gap-4 md:flex-row md:items-center md:justify-between md:text-left">
            <p className="max-w-md text-[11px] tracking-[0.14em] text-background/40 sm:text-xs sm:tracking-[0.16em]">
              Curated jewelry, measured releases, and a quieter kind of presence.
            </p>
            <p className="text-[11px] tracking-wide text-background/40 sm:text-xs">
              &copy; {new Date().getFullYear()} LIORA STUDIO. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
