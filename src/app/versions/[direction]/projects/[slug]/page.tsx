import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/project-detail";
import { projects } from "@/lib/content";
import { directions, isDirection } from "@/lib/directions";

type Params = { direction: string; slug: string };
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
    title: project.name,
    description: project.description,
    robots: { index: false, follow: false },
  };
}
export default async function PreviewProject({ params }: { params: Promise<Params> }) {
  const { direction, slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!isDirection(direction) || !project) notFound();
  return <ProjectDetail project={project} direction={direction} home={`/versions/${direction}`} />;
}
