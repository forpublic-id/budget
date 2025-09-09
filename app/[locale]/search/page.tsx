import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Search, Filter, Download } from "lucide-react";

interface SearchPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function SearchPage({ params }: SearchPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "search" });

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Pencarian Anggaran
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Fitur pencarian akan segera tersedia untuk membantu Anda menemukan 
              data anggaran yang spesifik
            </p>
          </div>

          {/* Coming Soon Card */}
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Search className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <CardTitle className="text-2xl">Fitur Pencarian</CardTitle>
              <CardDescription>
                Kami sedang mengembangkan fitur pencarian yang canggih untuk membantu 
                Anda menemukan informasi anggaran dengan mudah
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Fitur yang akan tersedia:</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center space-x-2">
                    <Search className="h-4 w-4" />
                    <span>Pencarian berdasarkan nama program atau kategori</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Filter className="h-4 w-4" />
                    <span>Filter berdasarkan tahun, daerah, dan kementerian</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>Export hasil pencarian dalam berbagai format</span>
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
              <div className="p-4 border rounded-lg">
                <Link href={`/${locale}/trends`} className="text-blue-600 hover:text-blue-800">
                  <h4 className="font-semibold">Tren</h4>
                  <p className="text-sm text-gray-600">Analisis Historis</p>
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
  const t = await getTranslations({ locale, namespace: "search" });

  return {
    title: "Pencarian Anggaran - Budget ForPublic.id",
    description: "Cari dan filter data anggaran APBN dan APBD Indonesia",
  };
}