import type { BudgetData } from './types/budget';

// Fallback data for APBN 2025 if fetching fails
export const fallbackAPBN2025: BudgetData = {
  id: 'fallback-apbn-2025' as any,
  metadata: {
    year: 2025,
    type: "APBN" as const,
    region: "National",
    lastUpdated: "2025-01-20",
    source: "Kemenkeu RI - Sri Mulyani Indrawati",
    currency: "IDR" as const,
    population: 275000000,
  },
  revenue: {
    total: 2329200000000000,
    sources: {
      tax: 1948400000000000,
      non_tax: 380800000000000,
    },
    breakdown: {
      pajak_penghasilan: 852600000000000,
      pajak_pertambahan_nilai: 724800000000000,
      pajak_bumi_bangunan: 108200000000000,
      bea_cukai: 196500000000000,
      penerimaan_sda: 245300000000000,
      keuntungan_bumn: 78200000000000,
      pnbp_lainnya: 57300000000000,
    },
  },
  expenditure: {
    total: 2701400000000000,
    categories: {
      pendidikan: 724300000000000,
      perlindungan_sosial: 503200000000000,
      kesehatan: 218500000000000,
      pertahanan: 165000000000000,
      infrastruktur: 324600000000000,
      ekonomi: 285400000000000,
      keamanan: 125800000000000,
      ketahanan_pangan: 144600000000000,
      makan_bergizi: 71000000000000,
      energi_subsidi: 204500000000000,
      lingkungan: 65200000000000,
      perumahan: 89400000000000,
    },
    breakdown: {
      operational: 1825600000000000,
      capital: 512800000000000,
      transfer: 363000000000000,
    },
  },
  deficit: 372200000000000,
  financing: {
    total: 372200000000000,
    domestic: 324800000000000,
    foreign: 47400000000000,
  },
};