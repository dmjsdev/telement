import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

type UserCardSkeletonProps = {
  compact?: boolean
}

export function UserCardSkeleton({ compact = false }: UserCardSkeletonProps) {
  return (
    <Card
      className="h-full w-full min-w-0 border-border/70 bg-card/80 shadow-sm"
      size={compact ? 'sm' : 'default'}
    >
      <CardHeader className={cn('gap-3', compact && 'gap-2')}>
        <div className="flex items-center gap-3">
          <Skeleton className="size-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
      </CardHeader>
      <CardContent className="grid gap-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-3/4" />
      </CardContent>
      <CardFooter className="justify-between">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-28" />
      </CardFooter>
    </Card>
  )
}
