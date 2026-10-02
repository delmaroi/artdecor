import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

/**
 * Podgląd zdjęć (PhotoSwipe 5) dla każdej galerii oznaczonej `data-pswp-gallery`.
 * Linki muszą mieć `data-pswp-width` / `data-pswp-height`. Właściwy moduł
 * PhotoSwipe ładuje się dopiero przy pierwszym otwarciu podglądu.
 */
export function initLightbox() {
  if (!document.querySelector("[data-pswp-gallery]")) return;

  const lightbox = new PhotoSwipeLightbox({
    gallery: "[data-pswp-gallery]",
    children: "a[data-pswp-width]",
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

  // Podpis pod zdjęciem z tekstu alternatywnego miniatury
  lightbox.on("uiRegister", () => {
    lightbox.pswp?.ui?.registerElement({
      name: "caption",
      order: 9,
      isButton: false,
      appendTo: "root",
      onInit: (el, pswp) => {
        pswp.on("change", () => {
          const thumb = pswp.currSlide?.data.element?.querySelector("img");
          el.textContent = thumb?.getAttribute("alt") ?? "";
        });
      },
    });
  });

  lightbox.init();
}
