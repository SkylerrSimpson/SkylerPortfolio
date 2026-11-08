import assert from "node:assert/strict";
import test from "node:test";

const { getNextProject, projects } = await import(
  new URL("../src/lib/content.ts", import.meta.url).href
);

test("project navigation follows the catalog order and wraps", () => {
  const third = { ...projects[0], slug: "third" };
  const ordered = [projects[0], projects[1], third];
  assert.equal(getNextProject(projects[0].slug, ordered), projects[1]);
  assert.equal(getNextProject(projects[1].slug, ordered), third);
  assert.equal(getNextProject("third", ordered), projects[0]);

  const reordered = [third, projects[1], projects[0]];
  assert.equal(getNextProject(projects[0].slug, reordered), third);
  assert.equal(getNextProject("third", reordered), projects[1]);
});

test("empty, single-project, and unknown-project catalogs have no next link", () => {
  assert.equal(getNextProject("missing"), undefined);
  assert.equal(getNextProject(projects[0].slug, []), undefined);
  assert.equal(getNextProject(projects[0].slug, [projects[0]]), undefined);
});
