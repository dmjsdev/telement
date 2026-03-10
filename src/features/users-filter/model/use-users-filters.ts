import { startTransition, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import type { UserListFilters, UserSort, UserView } from '@/entities/user/model/types'

const defaultFilters: UserListFilters = {
  query: '',
  city: 'all',
  sort: 'name',
  view: 'cards',
}

const sortOptions = new Set<UserSort>(['name', 'city'])
const viewOptions = new Set<UserView>(['cards', 'compact'])

export function useUsersFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters = useMemo<UserListFilters>(() => {
    const sort = searchParams.get('sort')
    const view = searchParams.get('view')

    return {
      query: searchParams.get('query') ?? defaultFilters.query,
      city: searchParams.get('city') ?? defaultFilters.city,
      sort: sortOptions.has(sort as UserSort) ? (sort as UserSort) : defaultFilters.sort,
      view: viewOptions.has(view as UserView) ? (view as UserView) : defaultFilters.view,
    }
  }, [searchParams])

  const setParam = (key: string, value: string, fallback: string) => {
    const nextSearchParams = new URLSearchParams(searchParams)

    if (!value || value === fallback) {
      nextSearchParams.delete(key)
    } else {
      nextSearchParams.set(key, value)
    }

    startTransition(() => {
      setSearchParams(nextSearchParams, { replace: true })
    })
  }

  const resetFilters = () => {
    startTransition(() => {
      setSearchParams({}, { replace: true })
    })
  }

  return {
    filters,
    hasActiveFilters:
      filters.query !== defaultFilters.query ||
      filters.city !== defaultFilters.city ||
      filters.sort !== defaultFilters.sort ||
      filters.view !== defaultFilters.view,
    resetFilters,
    search: searchParams.size > 0 ? `?${searchParams.toString()}` : '',
    updateCity: (city: string) => setParam('city', city, defaultFilters.city),
    updateQuery: (query: string) => setParam('query', query.trimStart(), defaultFilters.query),
    updateSort: (sort: UserSort) => setParam('sort', sort, defaultFilters.sort),
    updateView: (view: UserView) => setParam('view', view, defaultFilters.view),
  }
}
