// app/clients/[id]/loading.tsx
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Skeleton className="h-6 w-40 mb-4" />
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>

          <Separator />

          <div>
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2].map((index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-6 w-32" />
                      <Skeleton className="h-6 w-20" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Separator />

          <div className="flex space-x-4">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
