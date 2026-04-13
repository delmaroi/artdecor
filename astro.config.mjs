import { defineConfig } from "astro/config";
import icon from "astro-icon";

export default defineConfig({
  site: "https://www.artdecor.net.pl/",
  integrations: [
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
          "expand",
          "search",
          "settings",
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
  ],
});
