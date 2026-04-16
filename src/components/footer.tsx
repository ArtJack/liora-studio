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
                {["Rings", "Earrings", "Necklaces", "Bracelets", "Brooches", "Anklets"].map((item) => (
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
                {["About", "Contact", "Shipping", "Returns"].map((item) => (
                  <li key={item}>
                    <span className="text-sm text-background/60">{item}</span>
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

        <div className="mt-10 flex flex-col gap-3 border-t border-background/10 pt-6 text-center sm:mt-12 sm:gap-4 sm:pt-8 md:flex-row md:items-center md:justify-between md:text-left">
          <p className="max-w-md text-[11px] tracking-[0.14em] text-background/40 sm:text-xs sm:tracking-[0.16em]">
            Curated jewelry, measured releases, and a quieter kind of presence.
          </p>
          <p className="text-[11px] tracking-wide text-background/40 sm:text-xs">
            &copy; {new Date().getFullYear()} LIORA STUDIO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
