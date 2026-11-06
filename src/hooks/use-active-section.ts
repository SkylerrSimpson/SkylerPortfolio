"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getActiveSection } from "@/lib/active-section";

export function useActiveSection(home: string, sectionIds: readonly string[]) {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (pathname !== home) return;
    const sections = sectionIds.flatMap((id) => {
      const element = document.getElementById(id);
      return element ? [element] : [];
    });
    if (!sections.length) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      setActiveSection(
        getActiveSection(
          sections.map((section) => ({ id: section.id, top: section.getBoundingClientRect().top })),
          {
            scrollY: window.scrollY,
            height: window.innerHeight,
            documentHeight: document.documentElement.scrollHeight,
          },
        ),
      );
    };
    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);
    window.addEventListener("popstate", scheduleUpdate);
    window.addEventListener("pageshow", scheduleUpdate);
    const observer = new ResizeObserver(scheduleUpdate);
    const content = document.getElementById("content");
    if (content) observer.observe(content);
    scheduleUpdate();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
      window.removeEventListener("popstate", scheduleUpdate);
      window.removeEventListener("pageshow", scheduleUpdate);
    };
  }, [home, pathname, sectionIds]);

  return pathname === home ? activeSection : null;
}
