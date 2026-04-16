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
                {["Rings", "Earrings", "Necklaces", "Bracelets", "Brooches", "Anklets", "Gift Sets"].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/shop?category=${item.toLowerCase()}`}
                      className="text-sm text-background/60 hover:text-background"
                    >
                      {item}
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
            <div className="flex items-center gap-3">
              {/* Visa */}
              <svg viewBox="0 0 38 24" className="h-6 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="38" height="24" rx="4" fill="currentColor" fillOpacity="0.15"/>
                <text x="19" y="15" textAnchor="middle" fill="currentColor" fontSize="9" fontWeight="700" fontFamily="sans-serif">VISA</text>
              </svg>
              {/* Mastercard */}
              <svg viewBox="0 0 38 24" className="h-6 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="38" height="24" rx="4" fill="currentColor" fillOpacity="0.15"/>
                <circle cx="15" cy="12" r="6" fill="currentColor" fillOpacity="0.3"/>
                <circle cx="23" cy="12" r="6" fill="currentColor" fillOpacity="0.3"/>
              </svg>
              {/* Amex */}
              <svg viewBox="0 0 38 24" className="h-6 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="38" height="24" rx="4" fill="currentColor" fillOpacity="0.15"/>
                <text x="19" y="15" textAnchor="middle" fill="currentColor" fontSize="7" fontWeight="700" fontFamily="sans-serif">AMEX</text>
              </svg>
              {/* PayPal */}
              <svg viewBox="0 0 38 24" className="h-6 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="38" height="24" rx="4" fill="currentColor" fillOpacity="0.15"/>
                <text x="19" y="15" textAnchor="middle" fill="currentColor" fontSize="7" fontWeight="600" fontFamily="sans-serif">PayPal</text>
              </svg>
              {/* Apple Pay */}
              <svg viewBox="0 0 38 24" className="h-6 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="38" height="24" rx="4" fill="currentColor" fillOpacity="0.15"/>
                <text x="19" y="15" textAnchor="middle" fill="currentColor" fontSize="6.5" fontWeight="600" fontFamily="sans-serif"> Pay</text>
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
