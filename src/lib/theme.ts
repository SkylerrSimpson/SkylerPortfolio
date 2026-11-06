export type Theme = "light" | "dark" | "system";
export type ColorTheme = Exclude<Theme, "system">;

export const THEME_STORAGE_KEY = "portfolio-theme";
export const SYSTEM_THEME_QUERY = "(prefers-color-scheme: dark)";

let sessionTheme: Theme | undefined;

export function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark" || value === "system";
}

export function readTheme(): Theme {
  if (sessionTheme) return sessionTheme;
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    sessionTheme = isTheme(stored) ? stored : "system";
  } catch {
    sessionTheme = "system";
  }
  return sessionTheme;
}

export function clearSessionTheme() {
  sessionTheme = undefined;
}

export function resolveTheme(theme: Theme, prefersDark: boolean): ColorTheme {
  return theme === "system" ? (prefersDark ? "dark" : "light") : theme;
}

export function applyTheme(theme: Theme) {
  const prefersDark = theme === "system" && window.matchMedia(SYSTEM_THEME_QUERY).matches;
  document.documentElement.dataset.theme = resolveTheme(theme, prefersDark);
  document.documentElement.dataset.themePreference = theme;
}

export function storeTheme(theme: Theme) {
  sessionTheme = theme;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {}
}

export const themeInit = `(()=>{var t='system';try{var s=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});if(s==='light'||s==='dark'||s==='system')t=s}catch(e){}var dark=t==='dark'||t==='system'&&matchMedia(${JSON.stringify(SYSTEM_THEME_QUERY)}).matches;document.documentElement.dataset.theme=dark?'dark':'light';document.documentElement.dataset.themePreference=t})()`;
