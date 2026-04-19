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
          "chevron-down",
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
  redirects: {
    "/index.php/kasetony-z-dibondu": { status: 301, destination: "/uslugi/kasetony-z-dibondu" },
    "/index.php/kasetony-reklamowe": { status: 301, destination: "/uslugi/kasetony-z-dibondu" },
    "/index.php/litery-przestrzenne": { status: 301, destination: "/uslugi/litery-przestrzenne" },
    "/index.php/litery-blokowe-przestrzenne-swietlne-led": { status: 301, destination: "/uslugi/litery-blokowe" },
    "/index.php/oklejanie-samochodow": { status: 301, destination: "/uslugi/oklejanie-samochodow" },
    "/index.php/oklejanie-witryn": { status: 301, destination: "/uslugi/oklejanie-witryn" },
    "/index.php/piaskowanie-artystyczne": { status: 301, destination: "/uslugi/piaskowanie-artystyczne" },
    "/index.php/szyldy-szklane": { status: 301, destination: "/uslugi/szyldy-szklane" },
    "/index.php/tablice-led": { status: 301, destination: "/uslugi/tablice-led" },
    "/index.php/systemy-wystawiennicze": { status: 301, destination: "/uslugi/systemy-wystawiennicze" },
    "/index.php/o-nas": { status: 301, destination: "/o-nas" },
    "/index.php/kontakt": { status: 301, destination: "/kontakt" },
    "/index.php/polityka-cookies": { status: 301, destination: "/" },
    "/index.php/banery-i-siatki": { status: 301, destination: "/" },
    "/index.php/druk-wielkoformatowy": { status: 301, destination: "/" }
  }
});
