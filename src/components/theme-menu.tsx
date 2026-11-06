"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  applyTheme,
  clearSessionTheme,
  isTheme,
  readTheme,
  storeTheme,
  SYSTEM_THEME_QUERY,
  THEME_STORAGE_KEY,
  type Theme,
} from "@/lib/theme";

const choices = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

export function ThemeMenu() {
  const [preference, setPreference] = useState<Theme>("system");

  useLayoutEffect(() => {
    const syncPreference = () => {
      const selected = readTheme();
      applyTheme(selected);
      setPreference(selected);
    };
    syncPreference();
    const onStorage = (event: StorageEvent) => {
      if (event.key === THEME_STORAGE_KEY || event.key === null) {
        clearSessionTheme();
        syncPreference();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    if (preference !== "system") return;
    const media = window.matchMedia(SYSTEM_THEME_QUERY);
    const syncSystemTheme = () => {
      if (readTheme() === "system") applyTheme("system");
    };
    media.addEventListener("change", syncSystemTheme);
    syncSystemTheme();
    return () => media.removeEventListener("change", syncSystemTheme);
  }, [preference]);

  function selectTheme(value: string) {
    if (!isTheme(value)) return;
    storeTheme(value);
    applyTheme(value);
    setPreference(value);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="theme-trigger"
          aria-label="Color theme"
          title="Color theme"
        >
          <Sun className="theme-icon-light" aria-hidden="true" />
          <Moon className="theme-icon-dark" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="theme-menu-content"
        align="end"
        side="bottom"
        sideOffset={6}
        collisionPadding={8}
        aria-label="Color theme"
      >
        <DropdownMenuRadioGroup value={preference} onValueChange={selectTheme}>
          {choices.map(({ value, label, icon: Icon }) => (
            <DropdownMenuRadioItem className="theme-menu-item" value={value} key={value}>
              <Icon aria-hidden="true" />
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
