import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import styles from "./tftbis-showcase.module.css";

const features = [
  {
    id: "champion-builds",
    label: "Champion builds",
    question: "What should I build on this champion?",
    description:
      "Find a champion, choose its star level, and compare the item builds played on it. Patch and rank filters keep the results tied to the games you want to look at.",
    detail: "Each build lists its sample size and confidence indicator alongside the score.",
    caption: "A champion’s builds, with the selected patch, rank scope, and confidence indicators.",
  },
  {
    id: "item-set",
    label: "Item sets",
    question: "Who can use the items I already have?",
    description:
      "Choose up to three items and look up the champions that can use that combination. The picker includes ordinary items, artifacts, radiants, and emblems.",
    detail:
      "The results list champions for the selected items. If there are no results, the page explains whether it needs more data or cannot score one of the selected items.",
    caption: "An item selection and the champions associated with that combination.",
  },
  {
    id: "compare-builds",
    label: "Build comparison",
    question: "Is one build meaningfully better than another?",
    description:
      "Pick a champion and put two item sets side by side. Start from its most-played or best-placing builds, or choose the items yourself.",
    detail:
      "TFTBIS calculates the difference and its confidence interval. When the available data cannot distinguish the builds, the comparison says so.",
    caption: "Two builds on the same champion, including the uncertainty around their difference.",
  },
];

function readCaptureDate() {
  try {
    const manifest = JSON.parse(
      readFileSync(path.join(process.cwd(), "public/projects/tftbis/manifest.json"), "utf8"),
    );
    if (typeof manifest.capturedAt !== "string") return undefined;
    const date = new Date(manifest.capturedAt);
    return Number.isNaN(date.getTime()) ? undefined : date;
  } catch {
    return undefined;
  }
}

export function TftbisShowcase() {
  const capturedAt = readCaptureDate();
  return (
    <section className={styles.showcase} aria-labelledby="tftbis-walkthrough">
      <div className={styles.heading}>
        <p className="eyebrow">USING TFTBIS</p>
        <h2 id="tftbis-walkthrough">Three ways into the data</h2>
        <p>
          In Teamfight Tactics, players build a team of champions and equip them with items. TFTBIS
          helps answer the questions that come up when choosing those combinations.
        </p>
      </div>
      <Tabs defaultValue={features[0].id}>
        <TabsList aria-label="TFTBIS features" className={styles.tabs}>
          {features.map((feature) => (
            <TabsTrigger key={feature.id} value={feature.id}>
              {feature.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {features.map((feature) => {
          const src = `/projects/tftbis/${feature.id}.png`;
          const hasScreenshot = existsSync(path.join(process.cwd(), "public", src));
          return (
            <TabsContent key={feature.id} value={feature.id} className={styles.panel}>
              <div className={styles.explanation}>
                <h3>{feature.question}</h3>
                <p>{feature.description}</p>
                <p>{feature.detail}</p>
              </div>
              {hasScreenshot && (
                <figure className={styles.figure}>
                  <a
                    href={src}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open full-size screenshot: ${feature.label}`}
                  >
                    <Image
                      src={src}
                      alt={feature.caption}
                      width={1440}
                      height={1000}
                      sizes="(max-width: 760px) 100vw, 760px"
                    />
                    <span className={styles.enlarge}>
                      <Maximize2 size={14} /> View full size
                    </span>
                  </a>
                  <figcaption>{feature.caption}</figcaption>
                </figure>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
      {capturedAt && (
        <p className={styles.captureDate}>
          Application screenshots captured{" "}
          <time dateTime={capturedAt.toISOString()}>
            {capturedAt.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              timeZone: "UTC",
            })}
          </time>
          .
        </p>
      )}
    </section>
  );
}
