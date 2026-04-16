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
      className="theme-toggle-shell"
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
            className="theme-toggle-option"
            aria-label={`Use ${option.label.toLowerCase()} theme`}
            aria-pressed={active}
            data-active={active}
            title={option.label}
          >
            <span className="theme-toggle-option__backdrop" aria-hidden="true" />
            <span className="theme-toggle-option__content">
              <span
                className="theme-toggle-option__icon"
                data-mode={option.value}
                data-active={active}
                data-resolved={option.value === "system" ? resolvedTheme : undefined}
                aria-hidden="true"
              >
                <Icon size={14} />
              </span>
              <span className="hidden sm:inline">{option.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
