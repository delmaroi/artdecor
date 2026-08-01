/**
 * Sekcja „Co u nas słychać" — kuratorska treść z profilu na Facebooku.
 *
 * ═══ JAK DODAĆ NOWY FILM LUB POST ════════════════════════════════════════
 *
 * 1. Wejdź na post na Facebooku i skopiuj jego pełny publiczny adres
 *    (menu „…" → „Kopiuj link"). Film MUSI być publiczny — przy dacie
 *    publikacji ma być ikona globusa. Prywatny się nie osadzi.
 * 2. Wklej adres w pole `href` poniżej.
 * 3. Wrzuć miniaturę do `src/assets/facebook/` i podaj ją jako
 *    `/images/facebook/<nazwa>.jpg` — ścieżkę rozwiązuje `asset()`
 *    z `src/lib/images.ts`, więc obraz przechodzi przez optymalizację
 *    (WebP/AVIF + srcset) tak samo jak portfolio.
 *
 * ⚠ Miniatury poniżej są ZASTĘPCZE — pochodzą z portfolio i są kadrami
 *   poziomymi, więc w pionowej ramce Reela zostaną przycięte. Podmień je na
 *   kadry pionowe z rzeczywistych filmów, inaczej sekcja obiecuje inną treść,
 *   niż pokazuje po kliknięciu.
 *
 * ⚠ Puste `href` = kafelek nie ładuje odtwarzacza, tylko prowadzi na profil.
 *   Sekcja działa i wygląda poprawnie, po prostu bez odtwarzania w miejscu.
 *
 * ═══ DLACZEGO TAK, A NIE WTYCZKA FACEBOOKA ═══════════════════════════════
 *
 * Film ładuje się dopiero po kliknięciu (wzorzec „facade"). Do tego czasu
 * na stronie nie ma ani jednego zasobu Meta, więc nie lecą ich ciasteczka
 * ani SDK. To nie jest optymalizacja na zapas: `CookieConsent.astro` niczego
 * nie bramkuje, więc wtyczka Facebooka ustawiałaby ciasteczka jeszcze przed
 * kliknięciem „akceptuję".
 */

/** Profil, do którego prowadzą wszystkie odnośniki sekcji. */
export const facebookPage = "https://www.facebook.com/artdecorreklama/";

export interface FacebookVideo {
  /** Publiczny URL filmu lub Reela. Puste = kafelek prowadzi na profil. */
  href: string;
  title: string;
  excerpt?: string;
  /** Data publikacji w formacie ISO (RRRR-MM-DD). */
  date: string;
  /** Ścieżka miniatury, np. „/images/facebook/montaz.jpg". */
  poster: string;
  posterAlt: string;
  /**
   * Proporcje kadru. Reels są ZAWSZE pionowe (9:16) — Facebook generuje dla
   * nich osadzenie 267×476. Wrzucenie Reela w kadr poziomy daje czarne pasy
   * na pół szerokości, więc to pole musi zgadzać się z rzeczywistym filmem.
   * Zwykłe filmy z osi czasu są zwykle poziome (16:9).
   */
  orientation?: "vertical" | "horizontal";
}

export interface FacebookPost {
  /** Publiczny URL postu. Puste = odnośnik prowadzi na profil. */
  href: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  imageAlt: string;
}

export const facebookSection = {
  eyebrow: "Facebook",
  title: "Co u nas\nsłychać",
  accent: "słychać",
  lead:
    "Filmy z montaży i zdjęcia świeżo oddanych realizacji publikujemy na bieżąco " +
    "na naszym profilu.",
  cta: { text: "Obserwuj nas na Facebooku", href: facebookPage },
};

/**
 * Filmy. Pierwszy z listy jest bohaterem sekcji i dostaje duży kadr;
 * kolejne trafiają do kolumny obok jako mniejsze kafelki.
 */
export const videos: FacebookVideo[] = [
  {
    href: "https://www.facebook.com/reel/1740346367289537",
    title: "Realizacja na warsztacie",
    excerpt:
      "Kulisy produkcji — jak z płyty i folii powstaje gotowy nośnik reklamowy.",
    date: "2026-06-18",
    poster: "/images/portfolio/pylony-totemy/pylon-1.jpg",
    posterAlt: "Kadr z filmu na profilu Art Decor — realizacja na warsztacie",
    orientation: "vertical",
  },
  {
    href: "https://www.facebook.com/reel/1923237555299773/",
    title: "Montaż u klienta",
    excerpt: "Od transportu po ostatnią śrubę na elewacji.",
    date: "2026-05-30",
    poster: "/images/portfolio/kasetony-z-dibondu/kaseton-2.jpg",
    posterAlt: "Kadr z filmu na profilu Art Decor — montaż u klienta",
    orientation: "vertical",
  },
];

export const posts: FacebookPost[] = [
  {
    href: "",
    title: "Litery przestrzenne na elewacji",
    excerpt:
      "Nowa identyfikacja na budynku klienta. Projekt, produkcja i montaż " +
      "w całości u nas.",
    date: "2026-05-12",
    image: "/images/portfolio/litery-przestrzenne/przestrzenne-1.jpg",
    imageAlt: "Litery przestrzenne zamontowane na elewacji — realizacja Art Decor",
  },
];
