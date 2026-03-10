import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query'

import { ApiError, apiClient } from '@/shared/api/http'

import type { PaginatedResponse, Post, User } from '../model/types'

const USERS_PAGE_SIZE = 30

type UsersResponse = PaginatedResponse<User>

function normalizeUsersResponse(response: Partial<UsersResponse>) {
  return {
    limit: typeof response.limit === 'number' ? response.limit : 0,
    skip: typeof response.skip === 'number' ? response.skip : 0,
    total: typeof response.total === 'number' ? response.total : 0,
    users: Array.isArray(response.users) ? response.users.filter(Boolean) : [],
  } satisfies UsersResponse
}

async function getUsersPage(skip: number, limit = USERS_PAGE_SIZE) {
  const response = await apiClient.get<Partial<UsersResponse>>(`/users?limit=${limit}&skip=${skip}`)
  return normalizeUsersResponse(response)
}

async function getUsersBySearch(query: string) {
  const encodedQuery = encodeURIComponent(query)
  const response = await apiClient.get<Partial<UsersResponse>>(
    `/users/search?q=${encodedQuery}&limit=0`,
  )
  return normalizeUsersResponse(response).users
}

async function getUsersByCity(city: string) {
  const encodedCity = encodeURIComponent(city)
  const response = await apiClient.get<Partial<UsersResponse>>(
    `/users/filter?key=address.city&value=${encodedCity}&limit=0`,
  )
  return normalizeUsersResponse(response).users
}

async function getAllUsers() {
  const response = await apiClient.get<Partial<UsersResponse>>('/users?limit=0')
  return normalizeUsersResponse(response).users
}

async function getUserById(userId: number) {
  const user = await apiClient.get<Partial<User>>(`/users/${userId}`)

  if (!user.id) {
    throw new ApiError(404, 'Пользователь не найден')
  }

  return user as User
}

async function getUserPosts(userId: number) {
  const response = await apiClient.get<{ posts: Post[] }>(`/users/${userId}/posts?limit=6`)
  return response.posts
}

export function infiniteUsersQueryOptions() {
  return infiniteQueryOptions({
    queryKey: ['users', 'infinite'],
    queryFn: ({ pageParam }) => getUsersPage(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextSkip = lastPage.skip + lastPage.limit
      return nextSkip < lastPage.total ? nextSkip : undefined
    },
  })
}

export function usersSearchQueryOptions(query: string) {
  return queryOptions({
    queryKey: ['users', 'search', query],
    queryFn: () => getUsersBySearch(query),
  })
}

export function usersByCityQueryOptions(city?: string) {
  return queryOptions({
    queryKey: city ? ['users', 'city', city] : ['users', 'all'],
    queryFn: () => (city ? getUsersByCity(city) : getAllUsers()),
  })
}

export const userDetailsQueryOptions = (userId: number) =>
  queryOptions({
    queryKey: ['user', userId],
    queryFn: () => getUserById(userId),
  })

export const userPostsQueryOptions = (userId: number) =>
  queryOptions({
    queryKey: ['user-posts', userId],
    queryFn: () => getUserPosts(userId),
  })
