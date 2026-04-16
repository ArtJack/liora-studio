const silhouettes = {
  rings: (
    <g opacity="0.12">
      <circle cx="50" cy="56" r="20" stroke="currentColor" strokeWidth="5" fill="none"/>
      <polygon points="50,25 43,36 57,36" fill="currentColor"/>
      <polygon points="50,25 40,35 60,35" fill="currentColor" opacity="0.45"/>
    </g>
  ),
  earrings: (
    <g opacity="0.12">
      <path d="M36 24 C36 18 40 14 45 14 C50 14 54 18 54 24 C54 29 51 32 45 38 C39 32 36 29 36 24Z" fill="currentColor"/>
      <circle cx="45" cy="54" r="11" stroke="currentColor" strokeWidth="4" fill="none"/>
      <path d="M64 24 C64 18 68 14 73 14 C78 14 82 18 82 24 C82 29 79 32 73 38 C67 32 64 29 64 24Z" fill="currentColor" opacity="0.8"/>
      <circle cx="73" cy="54" r="11" stroke="currentColor" strokeWidth="4" fill="none"/>
    </g>
  ),
  necklaces: (
    <g opacity="0.12">
      <path d="M24 28 C34 16 66 16 76 28" stroke="currentColor" strokeWidth="4" fill="none"/>
      <path d="M30 32 C38 22 62 22 70 32" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.35"/>
      <polygon points="50,45 40,58 50,74 60,58" fill="currentColor"/>
    </g>
  ),
  bracelets: (
    <g opacity="0.12">
      <circle cx="50" cy="54" r="22" stroke="currentColor" strokeWidth="5" fill="none"/>
      <circle cx="50" cy="54" r="14" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.35"/>
      <circle cx="50" cy="32" r="5" fill="currentColor"/>
    </g>
  ),
  brooches: (
    <g opacity="0.12">
      <circle cx="50" cy="40" r="11" fill="currentColor"/>
      <circle cx="36" cy="50" r="11" fill="currentColor" opacity="0.85"/>
      <circle cx="64" cy="50" r="11" fill="currentColor" opacity="0.85"/>
      <circle cx="42" cy="64" r="11" fill="currentColor" opacity="0.78"/>
      <circle cx="58" cy="64" r="11" fill="currentColor" opacity="0.78"/>
      <circle cx="50" cy="54" r="7" fill="white" opacity="0.4"/>
    </g>
  ),
  "mystery box": (
    <g opacity="0.12">
      <rect x="30" y="34" width="40" height="32" rx="4" stroke="currentColor" strokeWidth="4" fill="none"/>
      <path d="M30 44 L70 44" stroke="currentColor" strokeWidth="3"/>
      <path d="M50 34 L50 66" stroke="currentColor" strokeWidth="3"/>
      <path d="M50 28 C44 18 56 18 50 28" fill="currentColor" opacity="0.6"/>
      <circle cx="50" cy="44" r="4" fill="currentColor"/>
    </g>
  ),
  jewelry: (
    <g opacity="0.12">
      <circle cx="50" cy="52" r="22" stroke="currentColor" strokeWidth="5" fill="none"/>
      <circle cx="50" cy="52" r="18" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.3"/>
      <polygon points="50,28 44,38 56,38" fill="currentColor"/>
      <polygon points="50,28 42,36 58,36" fill="currentColor" opacity="0.5"/>
      <circle cx="50" cy="33" r="3" fill="currentColor" opacity="0.4"/>
    </g>
  ),
};

const palettes: Record<string, { from: string; via: string; to: string; accent: string }> = {
  rings: { from: "#ece3db", via: "#f8f0e6", to: "#dfd2c5", accent: "#9b7e63" },
  earrings: { from: "#e8ddd7", via: "#f7ede7", to: "#ded0c6", accent: "#9d8066" },
  necklaces: { from: "#eee3d9", via: "#f8f1ea", to: "#e4d6cb", accent: "#a07c5f" },
  bracelets: { from: "#e6ddd4", via: "#f3ece5", to: "#dbcdc0", accent: "#8d7764" },
  brooches: { from: "#eee1dc", via: "#f9efea", to: "#e1d2ca", accent: "#9c776e" },
  "mystery box": { from: "#e8dbe4", via: "#f5edf2", to: "#ddd0d8", accent: "#8d6781" },
  jewelry: { from: "#e8e2da", via: "#f6f0e8", to: "#e0d8ce", accent: "#8a7d6d" },
};

const darkPalettes: Record<string, { from: string; via: string; to: string; accent: string }> = {
  rings: { from: "#28211b", via: "#1d1814", to: "#251d18", accent: "#c3a384" },
  earrings: { from: "#271f1a", via: "#1c1714", to: "#231b17", accent: "#bf9e82" },
  necklaces: { from: "#2a211a", via: "#1f1813", to: "#251d17", accent: "#c19d7d" },
  bracelets: { from: "#261f1a", via: "#1c1713", to: "#221b16", accent: "#b69b82" },
  brooches: { from: "#2a1f1c", via: "#1f1715", to: "#241b18", accent: "#c19a8d" },
  "mystery box": { from: "#251f23", via: "#1c1419", to: "#221c20", accent: "#af82a0" },
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
