import { expect, test, type Locator, type Page } from "@playwright/test";

async function contrastRatio(locator: Locator) {
  return locator.evaluate((element) => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const context = canvas.getContext("2d")!;
    const style = getComputedStyle(element);
    const pixel = (color: string, background: string) => {
      context.clearRect(0, 0, 1, 1);
      context.fillStyle = background;
      context.fillRect(0, 0, 1, 1);
      context.fillStyle = color;
      context.fillRect(0, 0, 1, 1);
      return Array.from(context.getImageData(0, 0, 1, 1).data).slice(0, 3);
    };
    const luminance = (rgb: number[]) => {
      const [r, g, b] = rgb.map((value) => {
        const v = value / 255;
        return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const background = getComputedStyle(document.body).backgroundColor;
    const a = luminance(pixel(style.color, background));
    const b = luminance(pixel(style.backgroundColor, background));
    return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  });
}

async function selectTheme(page: Page, theme: "Light" | "Dark" | "System") {
  await page.getByRole("button", { name: "Color theme", exact: true }).click();
  await page.getByRole("menuitemradio", { name: theme, exact: true }).click();
}

for (const direction of ["workbench", "editorial", "index"] as const) {
  const home = direction === "index" ? "/" : `/versions/${direction}`;
  const projectPath = (slug: string) => `${home === "/" ? "" : home}/projects/${slug}`;
  test(`${direction}: projects, professional work, and archive`, async ({ page }, testInfo) => {
    await page.goto(home);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      direction === "index" ? "Software developer" : "Skyler Simpson",
    );
    await expect(page.locator("#work").getByRole("heading", { name: "TFTBIS" })).toBeVisible();
    await expect(page.locator("#work").getByRole("heading", { name: "CigolFlow" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "DowsScripts" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Usurper" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Dictionary", exact: true })).toBeHidden();
    await page.locator("summary").click();
    await expect(page.getByRole("heading", { name: "Dictionary", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "DevFinder", exact: true })).toBeVisible();
    await page.locator("summary").click();
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: testInfo.outputPath(`${direction}.png`), fullPage: true });
  });

  test(`${direction}: keeps its design through project navigation`, async ({ page }) => {
    await page.goto(home);
    await page.getByRole("link", { name: "About TFTBIS", exact: true }).click();
    await expect(page).toHaveURL(projectPath("tftbis"));
    await expect(page.locator(".site")).toHaveAttribute("data-direction", direction);
    await page.locator(".project-next").getByRole("link", { name: "CigolFlow" }).click();
    await expect(page).toHaveURL(projectPath("cigolflow"));
    await page.getByRole("link", { name: "Back to selected work" }).click();
    await expect(page).toHaveURL(`${home}#work`);
  });

  test(`${direction}: readable primary button in both themes`, async ({ page, isMobile }) => {
    await page.goto(home);
    const button = page.getByRole("link", { name: "View projects", exact: true });
    for (const theme of ["Light", "Dark"] as const) {
      await selectTheme(page, theme);
      await expect.poll(() => contrastRatio(button)).toBeGreaterThanOrEqual(4.5);
      if (!isMobile) {
        await button.hover();
        await button.evaluate(async (element) => {
          await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
          await Promise.all(element.getAnimations().map((animation) => animation.finished));
        });
        await expect.poll(() => contrastRatio(button)).toBeGreaterThanOrEqual(4.5);
        await page.mouse.move(0, 0);
      }
    }
  });

  test(`${direction}: narrow layouts fit the screen`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 720 });
    for (const route of [home, projectPath("cigolflow"), projectPath("tftbis")]) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      expect(overflow, route).toBeLessThanOrEqual(1);
    }
  });
}

test("uses the system by default and persists one preference across pages", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await expect(page.locator(".site")).toHaveAttribute("data-direction", "index");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.getByRole("navigation", { name: "Design previews" })).toHaveCount(0);
  await selectTheme(page, "Light");
  await page.goto("/projects/tftbis");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.goto("/versions/editorial");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.reload();
  await page.getByRole("button", { name: "Color theme", exact: true }).click();
  await expect(page.getByRole("menuitemradio", { name: "Light", exact: true })).toHaveAttribute(
    "aria-checked",
    "true",
  );
});

test("System follows live browser changes while an explicit preference stays fixed", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await selectTheme(page, "Dark");
  await page.emulateMedia({ colorScheme: "light" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await selectTheme(page, "System");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("theme choices support keyboard selection, selected state, and Escape", async ({ page }) => {
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Color theme", exact: true });
  await trigger.focus();
  await page.keyboard.press("ArrowDown");
  const menu = page.getByRole("menu", { name: "Color theme", exact: true });
  await expect(menu).toBeVisible();
  await expect(menu.getByRole("menuitemradio")).toHaveText(["Light", "Dark", "System"]);
  await expect(menu.getByRole("menuitemradio", { name: "System", exact: true })).toHaveAttribute(
    "aria-checked",
    "true",
  );
  await page.keyboard.press("Home");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(menu).toBeHidden();
  await expect(trigger).toBeFocused();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await trigger.click();
  await expect(menu.getByRole("menuitemradio", { name: "Dark", exact: true })).toHaveAttribute(
    "aria-checked",
    "true",
  );
  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("theme selection still works when storage is blocked", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new Error("Storage blocked");
      },
    });
  });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await selectTheme(page, "Light");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.getByRole("link", { name: "About TFTBIS", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("former Index preview links redirect to canonical pages", async ({ page }) => {
  await page.goto("/versions/index");
  await expect(page).toHaveURL("/");
  await page.goto("/versions/index/projects/tftbis");
  await expect(page).toHaveURL("/projects/tftbis");
});

test("TFTBIS walkthrough switches between real workflows", async ({ page }) => {
  await page.goto("/projects/tftbis");
  await expect(page.getByRole("tabpanel")).toContainText("What should I build on this champion?");
  await page.getByRole("tab", { name: "Item sets", exact: true }).click();
  await expect(page.getByRole("tabpanel")).toContainText("Who can use the items I already have?");
  await page.getByRole("tab", { name: "Build comparison", exact: true }).click();
  await expect(page.getByRole("tabpanel")).toContainText(
    "Is one build meaningfully better than another?",
  );
  await page.keyboard.press("Home");
  await expect(page.getByRole("tab", { name: "Champion builds", exact: true })).toBeFocused();
});

test("mobile menu closes with Escape and supports short viewports", async ({ page }) => {
  await page.setViewportSize({ width: 640, height: 320 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Open navigation" });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await dialog.getByRole("link", { name: "Contact", exact: true }).click();
  await expect(dialog).toBeHidden();
  await expect(page).toHaveURL("/#contact");
});

test("preserves the contact route", async ({ page }) => {
  await page.goto("/contact");
  await expect(page).toHaveURL(/\/#contact$/);
  await expect(
    page.getByRole("link", { name: "skylerrsimpson@gmail.com", exact: true }),
  ).toHaveAttribute("href", "mailto:skylerrsimpson@gmail.com");
});

test("removed résumé and portrait are not served", async ({ request }) => {
  for (const path of ["/resume", "/resume-archive.pdf", "/skyler.jpg"]) {
    const response = await request.get(path);
    expect(response.status()).toBe(404);
  }
});

test("missing projects return 404", async ({ page }) => {
  const response = await page.goto("/projects/missing");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "Page not found." })).toBeVisible();
});
