"use client";

import { LaptopMinimal, Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { themePreference, resolvedTheme, setThemePreference } = useTheme();

  const options = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "Auto", icon: LaptopMinimal },
  ] as const;

  return (
    <div
      className="flex items-center gap-1 rounded-full border border-border/70 bg-surface/88 p-1 shadow-[0_12px_32px_rgba(15,23,42,0.08)] backdrop-blur-xl"
      aria-label="Theme controls"
      role="group"
    >
      {options.map((option) => {
        const Icon = option.icon;
        const active =
          themePreference === option.value ||
          (option.value !== "system" && themePreference === "system" && resolvedTheme === option.value);

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setThemePreference(option.value)}
            className={`inline-flex h-9 items-center justify-center gap-1.5 rounded-full px-3 text-[11px] uppercase tracking-[0.18em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 ${
              active
                ? "bg-foreground text-background shadow-sm"
                : "text-muted hover:bg-background/70 hover:text-foreground"
            }`}
            aria-label={`Use ${option.label.toLowerCase()} theme`}
            aria-pressed={active}
            title={option.label}
          >
            <Icon size={14} aria-hidden="true" />
            <span className="hidden sm:inline">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
