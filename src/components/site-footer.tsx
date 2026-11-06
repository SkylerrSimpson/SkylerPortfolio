import { BrandIcon } from "@/components/brand-icon";
import { profile } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="site-footer shell">
      <span>© {new Date().getFullYear()} Skyler Simpson</span>
      <span className="footer-note">PHP, Laravel & TypeScript</span>
      <a className="github-link" href={profile.github} target="_blank" rel="noreferrer">
        <BrandIcon name="github" /> GitHub
      </a>
    </footer>
  );
}
