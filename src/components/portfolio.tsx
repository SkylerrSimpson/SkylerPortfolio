import { BrandIcon } from "@/components/brand-icon";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TechBadge } from "@/components/tech-badge";
import { CopyEmail } from "@/components/copy-email";
import { SiteFrame } from "@/components/site-frame";
import {
  archive,
  profile,
  projects,
  experience,
  skills,
  getProjectNumber,
  toolsHub,
} from "@/lib/content";
import type { Direction } from "@/lib/directions";

export function Portfolio({ direction, home = "/" }: { direction: Direction; home?: string }) {
  return (
    <SiteFrame direction={direction} home={home} preview={home !== "/"}>
      <section className="intro shell">
        <div className="intro-copy">
          <p className="section-label">Software developer</p>
          {direction === "index" ? (
            <h1>Software developer</h1>
          ) : (
            <h1>
              Skyler{" "}
              <span>
                Simpson<span className="name-period">.</span>
              </span>
            </h1>
          )}
          <p className="intro-description">
            I work in PHP and Laravel, and build personal projects with TypeScript. I like having a
            problem to work through and an application to keep improving.
          </p>
          <div className="intro-actions">
            <Button size="lg" asChild>
              <a href="#work">
                View projects <ArrowDown />
              </a>
            </Button>
            <a
              className="text-link github-link"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
            >
              <BrandIcon name="github" /> GitHub
            </a>
          </div>
        </div>
      </section>
      <section id="work" className="work-section shell section-space">
        <div className="section-heading">
          <div>
            <p className="section-label">Personal projects</p>
            <h2>What I’m building</h2>
          </div>
          <p className="section-note">The personal projects I spend most of my own time on.</p>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <article className="project-card" key={project.slug}>
              <div className="project-heading">
                <span className="project-number">{getProjectNumber(project.slug)}</span>
                <p className="section-label">{project.category}</p>
                <h3>
                  <Link href={`${home === "/" ? "" : home}/projects/${project.slug}`}>
                    {project.name}
                    <ArrowUpRight />
                  </Link>
                </h3>
              </div>
              <div className="project-body">
                <p className="project-description">{project.description}</p>
                <p className="project-focus">{project.focus}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <TechBadge key={tag} label={tag} />
                  ))}
                </div>
                <Link
                  className="text-link project-read"
                  href={`${home === "/" ? "" : home}/projects/${project.slug}`}
                >
                  About {project.name} <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section id="experience" className="experience-section shell section-space">
        <div className="section-heading">
          <div>
            <p className="section-label">Professional work</p>
            <h2>Building and maintaining</h2>
          </div>
          <p className="section-note">My day-to-day work in PHP and Laravel.</p>
        </div>
        <div className="experience-list">
          {experience.map((item) => (
            <article key={item.name} className="experience-row">
              <div>
                <p className="section-label">{item.role}</p>
                <h3>{item.name}</h3>
              </div>
              <div>
                <p>{item.description}</p>
                <div className="project-tags">
                  {item.tags.map((tag) => (
                    <TechBadge key={tag} label={tag} />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section id="about" className="about-section shell section-space">
        <div className="section-heading">
          <div>
            <p className="section-label">A little background</p>
            <h2>About me</h2>
          </div>
        </div>
        <div className="about-content">
          <div className="about-prose">
            {profile.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <a className="text-link" href={profile.linkedin} target="_blank" rel="noreferrer">
              <BrandIcon name="linkedin" /> LinkedIn
            </a>
          </div>
          <div className="skills">
            <h3>Tools I work with</h3>
            {skills.map((group) => (
              <div className="skill-group" key={group.label}>
                <span>{group.label}</span>
                <p>{group.items.join(" · ")}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="contact" className="contact-section shell section-space">
        <p className="section-label">Contact</p>
        <div className="contact-heading">
          <h2>Get in touch.</h2>
          <p>For opportunities, questions about a project, or a conversation about software.</p>
        </div>
        <div className="contact-links">
          <a className="email-link" href={`mailto:${profile.email}`}>
            {profile.email}
            <ArrowUpRight size={20} />
          </a>
          <CopyEmail />
          <a
            className="text-link contact-linkedin"
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            <BrandIcon name="linkedin" /> LinkedIn
          </a>
        </div>
      </section>
      <section className="archive-section shell">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm leading-relaxed text-muted-foreground">{toolsHub.description}</p>
          <Button asChild variant="outline">
            <a href={toolsHub.href}>
              Tools hub <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>
        </div>
        <details>
          <summary>
            <span>
              Earlier projects <span className="archive-count">{archive.length}</span>
            </span>
            <ChevronDown size={18} />
          </summary>
          <p className="archive-intro">Original project sources.</p>
          <div className="archive-list">
            {archive.map((project) => (
              <a key={project.name} href={project.href} target="_blank" rel="noreferrer">
                <div>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                </div>
                <span>{project.stack}</span>
                <ArrowUpRight size={18} />
              </a>
            ))}
          </div>
        </details>
      </section>
    </SiteFrame>
  );
}
