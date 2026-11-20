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
 * Miniatura to pionowy kadr (9:16) z tego samego filmu — sekcja ma
 *   pokazywać dokładnie to, co odtworzy się po kliknięciu.
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
    href: "https://www.facebook.com/reel/1668177411759148",
    title: "Optyk Karolina — Galeria WAWA w Bieruniu",
    excerpt:
      "Litery świetlne LED na blendzie z dibondu giętego krawędziowo i kasetony " +
      "świetlne na pylonie, montowane na zakładkę pod kątem 45°.",
    date: "2026-10-28",
    poster: "/images/facebook/optyk-karolina.jpg",
    posterAlt: "Czerwony kaseton z literami 3D Optyk Karolina nad wejściem do salonu",
    orientation: "vertical",
  },
  {
    href: "https://www.facebook.com/reel/26232324883132041",
    title: "Mivardi — litery świetlne w Czechach",
    excerpt: "Litery świetlne z logo na hali — projekt, produkcja i montaż u nas.",
    date: "2026-08-26",
    poster: "/images/facebook/mivardi.jpg",
    posterAlt: "Podświetlone litery i logo Mivardi na elewacji hali nocą",
    orientation: "vertical",
  },
  {
    href: "https://www.facebook.com/reel/1429849859001092",
    title: "Oklejenie auta dla WelderStal",
    excerpt: "Kolejny samochód firmowy w pełnym oklejeniu reklamowym.",
    date: "2026-08-24",
    poster: "/images/facebook/welderstal.jpg",
    posterAlt: "Oklejony bus firmy WelderStal z danymi kontaktowymi na boku",
    orientation: "vertical",
  },
  {
    href: "https://www.facebook.com/reel/2602022366924693",
    title: "Kasetony z frezowanego dibondu",
    excerpt: "Kasetony świetlne LED wykonane we współpracy z GAFDESIGN.",
    date: "2026-08-12",
    poster: "/images/facebook/gafdesign-kasetony.jpg",
    posterAlt: "Dwa pionowe kasetony z dibondu: Monica Fashion Store i Orchid Massage",
    orientation: "vertical",
  },
];

/**
 * Posty ze zdjęciami. Puste — sekcję wypełniają filmy. Dodając post, wklej
 * prawdziwy adres i zdjęcie z tej realizacji (nie kadr zastępczy).
 */
export const posts: FacebookPost[] = [];
