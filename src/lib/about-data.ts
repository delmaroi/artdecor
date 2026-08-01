/**
 * Treść strony „O nas".
 *
 * Poprawiaj teksty tutaj — `src/pages/o-nas.astro` tylko je renderuje.
 *
 * Rok założenia pochodzi z `company-data.ts` i jest współdzielony z hero
 * oraz stopką — nie wpisuj go w tekstach na sztywno.
 */

import { foundedYear } from "./company-data";

export { foundedYear };

/* ── Wstęp ───────────────────────────────────────────────────────────────── */

export const aboutIntro = {
  eyebrow: "O nas",
  title: "Od projektu\npo montaż",
  accent: "po montaż",
  paragraphs: [
    `Art Decor to agencja reklamy wizualnej z Pszczyny. Od ${foundedYear} roku projektujemy, ` +
      "produkujemy i montujemy nośniki, które budują wizerunek firm — od szyldu nad " +
      "wejściem, przez pylon widoczny z drogi, po pełne oznakowanie floty i wnętrz.",
    "Pracujemy zarówno z firmami, które potrzebują jednego dobrze zaprojektowanego " +
      "szyldu, jak i z sieciami wymagającymi powtarzalnego standardu w kilkunastu " +
      "lokalizacjach. W każdym przypadku zaczynamy tak samo: od rozmowy o tym, co ma " +
      "być widoczne, dla kogo i z jakiej odległości.",
    "Nie sprzedajemy katalogu gotowych produktów. Dobieramy materiał, technikę " +
      "i sposób montażu do konkretnej elewacji, budżetu i tego, jak długo reklama " +
      "ma wyglądać dobrze.",
  ],
};

/* ── Dlaczego własna produkcja ───────────────────────────────────────────── */

export interface AboutPillar {
  title: string;
  body: string;
}

export const aboutPillars = {
  eyebrow: "Własna produkcja",
  title: "Wszystko powstaje\nu nas",
  accent: "u nas",
  lead:
    "Projekt graficzny, obróbka materiału, druk, montaż i późniejszy serwis to praca " +
    "jednego zespołu na własnym sprzęcie. To nie jest deklaracja marketingowa — to " +
    "decyzja, która realnie zmienia trzy rzeczy.",
  items: [
    {
      title: "Jedna odpowiedzialność",
      body:
        "Nie pośredniczymy i nie zlecamy na zewnątrz, więc nie ma etapu, na którym " +
        "odpowiedzialność się rozmywa. Gdy coś wymaga poprawki, dzwonisz pod jeden " +
        "numer i rozmawiasz z ludźmi, którzy tę reklamę zrobili.",
    },
    {
      title: "Cena bez marży pośrednika",
      body:
        "Płacisz za materiał i pracę, a nie za łańcuch podwykonawców, z których każdy " +
        "dokłada swoją marżę. Przy większych realizacjach i przy kilku punktach " +
        "naraz różnica jest odczuwalna.",
    },
    {
      title: "Termin, który kontrolujemy",
      body:
        "Maszyny stoją w naszym warsztacie, więc harmonogram zależy od nas, a nie od " +
        "kolejki u zewnętrznej firmy. Termin montażu podajemy na etapie wyceny " +
        "i tego terminu pilnujemy.",
    },
  ] as AboutPillar[],
};

/* ── Park maszynowy ──────────────────────────────────────────────────────── */

export interface Machine {
  icon: string;
  name: string;
  body: string;
}

export const machinery = {
  eyebrow: "Park maszynowy",
  title: "Sprzęt, na którym\npracujemy",
  accent: "pracujemy",
  lead:
    "Pięć maszyn pokrywających pełen zakres obróbki — od cięcia płyty kompozytowej " +
    "po formowanie przestrzennych liter. Dzięki temu dobieramy technikę do projektu, " +
    "a nie projekt do tego, co akurat da się zlecić.",
  items: [
    {
      icon: "lucide:settings",
      name: "Ploter frezujący CNC",
      body:
        "Precyzyjne cięcie i frezowanie dibondu, plexi, PCV i płyt kompozytowych. " +
        "Podstawa kasetonów, liter blokowych i tablic.",
    },
    {
      icon: "lucide:printer",
      name: "Ploter drukujący",
      body:
        "Wydruk wielkoformatowy UV i solwentowy — grafiki na witryny, pojazdy, " +
        "banery i płyty, w kolorystyce zgodnej z Twoją identyfikacją.",
    },
    {
      icon: "lucide:scissors",
      name: "Ploter tnący",
      body:
        "Wycinanie liter, logotypów i znaków z folii samoprzylepnych — również " +
        "w drobnych, wymagających detalach.",
    },
    {
      icon: "lucide:flame",
      name: "Ploter termiczny",
      body:
        "Obróbka termiczna elementów z tworzyw. Czysta krawędź tam, gdzie cięcie " +
        "mechaniczne zostawiłoby ślad.",
    },
    {
      icon: "lucide:thermometer",
      name: "Termoformierka",
      body:
        "Formowanie wypukłych liter i kasetonów z plexi — efekt niemożliwy do " +
        "uzyskania płaskim frezowaniem.",
    },
  ] as Machine[],
};

/* ── Piaskowanie 3D — wyróżnik ─────────────────────────────────────────────
   NIEUŻYWANE: sekcja została zdjęta ze strony „O nas" na życzenie.
   Treść zostaje tutaj, żeby dało się ją przywrócić bez pisania od nowa —
   wystarczy odtworzyć blok `<section class="section sandblasting">`
   w `src/pages/o-nas.astro` i jego style. Usuń ten eksport, jeżeli decyzja
   o zdjęciu sekcji jest ostateczna.                                          */

export const sandblasting = {
  eyebrow: "Nasza specjalność",
  title: "Artystyczne\npiaskowanie 3D",
  accent: "piaskowanie 3D",
  paragraphs: [
    "Jako jedna z nielicznych firm reklamowych wdrożyliśmy technologię " +
      "artystycznego piaskowania 3D. W odróżnieniu od zwykłego matowania " +
      "powierzchni daje ona głębię i światłocień — wzór ma realną grubość, " +
      "a nie tylko zmienioną fakturę.",
    "Wykorzystujemy ją do produkcji oryginalnych akcesoriów reklamowych " +
      "i elementów dekoracyjnych. To rozwiązanie dla firm, które szukają upominku " +
      "biznesowego, statuetki albo detalu we wnętrzu, jakiego nie znajdą " +
      "w katalogu z gotowymi gadżetami.",
  ],
  materials: ["Szkło", "Lustro", "Ceramika", "Marmur", "Granit"],
  cta: { text: "Zobacz piaskowanie artystyczne", href: "/uslugi/piaskowanie-artystyczne/" },
};

/* ── Liczby ──────────────────────────────────────────────────────────────── */

export interface AboutStat {
  value: string;
  label: string;
}

export const aboutStats: AboutStat[] = [
  { value: "30+", label: "Lat na rynku" },
  { value: "100%", label: "Produkcji w naszym warsztacie" },
  { value: "5", label: "Maszyn w parku maszynowym" },
];
