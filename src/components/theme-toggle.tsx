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

  const currentIndex = options.findIndex((option) => option.value === themePreference);
  const currentOption = options[currentIndex] ?? options[2];
  const nextOption = options[(currentIndex + 1) % options.length] ?? options[0];
  const Icon = currentOption.icon;
  const resolvedLabel = themePreference === "system" ? `Auto (${resolvedTheme})` : currentOption.label;

  return (
    <button
      type="button"
      onClick={() => setThemePreference(nextOption.value)}
      className="theme-toggle-shell"
      aria-label={`Theme: ${resolvedLabel}. Click to switch to ${nextOption.label}.`}
      title={`Theme: ${resolvedLabel}. Next: ${nextOption.label}`}
    >
      <span className="theme-toggle-option__backdrop" aria-hidden="true" />
      <span className="theme-toggle-option__content">
        <span
          className="theme-toggle-option__icon"
          data-mode={currentOption.value}
          data-active="true"
          data-resolved={currentOption.value === "system" ? resolvedTheme : undefined}
          aria-hidden="true"
        >
          <Icon size={14} />
        </span>
        <span className="theme-toggle-option__label">{currentOption.label}</span>
      </span>
    </button>
  );
}
