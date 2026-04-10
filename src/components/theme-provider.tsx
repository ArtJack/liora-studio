"use client";

import { createContext, type ReactNode, useContext, useEffect, useState, useSyncExternalStore } from "react";

type ThemePreference = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

type ThemeContextValue = {
  themePreference: ThemePreference;
  resolvedTheme: ResolvedTheme;
  mounted: boolean;
  setThemePreference: (theme: ThemePreference) => void;
  toggleTheme: () => void;
};

const STORAGE_KEY = "liora-theme";
const ThemeContext = createContext<ThemeContextValue | null>(null);

function getStoredThemePreference(): ThemePreference {
  if (typeof window === "undefined") return "system";

  const storedTheme = window.localStorage.getItem(STORAGE_KEY);
  return storedTheme === "light" || storedTheme === "dark" || storedTheme === "system"
    ? storedTheme
    : "system";
}

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function resolveTheme(themePreference: ThemePreference, systemTheme: ResolvedTheme): ResolvedTheme {
  return themePreference === "system" ? systemTheme : themePreference;
}

function applyTheme(themePreference: ThemePreference, systemTheme: ResolvedTheme) {
  const resolvedTheme = resolveTheme(themePreference, systemTheme);
  const root = document.documentElement;

  root.dataset.themePreference = themePreference;
  root.dataset.theme = resolvedTheme;
  root.classList.toggle("dark", resolvedTheme === "dark");

  root.classList.add("theme-changing");
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      root.classList.remove("theme-changing");
    });
  });
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Start with safe server defaults to avoid hydration mismatch
  const [mounted, setMounted] = useState(false);
  const [themePreference, setThemePreferenceState] = useState<ThemePreference>("system");
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>("light");

  const resolvedTheme = resolveTheme(themePreference, systemTheme);

  // Read actual values only after mount
  useEffect(() => {
    const pref = getStoredThemePreference();
    const sys = getSystemTheme();
    setThemePreferenceState(pref);
    setSystemTheme(sys);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    applyTheme(themePreference, systemTheme);
  }, [themePreference, systemTheme, mounted]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    function handleMediaChange() {
      setSystemTheme(getSystemTheme());
    }

    function handleStorage(event: StorageEvent) {
      if (event.key !== STORAGE_KEY) return;
      setThemePreferenceState(getStoredThemePreference());
    }

    mediaQuery.addEventListener("change", handleMediaChange);
    window.addEventListener("storage", handleStorage);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  function setThemePreference(theme: ThemePreference) {
    setThemePreferenceState(theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }

  function toggleTheme() {
    setThemePreference(resolvedTheme === "dark" ? "light" : "dark");
  }

  return (
    <ThemeContext.Provider
      value={{
        themePreference,
        resolvedTheme,
        mounted,
        setThemePreference,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
