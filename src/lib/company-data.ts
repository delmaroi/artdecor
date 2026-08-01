/**
 * Twarde fakty o firmie — pojedyncze źródło prawdy dla całego serwisu.
 *
 * Powstało, bo rok założenia rozjechał się na trzy miejsca: strona „O nas"
 * podawała w tytule 1993, a w statystykach hero na tej samej stronie 1996;
 * stopka i strona główna też mówiły 1996. Każda wartość, która pojawia się
 * w więcej niż jednym komponencie, ma mieszkać tutaj — nie w znacznikach.
 */

/** Rok założenia firmy. Zmiana tutaj propaguje się na hero, stopkę i „O nas". */
export const foundedYear = 1993;
