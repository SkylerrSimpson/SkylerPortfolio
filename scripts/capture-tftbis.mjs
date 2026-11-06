import { spawn } from "node:child_process";
import { access, copyFile, mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { createConnection } from "node:net";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { setTimeout as delay } from "node:timers/promises";
import { chromium } from "@playwright/test";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = resolve(process.env.TFTBIS_DIR || join(root, "..", "tftbis"));
const origin = "http://127.0.0.1:3002";
const destination = join(root, "public", "projects", "tftbis");
const files = ["champion-builds.png", "item-set.png", "compare-builds.png"];

if (process.argv.includes("--help")) {
  console.log(
    `Capture real TFTBIS screens for the portfolio.\n\n  node scripts/capture-tftbis.mjs\n\nRequires populated TFTBIS data, its local database/Redis, and Playwright Chromium.\nReuses port 3002 or starts ../tftbis/apps/web. Set TFTBIS_DIR to use another checkout.\nOnly a server started by this script is stopped. Screenshots are published together\nafter all three views succeed; existing images survive a failed capture.`,
  );
  process.exit(0);
}
if (process.argv.length > 2) throw new Error("Unknown argument. Use --help for usage.");

let server;
let serverError;
let browser;
let staging;
let cleanupPromise;

async function cleanup() {
  cleanupPromise ??= (async () => {
    await Promise.race([browser?.close().catch(() => {}), delay(3000)]);
    if (server?.pid) {
      const signal = (name) => {
        try {
          if (process.platform === "win32") server.kill(name);
          else process.kill(-server.pid, name);
        } catch (error) {
          if (error.code !== "ESRCH")
            console.error(`Could not stop the capture server: ${error.code}`);
        }
      };
      signal("SIGTERM");
      await delay(1500);
      signal("SIGKILL");
    }
    if (staging) await rm(staging, { recursive: true, force: true });
  })();
  return cleanupPromise;
}

for (const name of ["SIGINT", "SIGTERM"]) {
  process.once(name, () => {
    void cleanup().finally(() => process.exit(name === "SIGINT" ? 130 : 143));
  });
}
const deadline = setTimeout(() => {
  console.error("Capture exceeded six minutes. Existing screenshots were not replaced.");
  void cleanup().finally(() => process.exit(1));
}, 360_000);

function portIsOpen() {
  return new Promise((done) => {
    const socket = createConnection({ host: "127.0.0.1", port: 3002 });
    const finish = (open) => {
      socket.destroy();
      done(open);
    };
    socket.setTimeout(1500);
    socket.once("connect", () => finish(true));
    socket.once("error", () => finish(false));
    socket.once("timeout", () => finish(false));
  });
}

async function startServer() {
  if (await portIsOpen()) {
    console.log("Using the existing server on port 3002.");
  } else {
    const cwd = join(source, "apps", "web");
    await access(join(cwd, "package.json")).catch(() => {
      throw new Error("TFTBIS checkout not found. Set TFTBIS_DIR to its repository directory.");
    });
    console.log("Starting the local TFTBIS web app. No ingestion or workers will be started.");
    server = spawn(
      process.platform === "win32" ? "npm.cmd" : "npm",
      ["run", "dev", "--", "--hostname", "127.0.0.1"],
      {
        cwd,
        detached: process.platform !== "win32",
        stdio: "ignore",
      },
    );
    server.once("error", (error) => {
      serverError = error;
    });
  }
  const until = Date.now() + 120_000;
  while (Date.now() < until) {
    if (serverError || (server && server.exitCode !== null)) {
      throw new Error(
        "TFTBIS could not start. Run its web dev command in your terminal to inspect the startup error, then retry.",
      );
    }
    let response;
    try {
      response = await fetch(origin, { signal: AbortSignal.timeout(5000) });
    } catch {
      /* The server may still be compiling. */
    }
    if (response?.ok) {
      if (!(await response.text()).includes("TFTBIS"))
        throw new Error(
          "Port 3002 is serving a different application. Leave it running and free that port before retrying.",
        );
      return;
    }
    await delay(750);
  }
  throw new Error(
    "TFTBIS did not become ready within two minutes. Check its local database, Redis, dependencies, and web server.",
  );
}

async function visit(page, path) {
  const response = await page.goto(new URL(path, origin).href, { waitUntil: "domcontentloaded" });
  if (!response?.ok())
    throw new Error(
      `TFTBIS returned ${response?.status() ?? "no response"} for ${path.split("?")[0]}. Check that the database contains a published run.`,
    );
}

async function capture(page, name, focus, offset = 220) {
  if (focus) {
    await focus.scrollIntoViewIfNeeded();
    await focus.evaluate(
      (element, offset) =>
        window.scrollTo(
          0,
          Math.max(0, element.getBoundingClientRect().top + window.scrollY - offset),
        ),
      offset,
    );
  }
  await page.mouse.move(0, 0);
  await page.waitForFunction(() => document.fonts.status === "loaded");
  await page
    .waitForFunction(
      () =>
        [...document.images]
          .filter((img) => {
            const box = img.getBoundingClientRect();
            return box.width > 0 && box.height > 0 && box.top < innerHeight && box.bottom > 0;
          })
          .every((img) => img.complete && img.naturalWidth > 0),
      undefined,
      { timeout: 20_000 },
    )
    .catch(() => {
      throw new Error(
        "Visible TFTBIS artwork did not load. Check access to the image source before capturing screenshots.",
      );
    });
  await page.screenshot({ path: join(staging, name), animations: "disabled", fullPage: false });
}

async function selectComparison(page, candidate) {
  await visit(page, "/tools/compare-builds");
  await page
    .getByRole("textbox", { name: "Search a champion to compare builds on" })
    .fill(candidate.name);
  await page.locator("ul button").filter({ hasText: candidate.name }).first().click();
  await page
    .getByRole("button", {
      name: `Compare a different champion than ${candidate.name}`,
      exact: true,
    })
    .waitFor();
  const presets = page.getByRole("button", { name: /^Use / });
  await presets.first().waitFor({ timeout: 8000 });
  const names = [
    ...new Set(
      await presets.evaluateAll((buttons) =>
        buttons.map((button) => button.getAttribute("aria-label")),
      ),
    ),
  ];
  if (names.length < 2)
    throw new Error("Fewer than two distinct comparison presets are available.");
  const first = page.getByRole("button", { name: names[0], exact: true }).first();
  const items = await first
    .locator("img[title]")
    .evaluateAll((images) => images.map((img) => img.getAttribute("title")));
  if (items.length !== 3)
    throw new Error("The selected preset does not have three named item icons.");
  await first.click();
  await page.getByRole("button", { name: names[1], exact: true }).first().click();
  await page.getByRole("button", { name: "Analyze", exact: true }).click();
  const verdict = page
    .locator("strong")
    .filter({ hasText: /^(Too close to call\.|Build [AB] is better)$/ });
  await verdict.waitFor({ timeout: 15_000 });
  await capture(page, "compare-builds.png", verdict, 720);
  return items;
}

async function captureItemSet(page, items) {
  await visit(page, "/tools/item-set");
  for (const name of items)
    await page.getByRole("button", { name: `Add ${name}`, exact: true }).click();
  await page.getByText("3 of 3 chosen", { exact: true }).waitFor();
  await page.getByRole("button", { name: "Analyze", exact: true }).click();
  await page.waitForURL(/\/items\/combo\//);
  const results = page.getByRole("heading", {
    name: "Champions that run this item set",
    exact: true,
  });
  await results.waitFor();
  await page.locator('main a[href^="/champions/"]').first().waitFor();
  await capture(page, "item-set.png", results);
}

try {
  await startServer();
  staging = await mkdtemp(join(tmpdir(), "portfolio-tftbis-"));
  browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
    colorScheme: "dark",
  });
  await context.addInitScript(() => {
    try {
      localStorage.setItem("tftbis-theme", "dark");
    } catch {}
  });
  const page = await context.newPage();
  page.setDefaultTimeout(15_000);
  page.setDefaultNavigationTimeout(45_000);
  await visit(page, "/champions?sort=boards");
  await page
    .locator('main a[href^="/champions/"]')
    .first()
    .waitFor()
    .catch(() => {
      throw new Error(
        "No populated champion pages were found. TFTBIS needs an existing published aggregation; this script does not ingest or manufacture data.",
      );
    });
  const candidates = await page.locator('main a[href^="/champions/"]').evaluateAll((links) => {
    const unique = new Map();
    for (const link of links) {
      const name = link.querySelector(".font-heading")?.textContent?.trim();
      const href = link.getAttribute("href");
      if (name && href) unique.set(href, { name, href });
    }
    return [...unique.values()].slice(0, 6);
  });
  let selected;
  for (const candidate of candidates) {
    try {
      console.log(`Checking published views for ${candidate.name}...`);
      const items = await selectComparison(page, candidate);
      await captureItemSet(page, items);
      await visit(page, candidate.href);
      const builds = page.getByRole("heading", { name: "Best builds", exact: true });
      await builds.waitFor();
      await page
        .locator("section")
        .filter({ has: builds })
        .locator('li a[href^="/items/combo/"]')
        .first()
        .waitFor();
      await capture(page, "champion-builds.png", builds);
      selected = candidate.name;
      break;
    } catch (error) {
      console.log(`${candidate.name}: ${String(error.message || error).split("\n")[0]}`);
    }
  }
  if (!selected)
    throw new Error(
      "Could not find a champion with two scored presets, item-set results, and published builds. Check populated TFTBIS data and loaded artwork; existing screenshots were kept.",
    );
  await writeFile(
    join(staging, "manifest.json"),
    JSON.stringify({ capturedAt: new Date().toISOString() }, null, 2) + "\n",
  );
  await mkdir(destination, { recursive: true });
  for (const file of [...files, "manifest.json"])
    await copyFile(join(staging, file), join(destination, file));
  console.log(`Captured three real views for ${selected} in public/projects/tftbis/.`);
} catch (error) {
  const message = String(error.message || error);
  console.error(
    message.includes("Executable doesn't exist")
      ? "Playwright Chromium is missing. Run pnpm exec playwright install chromium, then retry."
      : `Capture failed: ${message.split("\n")[0]}`,
  );
  process.exitCode = 1;
} finally {
  clearTimeout(deadline);
  await cleanup();
}
