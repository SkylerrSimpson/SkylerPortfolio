type SectionPosition = { id: string; top: number };
type Viewport = { scrollY: number; height: number; documentHeight: number };

export function getActiveSection(sections: readonly SectionPosition[], viewport: Viewport) {
  const last = sections.at(-1);
  if (!last || viewport.scrollY <= 1) return null;

  const atBottom = Math.ceil(viewport.scrollY + viewport.height) >= viewport.documentHeight;
  if (atBottom && last.top < viewport.height) return last.id;

  const activationLine = Math.min(viewport.height * 0.25, 180);
  return sections.findLast((section) => section.top <= activationLine)?.id ?? null;
}
