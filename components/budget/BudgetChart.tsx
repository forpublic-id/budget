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
  "#2563eb", // Blue  
  "#059669", // Green
  "#ea580c", // Orange
  "#7c3aed", // Purple
  "#0891b2", // Cyan
  "#ca8a04", // Yellow
  "#be185d", // Pink
  "#0d9488", // Teal
  "#65a30d", // Lime
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
        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-gray-900">{data.name || data.category}</p>
          <p className="text-sm text-gray-600">
            {formatBudgetAmount(data.value || data.amount, locale)}
          </p>
          {data.percentage && (
            <p className="text-sm text-gray-500">
              {formatPercentage(data.percentage)}%
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
          innerRadius={50}
          outerRadius={130}
          paddingAngle={1}
          dataKey="value"
          stroke="#fff"
          strokeWidth={2}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        {showTooltip && <Tooltip content={<CustomTooltip />} />}
        <Legend 
          wrapperStyle={{ paddingTop: '20px' }}
          iconType="circle"
        />
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
    <div className="w-full bg-white rounded-lg">
      {renderChart()}
    </div>
  );
}