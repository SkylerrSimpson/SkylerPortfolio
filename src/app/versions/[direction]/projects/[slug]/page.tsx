import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/project-detail";
import { StaticRedirect } from "@/components/static-redirect";
import { projects } from "@/lib/content";
import { directions, isDirection } from "@/lib/directions";
import { getProjectMetadata } from "@/lib/metadata";

type Params = { direction: string; slug: string };
export const dynamicParams = false;

export function generateStaticParams() {
  return directions.flatMap(({ slug: direction }) =>
    projects.map(({ slug }) => ({ direction, slug })),
  );
}
export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  return {
    ...getProjectMetadata(project),
    robots: { index: false, follow: false },
  };
}
export default async function PreviewProject({ params }: { params: Promise<Params> }) {
  const { direction, slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!isDirection(direction) || !project) notFound();
  if (direction === "index") return <StaticRedirect href={`/projects/${slug}`} />;
  return <ProjectDetail project={project} direction={direction} home={`/versions/${direction}`} />;
}
