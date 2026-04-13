export interface Service {
  title: string;
  slug: string;
  icon: string;
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
}
