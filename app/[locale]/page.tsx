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

async function BudgetPreview({ locale, tCommon }: { locale: string; tCommon: any }) {
  try {
    const budgetData = await fetchNationalBudget(2025);
    const tBudget = await getTranslations({ locale, namespace: "homepage" });
    
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="overflow-hidden">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-gray-900">{tBudget("budget_preview.structure_title")}</CardTitle>
              <CardDescription className="text-gray-600">
                {tBudget("budget_preview.structure_description")}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <BudgetChart 
                data={budgetData} 
                type="pie" 
                height={350} 
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
            {tCommon("loading_budget_pending")}
          </p>
        </CardContent>
      </Card>
    );
  }
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "homepage" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  
  const features = [
    {
      key: "budget_visualization",
      icon: PieChart,
      color: "bg-neutral-100 text-neutral-700",
    },
    {
      key: "regional_comparison", 
      icon: MapPin,
      color: "bg-neutral-100 text-neutral-700",
    },
    {
      key: "trend_analysis",
      icon: TrendingUp,
      color: "bg-neutral-100 text-neutral-700",
    },
    {
      key: "search_explore",
      icon: BarChart3,
      color: "bg-neutral-100 text-neutral-700",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-neutral-50 via-white to-neutral-50 py-24 px-4">
        <div className="absolute inset-0 bg-grid-neutral-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-neutral-100 text-neutral-800 rounded-full text-sm font-medium mb-6">
            {t("hero.badge")}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {t("hero.title")} <span className="text-black">ForPublic</span><span className="text-red-600">.id</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
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
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6 hover:shadow-md transition-shadow duration-200">
              <CardContent className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">
                  {t("stats.apbn_title")}
                </div>
                <div className="text-3xl font-bold text-gray-900">{t("stats.apbn_amount")}</div>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-md transition-shadow duration-200">
              <CardContent className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">
                  {t("stats.apbd_title")}
                </div>
                <div className="text-3xl font-bold text-gray-900">{t("stats.apbd_amount")}</div>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-md transition-shadow duration-200">
              <CardContent className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">
                  {t("stats.coverage_title")}
                </div>
                <div className="text-3xl font-bold text-gray-900">{t("stats.regions")}</div>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-md transition-shadow duration-200">
              <CardContent className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">
                  {t("stats.cities_title")}
                </div>
                <div className="text-3xl font-bold text-gray-900">{t("stats.cities")}</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Budget Preview */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t("budget_preview.title")}</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                {t("budget_preview.description")}
              </p>
            </div>
          
          <Suspense fallback={
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <p className="text-muted-foreground">{tCommon("loading_budget")}</p>
              </CardContent>
            </Card>
          }>
            <BudgetPreview locale={locale} tCommon={tCommon} />
          </Suspense>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t("features.title")}</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                {t("features_description")}
              </p>
            </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <Card key={feature.key} className="text-center p-6 hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="space-y-4">
                    <div className={`w-12 h-12 rounded-lg ${feature.color} mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg mb-2 text-gray-900">
                        {t(`features.${feature.key}.title`)}
                      </CardTitle>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        {t(`features.${feature.key}.description`)}
                      </CardDescription>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
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