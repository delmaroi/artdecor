import { estimate, countCharacters, isPerLetter } from "../lib/calculator/estimate";
import { pricing, type Product } from "../lib/calculator/pricing";
import { drawScene } from "./calculator-drawing";

const money = new Intl.NumberFormat("pl-PL", { maximumFractionDigits: 0 });
const range = (low: number, high: number) =>
  low === high ? `${money.format(low)} zł` : `${money.format(low)}–${money.format(high)} zł`;

function parseDimension(raw: string): number | null {
  const value = raw.trim().replace(",", ".");
  return value === "" ? null : Number(value);
}

/** Szerokość napisu do rysunku, gdy klient jej nie podał. Litera ma około 0,7 swojej wysokości. */
function approximateTextWidthCm(text: string, heightCm: number): number {
  return Math.round((text.trim().length || "NAPIS".length) * heightCm * 0.7);
}

function init() {
  const root = document.querySelector<HTMLElement>("[data-calculator]");
  const form = root?.querySelector<HTMLFormElement>("form");
  if (!root || !form) return;

  const q = <T extends Element>(selector: string) => root.querySelector<T>(selector)!;
  const widthInput = q<HTMLInputElement>("#calc-width");
  const heightInput = q<HTMLInputElement>("#calc-height");
  const textInput = q<HTMLInputElement>("#calc-text");
  const installInput = q<HTMLInputElement>("#calc-install");
  const textField = q<HTMLElement>("[data-text-field]");
  const installField = q<HTMLElement>("[data-install-field]");
  const variantList = q<HTMLElement>("[data-variants]");
  const drawing = q<SVGSVGElement>("[data-drawing]");
  const priceNet = q<HTMLElement>("[data-price-net]");
  const priceGross = q<HTMLElement>("[data-price-gross]");
  const priceNote = q<HTMLElement>("[data-price-note]");
  const areaOutput = q<HTMLElement>("[data-area]");
  const metaLabel = q<HTMLElement>("[data-meta-label]");
  const variantNote = q<HTMLElement>("[data-variant-note]");
  const dimensionsTitle = q<HTMLElement>("[data-dimensions-title]");
  const heightLabel = q<HTMLElement>("[data-height-label]");
  const barPrice = q<HTMLElement>("[data-bar-price]");

  // Podpowiadane wymiary podmieniamy tylko, dopóki klient ich nie zmienił.
  let widthEdited = false;
  let heightEdited = false;
  let textEdited = false;
  const defaultText = textInput.value;

  const currentProduct = (): Product => {
    const id = form.querySelector<HTMLInputElement>('input[name="product"]:checked')?.value;
    return pricing.products.find((p) => p.id === id) ?? pricing.products[0];
  };

  function renderVariants(product: Product) {
    variantList.replaceChildren(
      ...product.variants.map((variant, index) => {
        const labelEl = document.createElement("label");
        labelEl.className = "calc-chip";
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "variant";
        input.value = variant.id;
        input.checked = index === 0;
        const span = document.createElement("span");
        span.textContent = variant.label;
        labelEl.append(input, span);
        return labelEl;
      }),
    );
  }

  function showError(input: HTMLInputElement, message: string | undefined) {
    const error = document.getElementById(`${input.id}-error`)!;
    error.textContent = message ?? "";
    error.hidden = !message;
    if (message) input.setAttribute("aria-invalid", "true");
    else input.removeAttribute("aria-invalid");
  }

  function update() {
    const product = currentProduct();
    const variantId =
      form!.querySelector<HTMLInputElement>('input[name="variant"]:checked')?.value ?? "";
    const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
    const perLetter = isPerLetter(variant);

    // Przy cenie za literę szerokość jest opcjonalna, więc nie podpowiadamy przykładu.
    if (!widthEdited) widthInput.value = perLetter ? "" : String(product.example.widthCm);
    widthInput.placeholder = perLetter ? "opcjonalnie" : `np. ${product.example.widthCm}`;
    dimensionsTitle.textContent = perLetter ? "Wymiary napisu" : "Wymiary całej reklamy";
    heightLabel.textContent = perLetter ? "Wysokość litery, cm" : "Wysokość, cm";

    const widthCm = parseDimension(widthInput.value);
    const heightCm = parseDimension(heightInput.value);
    const usesText = perLetter || product.perCharacterNet !== undefined;
    const text = usesText ? textInput.value : "";

    textField.hidden = !usesText;
    installField.hidden = product.installation === null;

    const result = estimate(
      {
        productId: product.id,
        variantId: variant.id,
        widthCm,
        heightCm,
        text,
        withInstallation: installInput.checked && product.installation !== null,
      },
      pricing,
    );

    const errors = result.status === "ok" ? [] : result.errors;
    showError(widthInput, errors.find((e) => e.field === "width")?.message);
    showError(heightInput, errors.find((e) => e.field === "height")?.message);

    const widthIsEstimated = perLetter && widthCm === null && heightCm !== null;
    const drawnWidthCm = widthIsEstimated ? approximateTextWidthCm(text, heightCm) : widthCm;
    if (drawnWidthCm !== null && heightCm !== null && errors.length === 0) {
      drawScene(
        drawing,
        variant.shape ? { ...product, shape: variant.shape } : product,
        variant.effect,
        drawnWidthCm,
        heightCm,
        text,
        widthIsEstimated,
      );
      drawing.setAttribute(
        "aria-label",
        `Rysunek w skali: ${product.title}, ${widthIsEstimated ? "około " : ""}${drawnWidthCm} na ${heightCm} cm, obok sylwetka człowieka o wzroście 175 cm.`,
      );
    }

    metaLabel.textContent = perLetter ? "Napis" : "Powierzchnia";
    variantNote.textContent = result.status === "ok" ? (variant.note ?? "") : "";
    if (result.status === "ok") {
      const area = new Intl.NumberFormat("pl-PL", { maximumFractionDigits: 2 });
      areaOutput.textContent =
        result.perLetterNet !== null
          ? `${result.characters} zn., ok. ${money.format(result.perLetterNet)} zł netto za znak`
          : `${area.format(result.areaM2 ?? 0)} m²${usesText ? `, ${result.characters} zn.` : ""}`;
      priceNet.textContent = `${range(result.netLow, result.netHigh)} netto`;
      priceGross.textContent = `${range(result.grossLow, result.grossHigh)} brutto (VAT ${pricing.vatRate * 100}%)`;
      priceNote.textContent = result.minimumApplied
        ? "Przy tak małym zamówieniu obowiązuje cena minimalna."
        : "";
      barPrice.textContent = `${range(result.netLow, result.netHigh)} netto`;
    } else if (result.status === "custom") {
      areaOutput.textContent = "—";
      priceNet.textContent = "Wycena indywidualna";
      priceGross.textContent = "Ten rozmiar wyceniamy indywidualnie. Zadzwoń, a podamy cenę.";
      priceNote.textContent = "";
      barPrice.textContent = "Wycena indywidualna";
    } else {
      areaOutput.textContent = "—";
      const dimensionsGiven = heightCm !== null && (perLetter || widthCm !== null);
      const prompt =
        result.status === "invalid"
          ? "Popraw wymiary"
          : usesText && countCharacters(text) === 0 && dimensionsGiven
            ? "Wpisz treść napisu"
            : perLetter
              ? "Podaj wysokość liter"
              : "Podaj wymiary";
      priceNet.textContent = prompt;
      priceGross.textContent = "";
      priceNote.textContent = "";
      barPrice.textContent = prompt;
    }
  }

  function applyProduct() {
    const product = currentProduct();
    renderVariants(product);
    if (!heightEdited) heightInput.value = String(product.example.heightCm);
    heightInput.placeholder = `np. ${product.example.heightCm}`;
    if (!textEdited) textInput.value = defaultText;
    update();
  }

  form.addEventListener("submit", (event) => event.preventDefault());
  form.addEventListener("input", (event) => {
    const target = event.target as HTMLInputElement;
    if (target === widthInput) widthEdited = true;
    if (target === heightInput) heightEdited = true;
    if (target === textInput) textEdited = true;
    if (target.name === "product") return;
    update();
  });
  form.addEventListener("change", (event) => {
    if ((event.target as HTMLInputElement).name === "product") applyProduct();
  });

  // Przeglądarka może przywrócić stare pola po odświeżeniu, więc start jest jawny.
  form.reset();
  applyProduct();
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();
