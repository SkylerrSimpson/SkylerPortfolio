import { SiteFrame } from "@/components/site-frame";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <SiteFrame>
      <section className="message-page shell">
        <p className="eyebrow">404</p>
        <h1>
          Page not found<span className="accent">.</span>
        </h1>
        <p>The page you’re looking for couldn’t be found.</p>
        <Button asChild>
          <Link href="/">
            Back home <ArrowLeft />
          </Link>
        </Button>
      </section>
    </SiteFrame>
  );
}
