import type { MetadataRoute } from "next";
import { projects } from "@/lib/content";
import { absoluteUrl } from "@/lib/metadata";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl() },
    ...projects.map(({ slug }) => ({ url: absoluteUrl(`/projects/${slug}`) })),
  ];
}
