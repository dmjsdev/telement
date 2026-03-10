import { useUsersFilters } from '@/features/users-filter/model/use-users-filters'
import { useUsersFeed } from '@/entities/user/model/use-users-feed'
import { useDebouncedValue } from '@/shared/lib/hooks/use-debounced-value'
import { UserListSection } from '@/widgets/user-list-section/user-list-section'

export function UsersListPage() {
  const { filters, search, updateCity, updateQuery, updateSort, updateView, resetFilters } =
    useUsersFilters()
  const debouncedQuery = useDebouncedValue(filters.query, 350)
  const usersFeed = useUsersFeed({
    ...filters,
    query: debouncedQuery,
  })

  return (
    <UserListSection
      cities={usersFeed.cities}
      fetchNextPage={usersFeed.fetchNextPage}
      filters={filters}
      hasNextPage={usersFeed.hasNextPage}
      isError={usersFeed.isError}
      isFetchingNextPage={usersFeed.isFetchingNextPage}
      isFilteredMode={usersFeed.isFilteredMode}
      isLoading={usersFeed.isLoading}
      onCityChange={updateCity}
      onQueryChange={updateQuery}
      onReset={resetFilters}
      onRetry={() => void usersFeed.refetch()}
      onSortChange={updateSort}
      onViewChange={updateView}
      search={search}
      total={usersFeed.total}
      users={usersFeed.users}
      visibleCount={usersFeed.visibleCount}
    />
  )
}
