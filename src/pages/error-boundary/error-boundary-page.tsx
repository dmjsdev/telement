import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom'
import { AlertTriangle, ArrowLeft } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function ErrorBoundaryPage() {
  const error = useRouteError()

  const description = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : 'Произошла непредвиденная ошибка интерфейса.'

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-2xl items-center px-4">
      <Alert className="border-destructive/30 bg-card/90 shadow-sm" variant="destructive">
        <AlertTriangle className="size-4" />
        <AlertTitle>Интерфейс столкнулся с ошибкой</AlertTitle>
        <AlertDescription className="mt-1">{description}</AlertDescription>
        <div className="mt-4">
          <Link className={cn(buttonVariants({ size: 'sm', variant: 'secondary' }))} to="/">
            <ArrowLeft className="size-4" />
            Вернуться к списку
          </Link>
        </div>
      </Alert>
    </div>
  )
}
