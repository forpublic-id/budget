import { FileX, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 via-white to-neutral-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <FileX className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Halaman Tidak Ditemukan
          </CardTitle>
          <CardDescription className="text-gray-600">
            Maaf, halaman yang Anda cari tidak dapat ditemukan. 
            Kemungkinan halaman telah dipindahkan atau tidak tersedia.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <span className="text-6xl font-bold text-gray-300">404</span>
          </div>
          <div className="flex gap-2">
            <Button 
              asChild
              className="flex-1 flex items-center gap-2"
            >
              <Link href="/">
                <Home className="h-4 w-4" />
                Kembali ke Beranda
              </Link>
            </Button>
            <Button 
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}