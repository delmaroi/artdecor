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
      variants: [{ id: "led", pricing: { model: "area", ratePerM2: 2000 } }],
    },
    {
      id: "litery",
      limits: { width: [20, 1000], height: [10, 300] },
      minimumNet: 500,
      perCharacterNet: 50,
      installation: null,
      variants: [{ id: "front", pricing: { model: "area", ratePerM2: 1000 } }],
    },
    {
      id: "blokowe",
      limits: { width: [30, 2000], height: [10, 300] },
      minimumNet: 500,
      installation: { perLetterNet: 40, minimumNet: 300 },
      variants: [{ id: "front", pricing: { model: "perLetter", netPer10Cm: 90 } }],
    },
    {
      id: "znaki",
      limits: { width: [5, 600], height: [2, 150] },
      minimumNet: 80,
      installation: null,
      variants: [
        { id: "folia", pricing: { model: "area", ratePerM2: 180 } },
        {
          id: "dibond",
          minimumNet: 150,
          pricing: {
            model: "perLetterTable",
            steps: [
              [10, 30],
              [35, 60],
              [100, 350],
            ],
          },
        },
      ],
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

const blokowe: EstimateInput = {
  productId: "blokowe",
  variantId: "front",
  widthCm: null,
  heightCm: 40,
  text: "FIRMA",
  withInstallation: false,
};

const dibond: EstimateInput = { ...blokowe, productId: "znaki", variantId: "dibond" };

test("litery za znak: liczba znaków × wysokość × stawka, bez szerokości", () => {
  // 5 znaków × 40 cm × 90 zł za 10 cm = 1800; ±15% = 1530–2070; brutto ×1,23
  const result = estimate(blokowe, catalog);
  assert.equal(result.status, "ok");
  if (result.status !== "ok") return;
  assert.equal(result.netLow, 1530);
  assert.equal(result.netHigh, 2070);
  assert.equal(result.grossLow, 1880);
  assert.equal(result.grossHigh, 2550);
  assert.equal(result.areaM2, null);
  assert.equal(result.characters, 5);
  assert.equal(result.perLetterNet, 360);
});

test("litery za znak: szerokość nie zmienia ceny, a spacje się nie liczą", () => {
  const withWidth = estimate({ ...blokowe, widthCm: 900 }, catalog);
  const withSpace = estimate({ ...blokowe, text: "FI RMA" }, catalog);
  assert.deepEqual(withWidth, estimate(blokowe, catalog));
  assert.deepEqual(withSpace, estimate(blokowe, catalog));
});

test("litery za znak: pilnuje ceny minimalnej", () => {
  // 2 znaki × 10 cm × 90 = 180 zł, czyli poniżej minimum 500 zł.
  const result = estimate({ ...blokowe, heightCm: 10, text: "AB" }, catalog);
  assert.equal(result.status, "ok");
  if (result.status !== "ok") return;
  assert.equal(result.netLow, 500);
  assert.equal(result.netHigh, 580);
  assert.equal(result.minimumApplied, true);
});

test("litery za znak: montaż liczy się od liter, z minimum", () => {
  // 1800 + 5 × 40 = 200, więc minimum 300 → 2100; ±15% = 1785–2415
  const few = estimate({ ...blokowe, withInstallation: true }, catalog);
  assert.equal(few.status, "ok");
  if (few.status !== "ok") return;
  assert.equal(few.netLow, 1790);
  assert.equal(few.netHigh, 2420);

  // 10 znaków: 3600 + 10 × 40 = 400 → 4000; ±15% = 3400–4600
  const many = estimate({ ...blokowe, text: "ABCDEFGHIJ", withInstallation: true }, catalog);
  assert.equal(many.status, "ok");
  if (many.status !== "ok") return;
  assert.equal(many.netLow, 3400);
  assert.equal(many.netHigh, 4600);
});

test("litery za znak: czekają na napis i wysokość", () => {
  assert.equal(estimate({ ...blokowe, text: " " }, catalog).status, "incomplete");
  assert.equal(estimate({ ...blokowe, heightCm: null }, catalog).status, "incomplete");
});

test("litery za znak: błędna szerokość jest zgłaszana jak w innych produktach", () => {
  const result = estimate({ ...blokowe, widthCm: 5 }, catalog);
  assert.deepEqual(result, {
    status: "invalid",
    errors: [{ field: "width", message: "Podaj szerokość od 30 do 2000 cm." }],
  });
});

test("tabela wysokości: zaokrągla w górę do najbliższego progu", () => {
  // 33 cm liczy się jak 35 cm: 10 znaków × 60 = 600; ±15% = 510–690
  const between = estimate({ ...dibond, heightCm: 33, text: "ABCDEFGHIJ" }, catalog);
  assert.equal(between.status, "ok");
  if (between.status !== "ok") return;
  assert.equal(between.perLetterNet, 60);
  assert.equal(between.netLow, 510);
  assert.equal(between.netHigh, 690);

  // Dokładnie na progu i poniżej pierwszego progu.
  const exact = estimate({ ...dibond, heightCm: 100 }, catalog);
  const small = estimate({ ...dibond, heightCm: 2 }, catalog);
  assert.equal(exact.status === "ok" && exact.perLetterNet, 350);
  assert.equal(small.status === "ok" && small.perLetterNet, 30);
});

test("tabela wysokości: powyżej ostatniego progu wycena jest indywidualna", () => {
  assert.deepEqual(estimate({ ...dibond, heightCm: 101 }, catalog), {
    status: "custom",
    errors: [],
  });
});

test("wariant może mieć własną cenę minimalną", () => {
  // Dibond: 1 znak × 30 zł, minimum wariantu 150 zł zamiast 80 zł produktu.
  const result = estimate({ ...dibond, heightCm: 10, text: "A" }, catalog);
  assert.equal(result.status, "ok");
  if (result.status !== "ok") return;
  assert.equal(result.netLow, 150);
  assert.equal(result.minimumApplied, true);
});

test("w jednym produkcie folia zostaje liczona za m², z wymaganą szerokością", () => {
  const folia = { ...dibond, variantId: "folia", text: "" };
  assert.equal(estimate(folia, catalog).status, "incomplete");
  // 2 m × 0,4 m = 0,8 m² × 180 = 144; ±15% = 122,4–165,6
  const result = estimate({ ...folia, widthCm: 200 }, catalog);
  assert.equal(result.status, "ok");
  if (result.status !== "ok") return;
  assert.equal(result.areaM2, 0.8);
  assert.equal(result.perLetterNet, null);
  assert.equal(result.netLow, 120);
  assert.equal(result.netHigh, 170);
});
