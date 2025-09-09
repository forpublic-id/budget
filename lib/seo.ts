import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import type { BudgetData } from '@/lib/types/budget';
import { formatBudgetAmount } from '@/lib/utils';

interface SEOParams {
  locale: string;
  year?: string;
  region?: string;
  type?: 'national' | 'regional';
  budgetData?: BudgetData;
}

export async function generateBudgetMetadata({
  locale,
  year = '2025',
  region = 'Indonesia',
  type = 'national',
  budgetData,
}: SEOParams): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'seo' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });

  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://budget.forpublic.id';

  // Generate dynamic title and description
  const budgetType = type === 'national' ? 'APBN' : 'APBD';
  const budgetAmount = budgetData 
    ? formatBudgetAmount(budgetData.expenditure.total, locale)
    : '';

  const title = budgetData
    ? t('dynamic_title', { 
        type: budgetType, 
        year, 
        region: region === 'national' ? tCommon('indonesia') : region,
        amount: budgetAmount 
      })
    : t('default_title', { year, type: budgetType });

  const description = budgetData
    ? t('dynamic_description', {
        type: budgetType,
        year,
        region: region === 'national' ? tCommon('indonesia') : region,
        revenue: formatBudgetAmount(budgetData.revenue.total, locale),
        expenditure: formatBudgetAmount(budgetData.expenditure.total, locale),
      })
    : t('default_description', { year, type: budgetType });

  // Generate structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: title,
    description: description,
    url: `${baseUrl}/${locale}/${type}`,
    creator: {
      '@type': 'Organization',
      name: 'ForPublic.id',
      url: 'https://forpublic.id',
    },
    publisher: {
      '@type': 'Organization',
      name: 'ForPublic.id',
      url: 'https://forpublic.id',
    },
    datePublished: budgetData?.metadata.lastUpdated || new Date().toISOString(),
    dateModified: budgetData?.metadata.lastUpdated || new Date().toISOString(),
    keywords: [
      budgetType,
      year,
      'Indonesia',
      'anggaran',
      'transparansi',
      'keuangan publik',
      type === 'national' ? 'nasional' : 'daerah',
    ].join(', '),
    spatialCoverage: {
      '@type': 'Place',
      name: region === 'national' ? 'Indonesia' : region,
    },
    temporalCoverage: `${year}-01-01/${year}-12-31`,
    ...(budgetData && {
      distribution: {
        '@type': 'DataDownload',
        contentUrl: `${baseUrl}/api/data/${type}/${year}`,
        encodingFormat: 'application/json',
      },
    }),
  };

  // Generate OG image URL with dynamic parameters
  const ogImageUrl = `${baseUrl}/api/og?year=${year}&type=${budgetType}&region=${encodeURIComponent(region)}${budgetAmount ? `&amount=${encodeURIComponent(budgetAmount)}` : ''}`;

  return {
    title,
    description,
    keywords: [
      budgetType,
      `anggaran ${year}`,
      'transparansi',
      'keuangan publik',
      'Indonesia',
      'visualisasi data',
      'budget transparency',
      region !== 'national' ? region : '',
    ].filter(Boolean),
    authors: [{ name: 'ForPublic.id', url: 'https://forpublic.id' }],
    creator: 'ForPublic.id',
    publisher: 'ForPublic.id',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'id' ? 'id_ID' : 'en_US',
      url: `${baseUrl}/${locale}/${type}${year !== '2025' ? `?year=${year}` : ''}`,
      title,
      description,
      siteName: 'Budget ForPublic.id',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
      creator: '@forpublic_id',
      site: '@forpublic_id',
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/${type}${year !== '2025' ? `?year=${year}` : ''}`,
      languages: {
        'id': `${baseUrl}/id/${type}${year !== '2025' ? `?year=${year}` : ''}`,
        'en': `${baseUrl}/en/${type}${year !== '2025' ? `?year=${year}` : ''}`,
      },
    },
    other: {
      'structured-data': JSON.stringify(structuredData),
    },
  };
}

export function generateBreadcrumbStructuredData(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateFAQStructuredData(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}