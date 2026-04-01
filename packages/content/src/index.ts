export interface ContentSection {
  slug: string;
  title: string;
  summary: string;
}

export const publicSiteSections: ContentSection[] = [
  {
    slug: "marketplace",
    title: "Marketplace",
    summary: "Публичный каталог и контентный слой для фермеров и поставщиков.",
  },
  {
    slug: "recommendations",
    title: "Recommendations",
    summary: "Модуль рекомендаций и подсказок для сценариев принятия решений.",
  },
  {
    slug: "operations",
    title: "Operations",
    summary: "Админка, фоновые задачи и интеграции как отдельные runtime-слои.",
  },
];
