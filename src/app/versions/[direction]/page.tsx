import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Portfolio } from "@/components/portfolio";
import { StaticRedirect } from "@/components/static-redirect";
import { directions, isDirection } from "@/lib/directions";

export const dynamicParams = false;

export function generateStaticParams() {
  return directions.map(({ slug }) => ({ direction: slug }));
}
export const metadata: Metadata = {
  title: "Design previews",
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
};

export default async function VersionPage({ params }: { params: Promise<{ direction: string }> }) {
  const { direction } = await params;
  if (!isDirection(direction)) notFound();
  if (direction === "index") return <StaticRedirect href="/" />;
  return <Portfolio direction={direction} home={`/versions/${direction}`} />;
}
