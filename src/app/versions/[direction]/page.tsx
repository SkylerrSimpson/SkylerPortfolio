import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Portfolio } from "@/components/portfolio";
import { directions, isDirection } from "@/lib/directions";

export function generateStaticParams() {
  return directions.map(({ slug }) => ({ direction: slug }));
}
export const metadata: Metadata = {
  title: "Design previews",
  robots: { index: false, follow: false },
};

export default async function VersionPage({ params }: { params: Promise<{ direction: string }> }) {
  const { direction } = await params;
  if (!isDirection(direction)) notFound();
  return <Portfolio direction={direction} home={`/versions/${direction}`} />;
}
