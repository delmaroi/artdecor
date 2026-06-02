export interface CityData {
  slug: string;
  name: string;
  /** Polska deklinacja: "w Tychach", "w Bielsku-Białej" itp. */
  prepositional: string;
  population: string;
  distanceFromPszczyna: string;
  drivingTimeMin: number;
  description: string;
  localContext: string;
  neighborhoods: string[];
  /** GPS dla GeoCoordinates */
  lat: number;
  lng: number;
}

export const cities: CityData[] = [
  {
    slug: "tychy",
    name: "Tychy",
    prepositional: "w Tychach",
    population: "około 125 tys.",
    distanceFromPszczyna: "15 km",
    drivingTimeMin: 20,
    description:
      "Reklama wizualna w Tychach — kompleksowa obsługa firm, sklepów i przemysłu. Pylony i totemy, kasetony LED, litery 3D, oklejanie samochodów i witryn. Dojazd z naszej siedziby w Pszczynie zajmuje ok. 20 minut.",
    localContext:
      "Tychy to ważny ośrodek przemysłowy (Fabryka Samochodów Tyskich, Browary Tyskie) i handlowy (Tyski Park Handlowy, Stary Park). Obsługujemy firmy z dzielnic Paprocany, Czułów, Wartogłowiec i z centrum miasta — typowo branża automotive, handel detaliczny, gastronomia.",
    neighborhoods: ["Paprocany", "Czułów", "Wartogłowiec", "Suble", "Stare Tychy", "Glinka"],
    lat: 50.1357,
    lng: 18.9985,
  },
  {
    slug: "bielsko-biala",
    name: "Bielsko-Biała",
    prepositional: "w Bielsku-Białej",
    population: "około 168 tys.",
    distanceFromPszczyna: "32 km",
    drivingTimeMin: 35,
    description:
      "Reklama wizualna w Bielsku-Białej — wykonujemy pylony reklamowe, kasetony LED, litery przestrzenne i car wrapping dla firm z całego Podbeskidzia. Pełna obsługa od projektu po montaż.",
    localContext:
      "Bielsko-Biała jest centrum gospodarczym Podbeskidzia. Współpracujemy z firmami produkcyjnymi z BSSE (Bielska Strefa Aktywności Gospodarczej), z handlem ulicy 11 Listopada oraz Sferą Bielsko. Stoki narciarskie, ośrodki SPA i hotele górskie to nasi częsti klienci.",
    neighborhoods: ["Aleksandrowice", "Komorowice", "Mikuszowice", "Olszówka", "Wapienica", "Lipnik"],
    lat: 49.8224,
    lng: 19.0584,
  },
  {
    slug: "katowice",
    name: "Katowice",
    prepositional: "w Katowicach",
    population: "około 290 tys.",
    distanceFromPszczyna: "40 km",
    drivingTimeMin: 45,
    description:
      "Reklama wizualna w Katowicach — stolica Górnego Śląska to nasz drugi rynek. Pylony, kasetony LED, oklejanie flot, reklama dla biznesu B2B i korporacji. Realizacje na elewacjach biurowców i centrów konferencyjnych.",
    localContext:
      "Katowice to centrum biznesowe Śląska — biurowce klasy A (.KTW, Global Office Park, Silesia Star), centra konferencyjne (MCK), galerie handlowe (Silesia City Center, Galeria Katowicka). Obsługujemy klientów z Mikołowskiej, Bogucic, Załęża, Brynowa i Ligoty.",
    neighborhoods: ["Bogucice", "Załęże", "Brynów", "Ligota", "Piotrowice", "Murcki", "Janów"],
    lat: 50.2649,
    lng: 19.0238,
  },
  {
    slug: "mikolow",
    name: "Mikołów",
    prepositional: "w Mikołowie",
    population: "około 41 tys.",
    distanceFromPszczyna: "18 km",
    drivingTimeMin: 25,
    description:
      "Reklama wizualna w Mikołowie — bliska sąsiedztwo Pszczyny pozwala na szybką realizację i serwis. Kasetony LED, szyldy szklane, oklejanie witryn i flot lokalnych firm usługowych i handlowych.",
    localContext:
      "Mikołów to spokojne miasto na zachód od Tychów z mocnym sektorem MŚP. Obsługujemy firmy z Borowej Wsi, Mokrego, Bujakowa, Paniów oraz lokalne restauracje i sklepy w centrum przy rynku.",
    neighborhoods: ["Borowa Wieś", "Mokre", "Bujaków", "Paniowy", "Śmiłowice"],
    lat: 50.1718,
    lng: 18.9054,
  },
  {
    slug: "rybnik",
    name: "Rybnik",
    prepositional: "w Rybniku",
    population: "około 134 tys.",
    distanceFromPszczyna: "30 km",
    drivingTimeMin: 35,
    description:
      "Reklama wizualna w Rybniku — obsługujemy firmy z całego subregionu rybnicko-jastrzębskiego. Pylony, totemy, kasetony, litery LED, oklejanie samochodów dostawczych. Doświadczenie z branżą węglową, energetyczną i przetwórstwem.",
    localContext:
      "Rybnik to centrum subregionu zachodniego Śląska. Bliskość kopalń i elektrowni Rybnik daje rynek dla firm serwisujących górnictwo. Realizujemy też reklamy dla retail (Focus Mall) i gastronomii.",
    neighborhoods: ["Boguszowice", "Niedobczyce", "Chwałowice", "Niewiadom", "Paruszowiec", "Kamień"],
    lat: 50.0971,
    lng: 18.5413,
  },
  {
    slug: "zory",
    name: "Żory",
    prepositional: "w Żorach",
    population: "około 61 tys.",
    distanceFromPszczyna: "20 km",
    drivingTimeMin: 25,
    description:
      "Reklama wizualna w Żorach — szybka obsługa lokalnych firm i obiektów handlowych. Kasetony LED, szyldy, oklejanie witryn, reklama dla parku handlowego ZdrowieMall i galerii.",
    localContext:
      "Żory są dynamicznie rozwijającym się miastem z silnym handlem (Żory Park, Inter-Mix) i przemysłem (Katowicka Specjalna Strefa Ekonomiczna). Obsługujemy firmy z dzielnic Rój, Kleszczówka, Rogoźna i z centrum.",
    neighborhoods: ["Rój", "Kleszczówka", "Rogoźna", "Baranowice", "Folwarki"],
    lat: 50.0428,
    lng: 18.7000,
  },
];
