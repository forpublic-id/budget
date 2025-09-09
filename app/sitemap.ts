import { MetadataRoute } from 'next';
import { getAvailableYears, getAvailableRegions } from '@/lib/data';

// Get data last modified date for budget data
function getDataLastModified(year: number): Date {
  // Return actual data update dates based on when we updated budget data
  if (year === 2025) return new Date('2025-01-20T12:00:00Z'); // Latest APBN 2025 data
  if (year === 2024) return new Date('2024-12-15T12:00:00Z'); // APBN 2024 data
  if (year === 2023) return new Date('2024-01-01T12:00:00Z'); // Historical data
  return new Date();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://budget.forpublic.id';
  const locales = ['id', 'en'] as const;
  const currentYear = new Date().getFullYear();
  
  // Get available data
  const years = await getAvailableYears(); // [2020, 2021, 2022, 2023, 2024, 2025]
  const regions = await getAvailableRegions();

  // Base static pages
  const staticPages = [
    // Homepage (highest priority)
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    // Localized homepages
    ...locales.map((locale) => ({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    })),
    // About pages
    ...locales.map((locale) => ({
      url: `${baseUrl}/${locale}/about`,
      lastModified: new Date('2025-01-15T12:00:00Z'), // When about content was last updated
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    // National budget pages
    ...locales.map((locale) => ({
      url: `${baseUrl}/${locale}/national`,
      lastModified: getDataLastModified(currentYear),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
    // Regional budget pages
    ...locales.map((locale) => ({
      url: `${baseUrl}/${locale}/regional`,
      lastModified: getDataLastModified(currentYear),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    // Comparison pages
    ...locales.map((locale) => ({
      url: `${baseUrl}/${locale}/compare`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    // Trends analysis pages
    ...locales.map((locale) => ({
      url: `${baseUrl}/${locale}/trends`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    // Search pages
    ...locales.map((locale) => ({
      url: `${baseUrl}/${locale}/search`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];

  // National budget yearly pages (dynamic routes would go here if implemented)
  const nationalBudgetPages = years.flatMap((year) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/national/${year}`,
      lastModified: getDataLastModified(year),
      changeFrequency: year === currentYear ? ('weekly' as const) : ('monthly' as const),
      priority: year === currentYear ? 0.9 : year === currentYear - 1 ? 0.7 : 0.5,
    }))
  );

  // Regional budget pages for each region
  const regionalBudgetPages = regions.flatMap((region) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/regional/${region.type}/${region.id}`,
      lastModified: getDataLastModified(currentYear),
      changeFrequency: 'monthly' as const,
      priority: region.id === 'dki-jakarta' ? 0.8 : 0.6, // Jakarta gets higher priority
    }))
  );

  // Budget comparison pages for major regions
  const comparisonPages = [
    'provinces',
    'java-provinces', // Java island comparison
    'major-cities',
    'jakarta-vs-surabaya',
  ].flatMap((comparisonType) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/compare/${comparisonType}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: comparisonType === 'provinces' ? 0.7 : 0.6,
    }))
  );

  // Budget category analysis pages
  const categoryPages = [
    'pendidikan', // Education
    'kesehatan', // Health
    'infrastruktur', // Infrastructure
    'pertahanan', // Defense
    'ekonomi', // Economy
    'perlindungan-sosial', // Social protection
  ].flatMap((category) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/analysis/categories/${category}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: ['pendidikan', 'kesehatan', 'infrastruktur'].includes(category) ? 0.7 : 0.6,
    }))
  );

  // Combine all pages and sort by priority
  const allPages = [
    ...staticPages,
    ...nationalBudgetPages,
    ...regionalBudgetPages,
    ...comparisonPages,
    ...categoryPages,
  ].sort((a, b) => b.priority - a.priority);

  return allPages;
}