const themeInitScript = `
(() => {
  try {
    const storageKey = "liora-theme";
    const storedTheme = window.localStorage.getItem(storageKey);
    const themePreference =
      storedTheme === "light" || storedTheme === "dark" || storedTheme === "system"
        ? storedTheme
        : "system";
    const resolvedTheme =
      themePreference === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : themePreference;

    document.documentElement.dataset.themePreference = themePreference;
    document.documentElement.dataset.theme = resolvedTheme;
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
  } catch {
    document.documentElement.dataset.themePreference = "system";
    document.documentElement.dataset.theme = "light";
  }
})();
`;

export function ThemeScript() {
  return (
    <script
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: themeInitScript }}
    />
  );
}
