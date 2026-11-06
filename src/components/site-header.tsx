"use client";

import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";
import { ThemeMenu } from "@/components/theme-menu";
import { useActiveSection } from "@/hooks/use-active-section";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import styles from "./site-header.module.css";

const sections = [
  { id: "work", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];
const sectionIds = sections.map(({ id }) => id);

export function SiteHeader({ home = "/" }: { home?: string }) {
  const activeSection = useActiveSection(home, sectionIds);

  return (
    <header className="site-header shell">
      <Link className="wordmark" href={home} aria-label="Skyler Simpson home">
        <span className="wordmark-name">Skyler Simpson</span>
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {sections.map(({ id, label }) => (
          <Link
            key={id}
            href={`${home}#${id}`}
            className={styles.sectionLink}
            aria-current={activeSection === id ? "location" : undefined}
          >
            {label}
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        <ThemeMenu />
        <Button variant="outline" asChild className="header-contact">
          <Link href={`${home}#contact`}>
            Email me <ArrowUpRight />
          </Link>
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="mobile-menu"
              variant="outline"
              size="icon"
              aria-label="Open navigation"
            >
              <Menu />
            </Button>
          </DialogTrigger>
          <DialogContent className="mobile-nav-dialog" aria-describedby={undefined}>
            <DialogTitle>Navigation</DialogTitle>
            <nav aria-label="Mobile navigation">
              {sections.map(({ id, label }) => (
                <DialogClose asChild key={id}>
                  <Link
                    href={`${home}#${id}`}
                    aria-current={activeSection === id ? "location" : undefined}
                  >
                    {label}
                    <ArrowUpRight />
                  </Link>
                </DialogClose>
              ))}
            </nav>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
