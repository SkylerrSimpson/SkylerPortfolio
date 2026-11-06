import assert from "node:assert/strict";
import test, { type TestContext } from "node:test";
import vm from "node:vm";
const {
  clearSessionTheme,
  isTheme,
  readTheme,
  resolveTheme,
  storeTheme,
  THEME_STORAGE_KEY,
  themeInit,
} = await import(new URL("../src/lib/theme.ts", import.meta.url).href);

function useStorage(context: TestContext, storage: Pick<Storage, "getItem" | "setItem">) {
  const original = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
  Object.defineProperty(globalThis, "localStorage", { configurable: true, value: storage });
  clearSessionTheme();
  context.after(() => {
    clearSessionTheme();
    if (original) Object.defineProperty(globalThis, "localStorage", original);
    else Reflect.deleteProperty(globalThis, "localStorage");
  });
}

function bootstrap(stored: string | null, prefersDark: boolean, storageBlocked = false) {
  const dataset: Record<string, string> = {};
  vm.runInNewContext(themeInit, {
    document: { documentElement: { dataset } },
    matchMedia: () => ({ matches: prefersDark }),
    localStorage: {
      getItem(key: string) {
        assert.equal(key, THEME_STORAGE_KEY);
        if (storageBlocked) throw new Error("Storage unavailable");
        return stored;
      },
    },
  });
  return dataset;
}

test("first visits follow the system before hydration", () => {
  assert.deepEqual(bootstrap(null, true), { theme: "dark", themePreference: "system" });
  assert.deepEqual(bootstrap(null, false), { theme: "light", themePreference: "system" });
});

test("saved explicit preferences override the system", () => {
  assert.deepEqual(bootstrap("light", true), { theme: "light", themePreference: "light" });
  assert.deepEqual(bootstrap("dark", false), { theme: "dark", themePreference: "dark" });
});

test("saved System still resolves the current system preference", () => {
  assert.equal(bootstrap("system", true).theme, "dark");
  assert.equal(bootstrap("system", false).theme, "light");
});

test("invalid or unavailable storage falls back to the system", () => {
  assert.deepEqual(bootstrap("invalid", true), { theme: "dark", themePreference: "system" });
  assert.deepEqual(bootstrap(null, true, true), { theme: "dark", themePreference: "system" });
});

test("theme resolution distinguishes preference from rendered color", () => {
  assert.equal(resolveTheme("system", true), "dark");
  assert.equal(resolveTheme("system", false), "light");
  assert.equal(resolveTheme("dark", false), "dark");
  assert.equal(resolveTheme("light", true), "light");
  for (const value of ["light", "dark", "system"]) assert.equal(isTheme(value), true);
  for (const value of [null, "auto", true, ""]) assert.equal(isTheme(value), false);
});

test("an explicit choice survives readable storage that refuses writes", (context) => {
  useStorage(context, {
    getItem: () => "dark",
    setItem: () => {
      throw new Error("QuotaExceededError");
    },
  });
  assert.equal(readTheme(), "dark");
  storeTheme("light");
  assert.equal(readTheme(), "light");
  assert.equal(resolveTheme(readTheme(), true), "light");

  storeTheme("system");
  assert.equal(readTheme(), "system");
  assert.equal(resolveTheme(readTheme(), true), "dark");
  assert.equal(resolveTheme(readTheme(), false), "light");
});

test("external storage changes replace an unsaved session choice", (context) => {
  let stored: string | null = "system";
  useStorage(context, {
    getItem: () => stored,
    setItem: () => {
      throw new Error("QuotaExceededError");
    },
  });
  storeTheme("light");
  stored = "dark";
  clearSessionTheme();
  assert.equal(readTheme(), "dark");

  stored = null;
  clearSessionTheme();
  assert.equal(readTheme(), "system");
});
