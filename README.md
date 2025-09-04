# Budget ForPublic.id

Indonesian Government Budget Transparency Platform

[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js%2015-000000.svg?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6.svg?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1-06B6D4.svg?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Bun Runtime](https://img.shields.io/badge/Runtime-Bun-000000.svg?style=flat&logo=bun)](https://bun.sh/)

## Overview

Budget ForPublic.id is a comprehensive transparency platform providing access to Indonesian government budget data (APBN and APBD) with interactive visualizations and in-depth analysis. Built as part of the ForPublic.id ecosystem, focusing on public transparency and accountability.

## Features

### 📊 **Interactive Budget Visualizations**

- Multi-format charts (pie, bar, line, treemap) for budget analysis
- Real-time data transformation and filtering
- Responsive design for mobile and desktop
- Custom tooltips with formatted currency and percentages

### 🏛️ **Comprehensive Budget Coverage**

- **APBN (National Budget)**: Complete national government budget data
- **APBD (Regional Budgets)**: Provincial and city/regency budget information
- **Historical Data**: Budget trends and year-over-year comparisons
- **Realization Tracking**: Budget execution vs. planned allocations

### 🔍 **Advanced Analysis Tools**

- Budget comparison across regions and years
- Per-capita spending analysis
- Efficiency metrics and performance indicators
- Trend analysis with growth calculations

### 🌍 **Bilingual Support**

- Complete Indonesian and English localization
- Locale-appropriate number and currency formatting
- Cultural adaptation of budget terminology

## Tech Stack

### Core Framework

- **Next.js 15** with App Router and React 19
- **TypeScript** for comprehensive type safety
- **Bun** runtime for optimal performance

### UI & Styling

- **Tailwind CSS v4** with custom design tokens
- **shadcn/ui** component library
- **Lucide React** icons
- **Geist** font family

### Data Visualization

- **Recharts** for interactive charts
- **D3.js** for advanced visualizations
- Custom budget-themed components

### Internationalization

- **next-intl** for bilingual routing and translations
- **Dynamic locale switching** with URL-based routing

## Quick Start

### Prerequisites

- **Bun** (recommended) or Node.js 18+
- Git for version control

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd budget

# Install dependencies with Bun (recommended)
bun install

# Or with npm
npm install
```

### Development

```bash
# Start development server with Bun (fastest)
bun run dev

# With Turbopack for faster builds
bun run dev:turbo

# Fallback with Node.js
bun run dev:node

# Open http://localhost:3000
```

### Building for Production

```bash
# Build the application
bun run build

# Start production server
bun run start

# Type checking
bun run typecheck

# Code formatting
bun run format
```

## Project Structure

```
budget/
├── app/                          # Next.js App Router
│   ├── [locale]/                 # Internationalized routes (id/en)
│   │   ├── national/             # APBN analysis pages
│   │   ├── regional/             # APBD comparison pages
│   │   ├── compare/              # Budget comparison tools
│   │   ├── trends/               # Historical analysis
│   │   ├── search/               # Advanced search
│   │   └── page.tsx              # Homepage
│   └── globals.css               # Global styles
├── components/
│   ├── budget/                   # Budget-specific components
│   │   ├── BudgetChart.tsx       # Multi-format chart component
│   │   ├── BudgetOverview.tsx    # Summary statistics
│   │   └── ComparisonTool.tsx    # Regional comparisons
│   ├── ui/                       # Base UI components (shadcn/ui)
│   ├── layout/                   # Header, Footer, PageLayout
│   └── sections/                 # Page sections
├── lib/
│   ├── types/budget.ts           # Comprehensive TypeScript types
│   ├── data.ts                   # Data fetching utilities
│   └── utils.ts                  # Budget formatting helpers
├── public/data/budget/           # Static JSON data files
│   ├── national/                 # APBN data (2024, 2025)
│   ├── regional/                 # APBD data by province/city
│   ├── analysis/                 # Trend and comparison data
│   └── meta/                     # Data sources and methodology
└── i18n/messages/                # Translation files (id/en)
```

## Data Architecture

### Budget Data Format

```typescript
interface BudgetData {
  metadata: {
    year: number;
    type: "APBN" | "APBD";
    region: string;
    lastUpdated: string;
    source: string;
    currency: "IDR";
    population?: number;
  };
  revenue: {
    total: number;
    sources: { tax: number; non_tax: number };
    breakdown: { [key: string]: number };
  };
  expenditure: {
    total: number;
    categories: { [category: string]: number };
    breakdown: { operational: number; capital: number };
  };
}
```

### Key Features Implemented

#### **Interactive Budget Charts**

- Pie charts for budget distribution
- Bar charts for category comparisons
- Line charts for trend analysis
- Custom formatting for Indonesian currency (Rupiah)

#### **Budget Overview Dashboard**

- Revenue vs expenditure comparison
- Top spending categories with percentages
- Deficit/surplus calculation and analysis
- Data source attribution and freshness

#### **Utility Functions**

```typescript
formatBudgetAmount(2740500000000000); // "Rp 2,741 T"
calculatePercentage(450000000000000, 3061400000000000); // 14.7%
formatPercentage(14.7); // "14.7%"
```

## Data Sources

- **Kementerian Keuangan RI** - National budget (APBN)
- **DJPK (Direktorat Jenderal Perimbangan Keuangan)** - Fiscal transfers
- **BPKAD Regional** - Provincial and city budgets (APBD)
- **Official Government Publications** - Budget documents and realizations

## ForPublic.id Ecosystem

Budget ForPublic.id is part of the comprehensive ForPublic.id transparency ecosystem:

- **[ForPublic.id](https://forpublic.id)** - Main transparency platform
- **[Salary.ForPublic.id](https://salary.forpublic.id)** - Government salary transparency
- **[Holiday.ForPublic.id](https://holiday.forpublic.id)** - National holiday calendar
- **Budget.ForPublic.id** - Government budget transparency _(this project)_

## Performance

- **Build Size**: ~102 kB shared JS, ~111 kB page JS
- **Static Generation**: Pre-built pages for optimal performance
- **Bun Runtime**: 3x faster development server startup
- **Responsive Design**: Mobile-first with desktop optimization

## Deployment

### Vercel (Recommended)

```bash
# Deploy to Vercel
vercel --prod

# Environment variables needed:
NEXT_PUBLIC_GA_ID=your_analytics_id
```

### Docker

```dockerfile
FROM oven/bun:1 as base
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build
EXPOSE 3000
CMD ["bun", "run", "start"]
```

## Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Follow TypeScript and ESLint guidelines**
4. **Add comprehensive types for budget data**
5. **Test with both Indonesian and English locales**
6. **Submit a pull request**

### Development Guidelines

- **Consistency**: Follow ForPublic.id ecosystem patterns
- **Accessibility**: WCAG 2.1 AA compliance required
- **Performance**: Optimize for large budget datasets
- **Internationalization**: Support both Indonesian and English

## License

MIT License - promoting transparency and open government data.

## Support

- **Issues**: [GitHub Issues](https://github.com/forpublic-id/budget/issues)
- **Discussions**: [GitHub Discussions](https://github.com/forpublic-id/budget/discussions)
- **Email**: [team@forpublic.id](mailto:team@forpublic.id)

---

**Promoting Government Transparency and Public Accountability** 🇮🇩

Made with ❤️ for Indonesian public transparency by [ForPublic.id](https://forpublic.id)
