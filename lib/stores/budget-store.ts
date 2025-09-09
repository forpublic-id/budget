import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type { BudgetFilter, BudgetData, ChartType } from '@/lib/types/budget';

interface BudgetStore {
  // Current selections
  selectedYear: number;
  selectedRegion: string;
  selectedType: 'national' | 'regional';
  
  // Chart preferences
  chartType: ChartType;
  chartHeight: number;
  showTooltip: boolean;
  
  // Filters
  filters: BudgetFilter;
  
  // Data cache
  budgetCache: Map<string, BudgetData>;
  
  // UI state
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setYear: (year: number) => void;
  setRegion: (region: string) => void;
  setType: (type: 'national' | 'regional') => void;
  setChartType: (type: ChartType) => void;
  setChartHeight: (height: number) => void;
  setShowTooltip: (show: boolean) => void;
  setFilters: (filters: BudgetFilter) => void;
  updateFilter: (key: keyof BudgetFilter, value: any) => void;
  setBudgetData: (key: string, data: BudgetData) => void;
  getBudgetData: (key: string) => BudgetData | undefined;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialFilters: BudgetFilter = {
  years: [2025],
  regions: [],
  categories: [],
  ministries: [],
  type: ['APBN'],
  level: [],
};

export const useBudgetStore = create<BudgetStore>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    selectedYear: 2025,
    selectedRegion: 'national',
    selectedType: 'national',
    chartType: 'pie',
    chartHeight: 400,
    showTooltip: true,
    filters: initialFilters,
    budgetCache: new Map<string, BudgetData>(),
    isLoading: false,
    error: null,

    // Actions
    setYear: (year: number) =>
      set((state) => ({
        selectedYear: year,
        filters: {
          ...state.filters,
          years: [year],
        },
      })),

    setRegion: (region: string) =>
      set((state) => ({
        selectedRegion: region,
        filters: {
          ...state.filters,
          regions: region === 'national' ? [] : [region],
        },
      })),

    setType: (type: 'national' | 'regional') =>
      set((state) => ({
        selectedType: type,
        filters: {
          ...state.filters,
          type: type === 'national' ? ['APBN'] : ['APBD'],
        },
      })),

    setChartType: (type: ChartType) =>
      set({ chartType: type }),

    setChartHeight: (height: number) =>
      set({ chartHeight: height }),

    setShowTooltip: (show: boolean) =>
      set({ showTooltip: show }),

    setFilters: (filters: BudgetFilter) =>
      set({ filters }),

    updateFilter: (key: keyof BudgetFilter, value: any) =>
      set((state) => ({
        filters: {
          ...state.filters,
          [key]: value,
        },
      })),

    setBudgetData: (key: string, data: BudgetData) =>
      set((state) => {
        const newCache = new Map(state.budgetCache);
        newCache.set(key, data);
        return { budgetCache: newCache };
      }),

    getBudgetData: (key: string) => {
      const { budgetCache } = get();
      return budgetCache.get(key);
    },

    setLoading: (loading: boolean) =>
      set({ isLoading: loading }),

    setError: (error: string | null) =>
      set({ error }),

    reset: () =>
      set({
        selectedYear: 2025,
        selectedRegion: 'national',
        selectedType: 'national',
        chartType: 'pie',
        chartHeight: 400,
        showTooltip: true,
        filters: initialFilters,
        budgetCache: new Map<string, BudgetData>(),
        isLoading: false,
        error: null,
      }),
  }))
);

// Selectors for performance
export const useBudgetFilters = () => useBudgetStore((state) => state.filters);
export const useBudgetChartSettings = () => useBudgetStore((state) => ({
  chartType: state.chartType,
  chartHeight: state.chartHeight,
  showTooltip: state.showTooltip,
}));
export const useBudgetSelection = () => useBudgetStore((state) => ({
  selectedYear: state.selectedYear,
  selectedRegion: state.selectedRegion,
  selectedType: state.selectedType,
}));

// Subscribe to changes for analytics
if (typeof window !== 'undefined') {
  useBudgetStore.subscribe(
    (state) => state.selectedYear,
    (selectedYear) => {
      // Track year selection changes
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'budget_year_changed', {
          year: selectedYear,
        });
      }
    }
  );

  useBudgetStore.subscribe(
    (state) => state.chartType,
    (chartType) => {
      // Track chart type changes
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'chart_type_changed', {
          chart_type: chartType,
        });
      }
    }
  );
}