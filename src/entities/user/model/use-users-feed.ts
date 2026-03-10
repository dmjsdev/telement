import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

import {
  infiniteUsersQueryOptions,
  usersByCityQueryOptions,
  usersSearchQueryOptions,
} from '@/entities/user/api/user-queries'

import { filterUsers, getUserCities } from './lib'
import type { UserListFilters } from './types'

export function useUsersFeed(filters: UserListFilters) {
  const citiesQuery = useQuery(usersByCityQueryOptions())
  const cities = getUserCities(citiesQuery.data ?? [])
  const hasSearch = filters.query.trim().length > 0
  const effectiveCity =
    filters.city !== 'all' && cities.includes(filters.city) ? filters.city : 'all'
  const hasCity = effectiveCity !== 'all'
  const isFilteredMode = hasSearch || hasCity

  const infiniteUsersQuery = useInfiniteQuery({
    ...infiniteUsersQueryOptions(),
    enabled: !isFilteredMode,
  })

  const searchUsersQuery = useQuery({
    ...usersSearchQueryOptions(filters.query),
    enabled: hasSearch && !hasCity,
  })

  const cityUsersQuery = useQuery({
    ...usersByCityQueryOptions(effectiveCity),
    enabled: hasCity,
  })

  const loadedInfiniteUsers =
    infiniteUsersQuery.data?.pages.flatMap((page) => page.users ?? []).filter(Boolean) ?? []

  const baseUsers = hasCity
    ? cityUsersQuery.data ?? []
    : hasSearch
      ? searchUsersQuery.data ?? []
      : loadedInfiniteUsers

  const normalizedFilters = {
    ...filters,
    city: effectiveCity,
    query: hasCity ? filters.query : '',
  }

  const users = filterUsers(baseUsers.filter(Boolean), normalizedFilters)
  const total =
    hasCity || hasSearch
      ? users.length
      : infiniteUsersQuery.data?.pages[0]?.total ?? loadedInfiniteUsers.length

  return {
    cities,
    hasNextPage: infiniteUsersQuery.hasNextPage,
    isError:
      Boolean(citiesQuery.isError) ||
      Boolean(
        isFilteredMode
          ? hasCity
            ? cityUsersQuery.isError
            : searchUsersQuery.isError
          : infiniteUsersQuery.isError,
      ),
    isFetchingNextPage: infiniteUsersQuery.isFetchingNextPage,
    isFilteredMode,
    isLoading:
      citiesQuery.isLoading ||
      (isFilteredMode
        ? hasCity
          ? cityUsersQuery.isLoading
          : searchUsersQuery.isLoading
        : infiniteUsersQuery.isLoading),
    total,
    users,
    visibleCount: users.length,
    fetchNextPage: () => infiniteUsersQuery.fetchNextPage(),
    refetch: () => {
      if (hasCity) {
        return cityUsersQuery.refetch()
      }

      if (hasSearch) {
        return searchUsersQuery.refetch()
      }

      return infiniteUsersQuery.refetch()
    },
  }
}
