# Art Decor Pszczyna – strona w Astro

Nowoczesna wersja strony [Art Decor](https://www.artdecor.net.pl/) – agencja reklamy wizualnej (Pszczyna). Zbudowana w **Astro**.

## Zawartość

- **Strona główna:** Hero, Czym się zajmujemy (usługi), Nasze prace (portfolio), Nasi klienci, Kontakt
- **O nas:** Opis firmy, techniki produkcji, park maszynowy
- **Kontakt:** Adres, telefon, e-mail, godziny pracy, Facebook

## Wymagania

- **Node.js** ≥ 18.14.1 (zalecane 20 LTS lub 22)

## Uruchomienie

```bash
cd artdecor
npm install
npm run dev
```

Strona: [http://localhost:4321](http://localhost:4321)

## Build

```bash
npm run build
npm run preview
```

## Dalsze kroki

1. **Obrazy:** Dodaj zdjęcia z obecnej strony (hero, usługi, portfolio, loga klientów) do `public/images/` i podłącz w komponentach.
2. **Portfolio:** Możesz dodać Content Collections lub pliki w `content/portfolio/` i wyświetlać galerię z filtrami.
3. **Polityka cookies:** Stwórz stronę `src/pages/polityka-cookies.astro` i linkuj w stopce.
4. **SEO:** Sprawdź `title` i `description` na podstronach; opcjonalnie dodaj `sitemap.xml` i `robots.txt` (Astro może je generować przez @astrojs/sitemap).

## Technologie

- [Astro 4](https://astro.build/)
- HTML, CSS (bez frameworka CSS – możesz dodać Tailwind)
- Fonty: DM Sans, Space Grotesk (Google Fonts)
