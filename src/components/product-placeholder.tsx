const silhouettes = {
  clothing: (
    <g opacity="0.12">
      {/* Dress silhouette */}
      <path d="M50 18 C45 18 42 20 40 24 L38 30 L35 28 L30 32 L36 36 L32 70 L28 90 L72 90 L68 70 L64 36 L70 32 L65 28 L62 30 L60 24 C58 20 55 18 50 18Z" fill="currentColor"/>
      <ellipse cx="50" cy="14" rx="6" ry="7" fill="currentColor"/>
    </g>
  ),
  bags: (
    <g opacity="0.12">
      {/* Handbag silhouette */}
      <path d="M30 45 Q30 38 38 35 L38 28 Q38 20 50 20 Q62 20 62 28 L62 35 Q70 38 70 45 L72 80 Q72 85 67 85 L33 85 Q28 85 28 80 Z" fill="currentColor"/>
      <path d="M42 28 Q42 24 50 24 Q58 24 58 28" stroke="currentColor" strokeWidth="2.5" fill="none" opacity="0.3"/>
      <rect x="46" y="52" width="8" height="5" rx="2" fill="currentColor" opacity="0.3"/>
    </g>
  ),
  shoes: (
    <g opacity="0.12">
      {/* Heel shoe silhouette */}
      <path d="M20 65 L30 40 Q32 35 38 33 L60 30 Q68 29 72 32 L78 36 Q82 40 82 45 L82 65 Q82 70 77 70 L70 70 L68 55 L35 58 L32 70 L25 70 Q20 70 20 65Z" fill="currentColor"/>
      <line x1="68" y1="55" x2="70" y2="70" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
    </g>
  ),
  jewelry: (
    <g opacity="0.12">
      {/* Ring with gem silhouette */}
      <circle cx="50" cy="52" r="22" stroke="currentColor" strokeWidth="5" fill="none"/>
      <circle cx="50" cy="52" r="18" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.3"/>
      <polygon points="50,28 44,38 56,38" fill="currentColor"/>
      <polygon points="50,28 42,36 58,36" fill="currentColor" opacity="0.5"/>
      <circle cx="50" cy="33" r="3" fill="currentColor" opacity="0.4"/>
    </g>
  ),
};

const palettes: Record<string, { from: string; via: string; to: string; accent: string }> = {
  clothing: { from: "#e8ddd0", via: "#f5efe6", to: "#ede4d8", accent: "#9a8672" },
  bags: { from: "#e5d5c0", via: "#f0e4d4", to: "#dcc9b5", accent: "#a08050" },
  shoes: { from: "#ddd8d2", via: "#eae6e0", to: "#d5d0ca", accent: "#7a746e" },
  jewelry: { from: "#e8e2da", via: "#f6f0e8", to: "#e0d8ce", accent: "#8a7d6d" },
};

const darkPalettes: Record<string, { from: string; via: string; to: string; accent: string }> = {
  clothing: { from: "#2a2420", via: "#1e1a16", to: "#252018", accent: "#b09878" },
  bags: { from: "#2c2418", via: "#201c14", to: "#28201a", accent: "#c0a060" },
  shoes: { from: "#26241e", via: "#1c1a16", to: "#222018", accent: "#908880" },
  jewelry: { from: "#28241e", via: "#1e1c16", to: "#24201a", accent: "#a09080" },
};

type Props = {
  category: string;
  name: string;
  className?: string;
};

export function ProductPlaceholder({ category, name, className = "" }: Props) {
  const cat = category.toLowerCase();
  const silhouette = silhouettes[cat as keyof typeof silhouettes] ?? silhouettes.jewelry;
  const light = palettes[cat] ?? palettes.jewelry;
  const dark = darkPalettes[cat] ?? darkPalettes.jewelry;
  const monogram = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Light mode */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full dark:hidden" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={`lg-${monogram}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={light.from} />
            <stop offset="50%" stopColor={light.via} />
            <stop offset="100%" stopColor={light.to} />
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill={`url(#lg-${monogram})`} />
        <g color={light.accent}>{silhouette}</g>
        <text x="50" y="96" textAnchor="middle" fill={light.accent} opacity="0.25" fontSize="4" fontFamily="sans-serif" letterSpacing="0.15em">
          {category.toUpperCase()}
        </text>
      </svg>
      {/* Dark mode */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full hidden dark:block" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={`dg-${monogram}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={dark.from} />
            <stop offset="50%" stopColor={dark.via} />
            <stop offset="100%" stopColor={dark.to} />
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill={`url(#dg-${monogram})`} />
        <g color={dark.accent}>{silhouette}</g>
        <text x="50" y="96" textAnchor="middle" fill={dark.accent} opacity="0.3" fontSize="4" fontFamily="sans-serif" letterSpacing="0.15em">
          {category.toUpperCase()}
        </text>
      </svg>
    </div>
  );
}
