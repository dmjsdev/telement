import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl items-center px-4 py-10">
      <Alert className="border-border/70 bg-card/90 shadow-sm">
        <Compass className="size-4" />
        <AlertTitle>Маршрут не найден</AlertTitle>
        <AlertDescription className="mt-1">
          Запрошенная страница отсутствует. Вернуться к списку пользователей можно одним
          кликом.
        </AlertDescription>
        <div className="mt-4">
          <Link className={cn(buttonVariants({ size: 'sm' }))} to="/">
            К списку
          </Link>
        </div>
      </Alert>
    </div>
  )
}
