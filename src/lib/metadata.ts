import type { Metadata } from "next";
import { profile, type Project } from "@/lib/content";

export const siteTitle = `${profile.name} | Full-Stack Software Developer`;
export const siteDescription =
  "Skyler Simpson is a full-stack software developer in Bellingham, Washington, working with PHP, Laravel, TypeScript, React, and Next.js.";

export function absoluteUrl(path = "/") {
  return new URL(path, profile.website).href;
}

export function getProjectMetadata(project: Project): Metadata {
  const title = `${project.name} | ${profile.name}`;
  const url = absoluteUrl(`/projects/${project.slug}`);

  return {
    title: project.name,
    description: project.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: project.description,
      url,
      siteName: profile.name,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary",
      title,
      description: project.description,
    },
  };
}

export const siteStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": absoluteUrl("/#person"),
      name: profile.name,
      alternateName: "skylerrsimpson",
      url: absoluteUrl(),
      jobTitle: "Full-stack software developer",
      description:
        "Full-stack software developer in Bellingham, Washington, and computer science graduate of Western Washington University.",
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Western Washington University",
      },
      knowsAbout: [
        "Software engineering",
        "Full-stack web development",
        "PHP",
        "Laravel",
        "TypeScript",
        "React",
        "Next.js",
      ],
      sameAs: [profile.github, profile.linkedin],
    },
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      url: absoluteUrl(),
      name: profile.name,
      description: siteDescription,
      inLanguage: "en-US",
      author: { "@id": absoluteUrl("/#person") },
    },
  ],
};
