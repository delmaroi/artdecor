# Content Citability Fix: podstrony usług Art Decor

**Źródło**: `src/pages/uslugi/*.astro` (sekcja `slot="content"`, 12 stron)
**Data**: 2026-10-02
**Metoda**: skill `geo-fix-content` (`.claude/skills/geo-fix-content`)
**Akapity przepisane**: wszystkie sekcje treści na 12 stronach

## Wynik

| Metryka (suma 12 stron) | Przed | Po |
|---|---|---|
| Słowa w treści | 1 667 | 3 611 |
| Sekcje o długości 50–150 słów | 3 / 55 | 39 / 51 |
| Średnia długość sekcji (słowa) | 28 | 67 |
| Strony otwierające się definicją („X to …”) | 0 / 12 | 12 / 12 |
| Tabele porównawcze / cenowe | 0 | 12 |
| Wzmianki marki „Art Decor” w treści | 0 | 68 |
| Puste przymiotniki („doskonale”, „wysokiej jakości”, „profesjonalne”…) | 34 | 2 |
| Asekuracje („może”, „zwykle”, „około”…) | 1 | 0* |

\* Pozostawiono „ok.” tylko przy przeliczeniach z oryginalnych danych (np. „50 000 h ≈ ok. 11 lat”).

## Co zmieniono

1. **Definicja na początku każdej strony** — pierwszy akapit odpowiada na pytanie „czym jest X?” i zawiera cenę „od”, tak aby AI mogła zacytować go w całości.
2. **Samodzielne akapity** — każdy akapit nazywa podmiot („Art Decor…”, „Kaseton z dibondu…”) zamiast „Oferujemy…”, „Nasze…”.
3. **Dane z FAQ i bloku odpowiedzi przeniesione do treści** — ceny, czasy realizacji i parametry, wcześniej rozproszone, są teraz w treści i w tabelach.
4. **Tabele** — ceny (litery LED, oklejanie aut, roll-upy), porównania (SMD 5050 vs 3528, Oracal 641 vs 751, P4/P6/P10, piaskowanie vs laser, warianty podświetlenia, materiały).
5. **Definicje terminów** — SMD, IP65, plexi opal, CNC, pixel pitch, One-Way Vision, folia wylewana/kalandrowana, blockout, mesh.
6. **Usunięty marketingowy „szum”** bez danych (np. „docierając do tysięcy potencjalnych klientów”, „doskonała odporność”).

Żadne dane nie zostały wymyślone — wszystkie liczby pochodzą z istniejącej treści, bloków `answerBlock`, FAQ lub specyfikacji tej samej strony.

## ⚠️ Sprzeczne dane do potwierdzenia przez właściciela

Na kilku stronach ta sama wartość występowała w różnych wersjach. W nowej treści użyto wartości z `answerBlock`/FAQ (zgodnych z `public/llms.txt`). Proszę potwierdzić i ujednolicić **specyfikację** (sekcja „Specyfikacja techniczna”), która nadal zawiera starsze wartości:

| Strona | Wartość w treści (po) | Sprzeczna wartość (specyfikacja / stara treść) |
|---|---|---|
| wycinanie-znakow | Oracal 641: 3–4 lata, Oracal 751: 5–7 lat (FAQ) | blok odpowiedzi: 641 — 3 lata, 751 — 5 lat; specyfikacja: Oracal 551 — 5 lat, 751 — 8 lat |
| wycinanie-znakow | min. wysokość napisu 5 mm / 3 mm | specyfikacja: min. wielkość 1 cm |
| oklejanie-witryn | Oracal 641/751 | specyfikacja: „Reklamowa (Oracal 551)” |
| litery-blokowe | wysokość 15–120 cm (blok odpowiedzi; w treści nie podano zakresu) | specyfikacja: 10–150 cm |
| litery-przestrzenne | PCV 3–19 mm (blok odpowiedzi; w treści nie podano) | specyfikacja: PCV 3–30 mm; stara treść: grubości 3–50 mm |
| szyldy-szklane | szkło 8/10/12 mm, dystanse 15–30 mm (FAQ) | blok odpowiedzi: dystanse 15–25 mm; specyfikacja: szkło hartowane 6–10 mm |
| piaskowanie-artystyczne | maks. 200 × 140 × 60 cm (FAQ) | specyfikacja: maks. 200 × 100 cm |
| punkty-gastronomiczne | szyld + witryna 7–10 dni, pełna identyfikacja 2–4 tyg. (FAQ) | blok odpowiedzi: „spójna identyfikacja w 7–14 dni” |
| oklejanie-samochodow | gwarancja „do 24 miesięcy” | FAQ: 24 mies.; specyfikacja: 12–24 mies. |

## Walidacja (faza 5 skilla)

| # | Kryterium | Wynik |
|---|---|---|
| 1 | Bezpośrednia odpowiedź w pierwszych 150 słowach | ✅ 12/12 |
| 2 | ≥ 1 dana liczbowa na 300 słów | ✅ |
| 3 | ≥ 1 nazwane źródło na 500 słów | ✅ producenci (Oracal, 3M, Avery Dennison) i normy (IP65, RoHS, CE, RAL) |
| 4 | Definicje terminów przy pierwszym użyciu | ✅ |
| 5 | Brak akapitów zaczynających się od „To/Ono/Oni” | ✅ |
| 6 | Brak asekuracji w definicjach i akapitach otwierających | ✅ |
| 7 | Tabela, lista kroków lub Q&A na każdej stronie | ✅ (FAQ istniało już wcześniej) |
| 8 | Sygnały świeżości (daty, „stan na rok …”) | ❌ brak dat — patrz niżej |
| 9 | ≥ 3 cytowalne fragmenty < 60 słów | ✅ |
| 10 | Brak wymyślonych danych | ✅ |

**Wynik: 9/10.**

## Do zrobienia (wymaga danych od właściciela)

- **Świeżość cen** — dopisać przy cenach „stan na 2026 r.” po potwierdzeniu, że ceny są aktualne, i dodać `dateModified` do schematu usług.
- **Dowody z realizacji** — liczba wykonanych realizacji danego typu, przykładowi klienci (za zgodą), rok rozpoczęcia działalności przy danej usłudze.
- **Ujednolicenie specyfikacji** wg tabeli sprzeczności powyżej.
