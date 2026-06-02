import { defineConfig } from "astro/config";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.artdecor.net.pl/",
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes("/cookies") &&
        !page.includes("/polityka-prywatnosci"),
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
    "/index.php/druk-wielkoformatowy": { status: 301, destination: "/" },
    "/index.php/pylony-totemy": { status: 301, destination: "/uslugi/pylony-totemy" },
    "/index.php/litery-blokowe": { status: 301, destination: "/uslugi/litery-blokowe" },
    "/index.php/litery-blokowe-przestrzenne-led": { status: 301, destination: "/uslugi/litery-blokowe" },
    "/index.php/wycinanie-znakow": { status: 301, destination: "/uslugi/wycinanie-znakow" },
    "/index.php/punkty-gastronomiczne": { status: 301, destination: "/uslugi/punkty-gastronomiczne" },
    "/index.php": { status: 301, destination: "/" },
    "/index.php/component/content/article": { status: 301, destination: "/" },
    "/index.php/component/users": { status: 301, destination: "/" },
    "/joomla": { status: 301, destination: "/" }
  }
});
