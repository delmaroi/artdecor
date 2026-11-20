import { defineConfig } from "astro/config";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import { PRICING_STATUS } from "./src/lib/calculator/pricing.ts";
import pruneOriginals from "./src/integrations/prune-originals.mjs";

export default defineConfig({
  site: "https://www.artdecor.net.pl/",
  integrations: [
    pruneOriginals(),
    sitemap({
      filter: (page) =>
        !page.includes("/cookies") &&
        !page.includes("/polityka-prywatnosci") &&
        (PRICING_STATUS === "published" || !page.includes("/kalkulator")),
      i18n: {
        defaultLocale: "pl",
        locales: { pl: "pl-PL" },
      },
      changefreq: "monthly",
      priority: 0.7,
      lastmod: new Date(),
      serialize(item) {
        if (item.url === "https://www.artdecor.net.pl/") {
          item.priority = 1.0;
          item.changefreq = "weekly";
        }
        if (item.url.includes("/uslugi/")) {
          item.priority = 0.8;
        }
        return item;
      },
    }),
    icon({
      include: {
        lucide: [
          "arrow-right",
          "arrow-up-right",
          "plus",
          "send",
          "map-pin",
          "phone",
          "mail",
          "chevron-right",
          "chevron-down",
          "expand",
          "search",
          "settings",
          "flame",
          "play",
          "thermometer",
          "sparkles",
          "printer",
          "scissors",
          "package",
          "type",
          "square",
          "box",
          "rectangle-horizontal",
          "car",
          "layout-grid",
          "zap",
          "utensils-crossed",
          "lightbulb",
          "circle-dot",
        ],
        mdi: ["facebook", "instagram"],
      },
    }),
  ]
});
