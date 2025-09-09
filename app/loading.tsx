import { Card, CardContent, CardHeader } from '@/components/ui/Card';

function SkeletonBox({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded-md ${className || 'h-4'}`} />
  );
}

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-50">
      {/* Hero Section Skeleton */}
      <section className="py-24 px-4">
        <div className="relative max-w-6xl mx-auto text-center space-y-6">
          <SkeletonBox className="h-8 w-32 mx-auto" />
          <SkeletonBox className="h-16 w-3/4 mx-auto" />
          <SkeletonBox className="h-6 w-1/2 mx-auto" />
          <div className="flex justify-center gap-4">
            <SkeletonBox className="h-12 w-32" />
            <SkeletonBox className="h-12 w-32" />
          </div>
        </div>
      </section>

      {/* Stats Section Skeleton */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="p-6">
                <CardContent className="space-y-2">
                  <SkeletonBox className="h-4 w-20" />
                  <SkeletonBox className="h-8 w-16" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Budget Preview Skeleton */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <SkeletonBox className="h-10 w-64 mx-auto" />
              <SkeletonBox className="h-6 w-96 mx-auto" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="overflow-hidden">
                <CardHeader className="pb-4">
                  <SkeletonBox className="h-6 w-48" />
                  <SkeletonBox className="h-4 w-64" />
                </CardHeader>
                <CardContent className="pt-2">
                  <SkeletonBox className="h-80 w-full" />
                </CardContent>
              </Card>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <Card key={i}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <SkeletonBox className="h-4 w-16" />
                        <SkeletonBox className="h-8 w-8 rounded-lg" />
                      </CardHeader>
                      <CardContent>
                        <SkeletonBox className="h-8 w-20 mb-1" />
                        <SkeletonBox className="h-3 w-32" />
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card>
                  <CardHeader>
                    <SkeletonBox className="h-6 w-48" />
                    <SkeletonBox className="h-4 w-64" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <SkeletonBox className="w-8 h-8 rounded-full" />
                            <div>
                              <SkeletonBox className="h-4 w-32 mb-1" />
                              <SkeletonBox className="h-3 w-24" />
                            </div>
                          </div>
                          <SkeletonBox className="h-4 w-20" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}