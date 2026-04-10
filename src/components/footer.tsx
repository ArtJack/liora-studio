import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/70 bg-[color-mix(in_srgb,var(--color-foreground)_96%,transparent)] text-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <h2 className="mb-4 text-lg font-light tracking-[0.35em]">LIORA STUDIO</h2>
            <p className="text-sm leading-relaxed text-background/60">
              Curated luxury fashion and accessories for the discerning individual.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xs uppercase tracking-[0.2em] text-background/40">Shop</h3>
            <ul className="space-y-2.5">
              {["Clothing", "Bags", "Shoes", "Jewelry"].map((item) => (
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
            <h3 className="mb-4 text-xs uppercase tracking-[0.2em] text-background/40">Info</h3>
            <ul className="space-y-2.5">
              {["About", "Contact", "Shipping", "Returns"].map((item) => (
                <li key={item}>
                  <span className="text-sm text-background/60">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs uppercase tracking-[0.2em] text-background/40">Contact</h3>
            <p className="text-sm leading-relaxed text-background/60">
              hello@liorastudiousa.com
              <br />
              Mon - Fri, 9am - 6pm
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-background/10 pt-8 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <p className="max-w-md text-xs tracking-[0.16em] text-background/40">
            Carefully curated pieces, seasonal drops, and a quieter kind of luxury.
          </p>
          <p className="text-xs tracking-wide text-background/40">
            &copy; {new Date().getFullYear()} LIORA STUDIO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
