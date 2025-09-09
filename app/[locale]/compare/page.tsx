import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { ArrowUpDown, BarChart3, PieChart } from "lucide-react";

interface ComparePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function ComparePage({ params }: ComparePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "compare" });

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Perbandingan Anggaran
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Fitur perbandingan anggaran akan segera tersedia untuk membantu 
              analisis antar daerah
            </p>
          </div>

          {/* Coming Soon Card */}
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <ArrowUpDown className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-2xl">Fitur Perbandingan</CardTitle>
              <CardDescription>
                Kami sedang mengembangkan tools perbandingan yang komprehensif 
                untuk analisis anggaran lintas wilayah
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Fitur yang akan tersedia:</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center space-x-2">
                    <ArrowUpDown className="h-4 w-4" />
                    <span>Perbandingan anggaran antar provinsi dan kab/kota</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4" />
                    <span>Visualisasi perbandingan dalam bentuk grafik</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <PieChart className="h-4 w-4" />
                    <span>Analisis proporsi anggaran per kategori</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

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
  const t = await getTranslations({ locale, namespace: "compare" });

  return {
    title: "Perbandingan Anggaran - Budget ForPublic.id",
    description: "Bandingkan anggaran APBN dan APBD antar wilayah Indonesia",
  };
}