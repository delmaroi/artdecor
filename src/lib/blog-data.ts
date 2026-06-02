export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  publishedAt: string; // ISO date
  modifiedAt?: string;
  author: string;
  readingTimeMin: number;
  tags: string[];
  cover?: string;
}

export const blogPosts: BlogPostMeta[] = [
  {
    slug: "dibond-czy-plexi-roznice-w-reklamie",
    title: "Dibond czy plexi — różnice, zastosowania i co wybrać do reklamy zewnętrznej",
    description:
      "Praktyczne porównanie dibondu (płyty kompozytowej Al-PE-Al) i plexi (PMMA) w reklamie wizualnej — właściwości, koszty, trwałość i typowe zastosowania w kasetonach, pylonach i literach 3D.",
    publishedAt: "2026-05-12",
    modifiedAt: "2026-05-12",
    author: "Art Decor Pszczyna",
    readingTimeMin: 6,
    tags: ["materiały", "dibond", "plexi", "poradnik"],
    cover: "/images/og-default.png",
  },
];
