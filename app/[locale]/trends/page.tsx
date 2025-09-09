import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { TrendingUp, LineChart, BarChart3 } from "lucide-react";

interface TrendsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function TrendsPage({ params }: TrendsPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "trends" });

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
              Fitur analisis tren historis akan segera tersedia untuk memberikan 
              insight mendalam tentang perkembangan anggaran
            </p>
          </div>

          {/* Coming Soon Card */}
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-purple-100 rounded-full">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
              </div>
              <CardTitle className="text-2xl">Fitur Analisis Tren</CardTitle>
              <CardDescription>
                Kami sedang mengembangkan analisis historis yang komprehensif 
                untuk memahami pola dan tren anggaran dari waktu ke waktu
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Fitur yang akan tersedia:</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4" />
                    <span>Analisis pertumbuhan anggaran tahunan</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <LineChart className="h-4 w-4" />
                    <span>Visualisasi tren dalam bentuk grafik line chart</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4" />
                    <span>Perbandingan alokasi kategori lintas tahun</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Preview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">APBN 2025 vs 2024</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">+8.2%</div>
                <p className="text-sm text-gray-600">Pertumbuhan total anggaran</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Fokus Pendidikan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">20%</div>
                <p className="text-sm text-gray-600">dari total APBN 2025</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Infrastruktur</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">Rp 425T</div>
                <p className="text-sm text-gray-600">Alokasi tahun 2025</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Navigation */}
          <div className="text-center">
            <p className="text-gray-600 mb-4">Sementara ini, Anda dapat menjelajahi:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="p-4 border rounded-lg">
                <Link href={`/${locale}/national`} className="text-blue-600 hover:text-blue-800">
                  <h4 className="font-semibold">APBN</h4>
                  <p className="text-sm text-gray-600">Anggaran Nasional</p>
                </Link>
              </div>
              <div className="p-4 border rounded-lg">
                <Link href={`/${locale}/regional`} className="text-blue-600 hover:text-blue-800">
                  <h4 className="font-semibold">APBD</h4>
                  <p className="text-sm text-gray-600">Anggaran Daerah</p>
                </Link>
              </div>
            </div>
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
  const t = await getTranslations({ locale, namespace: "trends" });

  return {
    title: "Analisis Tren Anggaran - Budget ForPublic.id",
    description: "Analisis historis dan tren perkembangan anggaran Indonesia",
  };
}