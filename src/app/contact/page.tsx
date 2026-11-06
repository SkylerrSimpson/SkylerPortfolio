import type { Metadata } from "next";
import { StaticRedirect } from "@/components/static-redirect";

export const metadata: Metadata = {
  title: "Contact",
  robots: { index: false, follow: true },
  alternates: { canonical: "/" },
};

export default function ContactPage() {
  return <StaticRedirect href="/#contact" />;
}
