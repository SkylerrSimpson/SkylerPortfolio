import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { DEFAULT_DIRECTION, directions, type Direction } from "@/lib/directions";

export function SiteFrame({
  children,
  direction = DEFAULT_DIRECTION,
  preview = false,
  home = "/",
}: {
  children: React.ReactNode;
  direction?: Direction;
  preview?: boolean;
  home?: string;
}) {
  return (
    <div className="site" data-direction={direction}>
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      {preview && (
        <nav className="direction-nav" aria-label="Design previews">
          <span>Design previews</span>
          <div>
            {directions.map((item) => (
              <Button
                key={item.slug}
                variant={item.slug === direction ? "secondary" : "ghost"}
                asChild
              >
                <a
                  href={item.slug === DEFAULT_DIRECTION ? "/" : `/versions/${item.slug}`}
                  aria-current={item.slug === direction ? "page" : undefined}
                >
                  {item.name}
                </a>
              </Button>
            ))}
          </div>
        </nav>
      )}
      <div className="site-layout">
        <SiteHeader home={home} />
        <main id="content" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
