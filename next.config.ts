import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

export default function nextConfig(phase: string): NextConfig {
  return {
    output: phase === PHASE_DEVELOPMENT_SERVER ? undefined : "export",
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next" : "build",
    poweredByHeader: false,
    images: {
      unoptimized: true,
    },
  };
}
