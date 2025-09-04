import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import {
  Users,
  Target,
  Database,
  Shield,
  Heart,
  ExternalLink,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { fetchDataSources, fetchMethodology } from "@/lib/data";

interface AboutPageProps {
  params: Promise<{
    locale: string;
  }>;
}

async function DataSourcesSection({ locale }: { locale: string }) {
  try {
    const sources = await fetchDataSources();

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sources.map((source) => (
          <Card key={source.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-base">
                  {source.name[locale as keyof typeof source.name] ||
                    source.name.id}
                </CardTitle>
                <Badge
                  variant={
                    source.reliability === "high" ? "default" : "secondary"
                  }
                  className="text-xs"
                >
                  {source.reliability === "high" ? "Tinggi" : "Sedang"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  Cakupan: {source.coverage.join(", ")}
                </p>
                <p className="text-xs text-gray-500">
                  Update terakhir:{" "}
                  {new Date(source.lastUpdated).toLocaleDateString("id-ID")}
                </p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-3 w-3 mr-2" />
                    Kunjungi Sumber
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  } catch (error) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">Gagal memuat sumber data</p>
        </CardContent>
      </Card>
    );
  }
}

async function MethodologySection({ locale }: { locale: string }) {
  try {
    const methodology = await fetchMethodology();

    if (!methodology) {
      return (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">
              Informasi metodologi tidak tersedia
            </p>
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Pengumpulan Data</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              {methodology.dataCollection[
                locale as keyof typeof methodology.dataCollection
              ] || methodology.dataCollection.id}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pemrosesan Data</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              {methodology.processing[
                locale as keyof typeof methodology.processing
              ] || methodology.processing.id}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Validasi Data</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              {methodology.validation[
                locale as keyof typeof methodology.validation
              ] || methodology.validation.id}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Keterbatasan Data</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {(
                methodology.limitations[
                  locale as keyof typeof methodology.limitations
                ] || methodology.limitations.id
              ).map((limitation, index) => (
                <li key={index} className="text-sm">
                  {limitation}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    );
  } catch (error) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">
            Gagal memuat informasi metodologi
          </p>
        </CardContent>
      </Card>
    );
  }
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  const features = [
    {
      icon: Database,
      title: "Data Komprehensif",
      description:
        "APBN dan APBD dari 34 provinsi dan 514 kabupaten/kota di Indonesia",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: Shield,
      title: "Transparansi Penuh",
      description:
        "Semua data bersumber dari publikasi resmi pemerintah dengan metodologi terbuka",
      color: "bg-green-50 text-green-600",
    },
    {
      icon: Target,
      title: "Akurasi Tinggi",
      description:
        "Data tervalidasi dan diperbarui secara berkala dengan proses quality control",
      color: "bg-orange-50 text-orange-600",
    },
    {
      icon: Users,
      title: "Berbasis Komunitas",
      description:
        "Platform dikembangkan dan dikelola oleh komunitas untuk kepentingan publik",
      color: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Tentang Budget ForPublic.id
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Inisiatif komunitas terbuka untuk mempermudah akses informasi
              anggaran pemerintah Indonesia demi terciptanya transparansi dan
              akuntabilitas publik.
            </p>
            <Badge className="bg-primary/10 text-primary">
              Platform Non-Profit Berbasis Komunitas
            </Badge>
          </div>

          {/* Mission */}
          <Card className="border-primary/20">
            <CardHeader className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl">Misi Kami</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-700 leading-relaxed">
                Menciptakan transparansi anggaran yang mudah diakses dan
                dipahami oleh semua lapisan masyarakat Indonesia. Kami percaya
                bahwa transparansi adalah kunci untuk akuntabilitas pemerintah
                dan partisipasi publik yang lebih baik.
              </p>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Mengapa Budget ForPublic.id?
              </h2>
              <p className="text-gray-600">
                Platform yang dirancang untuk kemudahan akses dan pemahaman data
                anggaran
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature) => {
                const IconComponent = feature.icon;
                return (
                  <Card
                    key={feature.title}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div
                          className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center`}
                        >
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2">
                            {feature.title}
                          </h3>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Data Sources */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Sumber Data
              </h2>
              <p className="text-gray-600">
                Data bersumber dari publikasi resmi pemerintah pusat dan daerah
              </p>
            </div>

            <Suspense
              fallback={
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <Card key={i} className="animate-pulse">
                      <CardContent className="h-32" />
                    </Card>
                  ))}
                </div>
              }
            >
              <DataSourcesSection locale={locale} />
            </Suspense>
          </div>

          {/* Methodology */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Metodologi
              </h2>
              <p className="text-gray-600">
                Proses pengumpulan, pemrosesan, dan validasi data anggaran
              </p>
            </div>

            <Suspense
              fallback={
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-muted-foreground">
                      Memuat informasi metodologi...
                    </p>
                  </CardContent>
                </Card>
              }
            >
              <MethodologySection locale={locale} />
            </Suspense>
          </div>

          {/* Contact & Contribute */}
          <Card className="bg-gray-900 text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold mb-4">Berkontribusi</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Budget ForPublic.id adalah proyek open source yang dikelola oleh
                komunitas. Kami mengundang Anda untuk berkontribusi dalam
                pengembangan platform ini.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" asChild>
                  <a
                    href="https://github.com/forpublic-id"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub Repository
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  asChild
                >
                  <a
                    href="https://forpublic.id/contact"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Hubungi Kami
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-orange-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-orange-800 mb-2">
                    Disclaimer
                  </h4>
                  <p className="text-sm text-orange-700 leading-relaxed">
                    Budget ForPublic.id adalah inisiatif komunitas independen
                    yang tidak berafiliasi dengan pemerintah Indonesia. Data
                    yang disajikan bersumber dari publikasi resmi pemerintah
                    namun interpretasi dan analisis merupakan hasil kerja
                    komunitas. Untuk keperluan resmi, silakan merujuk langsung
                    ke sumber data pemerintah.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
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
    title: "Tentang Budget ForPublic.id",
    description: "Inisiatif komunitas untuk transparansi anggaran Indonesia",
    openGraph: {
      title: "Tentang - Budget ForPublic.id",
      description: "Inisiatif komunitas untuk transparansi anggaran Indonesia",
    },
  };
}
