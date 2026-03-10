import { useEffect } from 'react'
import { LoaderCircle } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useIntersection } from '@/shared/lib/hooks/use-intersection'

type UsersLoadMoreTriggerProps = {
  canLoadMore: boolean
  isFetchingNextPage: boolean
  isFilteredMode: boolean
  onLoadMore: () => void
}

export function UsersLoadMoreTrigger({
  canLoadMore,
  isFetchingNextPage,
  isFilteredMode,
  onLoadMore,
}: UsersLoadMoreTriggerProps) {
  const { isIntersecting, setNode } = useIntersection<HTMLDivElement>('320px 0px')

  useEffect(() => {
    if (isFilteredMode || !canLoadMore || isFetchingNextPage || !isIntersecting) {
      return
    }

    void onLoadMore()
  }, [canLoadMore, isFetchingNextPage, isFilteredMode, isIntersecting, onLoadMore])

  if (isFilteredMode) {
    return null
  }

  return (
    <div ref={setNode}>
      <Card className="border-border/70 bg-card/80 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">
            {canLoadMore ? 'Подгружаем следующие карточки' : 'Все пользователи загружены'}
          </CardTitle>
          <CardDescription>
            {canLoadMore
              ? 'Следующая страница догрузится автоматически при прокрутке.'
              : 'Серверный список DummyJSON исчерпан.'}
          </CardDescription>
        </CardHeader>
        {isFetchingNextPage ? (
          <CardContent className="flex items-center gap-2 text-sm text-muted-foreground">
            <LoaderCircle className="size-4 animate-spin" />
            Загружается следующая страница
          </CardContent>
        ) : null}
      </Card>
    </div>
  )
}
