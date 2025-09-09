import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://budget.forpublic.id';

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/id/*',
          '/en/*',
          '/api/og', // Open Graph images
        ],
        // Disallow internal API routes and development files
        disallow: [
          '/api/internal/*',
          '/_next/*',
          '/temp/*',
          '/*.json$', // Raw JSON data files
          '/data/budget/*', // Raw data directory
        ],
        // Crawl delay for respectful crawling (1 second)
        crawlDelay: 1,
      },
      // Special rules for search engines
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 0, // Google can crawl faster
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        crawlDelay: 1,
      },
      // Block aggressive crawlers
      {
        userAgent: [
          'CCBot', // ChatGPT crawler
          'ChatGPT-User', // ChatGPT user agent
          'GPTBot', // OpenAI GPT bot
          'Google-Extended', // Google AI training
          'anthropic-ai', // Anthropic AI crawler
          'Claude-Web', // Claude web crawler
        ],
        disallow: '/', // Block AI training crawlers
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}