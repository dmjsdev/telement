import { AlertCircle, RefreshCcw } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import type { User, UserListFilters, UserSort, UserView } from '@/entities/user/model/types'
import { UsersFilterPanel } from '@/features/users-filter/ui/users-filter-panel'

import { UsersEmptyState } from './ui/users-empty-state'
import { UsersGrid } from './ui/users-grid'
import { UsersListHeader } from './ui/users-list-header'
import { UsersLoadMoreTrigger } from './ui/users-load-more-trigger'

type UserListSectionProps = {
  cities: string[]
  fetchNextPage: () => void
  filters: UserListFilters
  hasNextPage: boolean
  isError: boolean
  isFetchingNextPage: boolean
  isFilteredMode: boolean
  isLoading: boolean
  onCityChange: (city: string) => void
  onQueryChange: (query: string) => void
  onReset: () => void
  onRetry: () => void
  onSortChange: (sort: UserSort) => void
  onViewChange: (view: UserView) => void
  search: string
  total: number
  users: User[]
  visibleCount: number
}

export function UserListSection({
  cities,
  fetchNextPage,
  filters,
  hasNextPage,
  isError,
  isFetchingNextPage,
  isFilteredMode,
  isLoading,
  onCityChange,
  onQueryChange,
  onReset,
  onRetry,
  onSortChange,
  onViewChange,
  search,
  total,
  users,
  visibleCount,
}: UserListSectionProps) {
  return (
    <div className="grid flex-1 gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
      <aside className="hidden lg:block animate-page-enter animate-page-enter-delay-1">
        <UsersFilterPanel
          cities={cities}
          filters={filters}
          onCityChange={onCityChange}
          onQueryChange={onQueryChange}
          onReset={onReset}
          onSortChange={onSortChange}
          onViewChange={onViewChange}
        />
      </aside>

      <section className="flex min-w-0 flex-col gap-4">
        <div className="animate-page-enter animate-page-enter-delay-1">
        <UsersListHeader
          cities={cities}
          filters={filters}
          onCityChange={onCityChange}
          onQueryChange={onQueryChange}
          onReset={onReset}
          onSortChange={onSortChange}
          onViewChange={onViewChange}
          total={total}
          visibleCount={visibleCount}
        />
        </div>

        {isError ? (
          <Alert
            className="border-destructive/30 bg-card/90 shadow-sm animate-page-enter animate-page-enter-delay-2"
            variant="destructive"
          >
            <AlertCircle className="size-4" />
            <AlertTitle>Не удалось загрузить пользователей</AlertTitle>
            <AlertDescription>
              Проверьте соединение или повторите запрос. Интерфейс показывает ошибку отдельно от
              данных, чтобы состояние было явным.
            </AlertDescription>
            <div className="mt-4">
              <Button onClick={onRetry} size="sm" variant="secondary">
                <RefreshCcw className="size-4" />
                Повторить
              </Button>
            </div>
          </Alert>
        ) : null}

        <div className="animate-page-enter animate-page-enter-delay-2">
          <UsersGrid
            filters={filters}
            isFetchingNextPage={isFetchingNextPage}
            isLoading={isLoading}
            search={search}
            users={users}
          />
        </div>

        {!isLoading && !isError && users.length === 0 ? (
          <div className="animate-page-enter animate-page-enter-delay-3">
            <UsersEmptyState onReset={onReset} />
          </div>
        ) : null}

        {!isLoading && !isError && users.length > 0 ? (
          <div className="animate-page-enter animate-page-enter-delay-3">
            <UsersLoadMoreTrigger
              canLoadMore={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              isFilteredMode={isFilteredMode}
              onLoadMore={fetchNextPage}
            />
          </div>
        ) : null}
      </section>
    </div>
  )
}
