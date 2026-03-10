import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

type UserDetailsSkeletonProps = {
  compact?: boolean
}

export function UserDetailsSkeleton({ compact = false }: UserDetailsSkeletonProps) {
  if (compact) {
    return (
      <>
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-20 w-full rounded-xl" />
        <Skeleton className="h-20 w-full rounded-xl" />
        <Skeleton className="h-20 w-full rounded-xl" />
      </>
    )
  }

  return (
    <Card className="border-border/70 bg-card/80 shadow-sm">
      <CardHeader className="gap-4">
        <div className="flex items-center gap-3">
          <Skeleton className="size-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-28 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <Skeleton className="h-44 w-full rounded-xl" />
        <Skeleton className="h-44 w-full rounded-xl" />
      </CardContent>
    </Card>
  )
}
