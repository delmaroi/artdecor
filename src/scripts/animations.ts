// Własny lekki system animacji kaskadowych oparty o szybkie i bezbłędne IntersectionObserver.
// Gwarantuje, że strona nigdy się nie zawiesi wizualnie.

export function initAnimations() {
  if (typeof window === "undefined") return;

  const runAnimations = () => {
    // 1. Setup Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    });

    // 2. Observe simple reveal elements
    document.querySelectorAll("[data-reveal]").forEach(el => {
      el.classList.add("reveal-item");
      observer.observe(el);
    });

    // 3. Stagger Grids (Bento, Portfolio, itp.)
    document.querySelectorAll("[data-stagger-grid]").forEach(grid => {
      const items = grid.querySelectorAll(".bento-item, .portfolio-item, .client-card, .contact-card, .highlight-item, .machinery-list li");
      items.forEach((item, index) => {
        item.classList.add("reveal-item");
        (item as HTMLElement).style.transitionDelay = `${(index % 10) * 100}ms`;
        observer.observe(item);
      });
    });

    // 4. Hero Animation
    setTimeout(() => {
      document.querySelectorAll(".hero-title, .hero-subtitle, .hero-actions").forEach((el, i) => {
        el.classList.add("reveal-item");
        setTimeout(() => el.classList.add("is-visible"), i * 200 + 100);
      });
    }, 100);

    // 5. Header Scroll
    const header = document.querySelector("#site-header, .header");
    if (header) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 80) header.classList.add("header--scrolled");
        else header.classList.remove("header--scrolled");
      }, { passive: true });
    }

    // 6. Section Headers
    document.querySelectorAll(".section-header").forEach(header => {
      const children = header.querySelectorAll(".section-badge, .section-title, .section-lead");
      children.forEach((child, index) => {
        child.classList.add("reveal-item");
        (child as HTMLElement).style.transitionDelay = `${index * 150}ms`;
        observer.observe(child);
      });
    });
  };

  // Run when ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", runAnimations);
  } else {
    runAnimations();
  }
}

