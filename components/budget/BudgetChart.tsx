"use client";

import React from "react";
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
import { formatBudgetAmount, formatPercentage, calculatePercentage } from "@/lib/utils";
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
  "#ea580c", // Orange
  "#ca8a04", // Yellow
  "#65a30d", // Green
  "#0891b2", // Cyan
  "#2563eb", // Blue
  "#7c3aed", // Purple
  "#be185d", // Pink
  "#059669", // Emerald
  "#0d9488", // Teal
];

export default function BudgetChart({
  data,
  type,
  height = 400,
  showTooltip = true,
  interactive = true,
  locale = "id-ID",
}: BudgetChartProps) {
  const t = useTranslations("budget");

  // Transform budget data for different chart types
  const transformDataForChart = () => {
    switch (type) {
      case "pie":
        return Object.entries(data.expenditure.categories).map(([key, value], index) => ({
          name: t(`categories.${key}`) || key,
          value,
          percentage: calculatePercentage(value, data.expenditure.total),
          color: CHART_COLORS[index % CHART_COLORS.length],
        }));

      case "bar":
        return Object.entries(data.expenditure.categories).map(([key, value], index) => ({
          category: t(`categories.${key}`) || key,
          amount: value,
          color: CHART_COLORS[index % CHART_COLORS.length],
        }));

      default:
        return [];
    }
  };

  const chartData = transformDataForChart();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{data.name || data.category}</p>
          <p className="text-sm text-muted-foreground">
            {formatBudgetAmount(data.value || data.amount, locale)}
          </p>
          {data.percentage && (
            <p className="text-sm text-muted-foreground">
              {formatPercentage(data.percentage)}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const renderPieChart = () => (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={120}
          paddingAngle={2}
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        {showTooltip && <Tooltip content={<CustomTooltip />} />}
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );

  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
  );

  const renderChart = () => {
    switch (type) {
      case "pie":
        return renderPieChart();
      case "bar":
        return renderBarChart();
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Chart type not supported yet</p>
          </div>
        );
    }
  };

  return (
    <div className="w-full">
      {renderChart()}
    </div>
  );
}