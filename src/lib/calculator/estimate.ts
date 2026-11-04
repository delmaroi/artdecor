/**
 * Logika szacunkowej wyceny. Czysta funkcja bez DOM i bez sieci, dzięki czemu
 * ten sam moduł można później wywołać na serwerze przy wysyłce zapytań.
 */

export type DimensionLimits = { width: [number, number]; height: [number, number] };

export type CatalogVariant = { id: string; ratePerM2: number };

export type CatalogProduct = {
  id: string;
  limits: DimensionLimits;
  /** Najniższa cena produktu netto, bez montażu i dopłat za znaki. */
  minimumNet: number;
  /** Gdy ustawione, wycena wymaga napisu i dolicza stawkę za każdy znak. */
  perCharacterNet?: number;
  /** `null` oznacza produkt bez opcji montażu. */
  installation: { perM2: number; minimumNet: number } | null;
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
      areaM2: number;
      netLow: number;
      netHigh: number;
      grossLow: number;
      grossHigh: number;
      minimumApplied: boolean;
    }
  | { status: "incomplete" | "invalid"; errors: FieldError[] };

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
  const needsText = product.perCharacterNet !== undefined;
  if (input.widthCm === null || input.heightCm === null || (needsText && characters === 0)) {
    return { status: "incomplete", errors: [] };
  }

  const areaM2 = (input.widthCm * input.heightCm) / 10_000;
  const base = areaM2 * variant.ratePerM2;
  const productNet = Math.max(base, product.minimumNet);
  const lettersNet = characters * (product.perCharacterNet ?? 0);
  const installationNet =
    input.withInstallation && product.installation
      ? Math.max(areaM2 * product.installation.perM2, product.installation.minimumNet)
      : 0;
  const net = productNet + lettersNet + installationNet;

  // toFixed usuwa szum liczb zmiennoprzecinkowych, np. 5864,999999 zamiast 5865.
  const round = (value: number) =>
    Math.round(Number((value / catalog.roundTo).toFixed(6))) * catalog.roundTo;
  const low = Math.max(net * (1 - catalog.spread), product.minimumNet);
  const high = net * (1 + catalog.spread);

  return {
    status: "ok",
    areaM2,
    netLow: round(low),
    netHigh: round(high),
    grossLow: round(low * (1 + catalog.vatRate)),
    grossHigh: round(high * (1 + catalog.vatRate)),
    minimumApplied: base < product.minimumNet,
  };
}
