import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import BudgetOverview from "@/components/budget/BudgetOverview";
import BudgetChart from "@/components/budget/BudgetChart";
import { fetchNationalBudget } from "@/lib/data";

interface NationalPageProps {
  params: Promise<{
    locale: string;
  }>;
}

async function APBNData({ locale }: { locale: string }) {
  try {
    const budgetData = await fetchNationalBudget(2025);

    return (
      <div className="space-y-8">
        <BudgetOverview data={budgetData} locale={locale} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Struktur Belanja APBN 2025</CardTitle>
              <CardDescription>
                Distribusi anggaran belanja berdasarkan kategori
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BudgetChart
                data={budgetData}
                type="pie"
                height={400}
                locale={locale}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Perbandingan Kategori</CardTitle>
              <CardDescription>
                Alokasi anggaran per kategori dalam format bar chart
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BudgetChart
                data={budgetData}
                type="bar"
                height={400}
                locale={locale}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">
            Gagal memuat data APBN. Silakan coba lagi nanti.
          </p>
        </CardContent>
      </Card>
    );
  }
}

export default async function NationalPage({ params }: NationalPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "national" });

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              APBN 2025 - Anggaran Pendapatan dan Belanja Negara
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Transparansi lengkap anggaran negara Indonesia tahun 2025 dengan
              visualisasi interaktif dan analisis mendalam
            </p>
          </div>

          {/* Year Selection */}
          <div className="flex justify-center space-x-4">
            <Button variant="default">2025</Button>
            <Button variant="outline">2024</Button>
            <Button variant="outline">2023</Button>
            <Button variant="outline">Lihat Semua</Button>
          </div>

          {/* Budget Data */}
          <Suspense
            fallback={
              <Card>
                <CardContent className="flex items-center justify-center h-64">
                  <p className="text-muted-foreground">Memuat data APBN...</p>
                </CardContent>
              </Card>
            }
          >
            <APBNData locale={locale} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "national" });

  return {
    title: "APBN 2025 - Anggaran Pendapatan dan Belanja Negara",
    description:
      "Transparansi lengkap APBN Indonesia 2025 dengan visualisasi interaktif",
    openGraph: {
      title: "APBN 2025 - Budget ForPublic.id",
      description:
        "Transparansi lengkap APBN Indonesia 2025 dengan visualisasi interaktif",
    },
  };
}
