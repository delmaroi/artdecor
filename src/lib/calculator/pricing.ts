import type { Catalog, CatalogProduct, CatalogVariant } from "./estimate";

/**
 * Cennik kalkulatora. Jedyne miejsce, w którym zmienia się stawki.
 *
 * UWAGA: wszystkie kwoty i limity wymiarów poniżej to WARTOŚCI PRZYKŁADOWE,
 * wpisane tylko po to, żeby kalkulator działał. Nie pochodzą z kosztów Art Decor.
 * Po wpisaniu prawdziwych stawek zmień `PRICING_STATUS` na "published". To jedno
 * przełączenie usuwa ostrzeżenie ze strony, zdejmuje noindex i dodaje kalkulator
 * do mapy strony.
 */
export const PRICING_STATUS: "draft" | "published" = "draft";

export type DrawingShape = "letters" | "panel" | "pylon" | "glass" | "film";
export type LightEffect = "none" | "front" | "halo" | "both";

export type Variant = CatalogVariant & { label: string; effect: LightEffect };

export type Product = CatalogProduct & {
  title: string;
  /** Slug strony usługi, zgodny z `services-data.ts`. */
  slug: string;
  shape: DrawingShape;
  /** Wysokość dolnej krawędzi nad ziemią na rysunku, w cm. */
  elevationCm: number;
  example: { widthCm: number; heightCm: number };
  variants: Variant[];
};

export const pricing: Catalog & { products: Product[] } = {
  vatRate: 0.23,
  spread: 0.15,
  roundTo: 10,
  products: [
    {
      id: "litery-blokowe",
      title: "Litery blokowe",
      slug: "litery-blokowe",
      shape: "letters",
      elevationCm: 240,
      example: { widthCm: 300, heightCm: 60 },
      limits: { width: [30, 2000], height: [10, 300] },
      minimumNet: 800,
      perCharacterNet: 60,
      installation: { perM2: 250, minimumNet: 500 },
      variants: [
        { id: "front", label: "Świecące frontem", effect: "front", ratePerM2: 1800 },
        { id: "halo", label: "Efekt halo", effect: "halo", ratePerM2: 1900 },
        { id: "front-halo", label: "Front i halo", effect: "both", ratePerM2: 2300 },
      ],
    },
    {
      id: "litery-przestrzenne",
      title: "Litery przestrzenne",
      slug: "litery-przestrzenne",
      shape: "letters",
      elevationCm: 240,
      example: { widthCm: 250, heightCm: 40 },
      limits: { width: [20, 2000], height: [5, 300] },
      minimumNet: 400,
      perCharacterNet: 30,
      installation: { perM2: 200, minimumNet: 400 },
      variants: [
        { id: "dibond", label: "Dibond", effect: "none", ratePerM2: 900 },
        { id: "plexi", label: "Plexi", effect: "none", ratePerM2: 1100 },
        { id: "stal", label: "Stal", effect: "none", ratePerM2: 1600 },
      ],
    },
    {
      id: "kasetony",
      title: "Kasetony z dibondu",
      slug: "kasetony-z-dibondu",
      shape: "panel",
      elevationCm: 240,
      example: { widthCm: 300, heightCm: 80 },
      limits: { width: [40, 1200], height: [30, 300] },
      minimumNet: 900,
      installation: { perM2: 200, minimumNet: 400 },
      variants: [
        { id: "led", label: "Podświetlenie LED", effect: "front", ratePerM2: 1400 },
        { id: "bez", label: "Bez podświetlenia", effect: "none", ratePerM2: 800 },
      ],
    },
    {
      id: "pylony",
      title: "Pylony / totemy",
      slug: "pylony-totemy",
      shape: "pylon",
      elevationCm: 0,
      example: { widthCm: 120, heightCm: 400 },
      limits: { width: [50, 400], height: [300, 700] },
      minimumNet: 4000,
      installation: { perM2: 400, minimumNet: 1500 },
      variants: [
        { id: "led", label: "Podświetlenie LED", effect: "front", ratePerM2: 2000 },
        { id: "bez", label: "Bez podświetlenia", effect: "none", ratePerM2: 1300 },
      ],
    },
    {
      id: "szyldy",
      title: "Szyldy szklane",
      slug: "szyldy-szklane",
      shape: "glass",
      elevationCm: 130,
      example: { widthCm: 60, heightCm: 40 },
      limits: { width: [15, 300], height: [10, 200] },
      minimumNet: 250,
      installation: { perM2: 300, minimumNet: 150 },
      variants: [
        { id: "plexi", label: "Plexi", effect: "none", ratePerM2: 1000 },
        { id: "szklo", label: "Szkło", effect: "none", ratePerM2: 1500 },
      ],
    },
    {
      id: "witryny",
      title: "Oklejanie witryn",
      slug: "oklejanie-witryn",
      shape: "film",
      elevationCm: 30,
      example: { widthCm: 300, heightCm: 200 },
      limits: { width: [30, 2000], height: [20, 400] },
      minimumNet: 200,
      installation: { perM2: 50, minimumNet: 150 },
      variants: [
        { id: "mrozona", label: "Folia mrożona", effect: "none", ratePerM2: 150 },
        { id: "druk", label: "Folia z nadrukiem", effect: "none", ratePerM2: 200 },
      ],
    },
    {
      id: "znaki",
      title: "Wycinanie znaków",
      slug: "wycinanie-znakow",
      shape: "film",
      elevationCm: 120,
      example: { widthCm: 100, heightCm: 30 },
      limits: { width: [5, 600], height: [2, 150] },
      minimumNet: 80,
      installation: null,
      variants: [{ id: "folia", label: "Folia cięta ploterem", effect: "none", ratePerM2: 180 }],
    },
  ],
};
