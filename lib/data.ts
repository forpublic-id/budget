import type { BudgetData, BudgetAPIResponse, DataSource, MethodologyInfo } from "@/lib/types/budget";

// Base URL for budget data API/files
const BASE_URL = "/data/budget";

export async function fetchBudgetData(
  level: "national" | "regional",
  identifier: string
): Promise<BudgetData> {
  try {
    let url: string;
    
    if (level === "national") {
      url = `${BASE_URL}/national/${identifier}.json`;
    } else {
      // For regional data, identifier should be like "provinces/dki-jakarta"
      url = `${BASE_URL}/regional/${identifier}.json`;
    }

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch budget data: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching budget data:", error);
    throw new Error("Failed to load budget data");
  }
}

export async function fetchNationalBudget(year: number): Promise<BudgetData> {
  return fetchBudgetData("national", `apbn-${year}`);
}

export async function fetchRegionalBudget(
  type: "provinces" | "cities",
  region: string
): Promise<BudgetData> {
  return fetchBudgetData("regional", `${type}/${region}`);
}

export async function fetchBudgetRealization(year: number): Promise<BudgetData> {
  return fetchBudgetData("national", `realisasi-${year}`);
}

export async function fetchDataSources(): Promise<DataSource[]> {
  try {
    const response = await fetch(`${BASE_URL}/meta/sources.json`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch data sources: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.dataSources || [];
  } catch (error) {
    console.error("Error fetching data sources:", error);
    return [];
  }
}

export async function fetchMethodology(): Promise<MethodologyInfo | null> {
  try {
    const response = await fetch(`${BASE_URL}/meta/sources.json`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch methodology: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.methodology || null;
  } catch (error) {
    console.error("Error fetching methodology:", error);
    return null;
  }
}

export async function fetchBudgetTrends(region?: string): Promise<any[]> {
  try {
    const url = region 
      ? `${BASE_URL}/analysis/regional-trends.json` 
      : `${BASE_URL}/analysis/trends.json`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch budget trends: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.trends || [];
  } catch (error) {
    console.error("Error fetching budget trends:", error);
    return [];
  }
}

export async function fetchBudgetComparisons(): Promise<any[]> {
  try {
    const response = await fetch(`${BASE_URL}/analysis/comparisons.json`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch budget comparisons: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.comparisons || [];
  } catch (error) {
    console.error("Error fetching budget comparisons:", error);
    return [];
  }
}

export async function fetchBudgetEfficiency(): Promise<any[]> {
  try {
    const response = await fetch(`${BASE_URL}/analysis/efficiency.json`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch budget efficiency: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.efficiency || [];
  } catch (error) {
    console.error("Error fetching budget efficiency:", error);
    return [];
  }
}

// Helper function to get available years
export async function getAvailableYears(): Promise<number[]> {
  // This would typically come from a metadata endpoint
  // For now, return static data
  return [2020, 2021, 2022, 2023, 2024, 2025];
}

// Helper function to get available regions
export async function getAvailableRegions(): Promise<{ id: string; name: string; type: string }[]> {
  // This would typically come from a metadata endpoint
  // For now, return static data
  return [
    { id: "dki-jakarta", name: "DKI Jakarta", type: "province" },
    { id: "jawa-barat", name: "Jawa Barat", type: "province" },
    { id: "jawa-tengah", name: "Jawa Tengah", type: "province" },
    { id: "jawa-timur", name: "Jawa Timur", type: "province" },
    { id: "banten", name: "Banten", type: "province" },
    { id: "sumatera-utara", name: "Sumatera Utara", type: "province" },
    // Add more regions as needed
  ];
}

// Search function for budget items
export async function searchBudgetItems(
  query: string,
  filters?: {
    year?: number;
    category?: string;
    region?: string;
    minAmount?: number;
    maxAmount?: number;
  }
): Promise<any[]> {
  // This would typically call a search API
  // For now, return empty array
  console.log("Searching for:", query, "with filters:", filters);
  return [];
}

// Export utility function for client-side data loading
export function createBudgetDataLoader() {
  const cache = new Map<string, any>();
  
  return {
    async load(key: string, fetcher: () => Promise<any>) {
      if (cache.has(key)) {
        return cache.get(key);
      }
      
      const data = await fetcher();
      cache.set(key, data);
      return data;
    },
    
    invalidate(key?: string) {
      if (key) {
        cache.delete(key);
      } else {
        cache.clear();
      }
    },
    
    prefetch(key: string, fetcher: () => Promise<any>) {
      if (!cache.has(key)) {
        fetcher().then(data => cache.set(key, data));
      }
    }
  };
}