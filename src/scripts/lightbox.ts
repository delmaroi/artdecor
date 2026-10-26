import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import "../styles/lightbox.css";

/**
 * Podgląd zdjęć (PhotoSwipe 5) dla każdej galerii oznaczonej `data-pswp-gallery`.
 * Linki muszą mieć `data-pswp-width` / `data-pswp-height`; linki z `data-pswp-hidden`
 * (np. ukryte filtrem portfolio) są pomijane przy przewijaniu. Właściwy moduł
 * PhotoSwipe ładuje się dopiero przy pierwszym otwarciu podglądu.
 */
let initialized = false;

export function initLightbox() {
  if (initialized || !document.querySelector("[data-pswp-gallery]")) return;
  initialized = true;

  const lightbox = new PhotoSwipeLightbox({
    gallery: "[data-pswp-gallery]",
    children: "a[data-pswp-width]:not([data-pswp-hidden])",
    pswpModule: () => import("photoswipe"),
    bgOpacity: 0.94,
    showHideAnimationType: "zoom",
    wheelToZoom: true,
    closeTitle: "Zamknij (Esc)",
    zoomTitle: "Powiększ",
    arrowPrevTitle: "Poprzednie zdjęcie",
    arrowNextTitle: "Następne zdjęcie",
    errorMsg: "Nie udało się wczytać zdjęcia.",
    indexIndicatorSep: " / ",
  });

  // Podpis pod zdjęciem: `data-caption` linku, a gdy go brak — tekst alternatywny miniatury
  lightbox.on("uiRegister", () => {
    lightbox.pswp?.ui?.registerElement({
      name: "caption",
      order: 9,
      isButton: false,
      appendTo: "root",
      onInit: (el, pswp) => {
        pswp.on("change", () => {
          const link = pswp.currSlide?.data.element;
          el.textContent = link?.dataset.caption ?? link?.querySelector("img")?.getAttribute("alt") ?? "";
        });
      },
    });
  });

  lightbox.init();
}
