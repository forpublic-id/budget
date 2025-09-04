import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { MapPin, Building2, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import BudgetOverview from "@/components/budget/BudgetOverview";
import BudgetChart from "@/components/budget/BudgetChart";
import { fetchRegionalBudget, getAvailableRegions } from "@/lib/data";

interface RegionalPageProps {
  params: Promise<{
    locale: string;
  }>;
}

async function RegionalBudgetData({
  locale,
  selectedRegion,
}: {
  locale: string;
  selectedRegion: string;
}) {
  try {
    const budgetData = await fetchRegionalBudget("provinces", selectedRegion);

    return (
      <div className="space-y-8">
        <BudgetOverview data={budgetData} locale={locale} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Struktur Belanja APBD</CardTitle>
              <CardDescription>
                Distribusi anggaran belanja daerah berdasarkan kategori
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
            Gagal memuat data APBD. Silakan pilih daerah lain.
          </p>
        </CardContent>
      </Card>
    );
  }
}

async function RegionSelector({ locale }: { locale: string }) {
  const regions = await getAvailableRegions();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {regions.map((region) => (
        <Card
          key={region.id}
          className="hover:shadow-md transition-shadow cursor-pointer"
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">{region.name}</CardTitle>
              </div>
              <Badge variant="secondary" className="text-xs">
                {region.type === "province" ? "Provinsi" : "Kab/Kota"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              Lihat detail anggaran daerah {region.name}
            </CardDescription>
            <Button variant="outline" size="sm" className="w-full">
              Lihat APBD
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default async function RegionalPage({ params }: RegionalPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "regional" });

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              APBD - Anggaran Pendapatan dan Belanja Daerah
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Transparansi anggaran daerah di seluruh Indonesia. Pilih provinsi
              atau kabupaten/kota untuk melihat detail anggaran daerah.
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold text-primary">
                  34
                </CardTitle>
                <CardDescription className="flex items-center justify-center space-x-2">
                  <Building2 className="h-4 w-4" />
                  <span>Provinsi</span>
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold text-primary">
                  514
                </CardTitle>
                <CardDescription className="flex items-center justify-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Kabupaten/Kota</span>
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold text-primary">
                  Rp 920+ T
                </CardTitle>
                <CardDescription className="flex items-center justify-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Total APBD</span>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Featured Region - DKI Jakarta */}
          <Card className="border-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">
                    APBD DKI Jakarta 2025
                  </CardTitle>
                  <CardDescription>
                    Contoh transparansi anggaran daerah - Provinsi DKI Jakarta
                  </CardDescription>
                </div>
                <Badge className="bg-primary/10 text-primary">Featured</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Suspense
                fallback={
                  <div className="flex items-center justify-center h-32">
                    <p className="text-muted-foreground">
                      Memuat data APBD Jakarta...
                    </p>
                  </div>
                }
              >
                <RegionalBudgetData
                  locale={locale}
                  selectedRegion="dki-jakarta"
                />
              </Suspense>
            </CardContent>
          </Card>

          {/* Region Selection */}
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">Pilih Daerah</h2>
              <p className="text-gray-600">
                Klik pada daerah untuk melihat detail anggaran APBD
              </p>
            </div>

            <Suspense
              fallback={
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <Card key={i} className="animate-pulse">
                      <CardContent className="h-32" />
                    </Card>
                  ))}
                </div>
              }
            >
              <RegionSelector locale={locale} />
            </Suspense>
          </div>
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

  return {
    title: "APBD - Anggaran Daerah Indonesia",
    description:
      "Transparansi anggaran daerah di seluruh Indonesia dengan visualisasi interaktif",
    openGraph: {
      title: "APBD - Budget ForPublic.id",
      description:
        "Transparansi anggaran daerah di seluruh Indonesia dengan visualisasi interaktif",
    },
  };
}
