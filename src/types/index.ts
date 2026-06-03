export interface Service {
  title: string;
  slug: string;
  icon: string;
  /** Krótki, unikalny opis usługi (1 zdanie) — używany w kafelkach bento na home. */
  desc?: string;
}

export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
}

export interface ServiceTemplateProps {
  title: string;
  description: string;
  heroTitle: string;
  heroSubtitle?: string;
  content?: boolean;
  specifications?: boolean;
  process?: boolean;
  images?: (string | { src: string })[];
  ctaText?: string;
  ctaHref?: string;
  /** Slug usługi — używany do canonical i BreadcrumbList. Np. "pylony-totemy". */
  slug?: string;
  /** Krótka, samodzielna definicja usługi (2–3 zdania) — answer-block dla AI. */
  answerBlock?: string;
  /** Alternatywne nazwy usługi dla schema.org (synonimy używane przez klientów). */
  serviceAlternateNames?: string[];
  /** Cena minimalna w PLN netto (opcjonalnie — wzbogaca Service schema o Offer). */
  priceFrom?: number;
  /** Typ usługi po angielsku dla schema.org `serviceType`. */
  serviceType?: string;
  /** Lista konkretnych FAQ dla tej usługi (każda strona usługi ma własne FAQPage). */
  faqs?: { q: string; a: string }[];
}
