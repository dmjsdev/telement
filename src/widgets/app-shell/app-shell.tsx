import { Outlet } from 'react-router-dom'

import { ScrollToTopButton } from '@/shared/ui/scroll-to-top-button/scroll-to-top-button'

export function AppShell() {
  return (
    <div className="min-h-screen animate-page-enter">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-3 py-4 sm:px-4 lg:px-6 lg:py-6">
        <Outlet />
      </div>
      <ScrollToTopButton />
    </div>
  )
}
