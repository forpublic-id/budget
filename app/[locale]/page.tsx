import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ArrowRight, PieChart, MapPin, BarChart3, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import BudgetOverview from "@/components/budget/BudgetOverview";
import BudgetChart from "@/components/budget/BudgetChart";
import { fetchNationalBudget } from "@/lib/data";

interface HomePageProps {
  params: Promise<{
    locale: string;
  }>;
}

async function BudgetPreview({ locale }: { locale: string }) {
  try {
    const budgetData = await fetchNationalBudget(2025);
    
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Struktur APBN 2025</CardTitle>
              <CardDescription>
                Distribusi belanja berdasarkan kategori
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BudgetChart 
                data={budgetData} 
                type="pie" 
                height={300} 
                locale={locale}
              />
            </CardContent>
          </Card>
          
          <BudgetOverview data={budgetData} locale={locale} />
        </div>
      </div>
    );
  } catch (error) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">
            Data anggaran sedang dimuat...
          </p>
        </CardContent>
      </Card>
    );
  }
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "homepage" });
  
  const features = [
    {
      key: "budget_visualization",
      icon: PieChart,
      color: "bg-blue-50 text-blue-600",
    },
    {
      key: "regional_comparison", 
      icon: MapPin,
      color: "bg-green-50 text-green-600",
    },
    {
      key: "trend_analysis",
      icon: TrendingUp,
      color: "bg-purple-50 text-purple-600",
    },
    {
      key: "search_explore",
      icon: BarChart3,
      color: "bg-orange-50 text-orange-600",
    },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            {t("hero.title")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("hero.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href={`/${locale}/national`} className="flex items-center gap-2">
                {t("hero.cta_primary")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link href={`/${locale}/regional`} className="flex items-center gap-2">
                {t("hero.cta_secondary")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-muted/50">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t("stats.apbn_title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{t("stats.apbn_amount")}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t("stats.apbd_title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{t("stats.apbd_amount")}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Cakupan Data
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{t("stats.regions")}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Kab/Kota
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{t("stats.cities")}</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Budget Preview */}
      <section className="container mx-auto px-4 py-16">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Ringkasan APBN 2025</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Gambaran umum anggaran pendapatan dan belanja negara tahun ini
            </p>
          </div>
          
          <Suspense fallback={
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <p className="text-muted-foreground">Memuat data anggaran...</p>
              </CardContent>
            </Card>
          }>
            <BudgetPreview locale={locale} />
          </Suspense>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">{t("features.title")}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Jelajahi fitur-fitur yang membantu memahami anggaran pemerintah
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <Card key={feature.key} className="text-center">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${feature.color} mx-auto flex items-center justify-center mb-4`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg">
                      {t(`features.${feature.key}.title`)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      {t(`features.${feature.key}.description`)}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold">
              Mulai Jelajahi Transparansi Anggaran
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Dapatkan akses ke data APBN dan APBD terlengkap dengan analisis mendalam
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" asChild size="lg">
                <Link href={`/${locale}/national`}>
                  Lihat APBN
                </Link>
              </Button>
              <Button variant="outline" asChild size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
                <Link href={`/${locale}/regional`}>
                  Jelajahi APBD
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "homepage" });

  return {
    title: t("title"),
    description: t("subtitle"),
    openGraph: {
      title: t("title"),
      description: t("subtitle"),
    },
  };
}