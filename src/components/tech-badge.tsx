import { Boxes, FileText, Sheet, Tag, Wrench, type LucideIcon } from "lucide-react";
import type { CSSProperties } from "react";
import { Badge } from "@/components/ui/badge";
import { techIconPaths } from "@/components/tech-icon-paths";
import styles from "./tech-badge.module.css";

type Technology = {
  icon: string | LucideIcon;
  light?: string;
  dark?: string;
};

// Brand hues from the pinned Simple Icons source, adjusted for text contrast.
const technologies: Record<string, Technology> = {
  "Next.js": { icon: techIconPaths["Next.js"], light: "#000000", dark: "#ffffff" },
  TypeScript: { icon: techIconPaths.TypeScript, light: "#2b6aae", dark: "#5c97d7" },
  PostgreSQL: { icon: techIconPaths.PostgreSQL, light: "#325ddf", dark: "#7290e9" },
  "Tailwind CSS": { icon: techIconPaths["Tailwind CSS"], light: "#047285", dark: "#06b6d4" },
  React: { icon: techIconPaths.React, light: "#04718f", dark: "#61dafb" },
  PHP: { icon: techIconPaths.PHP, light: "#5e62a6", dark: "#8c90c0" },
  Laravel: { icon: techIconPaths.Laravel, light: "#d10c00", dark: "#ff5b50" },
  // Semantic colors for spreadsheet and PDF features.
  "Office.js": { icon: Sheet, light: "#0f773f", dark: "#16a958" },
  PDF: { icon: FileText, light: "#ca2121", dark: "#e86e6e" },
  "Internal tools": { icon: Wrench },
  "Inventory management": { icon: Boxes },
};

export function TechBadge({ label }: { label: string }) {
  const technology = Object.hasOwn(technologies, label) ? technologies[label] : { icon: Tag };
  const Icon = technology.icon;
  const colors = {
    "--tech-light": technology.light,
    "--tech-dark": technology.dark,
  } as CSSProperties;

  return (
    <Badge variant="outline" className={`tech-badge ${styles.badge}`} style={colors}>
      {typeof Icon === "string" ? (
        <svg
          viewBox="0 0 24 24"
          width={12}
          height={12}
          fill="currentColor"
          aria-hidden="true"
          focusable="false"
        >
          <path d={Icon} />
        </svg>
      ) : (
        <Icon size={12} aria-hidden="true" focusable="false" />
      )}
      {label}
    </Badge>
  );
}
