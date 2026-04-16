import { Diamond } from "lucide-react";

const items = [
  "Complimentary Shipping on Orders Over $500",
  "Curated Plated Jewelry",
  "New Jewelry Arrivals Every Week",
  "14-Day Easy Returns",
  "Curated by LIORA STUDIO",
  "Gold-Tone, Silver-Tone & Gemstone Styles",
];

function MarqueeContent() {
  return (
    <>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-4 whitespace-nowrap">
          <span className="text-[11px] uppercase tracking-[0.22em]">{item}</span>
          <Diamond size={8} className="text-accent/60 flex-shrink-0" />
        </span>
      ))}
    </>
  );
}

export function Marquee() {
  return (
    <div className="overflow-hidden border-b border-border/50 bg-foreground/[0.03]">
      <div className="marquee-track flex items-center gap-4 py-2.5 px-4">
        <MarqueeContent />
        <MarqueeContent />
      </div>
    </div>
  );
}
