export const directions = [
  {
    slug: "workbench",
    name: "Workbench",
    description: "Charcoal, bronze, and a compact layout.",
  },
  {
    slug: "editorial",
    name: "Editorial",
    description: "Warm paper, serif typography, and a personal introduction.",
  },
  {
    slug: "index",
    name: "Index",
    description: "A quiet layout with a side navigation and room for the work.",
  },
] as const;

export const DEFAULT_DIRECTION = "index";

export type Direction = (typeof directions)[number]["slug"];

export function isDirection(value: string): value is Direction {
  return directions.some((direction) => direction.slug === value);
}
