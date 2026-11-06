import assert from "node:assert/strict";
import test from "node:test";

const { getActiveSection } = await import(
  new URL("../src/lib/active-section.ts", import.meta.url).href
);

test("navigation follows section positions, leaves the intro clear, and reaches short final sections", () => {
  const positions = [
    { id: "work", top: 400 },
    { id: "experience", top: 1000 },
    { id: "about", top: 1500 },
    { id: "contact", top: 2000 },
  ];
  const current = (scrollY: number, height = 800, documentHeight = 2400) =>
    getActiveSection(
      positions.map((section) => ({ ...section, top: section.top - scrollY })),
      { scrollY, height, documentHeight },
    );

  assert.equal(current(0), null);
  assert.equal(current(100), null);
  assert.equal(current(330), "work");
  assert.equal(current(850), "experience");
  assert.equal(current(1350), "about");
  assert.equal(current(1590), "about");
  assert.equal(current(1600), "contact");
  assert.equal(current(1350, 400), "experience");
  assert.equal(current(2600, 800, 3400), "contact");
  assert.equal(current(0, 3000), null);
  assert.equal(getActiveSection([], { scrollY: 500, height: 800, documentHeight: 1300 }), null);
});
