import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Droplets, Sparkles, ShieldCheck, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Jewelry Care Guide — LIORA STUDIO",
  description:
    "Keep your plated jewelry looking its best. Tips on cleaning, storage, and daily wear from LIORA STUDIO.",
};

const tips = [
  {
    icon: Droplets,
    title: "Avoid Water & Chemicals",
    body: "Remove jewelry before showering, swimming, or applying lotions, perfumes, and hairspray. Chemicals and moisture break down the plating over time.",
  },
  {
    icon: Sparkles,
    title: "Clean Gently",
    body: "Wipe pieces with a soft, dry cloth after each wear to remove oils and sweat. For deeper cleaning, use a damp cloth — never abrasive cleaners or ultrasonic machines.",
  },
  {
    icon: ShieldCheck,
    title: "Store Properly",
    body: "Keep each piece in a separate soft pouch or lined jewelry box. Avoid tossing pieces together — friction causes scratches and wears down plating faster.",
  },
  {
    icon: Heart,
    title: "Put On Last, Take Off First",
    body: "Make jewelry the last thing you put on after dressing and styling, and the first thing you remove. This minimizes exposure to products and reduces snagging.",
  },
];

export default function CareGuidePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/shop"
        className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.16em] text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft size={14} /> Back to Shop
      </Link>

      <div className="mt-8">
        <p className="text-xs uppercase tracking-[0.24em] text-muted">Guide</p>
        <h1 className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl">
          Jewelry Care
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-7 text-muted">
          All LIORA STUDIO pieces are crafted with plated finishes over quality base metals.
          With a little care, your jewelry will keep its polish and presence for a long time.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {tips.map((tip) => (
          <div
            key={tip.title}
            className="surface-panel rounded-[28px] p-6"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-background/35">
              <tip.icon size={18} className="text-accent" />
            </div>
            <h2 className="mt-4 text-sm font-medium text-foreground">{tip.title}</h2>
            <p className="mt-2 text-sm leading-7 text-muted">{tip.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 surface-panel rounded-[28px] p-6 sm:p-8">
        <h2 className="text-xs uppercase tracking-[0.22em] text-muted">What to Expect</h2>
        <div className="mt-4 space-y-4 text-sm leading-7 text-muted">
          <p>
            <strong className="text-foreground">Gold-tone plated</strong> pieces use a brass
            base coated with a warm gold finish. They resist everyday wear well but will show
            natural aging if exposed to moisture or chemicals regularly.
          </p>
          <p>
            <strong className="text-foreground">Silver-tone plated</strong> pieces use a brass
            or copper base with a bright silver finish. Keep them dry and polished for the
            longest life.
          </p>
          <p>
            <strong className="text-foreground">Decorative stones</strong> (cubic zirconia,
            crystals, faux pearls) are set for beauty, not certified gemstone value. Handle
            gently to keep settings secure.
          </p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-muted">
          Questions about a specific piece?{" "}
          <a href="mailto:hello@liorastudiousa.com" className="text-accent hover:underline">
            Email us
          </a>
        </p>
      </div>
    </div>
  );
}
