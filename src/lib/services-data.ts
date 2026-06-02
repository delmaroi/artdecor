import type { Service } from "../types/index";

/**
 * Pełna lista usług Art Decor — pojedyncze źródło prawdy dla nawigacji
 * (dropdown „Usługi" w Header). Każdy slug odpowiada stronie w
 * `src/pages/uslugi/<slug>.astro` oraz wpisowi w `hasOfferCatalog` (Layout).
 *
 * Uwaga: `piaskowanie-artystyczne` ma własną stronę i jest w schema, lecz nie
 * jest wypisane w bento na stronie głównej (Services.astro) — dropdown to
 * pierwsze miejsce w nawigacji, z którego ta usługa jest osiągalna.
 */
export const services: Service[] = [
  { title: "Pylony / totemy", slug: "pylony-totemy", icon: "lucide:layout-grid" },
  { title: "Kasetony z dibondu", slug: "kasetony-z-dibondu", icon: "lucide:package" },
  { title: "Litery blokowe", slug: "litery-blokowe", icon: "lucide:type" },
  { title: "Litery przestrzenne", slug: "litery-przestrzenne", icon: "lucide:box" },
  { title: "Szyldy szklane", slug: "szyldy-szklane", icon: "lucide:square" },
  { title: "Oklejanie witryn", slug: "oklejanie-witryn", icon: "lucide:rectangle-horizontal" },
  { title: "Oklejanie samochodów", slug: "oklejanie-samochodow", icon: "lucide:car" },
  { title: "Tablice LED", slug: "tablice-led", icon: "lucide:lightbulb" },
  { title: "Systemy wystawiennicze", slug: "systemy-wystawiennicze", icon: "lucide:layout-grid" },
  { title: "Wycinanie znaków", slug: "wycinanie-znakow", icon: "lucide:scissors" },
  { title: "Piaskowanie artystyczne", slug: "piaskowanie-artystyczne", icon: "lucide:sparkles" },
  { title: "Punkty gastronomiczne", slug: "punkty-gastronomiczne", icon: "lucide:utensils-crossed" },
];
