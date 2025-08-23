"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { TrendingUp, TrendingDown, DollarSign, PieChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { formatBudgetAmount, formatPercentage, calculatePercentage } from "@/lib/utils";
import type { BudgetData } from "@/lib/types/budget";

interface BudgetOverviewProps {
  data: BudgetData;
  locale?: string;
}

export default function BudgetOverview({ data, locale = "id-ID" }: BudgetOverviewProps) {
  const t = useTranslations("budget");
  const tCommon = useTranslations("common");

  const isDeficit = data.expenditure.total > data.revenue.total;
  const balanceAmount = Math.abs(data.expenditure.total - data.revenue.total);
  const deficitPercentage = calculatePercentage(balanceAmount, data.revenue.total);

  const stats = [
    {
      title: t("revenue"),
      value: formatBudgetAmount(data.revenue.total, locale),
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Total pendapatan negara",
    },
    {
      title: t("expenditure"),
      value: formatBudgetAmount(data.expenditure.total, locale),
      icon: PieChart,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Total belanja negara",
    },
    {
      title: isDeficit ? t("deficit") : t("surplus"),
      value: formatBudgetAmount(balanceAmount, locale),
      icon: isDeficit ? TrendingDown : TrendingUp,
      color: isDeficit ? "text-red-600" : "text-green-600",
      bgColor: isDeficit ? "bg-red-50" : "bg-green-50",
      description: `${formatPercentage(deficitPercentage)} dari pendapatan`,
    },
  ];

  const topCategories = Object.entries(data.expenditure.categories)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([category, amount]) => ({
      category: t(`categories.${category}`) || category,
      amount,
      percentage: calculatePercentage(amount, data.expenditure.total),
    }));

  return (
    <div className="space-y-6">
      {/* Budget Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <IconComponent className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Top Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Alokasi Anggaran Terbesar</CardTitle>
          <CardDescription>
            5 kategori dengan alokasi anggaran tertinggi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topCategories.map((item, index) => (
              <div key={item.category} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{item.category}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatPercentage(item.percentage)} dari total belanja
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">
                    {formatBudgetAmount(item.amount, locale)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Budget Metadata */}
      <Card>
        <CardHeader>
          <CardTitle>Informasi Data</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="font-medium text-muted-foreground">Tahun Anggaran</dt>
              <dd>{data.metadata.year}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">Jenis</dt>
              <dd>{data.metadata.type}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">Wilayah</dt>
              <dd>{data.metadata.region}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">Sumber Data</dt>
              <dd>{data.metadata.source}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">Terakhir Diperbarui</dt>
              <dd>{new Date(data.metadata.lastUpdated).toLocaleDateString(locale)}</dd>
            </div>
            {data.metadata.population && (
              <div>
                <dt className="font-medium text-muted-foreground">Populasi</dt>
                <dd>{data.metadata.population.toLocaleString(locale)} jiwa</dd>
              </div>
            )}
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}