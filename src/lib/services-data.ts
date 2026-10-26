import type { Service } from "../types/index";

/**
 * Pełna lista usług Art Decor — pojedyncze źródło prawdy dla nawigacji
 * (dropdown „Usługi" w Header). Każdy slug odpowiada stronie w
 * `src/pages/uslugi/<slug>.astro` oraz wpisowi w `hasOfferCatalog` (Layout).
 */
export const services: Service[] = [
  { title: "Pylony / totemy", slug: "pylony-totemy", icon: "lucide:layout-grid", desc: "Wolnostojące konstrukcje 3–7 m z podświetleniem LED i montażem na fundamencie B20." },
  { title: "Kasetony z dibondu", slug: "kasetony-z-dibondu", icon: "lucide:package", desc: "Świetlne kasetony frezowane z dibondu z modułami LED — czytelne także po zmroku." },
  { title: "Litery blokowe", slug: "litery-blokowe", icon: "lucide:type", desc: "Przestrzenne litery blokowe podświetlane LED na elewacje i witryny." },
  { title: "Litery przestrzenne", slug: "litery-przestrzenne", icon: "lucide:box", desc: "Litery 3D z plexi, dibondu i stali — efektowna identyfikacja na budynku." },
  { title: "Szyldy szklane", slug: "szyldy-szklane", icon: "lucide:square", desc: "Eleganckie szyldy ze szkła i plexi na dystansach — prestiż wejścia do firmy." },
  { title: "Oklejanie witryn", slug: "oklejanie-witryn", icon: "lucide:rectangle-horizontal", desc: "Grafika i folie mrożone na szkło — reklama i prywatność w jednym." },
  { title: "Oklejanie samochodów", slug: "oklejanie-samochodow", icon: "lucide:car", desc: "Reklama na flotę i car wrapping foliami Oracal — mobilny nośnik 24/7." },
  { title: "Wycinanie znaków", slug: "wycinanie-znakow", icon: "lucide:scissors", desc: "Cięcie ploterowe folii i frezowanie CNC — precyzyjne znaki i logotypy." },
  { title: "Punkty gastronomiczne", slug: "punkty-gastronomiczne", icon: "lucide:utensils-crossed", desc: "Kompleksowe oznakowanie lokali — menuboardy, kasetony i witryny." },
];
