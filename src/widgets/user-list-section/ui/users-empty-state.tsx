import { UsersRound } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type UsersEmptyStateProps = {
  onReset: () => void
}

export function UsersEmptyState({ onReset }: UsersEmptyStateProps) {
  return (
    <Card className="border-dashed border-border/80 bg-card/75 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <UsersRound className="size-5 text-muted-foreground" />
          Ничего не найдено
        </CardTitle>
        <CardDescription>
          Попробуйте сбросить фильтры или изменить поисковый запрос.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={onReset} size="sm" variant="outline">
          Сбросить параметры
        </Button>
      </CardContent>
    </Card>
  )
}
