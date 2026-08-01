import type { ImageMetadata } from "astro";

/**
 * Mapa zoptymalizowanych obrazów z `src/assets`. Klucze globów są relatywne
 * względem TEGO pliku, więc dowolny komponent może użyć `asset()` bez własnego
 * `import.meta.glob`. Obrazy z `src/assets` przechodzą przez `astro:assets`
 * (WebP/AVIF + srcset), w przeciwieństwie do statycznych plików z `public/`.
 */
const assets = {
  ...import.meta.glob<{ default: ImageMetadata }>("../assets/portfolio/**/*.{jpg,jpeg,png}", { eager: true }),
  ...import.meta.glob<{ default: ImageMetadata }>("../assets/klienci/*.{png,jpg,jpeg}", { eager: true }),
  ...import.meta.glob<{ default: ImageMetadata }>("../assets/facebook/*.{jpg,jpeg,png}", { eager: true }),
};

/**
 * Resolwuje publiczną ścieżkę (np. "/images/portfolio/oklejanie-witryn/witryna-1.jpg")
 * na zaimportowany obraz z `src/assets`. Rzuca przy braku pliku, by złapać literówki
 * już na etapie buildu zamiast pustego `<img>` w produkcji.
 */
export function asset(path: string): ImageMetadata {
  const key = path.replace("/images/", "../assets/");
  const mod = assets[key];
  if (!mod) {
    throw new Error(`[images] Brak obrazu w src/assets dla ścieżki "${path}" (oczekiwany klucz: "${key}")`);
  }
  return mod.default;
}
