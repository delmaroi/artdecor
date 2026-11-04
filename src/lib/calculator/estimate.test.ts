import { test } from "node:test";
import assert from "node:assert/strict";
import { estimate } from "./estimate.ts";
import type { Catalog, EstimateInput } from "./estimate.ts";

const catalog: Catalog = {
  vatRate: 0.23,
  spread: 0.15,
  roundTo: 10,
  products: [
    {
      id: "kaseton",
      limits: { width: [20, 1000], height: [20, 400] },
      minimumNet: 500,
      installation: { perM2: 100, minimumNet: 300 },
      variants: [{ id: "led", ratePerM2: 2000 }],
    },
    {
      id: "litery",
      limits: { width: [20, 1000], height: [10, 300] },
      minimumNet: 500,
      perCharacterNet: 50,
      installation: null,
      variants: [{ id: "front", ratePerM2: 1000 }],
    },
  ],
};

const kaseton: EstimateInput = {
  productId: "kaseton",
  variantId: "led",
  widthCm: 300,
  heightCm: 80,
  text: "",
  withInstallation: false,
};

test("szacuje widełki z powierzchni i stawki", () => {
  // 3 m × 0,8 m = 2,4 m²; 2,4 × 2000 = 4800; ±15% = 4080–5520; brutto ×1,23
  const result = estimate(kaseton, catalog);
  assert.equal(result.status, "ok");
  if (result.status !== "ok") return;
  assert.equal(result.areaM2, 2.4);
  assert.equal(result.netLow, 4080);
  assert.equal(result.netHigh, 5520);
  assert.equal(result.grossLow, 5020);
  assert.equal(result.grossHigh, 6790);
});

test("nie schodzi poniżej ceny minimalnej produktu", () => {
  // 20×20 cm = 0,04 m² × 2000 = 80 zł, czyli poniżej minimum 500 zł.
  // Dolna granica zostaje na minimum, górna to minimum + 15%.
  const result = estimate({ ...kaseton, widthCm: 20, heightCm: 20 }, catalog);
  assert.equal(result.status, "ok");
  if (result.status !== "ok") return;
  assert.equal(result.netLow, 500);
  assert.equal(result.netHigh, 580);
  assert.equal(result.minimumApplied, true);
});

test("dolicza montaż ze stawką minimalną, gdy klient go wybierze", () => {
  // Produkt 4800 zł + montaż 2,4 m² × 100 = 240, więc minimum 300 → 5100; ±15% = 4335–5865
  const result = estimate({ ...kaseton, withInstallation: true }, catalog);
  assert.equal(result.status, "ok");
  if (result.status !== "ok") return;
  assert.equal(result.netLow, 4340);
  assert.equal(result.netHigh, 5870);
});

test("przy literach dolicza znaki napisu, pomijając spacje", () => {
  // 200×50 cm = 1 m² × 1000 = 1000 zł + 8 znaków × 50 = 400 → 1400; ±15% = 1190–1610
  const result = estimate(
    { ...kaseton, productId: "litery", variantId: "front", widthCm: 200, heightCm: 50, text: "ART DECOR" },
    catalog,
  );
  assert.equal(result.status, "ok");
  if (result.status !== "ok") return;
  assert.equal(result.netLow, 1190);
  assert.equal(result.netHigh, 1610);
});

test("czeka na dane, dopóki wymiary są puste", () => {
  const result = estimate({ ...kaseton, widthCm: null }, catalog);
  assert.deepEqual(result, { status: "incomplete", errors: [] });
});

test("czeka na napis przy literach", () => {
  const result = estimate(
    { ...kaseton, productId: "litery", variantId: "front", text: "   " },
    catalog,
  );
  assert.deepEqual(result, { status: "incomplete", errors: [] });
});

test("odrzuca wymiary spoza zakresu produktu i podaje dozwolony zakres", () => {
  const result = estimate({ ...kaseton, widthCm: 5000, heightCm: 10 }, catalog);
  assert.deepEqual(result, {
    status: "invalid",
    errors: [
      { field: "width", message: "Podaj szerokość od 20 do 1000 cm." },
      { field: "height", message: "Podaj wysokość od 20 do 400 cm." },
    ],
  });
});

test("odrzuca wartości, które nie są skończonymi liczbami", () => {
  for (const bad of [Number.NaN, Number.POSITIVE_INFINITY, -100]) {
    const result = estimate({ ...kaseton, widthCm: bad }, catalog);
    assert.equal(result.status, "invalid");
  }
});

test("nie wycenia produktu ani wariantu spoza cennika", () => {
  assert.equal(estimate({ ...kaseton, productId: "nieznany" }, catalog).status, "incomplete");
  assert.equal(estimate({ ...kaseton, variantId: "nieznany" }, catalog).status, "incomplete");
});
