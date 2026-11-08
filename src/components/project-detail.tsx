import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { TechBadge } from "@/components/tech-badge";
import { Button } from "@/components/ui/button";
import { SiteFrame } from "@/components/site-frame";
import { TftbisShowcase } from "@/components/tftbis-showcase";
import { getNextProject, getProjectNumber, type Project } from "@/lib/content";
import { DEFAULT_DIRECTION, type Direction } from "@/lib/directions";

export function ProjectDetail({
  project,
  direction = DEFAULT_DIRECTION,
  home = "/",
}: {
  project: Project;
  direction?: Direction;
  home?: string;
}) {
  const next = getNextProject(project.slug);
  return (
    <SiteFrame direction={direction} home={home} preview={home !== "/"}>
      <div className="project-page shell">
        <Link className="text-link back-link" href={`${home}#work`}>
          <ArrowLeft size={16} /> Back to selected work
        </Link>
        <div className="project-page-heading">
          <div>
            <p className="eyebrow">
              PROJECT / {getProjectNumber(project.slug)} · {project.category}
            </p>
            <h1>
              {project.name}
              <span className="accent">.</span>
            </h1>
            <p className="project-headline">{project.headline}</p>
          </div>
          <div className="project-tags">
            {project.tags.map((tag) => (
              <TechBadge key={tag} label={tag} />
            ))}
          </div>
        </div>

        <div className="project-overview">
          <p className="eyebrow">THE OVERVIEW</p>
          <div>
            <h2>{project.description}</h2>
            <p>{project.overview}</p>
          </div>
        </div>
        {project.slug === "tftbis" && <TftbisShowcase />}
        <div className="project-detail-grid">
          {project.details.map((detail, i) => (
            <section key={detail.title}>
              <span className="eyebrow">0{i + 1}</span>
              <h3>{detail.title}</h3>
              <p>{detail.description}</p>
            </section>
          ))}
        </div>
        <div className="project-next">
          {next && (
            <div>
              <p className="eyebrow">NEXT PROJECT</p>
              <Link href={`${home === "/" ? "" : home}/projects/${next.slug}`}>
                {next.name}
                <ArrowRight />
              </Link>
            </div>
          )}
          <div className="project-actions">
            {project.links?.map((link) => (
              <Button key={link.href} variant="outline" asChild>
                <a href={link.href} target="_blank" rel="noreferrer">
                  {link.label} <ArrowUpRight />
                </a>
              </Button>
            ))}
            <Button variant="outline" asChild>
              <Link href={`${home}#contact`}>
                Talk about this project <ArrowUpRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </SiteFrame>
  );
}
