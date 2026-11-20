/**
 * Logika szacunkowej wyceny. Czysta funkcja bez DOM i bez sieci, dzięki czemu
 * ten sam moduł można później wywołać na serwerze przy wysyłce zapytań.
 */

export type DimensionLimits = { width: [number, number]; height: [number, number] };

export type VariantPricing =
  | { model: "area"; ratePerM2: number }
  /** Cena jednej litery rośnie liniowo z jej wysokością. */
  | { model: "perLetter"; netPer10Cm: number }
  /** Progi [wysokość w cm, cena jednej litery], rosnąco. */
  | { model: "perLetterTable"; steps: [cm: number, net: number][] };

export type CatalogVariant = {
  id: string;
  pricing: VariantPricing;
  /** Zastępuje cenę minimalną produktu. */
  minimumNet?: number;
};

export type Installation = { minimumNet: number } & ({ perM2: number } | { perLetterNet: number });

export type CatalogProduct = {
  id: string;
  limits: DimensionLimits;
  /** Najniższa cena produktu netto, bez montażu i dopłat za znaki. */
  minimumNet: number;
  /** Przy wariantach liczonych za m²: wymaga napisu i dolicza stawkę za każdy znak. */
  perCharacterNet?: number;
  /** `null` oznacza produkt bez opcji montażu. */
  installation: Installation | null;
  variants: CatalogVariant[];
};

export type Catalog = {
  vatRate: number;
  /** Szerokość widełek, np. 0.15 to ±15%. */
  spread: number;
  /** Zaokrąglenie kwot w złotych. */
  roundTo: number;
  products: CatalogProduct[];
};

export type EstimateInput = {
  productId: string;
  variantId: string;
  widthCm: number | null;
  heightCm: number | null;
  text: string;
  withInstallation: boolean;
};

export type FieldError = { field: "width" | "height"; message: string };

export type EstimateResult =
  | {
      status: "ok";
      /** `null`, gdy wariant jest liczony za literę i powierzchnia nie wpływa na cenę. */
      areaM2: number | null;
      characters: number;
      /** Cena jednej litery, gdy wariant jest liczony za literę. */
      perLetterNet: number | null;
      netLow: number;
      netHigh: number;
      grossLow: number;
      grossHigh: number;
      minimumApplied: boolean;
    }
  /** `custom`: rozmiar poza cennikiem, wyceniany indywidualnie. */
  | { status: "incomplete" | "invalid" | "custom"; errors: FieldError[] };

const FIELD_LABEL = { width: "szerokość", height: "wysokość" } as const;

function validate(
  field: FieldError["field"],
  value: number | null,
  [min, max]: [number, number],
): FieldError | null {
  if (value === null || (Number.isFinite(value) && value >= min && value <= max)) return null;
  return { field, message: `Podaj ${FIELD_LABEL[field]} od ${min} do ${max} cm.` };
}

export function countCharacters(text: string): number {
  return text.replace(/\s/g, "").length;
}

export function isPerLetter(variant: CatalogVariant): boolean {
  return variant.pricing.model !== "area";
}

function letterPriceNet(pricing: VariantPricing, heightCm: number): number | null {
  if (pricing.model === "perLetter") return (heightCm / 10) * pricing.netPer10Cm;
  if (pricing.model === "perLetterTable") {
    return pricing.steps.find(([cm]) => heightCm <= cm)?.[1] ?? null;
  }
  return null;
}

export function estimate(input: EstimateInput, catalog: Catalog): EstimateResult {
  const product = catalog.products.find((p) => p.id === input.productId);
  const variant = product?.variants.find((v) => v.id === input.variantId);
  if (!product || !variant) return { status: "incomplete", errors: [] };

  const errors = [
    validate("width", input.widthCm, product.limits.width),
    validate("height", input.heightCm, product.limits.height),
  ].filter((error) => error !== null);
  if (errors.length > 0) return { status: "invalid", errors };

  const characters = countCharacters(input.text);
  const perLetter = isPerLetter(variant);
  const needsText = perLetter || product.perCharacterNet !== undefined;
  if (
    input.heightCm === null ||
    (!perLetter && input.widthCm === null) ||
    (needsText && characters === 0)
  ) {
    return { status: "incomplete", errors: [] };
  }

  const perLetterNet = letterPriceNet(variant.pricing, input.heightCm);
  if (perLetter && perLetterNet === null) return { status: "custom", errors: [] };

  const areaM2 =
    !perLetter && input.widthCm !== null ? (input.widthCm * input.heightCm) / 10_000 : null;
  const base =
    variant.pricing.model === "area"
      ? (areaM2 ?? 0) * variant.pricing.ratePerM2
      : characters * (perLetterNet ?? 0);
  const minimumNet = variant.minimumNet ?? product.minimumNet;
  const productNet = Math.max(base, minimumNet);
  const lettersNet = perLetter ? 0 : characters * (product.perCharacterNet ?? 0);

  const installation = input.withInstallation ? product.installation : null;
  const installationNet = installation
    ? Math.max(
        "perLetterNet" in installation
          ? characters * installation.perLetterNet
          : (areaM2 ?? 0) * installation.perM2,
        installation.minimumNet,
      )
    : 0;
  const net = productNet + lettersNet + installationNet;

  // toFixed usuwa szum liczb zmiennoprzecinkowych, np. 5864,999999 zamiast 5865.
  const round = (value: number) =>
    Math.round(Number((value / catalog.roundTo).toFixed(6))) * catalog.roundTo;
  const low = Math.max(net * (1 - catalog.spread), minimumNet);
  const high = net * (1 + catalog.spread);

  return {
    status: "ok",
    areaM2,
    characters,
    perLetterNet,
    netLow: round(low),
    netHigh: round(high),
    grossLow: round(low * (1 + catalog.vatRate)),
    grossHigh: round(high * (1 + catalog.vatRate)),
    minimumApplied: base < minimumNet,
  };
}
