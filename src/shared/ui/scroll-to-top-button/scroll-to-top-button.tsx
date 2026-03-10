import { ArrowUp } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useScrollThreshold } from '@/shared/lib/hooks/use-scroll-threshold'

export function ScrollToTopButton() {
  const isVisible = useScrollThreshold(360)

  if (!isVisible) {
    return null
  }

  return (
    <Button
      aria-label="Вернуться наверх"
      className="fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-50 rounded-full shadow-lg sm:right-6 sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))]"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      size="icon-lg"
    >
      <ArrowUp className="size-5" />
    </Button>
  )
}
