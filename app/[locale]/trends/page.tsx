"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { TrendingUp, TrendingDown, LineChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatBudgetAmount, calculateGrowth, formatPercentage } from "@/lib/utils";

// Mock historical data
const historicalData = [
  { year: 2020, revenue: 1865500000000000, expenditure: 2613800000000000, deficit: 748300000000000 },
  { year: 2021, revenue: 1846100000000000, expenditure: 2750000000000000, deficit: 903900000000000 },
  { year: 2022, revenue: 2044600000000000, expenditure: 2657400000000000, deficit: 612800000000000 },
  { year: 2023, revenue: 2165200000000000, expenditure: 2950300000000000, deficit: 785100000000000 },
  { year: 2024, revenue: 2252700000000000, expenditure: 3061400000000000, deficit: 808700000000000 },
  { year: 2025, revenue: 2329200000000000, expenditure: 2701400000000000, deficit: 372200000000000 },
];

const categoryTrends = [
  {
    category: "Pendidikan",
    data: [
      { year: 2020, amount: 508100000000000 },
      { year: 2021, amount: 544400000000000 },
      { year: 2022, amount: 586600000000000 },
      { year: 2023, amount: 612800000000000 },
      { year: 2024, amount: 665200000000000 },
      { year: 2025, amount: 724300000000000 },
    ],
    growth: 42.5,
    color: "text-blue-600",
  },
  {
    category: "Kesehatan",
    data: [
      { year: 2020, amount: 169800000000000 },
      { year: 2021, amount: 176500000000000 },
      { year: 2022, amount: 186200000000000 },
      { year: 2023, amount: 192800000000000 },
      { year: 2024, amount: 205600000000000 },
      { year: 2025, amount: 218500000000000 },
    ],
    growth: 28.7,
    color: "text-green-600",
  },
  {
    category: "Infrastruktur",
    data: [
      { year: 2020, amount: 425200000000000 },
      { year: 2021, amount: 393800000000000 },
      { year: 2022, amount: 356700000000000 },
      { year: 2023, amount: 340100000000000 },
      { year: 2024, amount: 335800000000000 },
      { year: 2025, amount: 324600000000000 },
    ],
    growth: -23.6,
    color: "text-red-600",
  },
];

function TrendChart({ data, type, locale }: { data: any[]; type: string; locale: string }) {
  return (
    <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
      <div className="text-center space-y-2">
        <LineChart className="h-12 w-12 text-gray-400 mx-auto" />
        <p className="text-muted-foreground">
          Grafik tren {type} akan ditampilkan di sini
        </p>
        <p className="text-sm text-gray-500">
          Menggunakan data historis {data.length} tahun
        </p>
      </div>
    </div>
  );
}

export default function TrendsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("5years");
  const t = useTranslations("trends");

  const currentYear = historicalData[historicalData.length - 1];
  const previousYear = historicalData[historicalData.length - 2];
  
  const revenueGrowth = calculateGrowth(currentYear.revenue, previousYear.revenue);
  const expenditureGrowth = calculateGrowth(currentYear.expenditure, previousYear.expenditure);
  const deficitChange = calculateGrowth(currentYear.deficit, previousYear.deficit);

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Analisis Tren Anggaran
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Analisis historis dan proyeksi anggaran Indonesia dari tahun 2020-2025
            </p>
          </div>

          {/* Period Selection */}
          <div className="flex justify-center space-x-4">
            <Button 
              variant={selectedPeriod === "3years" ? "default" : "outline"}
              onClick={() => setSelectedPeriod("3years")}
            >
              3 Tahun
            </Button>
            <Button 
              variant={selectedPeriod === "5years" ? "default" : "outline"}
              onClick={() => setSelectedPeriod("5years")}
            >
              5 Tahun
            </Button>
            <Button 
              variant={selectedPeriod === "10years" ? "default" : "outline"}
              onClick={() => setSelectedPeriod("10years")}
            >
              10 Tahun
            </Button>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Pertumbuhan Pendapatan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <div className="text-2xl font-bold text-gray-900">
                    {formatPercentage(revenueGrowth, 1)}
                  </div>
                  {revenueGrowth >= 0 ? (
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-600" />
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">YoY 2024-2025</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Pertumbuhan Belanja
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <div className="text-2xl font-bold text-gray-900">
                    {formatPercentage(expenditureGrowth, 1)}
                  </div>
                  {expenditureGrowth >= 0 ? (
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-600" />
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">YoY 2024-2025</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Perubahan Defisit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <div className="text-2xl font-bold text-gray-900">
                    {formatPercentage(deficitChange, 1)}
                  </div>
                  {deficitChange < 0 ? (
                    <TrendingDown className="h-5 w-5 text-green-600" />
                  ) : (
                    <TrendingUp className="h-5 w-5 text-red-600" />
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">YoY 2024-2025</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Trend Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <LineChart className="h-5 w-5" />
                <span>Tren Anggaran 2020-2025</span>
              </CardTitle>
              <CardDescription>
                Perkembangan pendapatan, belanja, dan defisit selama 6 tahun terakhir
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TrendChart data={historicalData} type="overview" locale="id-ID" />
            </CardContent>
          </Card>

          {/* Category Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Tren Kategori Belanja</CardTitle>
              <CardDescription>
                Perkembangan alokasi anggaran per kategori utama
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {categoryTrends.map((trend) => (
                  <div key={trend.category} className="border-b border-gray-100 pb-4 last:border-0">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{trend.category}</h4>
                        <p className="text-sm text-gray-600">
                          2025: {formatBudgetAmount(trend.data[trend.data.length - 1].amount, "id-ID")}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={`flex items-center space-x-1 ${trend.color}`}>
                          {trend.growth >= 0 ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <TrendingDown className="h-4 w-4" />
                          )}
                          <span className="font-semibold">
                            {formatPercentage(Math.abs(trend.growth), 1)}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">2020-2025</p>
                      </div>
                    </div>
                    
                    <div className="h-16 bg-gray-50 rounded flex items-center justify-center">
                      <p className="text-xs text-gray-500">Mini trend chart untuk {trend.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Key Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800">Tren Positif</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-green-700">
                  <li>• Pendapatan negara meningkat konsisten 5 tahun terakhir</li>
                  <li>• Alokasi pendidikan terus naik mencapai 26,8% dari total belanja</li>
                  <li>• Defisit menurun signifikan di 2025 (54% reduction)</li>
                  <li>• Efisiensi belanja operasional meningkat</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="text-orange-800">Area Perhatian</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-orange-700">
                  <li>• Alokasi infrastruktur menurun 23,6% dalam 5 tahun</li>
                  <li>• Rasio belanja modal terhadap total masih rendah</li>
                  <li>• Ketergantungan pada penerimaan pajak semakin tinggi</li>
                  <li>• Subsidi energi masih tinggi dan fluktuatif</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}