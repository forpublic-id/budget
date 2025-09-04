// Budget Data Types for Indonesian Government Budget Transparency

export interface BudgetMetadata {
  year: number;
  type: "APBN" | "APBD";
  region: "National" | string; // Province/City name for APBD
  lastUpdated: string;
  source: string;
  currency: "IDR";
  population?: number;
  level?: "province" | "city" | "regency";
}

export interface BudgetRevenue {
  total: number;
  sources: {
    tax: number;
    non_tax: number;
    grants?: number;
    other?: number;
  };
  breakdown?: {
    [key: string]: number;
  };
}

export interface BudgetExpenditure {
  total: number;
  categories: {
    [category: string]: number;
  };
  breakdown?: {
    operational: number;
    capital: number;
    transfer: number;
    other?: number;
  };
}

export interface BudgetData {
  metadata: BudgetMetadata;
  revenue: BudgetRevenue;
  expenditure: BudgetExpenditure;
  deficit?: number;
  surplus?: number;
  financing?: {
    total: number;
    domestic: number;
    foreign: number;
  };
}

export interface BudgetRealization {
  planned: number;
  realized: number;
  percentage: number;
  variance: number;
  category: string;
  period: string;
}

export interface BudgetComparison {
  region: string;
  year: number;
  totalBudget: number;
  perCapita: number;
  revenueRatio: number;
  expenditureByCategory: {
    [category: string]: number;
  };
  efficiency: {
    score: number;
    rank: number;
  };
}

export interface BudgetTrend {
  year: number;
  totalRevenue: number;
  totalExpenditure: number;
  deficit: number;
  growth: {
    revenue: number;
    expenditure: number;
  };
  realValue?: number; // Inflation-adjusted
}

export interface BudgetAnalysis {
  summary: {
    totalBudget: number;
    revenueGrowth: number;
    expenditureGrowth: number;
    deficitRatio: number;
    perCapitaSpending: number;
  };
  insights: {
    highestCategory: string;
    lowestCategory: string;
    mostEfficient: string;
    leastEfficient: string;
    trends: string[];
    anomalies: string[];
  };
  recommendations?: string[];
}

export interface RegionalBudget {
  id: string;
  name: {
    id: string;
    en: string;
  };
  type: "province" | "city" | "regency";
  budget: BudgetData;
  parent?: string; // For cities/regencies, reference to province
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface BudgetItem {
  id: string;
  code: string;
  name: {
    id: string;
    en: string;
  };
  category: string;
  subcategory?: string;
  amount: number;
  description?: {
    id: string;
    en: string;
  };
  ministry?: string;
  program?: string;
  activity?: string;
  kro?: string; // Keluaran (Output)
  iki?: string; // Indikator Kinerja Individu
}

export interface BudgetFilter {
  years?: number[];
  regions?: string[];
  categories?: string[];
  ministries?: string[];
  amountRange?: {
    min: number;
    max: number;
  };
  type?: ("APBN" | "APBD")[];
  level?: ("province" | "city" | "regency")[];
}

export interface BudgetSearch {
  query: string;
  filters: BudgetFilter;
  sortBy: "amount" | "name" | "growth" | "efficiency";
  sortOrder: "asc" | "desc";
  page: number;
  limit: number;
}

export interface BudgetSearchResult {
  items: BudgetItem[];
  total: number;
  page: number;
  hasMore: boolean;
  aggregations: {
    totalAmount: number;
    categoryBreakdown: {
      [category: string]: number;
    };
    yearBreakdown: {
      [year: string]: number;
    };
  };
}

// Chart and Visualization Types
export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string[];
    borderColor?: string;
    borderWidth?: number;
  }[];
}

export interface TreemapData {
  name: string;
  value: number;
  children?: TreemapData[];
  color?: string;
  category?: string;
}

export interface TimeSeriesData {
  date: string;
  value: number;
  category?: string;
  region?: string;
}

// API Response Types
export interface BudgetAPIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
  metadata: {
    lastUpdated: string;
    source: string;
    version: string;
  };
}

export interface DataSource {
  id: string;
  name: {
    id: string;
    en: string;
  };
  url: string;
  type: "government" | "ministry" | "regional";
  reliability: "high" | "medium" | "low";
  lastUpdated: string;
  coverage: string[];
}

export interface MethodologyInfo {
  dataCollection: {
    id: string;
    en: string;
  };
  processing: {
    id: string;
    en: string;
  };
  validation: {
    id: string;
    en: string;
  };
  limitations: {
    id: string[];
    en: string[];
  };
  updateFrequency: string;
}

// Calculation and Analysis Types
export interface EfficiencyMetrics {
  inputOutputRatio: number;
  costPerBeneficiary: number;
  realizationRate: number;
  timelinessScore: number;
  transparencyScore: number;
  overallScore: number;
}

export interface BudgetProjection {
  year: number;
  projected: {
    revenue: number;
    expenditure: number;
    deficit: number;
  };
  confidence: "high" | "medium" | "low";
  assumptions: string[];
  methodology: string;
}

// Utility Types
export type Locale = "id" | "en";
export type Currency = "IDR";
export type BudgetLevel = "national" | "provincial" | "city" | "regency";
export type TimePeriod = "annual" | "quarterly" | "monthly";
export type ChartType =
  | "pie"
  | "bar"
  | "line"
  | "treemap"
  | "sankey"
  | "scatter";

// Component Props Types
export interface BudgetVisualizationProps {
  data: BudgetData | BudgetData[];
  type: ChartType;
  height?: number;
  width?: number;
  interactive?: boolean;
  showTooltip?: boolean;
  locale: Locale;
}

export interface BudgetTableProps {
  data: BudgetItem[];
  columns: string[];
  sortable?: boolean;
  filterable?: boolean;
  exportable?: boolean;
  pagination?: {
    page: number;
    limit: number;
    total: number;
  };
  onRowClick?: (item: BudgetItem) => void;
}

export interface BudgetComparisonProps {
  regions: RegionalBudget[];
  metric: "total" | "perCapita" | "growth" | "efficiency";
  visualization: ChartType;
  timeframe?: {
    start: number;
    end: number;
  };
}
