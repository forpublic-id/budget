# CLAUDE.md - Budget ForPublic.id

This file provides guidance to Claude Code when working with this Indonesian budget transparency platform.

## Project Overview

Budget ForPublic.id is a Next.js 15 application focused on Indonesian government budget transparency. It provides interactive visualizations and in-depth analysis of APBN (national budget) and APBD (regional budgets) data. The platform is part of the ForPublic.id ecosystem, maintaining design consistency with other applications like salary.forpublic.id.

## Development Commands

**Package Manager: Bun** (optimized for performance)

- `bun install` - Install dependencies
- `bun run dev` - Start development server with Bun runtime (recommended)
- `bun run dev:turbo` - Development with Turbopack for faster builds
- `bun run dev:node` - Fallback to Node.js runtime
- `bun run build` - Production build (Vercel compatible)
- `bun run start` - Start production server
- `bun run lint` - ESLint code quality checks
- `bun run typecheck` - TypeScript validation
- `bun run format` - Format code with Prettier
- `bun run format:check` - Check formatting without changes
- `bun run clean` - Clean build cache

## Architecture & Tech Stack

### Core Framework

- **Next.js 15** with App Router architecture
- **React 19** for modern UI components
- **TypeScript** for comprehensive type safety
- **next-intl** for internationalization (Indonesian/English)

### Styling & UI

- **Tailwind CSS v4** with custom design tokens
- **shadcn/ui** component library for consistent UI
- **Geist font family** (Sans and Mono variants)
- **Lucide React** icons
- **Custom budget-themed color scheme** (red primary for transparency/accountability)

### Data Visualization

- **Recharts** for interactive charts (pie, bar, line, area)
- **D3.js** for advanced visualizations (treemap, sankey, custom charts)
- **Custom BudgetChart component** for standardized budget visualizations

### Data Architecture

- **JSON-based data storage** (NO DATABASE) - all data in static files
- **Client-side data processing** for fast interactions
- **Structured data format** for APBN/APBD with comprehensive metadata

## Project Structure

```
budget/
├── app/                           # Next.js App Router
│   ├── [locale]/                  # Internationalized routes (id/en)
│   │   ├── national/              # APBN pages and analysis
│   │   ├── regional/              # APBD pages and comparisons
│   │   ├── compare/               # Budget comparison tools
│   │   ├── trends/                # Historical trend analysis
│   │   ├── search/                # Advanced search interface
│   │   ├── about/                 # About and methodology
│   │   ├── layout.tsx             # Locale-specific layout
│   │   └── page.tsx               # Homepage with overview
│   ├── globals.css                # Global styles with budget theme
│   └── layout.tsx                 # Root layout with metadata
├── components/                    # React components (organized by purpose)
│   ├── ui/                        # Base UI components (shadcn/ui)
│   │   ├── Button.tsx, Card.tsx, Input.tsx, Badge.tsx
│   │   └── index.ts               # Barrel exports
│   ├── budget/                    # Budget-specific components
│   │   ├── BudgetChart.tsx        # Multi-type chart component
│   │   ├── BudgetOverview.tsx     # Summary statistics display
│   │   ├── ComparisonTool.tsx     # Regional comparison interface
│   │   ├── TrendAnalysis.tsx      # Historical trend visualizations
│   │   └── SearchInterface.tsx    # Advanced budget search
│   ├── layout/                    # Layout components
│   │   ├── Header.tsx             # Main navigation with budget branding
│   │   ├── Footer.tsx             # Footer with ecosystem links
│   │   └── PageLayout.tsx         # Common page wrapper
│   ├── common/                    # Reusable components
│   │   ├── Loading.tsx            # Loading states
│   │   ├── ErrorBoundary.tsx      # Error handling
│   │   └── Logo.tsx               # Budget app logo
│   └── sections/                  # Page section components
│       ├── Hero.tsx               # Homepage hero section
│       ├── Stats.tsx              # Budget statistics display
│       └── Features.tsx           # Feature showcase
├── lib/                          # Utilities and configuration
│   ├── types/                    # TypeScript definitions
│   │   └── budget.ts             # Comprehensive budget data types
│   ├── constants/                # Design system constants
│   ├── hooks/                    # Custom React hooks
│   ├── data.ts                   # Data fetching utilities
│   └── utils.ts                  # Utility functions with budget helpers
├── i18n/                         # Internationalization
│   ├── messages/                 # Translation files
│   │   ├── id.json               # Indonesian translations
│   │   └── en.json               # English translations
│   └── request.ts                # i18n configuration
├── public/data/budget/           # JSON data files (static data)
│   ├── national/                 # APBN data files
│   │   ├── apbn-2025.json        # Current national budget
│   │   ├── apbn-2024.json        # Previous year budget
│   │   ├── realisasi-2024.json   # Budget realization data
│   │   └── historical/           # Historical APBN data
│   ├── regional/                 # APBD data files
│   │   ├── provinces/            # Provincial budgets
│   │   │   ├── dki-jakarta.json  # Jakarta provincial budget
│   │   │   └── [other-provinces].json
│   │   └── cities/               # City/regency budgets
│   │       └── [cities].json
│   ├── analysis/                 # Processed analysis data
│   │   ├── trends.json           # Budget trend analysis
│   │   ├── comparisons.json      # Cross-regional comparisons
│   │   ├── categories.json       # Category breakdowns
│   │   └── efficiency.json       # Efficiency metrics
│   └── meta/                     # Metadata and sources
│       ├── sources.json          # Data sources and methodology
│       └── last-updated.json     # Update timestamps
└── middleware.ts                 # next-intl routing middleware
```

## Data Architecture

### Budget Data Types (lib/types/budget.ts)

```typescript
interface BudgetData {
  metadata: BudgetMetadata; // Year, type, region, source info
  revenue: BudgetRevenue; // Revenue sources and breakdown
  expenditure: BudgetExpenditure; // Spending by categories
  deficit?: number; // Budget deficit/surplus
  financing?: BudgetFinancing; // Financing sources
}
```

### Key Features Implemented

#### 1. **Interactive Budget Visualizations**

- `BudgetChart.tsx`: Multi-format charts (pie, bar, line, treemap)
- Real-time data transformation for different chart types
- Custom tooltips with formatted currency and percentages
- Responsive design for mobile and desktop

#### 2. **Budget Overview Dashboard**

- `BudgetOverview.tsx`: Key statistics and top categories
- Revenue/expenditure comparison with deficit calculation
- Per-capita spending analysis
- Data source attribution and metadata display

#### 3. **Comprehensive Data Management**

- `lib/data.ts`: Centralized data fetching with caching
- Support for national (APBN) and regional (APBD) budgets
- Data source validation and error handling
- Metadata tracking for data freshness

#### 4. **Utility Functions**

- `formatBudgetAmount()`: Large number formatting (T, M, Jt suffixes)
- `calculatePercentage()`, `calculateGrowth()`: Budget calculations
- `formatCurrency()`: Indonesian Rupiah formatting
- Performance utilities: debounce, throttle for interactions

### Design System

#### Color Scheme (Budget Theme)

- **Primary**: Red (`oklch(0.55 0.22 20)`) - symbolizing transparency and urgency for accountability
- **Secondary**: Neutral grays for professional appearance
- **Data Visualization**: Multi-color palette for chart categories
- **Accessibility**: WCAG compliant contrast ratios

#### Typography

- **Headings**: Geist Sans for modern, readable headlines
- **Body**: System fonts for optimal readability
- **Data**: Tabular figures for aligned numbers in financial data

## Development Guidelines

### Component Development

- **Consistency**: Follow patterns from salary.forpublic.id and forpublic-id-web
- **TypeScript**: Comprehensive type safety for all budget data structures
- **Accessibility**: WCAG 2.1 AA compliance for all interactive components
- **Performance**: Lazy loading for large datasets, optimized chart rendering

### Data Handling

- **Static Generation**: Pre-build data processing for optimal performance
- **Client-side Processing**: Fast filtering and calculations without backend
- **Caching Strategy**: Intelligent caching for frequently accessed budget data
- **Error Handling**: Graceful degradation when data is unavailable

### Internationalization

- **Complete Translations**: All UI text available in Indonesian and English
- **Number Formatting**: Locale-appropriate currency and number formats
- **Date Formatting**: Indonesian and international date formats
- **Content Localization**: Budget terminology in both languages

### Performance Optimizations

- **Bundle Splitting**: Route-based code splitting for faster initial loads
- **Image Optimization**: Next.js Image component for responsive images
- **Chart Performance**: Optimized Recharts configuration for large datasets
- **Memory Management**: Proper cleanup in data visualizations

## Key Implementation Details

### Budget Chart Component

```typescript
interface BudgetChartProps {
  data: BudgetData;
  type: ChartType; // pie, bar, line, treemap, sankey
  height?: number;
  showTooltip?: boolean;
  interactive?: boolean;
  locale?: string;
}
```

### Data Fetching Pattern

```typescript
// Centralized data fetching with error handling
export async function fetchNationalBudget(year: number): Promise<BudgetData>;
export async function fetchRegionalBudget(
  type: string,
  region: string,
): Promise<BudgetData>;
export async function fetchDataSources(): Promise<DataSource[]>;
```

### Utility Functions

```typescript
// Budget-specific formatting utilities
formatBudgetAmount(2740500000000000, "id-ID"); // "Rp 2,741 T"
calculatePercentage(450200000000000, 3061400000000000); // 14.7
formatPercentage(14.7); // "14.7%"
```

## Ecosystem Integration

### ForPublic.id Consistency

- **Shared Design System**: Consistent with salary.forpublic.id styling
- **Navigation Patterns**: Similar header/footer structure
- **Brand Identity**: ForPublic.id ecosystem branding maintained
- **User Experience**: Familiar patterns across all ForPublic applications

### Cross-Application Links

- Header links to other ForPublic.id applications
- Consistent footer with ecosystem navigation
- Shared component library where appropriate

## Future Development Priorities

### Phase 1: Core Features (Completed)

- ✅ Project structure and basic components
- ✅ Data architecture and sample data
- ✅ Basic budget visualizations
- ✅ Internationalization setup

### Phase 2: Advanced Visualizations

- Regional comparison maps with interactive Indonesia map
- Trend analysis with historical data visualization
- Advanced filtering and search capabilities
- Budget efficiency scoring and rankings

### Phase 3: Interactive Features

- Budget calculator and impact simulator
- Custom report generation and export
- Embeddable widgets for media/research use
- API endpoints for third-party access

### Phase 4: Data Enhancement

- Real-time data integration with government APIs
- Automated data validation and quality checking
- Enhanced metadata and data lineage tracking
- Performance optimization for larger datasets

## SEO & Analytics

### Search Optimization

- Dynamic metadata generation per page
- Structured data for budget information
- Sitemap generation for all budget pages
- OpenGraph and Twitter card integration

### Analytics Tracking

- Budget exploration event tracking
- User interaction analysis for UX improvements
- Data access pattern analysis
- Performance monitoring and optimization

## Deployment Configuration

### Vercel Deployment

- **Domain**: budget.forpublic.id
- **Framework**: Next.js 15 with static generation
- **Runtime**: Node.js 18+ (Bun compatibility)
- **Regions**: Singapore (sin1) for optimal Indonesia performance

### Environment Variables

```bash
NEXT_PUBLIC_GA_ID=          # Google Analytics tracking
NEXT_PUBLIC_API_URL=        # Future API endpoint
VERCEL_URL=                 # Automatic Vercel deployment URL
```

This platform serves as a critical tool for Indonesian budget transparency, providing accessible, accurate, and comprehensive financial information to promote government accountability and informed public discourse.
