"use client";

import React, { memo, useMemo, useCallback } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useTranslations } from "next-intl";
import {
  formatBudgetAmount,
  formatPercentage,
  calculatePercentage,
} from "@/lib/utils";
import type { BudgetData, ChartType } from "@/lib/types/budget";

interface BudgetChartProps {
  data: BudgetData;
  type: ChartType;
  height?: number;
  showTooltip?: boolean;
  interactive?: boolean;
  locale?: string;
}

const CHART_COLORS = [
  "#dc2626", // Red (primary)
  "#2563eb", // Blue
  "#059669", // Green
  "#ea580c", // Orange
  "#7c3aed", // Purple
  "#0891b2", // Cyan
  "#ca8a04", // Yellow
  "#be185d", // Pink
  "#0d9488", // Teal
  "#65a30d", // Lime
  "#94a3b8", // Slate
  "#f97316", // Orange alt
];

const BudgetChart = memo(function BudgetChart({
  data,
  type,
  height = 400,
  showTooltip = true,
  interactive = true,
  locale = "id-ID",
}: BudgetChartProps) {
  const t = useTranslations("budget");

  // Transform budget data for different chart types - memoized for performance
  const transformDataForChart = useCallback(() => {
    switch (type) {
      case "pie":
        return Object.entries(data.expenditure.categories).map(
          ([key, value], index) => ({
            name: t(`categories.${key}`) || key,
            value,
            percentage: calculatePercentage(value, data.expenditure.total),
            color: CHART_COLORS[index % CHART_COLORS.length],
          }),
        );

      case "bar":
        return Object.entries(data.expenditure.categories).map(
          ([key, value], index) => ({
            category: t(`categories.${key}`) || key,
            amount: value,
            color: CHART_COLORS[index % CHART_COLORS.length],
          }),
        );

      default:
        return [];
    }
  }, [data, type, t]);

  const chartData = useMemo(() => transformDataForChart(), [transformDataForChart]);

  const CustomTooltip = useCallback(({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-xl backdrop-blur-sm">
          <p className="font-semibold text-gray-900 mb-2">
            {data.name || data.category}
          </p>
          <div className="space-y-1">
            <p className="text-base font-medium text-gray-800">
              {formatBudgetAmount(data.value || data.amount, locale)}
            </p>
            {data.percentage && (
              <p className="text-sm font-medium text-red-600">
                {formatPercentage(data.percentage)}% dari total
              </p>
            )}
          </div>
        </div>
      );
    }
    return null;
  }, [locale]);

  const renderPieChart = useMemo(() => {
    // Calculate responsive sizing
    const isSmall = height < 300;
    const pieRadius = isSmall ? { inner: 40, outer: 90 } : { inner: 55, outer: 120 };
    
    return (
      <div className="relative w-full">
        <ResponsiveContainer width="100%" height={height}>
          <PieChart margin={{ top: 20, right: 20, bottom: 60, left: 20 }}>
            <Pie
              data={chartData}
              cx="50%"
              cy="45%"
              innerRadius={pieRadius.inner}
              outerRadius={pieRadius.outer}
              paddingAngle={2}
              dataKey="value"
              stroke="#ffffff"
              strokeWidth={3}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  style={{
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                  }}
                />
              ))}
            </Pie>
            {showTooltip && (
              <Tooltip 
                content={<CustomTooltip />}
                cursor={{ fill: 'transparent' }}
              />
            )}
            <Legend 
              wrapperStyle={{ 
                paddingTop: "20px",
                fontSize: "12px",
                fontWeight: "500",
                maxHeight: "120px",
                overflowY: "auto"
              }} 
              iconType="circle"
              iconSize={6}
              layout="horizontal"
              align="center"
              verticalAlign="bottom"
              formatter={(value: any) => (
                <span className="text-gray-700 text-xs truncate max-w-[120px] inline-block" title={value}>
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }, [chartData, height, showTooltip, CustomTooltip]);

  const renderBarChart = useMemo(() => (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="category"
          tick={{ fontSize: 12 }}
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => formatBudgetAmount(value, locale)}
        />
        {showTooltip && <Tooltip content={<CustomTooltip />} />}
        <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  ), [chartData, height, showTooltip, CustomTooltip, locale]);

  const renderChart = useMemo(() => {
    switch (type) {
      case "pie":
        return renderPieChart;
      case "bar":
        return renderBarChart;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">
              Chart type not supported yet
            </p>
          </div>
        );
    }
  }, [type, renderPieChart, renderBarChart]);

  return (
    <div className="w-full h-full">
      <div className="relative w-full h-full flex flex-col">
        {renderChart}
      </div>
    </div>
  );
});

export default BudgetChart;
