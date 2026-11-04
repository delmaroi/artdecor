import type { LightEffect, Product } from "../lib/calculator/pricing";

const SVG_NS = "http://www.w3.org/2000/svg";
const VIEW = { width: 640, height: 380, left: 28, right: 86, top: 58, ground: 342 };
const PERSON_CM = 175;
const PERSON_WIDTH_CM = 50;
const GAP_CM = 70;

type Attrs = Record<string, string | number>;

function el<K extends keyof SVGElementTagNameMap>(tag: K, attrs: Attrs, parent: Element) {
  const node = document.createElementNS(SVG_NS, tag);
  for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, String(value));
  parent.append(node);
  return node;
}

function label(parent: Element, x: number, y: number, text: string, anchor = "middle") {
  const node = el("text", { x, y, "text-anchor": anchor, class: "dim-label" }, parent);
  node.textContent = text; // textContent: tekst od użytkownika nigdy nie staje się znacznikiem.
  return node;
}

function drawPerson(parent: Element, x: number, scale: number) {
  const h = PERSON_CM * scale;
  const cx = x + (PERSON_WIDTH_CM * scale) / 2;
  const top = VIEW.ground - h;
  const person = el("g", { class: "person" }, parent);
  const unit = h / 100;
  el("circle", { cx, cy: top + 7 * unit, r: 7 * unit }, person);
  el("rect", { x: cx - 12 * unit, y: top + 16 * unit, width: 24 * unit, height: 38 * unit, rx: 6 * unit }, person);
  el("rect", { x: cx - 10 * unit, y: top + 50 * unit, width: 9 * unit, height: 50 * unit, rx: 3 * unit }, person);
  el("rect", { x: cx + 1 * unit, y: top + 50 * unit, width: 9 * unit, height: 50 * unit, rx: 3 * unit }, person);
  label(parent, cx, top - 8, `${PERSON_CM} cm`);
}

function drawSign(
  parent: Element,
  product: Product,
  effect: LightEffect,
  box: { x: number; y: number; w: number; h: number },
  text: string,
) {
  const sign = el("g", { class: `sign sign--${product.shape}`, "data-effect": effect }, parent);
  const { x, y, w, h } = box;

  if (product.shape === "letters") {
    // Wielkie litery zajmują około 70% stopnia pisma, stąd przeliczenie wysokości.
    const node = el(
      "text",
      { x, y: y + h, "font-size": h / 0.7, textLength: w, lengthAdjust: "spacingAndGlyphs" },
      sign,
    );
    node.textContent = text.trim() || "NAPIS";
    return;
  }
  if (product.shape === "pylon") {
    el("rect", { x, y, width: w, height: h, rx: 2 }, sign);
    const inner = el("g", { class: "sign-detail" }, sign);
    for (const part of [0.22, 0.44, 0.66]) {
      el("line", { x1: x + w * 0.12, x2: x + w * 0.88, y1: y + h * part, y2: y + h * part }, inner);
    }
    return;
  }
  el("rect", { x, y, width: w, height: h, rx: product.shape === "glass" ? 1 : 2 }, sign);
}

export function drawScene(
  svg: SVGSVGElement,
  product: Product,
  effect: LightEffect,
  widthCm: number,
  heightCm: number,
  text: string,
) {
  const availableW = VIEW.width - VIEW.left - VIEW.right;
  const availableH = VIEW.ground - VIEW.top;
  const totalW = PERSON_WIDTH_CM + GAP_CM + widthCm;
  const totalH = Math.max(PERSON_CM, product.elevationCm + heightCm);
  const scale = Math.min(availableW / totalW, availableH / totalH);

  svg.replaceChildren();
  el("line", { x1: 0, x2: VIEW.width, y1: VIEW.ground, y2: VIEW.ground, class: "ground" }, svg);
  drawPerson(svg, VIEW.left, scale);

  const box = {
    x: VIEW.left + (PERSON_WIDTH_CM + GAP_CM) * scale,
    w: widthCm * scale,
    h: heightCm * scale,
    y: VIEW.ground - (product.elevationCm + heightCm) * scale,
  };
  drawSign(svg, product, effect, box, text);

  const format = (value: number) => `${new Intl.NumberFormat("pl-PL").format(value)} cm`;
  const dims = el("g", { class: "dims" }, svg);
  const dimY = box.y - 16;
  const dimX = box.x + box.w + 16;
  el("line", { x1: box.x, x2: box.x + box.w, y1: dimY, y2: dimY }, dims);
  el("line", { x1: box.x, x2: box.x, y1: dimY - 5, y2: dimY + 5 }, dims);
  el("line", { x1: box.x + box.w, x2: box.x + box.w, y1: dimY - 5, y2: dimY + 5 }, dims);
  el("line", { x1: dimX, x2: dimX, y1: box.y, y2: box.y + box.h }, dims);
  el("line", { x1: dimX - 5, x2: dimX + 5, y1: box.y, y2: box.y }, dims);
  el("line", { x1: dimX - 5, x2: dimX + 5, y1: box.y + box.h, y2: box.y + box.h }, dims);
  label(svg, box.x + box.w / 2, dimY - 8, format(widthCm));
  label(svg, dimX + 9, box.y + box.h / 2 + 4, format(heightCm), "start");
}
