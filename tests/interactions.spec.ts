import { expect, test } from "@playwright/test";

test("sidebar tracks sections, browser history, and returning to the introduction", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "The sidebar is shown on desktop.");
  await page.goto("/");
  const navigation = page.getByRole("navigation", { name: "Main navigation", exact: true });
  await expect(navigation.locator("[aria-current]")).toHaveCount(0);

  await navigation.getByRole("link", { name: "Experience", exact: true }).click();
  await expect(navigation.getByRole("link", { name: "Experience", exact: true })).toHaveAttribute(
    "aria-current",
    "location",
  );
  await navigation.getByRole("link", { name: "About", exact: true }).click();
  await expect(navigation.getByRole("link", { name: "About", exact: true })).toHaveAttribute(
    "aria-current",
    "location",
  );
  await page.goBack();
  await expect(navigation.getByRole("link", { name: "Experience", exact: true })).toHaveAttribute(
    "aria-current",
    "location",
  );

  await page.evaluate(() =>
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" }),
  );
  await expect(navigation.getByRole("link", { name: "Contact", exact: true })).toHaveAttribute(
    "aria-current",
    "location",
  );
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect(navigation.locator("[aria-current]")).toHaveCount(0);
  await page.goto("/projects/tftbis");
  await expect(navigation.locator("[aria-current]")).toHaveCount(0);
});

test("copy confirmation preserves button width and announces the successful copy", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async (text: string) => {
          sessionStorage.setItem("copied-email", text);
        },
      },
    });
  });
  await page.goto("/#contact");
  const button = page.getByRole("button", { name: "Copy email", exact: true });
  await button.scrollIntoViewIfNeeded();
  await page.evaluate(() => document.fonts.ready);
  const before = await button.boundingBox();
  await button.click();
  const copied = page.getByRole("button", { name: "Copied!", exact: true });
  await expect(copied).toBeVisible();
  await expect(page.getByRole("status")).toHaveText("Email copied to clipboard.");
  const after = await copied.boundingBox();
  expect(Math.abs(after!.width - before!.width)).toBeLessThanOrEqual(0.5);
  expect(await page.evaluate(() => sessionStorage.getItem("copied-email"))).toBe(
    "skylerrsimpson@gmail.com",
  );
});

test("clipboard failure keeps the fallback available without claiming success", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async () => {
          throw new Error("Clipboard unavailable");
        },
      },
    });
  });
  await page.goto("/#contact");
  await page.getByRole("button", { name: "Copy email", exact: true }).click();
  await expect(page.getByRole("status")).toBeVisible();
  await expect(page.getByRole("status")).toHaveText(
    "Copy unavailable. Email skylerrsimpson@gmail.com.",
  );
  await expect(page.getByRole("button", { name: "Copied!", exact: true })).toHaveCount(0);
});

test("reduced motion preserves tab, archive, and dialog interactions without animations", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/projects/tftbis");
  await page.getByRole("tab", { name: "Item sets", exact: true }).click();
  const panel = page.getByRole("tabpanel");
  await expect(panel).toContainText("Who can use the items I already have?");
  await expect(panel).toHaveCSS("animation-name", "none");

  await page.goto("/");
  await page.locator("summary").click();
  await expect(page.getByRole("heading", { name: "Dictionary", exact: true })).toBeVisible();
  const duration = await page
    .locator("summary > svg")
    .evaluate((element) => Number.parseFloat(getComputedStyle(element).transitionDuration));
  expect(duration).toBeLessThanOrEqual(0.001);

  await page.setViewportSize({ width: 640, height: 720 });
  const trigger = page.getByRole("button", { name: "Open navigation", exact: true });
  await trigger.click();
  await expect(page.getByRole("dialog")).toHaveCSS("animation-name", "none");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(trigger).toBeFocused();
});
