/**
 * Treść sekcji narracyjnych strony głównej — Spotlight, Problem → rozwiązanie,
 * Proces, Dla kogo, pas CTA w stopce.
 *
 * DRAFT do redakcji: teksty powstały na bazie tego, co już jest w serwisie
 * (o-nas, opisy usług, FAQ). Poprawiaj je tutaj — komponenty czytają wyłącznie
 * z tego pliku, więc zmiana copy nie wymaga dotykania znaczników ani stylów.
 *
 * Uwaga: `title` w nagłówkach łamiemy znakiem `\n`, a `accent` musi być
 * dokładnym podciągiem `title` — inaczej wyróżnienie kolorem się nie pojawi.
 */

export interface NarrativeColumn {
  label: string;
  title: string;
  body: string;
}

export interface ProcessStep {
  title: string;
  body: string;
}

export interface FitCriterion {
  title: string;
  body: string;
}

/* ── Spotlight: jedna flagowa usługa ─────────────────────────────────────── */

export const spotlight = {
  eyebrow: "Co dostajesz",
  title: "Reklama, którą\nwidać po zmroku",
  accent: "widać po zmroku",
  lead:
    "Pylony, totemy i kasetony z dibondu z podświetleniem LED — frezowane na własnym " +
    "ploterze CNC, montowane przez nasz zespół na fundamencie. Jeden wykonawca od " +
    "projektu graficznego po ostatnią śrubę.",
  cta: { text: "Zobacz realizacje", href: "/realizacje/" },
  points: [
    "Projekt i wizualizacja na Twoim budynku przed produkcją",
    "Frezowanie CNC i termoformowanie u nas, bez podwykonawców",
    "Montaż na fundamencie B20 wraz z podłączeniem zasilania",
  ],
};

/* ── Problem → gdzie się psuje → jak robimy to my ────────────────────────── */

export const problemSolution = {
  eyebrow: "Dlaczego my",
  title: "Tania reklama kosztuje\ndwa razy.",
  accent: "dwa razy",
  lead:
    "Szyld to element elewacji, który pracuje 24 godziny na dobę przez kilkanaście lat. " +
    "Najdroższe są te, które trzeba poprawiać.",
  columns: [
    {
      label: "01",
      title: "Jak to zwykle wygląda",
      body:
        "Projekt robi jedna firma, produkcję druga, montaż ekipa z ogłoszenia. " +
        "Każdy odpowiada za swój wycinek, nikt za całość.",
    },
    {
      label: "02",
      title: "Gdzie się psuje",
      body:
        "Kolor z wydruku nie zgadza się z logotypem, kaseton nie trzyma pionu, " +
        "po dwóch zimach folia odchodzi, a moduły LED gasną połowami. " +
        "Reklamacja krąży między wykonawcami.",
    },
    {
      label: "03",
      title: "Jak robimy to my",
      body:
        "Projekt, frezowanie, druk, montaż i serwis realizuje nasz zespół na własnym " +
        "sprzęcie. Jedna umowa, jeden numer telefonu, jedna odpowiedzialność za efekt.",
    },
  ] as NarrativeColumn[],
};

/* ── Proces: jak pracujemy ───────────────────────────────────────────────── */

export const process = {
  eyebrow: "Jak pracujemy",
  title: "Od pomysłu\ndo montażu",
  accent: "do montażu",
  lead:
    "Cztery etapy, w których wiesz, co się dzieje i ile to kosztuje — bez niespodzianek " +
    "na fakturze końcowej.",
  steps: [
    {
      title: "Projekt i wycena",
      body:
        "Przyjeżdżamy na pomiar, robimy wizualizację na zdjęciu Twojego budynku i podajemy " +
        "cenę końcową. Wycena jest bezpłatna i niezobowiązująca.",
    },
    {
      title: "Produkcja u nas",
      body:
        "Ploter frezujący CNC, termoformierka, ploter drukujący i tnący stoją w naszym " +
        "warsztacie. Sami pilnujemy jakości i terminu.",
    },
    {
      title: "Montaż",
      body:
        "Nasz zespół montuje na miejscu — elewacja, fundament, witryna albo flota. " +
        "Zostawiamy sprzątnięty teren i działającą reklamę.",
    },
    {
      title: "Serwis i gwarancja",
      body:
        "Wymiana modułu LED, poprawka folii, doklejenie logotypu na nowy samochód — " +
        "odbieramy telefon także po zakończeniu zlecenia.",
    },
  ] as ProcessStep[],
};

/* ── Dla kogo pracujemy ──────────────────────────────────────────────────── */

export const bestFit = {
  eyebrow: "Dla kogo",
  title: "Pracujemy najlepiej z firmami,\nktóre mają co pokazać",
  accent: "mają co pokazać",
  criteria: [
    {
      title: "Lokal z witryną",
      body:
        "Gabinet, salon, restauracja, sklep. Szyld, oklejenie witryny i oznakowanie " +
        "wnętrza jako jeden spójny zestaw.",
    },
    {
      title: "Sieć lub franczyza",
      body:
        "Kilka punktów do oznakowania w tym samym standardzie — powtarzalny kolor, " +
        "materiał i sposób montażu w każdej lokalizacji.",
    },
    {
      title: "Inwestycja i flota",
      body:
        "Nowy budynek, park handlowy albo tabor firmowy. Pylon, totem, tablice " +
        "kierunkowe i oklejanie pojazdów z jednego źródła.",
    },
  ] as FitCriterion[],
};

/* ── Pas CTA w stopce ────────────────────────────────────────────────────── */

export const footerCta = {
  title: "Powiedz, co ma\nbyć widoczne.",
  accent: "widoczne",
  lead:
    "Wyślij zdjęcie budynku albo logotyp — odpiszemy z wizualizacją i ceną. Wycena bezpłatna.",
  primary: { text: "Bezpłatna wycena", href: "/kontakt/" },
};
