"use client";

import { LaptopMinimal, Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { resolvedTheme, themePreference, mounted, setThemePreference, toggleTheme } = useTheme();

  // Render a placeholder with same dimensions before mount to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="flex items-center gap-2 rounded-full border border-border/80 bg-surface/80 p-1 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-md">
        <button
          type="button"
          className="inline-flex h-9 min-w-9 items-center justify-center rounded-full bg-background/70 px-3 text-muted"
          aria-label="Toggle theme"
        >
          <Sun size={16} />
        </button>
        <button
          type="button"
          className="inline-flex h-9 items-center gap-1 rounded-full px-3 text-[11px] uppercase tracking-[0.18em] text-muted"
          aria-label="Use system theme"
        >
          <LaptopMinimal size={14} />
          Auto
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 rounded-full border border-border/80 bg-surface/80 p-1 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-md">
      <button
        type="button"
        onClick={toggleTheme}
        className="inline-flex h-9 min-w-9 items-center justify-center rounded-full bg-background/70 px-3 text-muted transition-all hover:text-foreground"
        aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
        title={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
      >
        {resolvedTheme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
      </button>

      <button
        type="button"
        onClick={() => setThemePreference("system")}
        className={`inline-flex h-9 items-center gap-1 rounded-full px-3 text-[11px] uppercase tracking-[0.18em] transition-colors ${
          themePreference === "system"
            ? "bg-foreground text-background"
            : "text-muted hover:text-foreground"
        }`}
        aria-label="Use system theme"
        title="Use system theme"
      >
        <LaptopMinimal size={14} />
        Auto
      </button>
    </div>
  );
}
