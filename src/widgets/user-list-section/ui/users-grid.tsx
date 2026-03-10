import { Link } from 'react-router-dom'

import { buttonVariants } from '@/components/ui/button'
import { UserCard } from '@/entities/user/ui/user-card'
import { UserCardSkeleton } from '@/entities/user/ui/user-card-skeleton'
import type { User, UserListFilters } from '@/entities/user/model/types'
import { cn } from '@/lib/utils'

type UsersGridProps = {
  filters: UserListFilters
  isFetchingNextPage: boolean
  isLoading: boolean
  search: string
  users: User[]
}

const skeletonItems = Array.from({ length: 10 }, (_, index) => index)

export function UsersGrid({
  filters,
  isFetchingNextPage,
  isLoading,
  search,
  users,
}: UsersGridProps) {
  const safeUsers = users.filter((user): user is User => Boolean(user?.id))

  return (
    <div
      className={cn(
        'grid items-stretch gap-3',
        filters.view === 'cards'
          ? 'grid-cols-[repeat(auto-fit,minmax(250px,1fr))]'
          : 'grid-cols-1',
      )}
    >
      {isLoading
        ? skeletonItems.map((item) => (
            <UserCardSkeleton key={item} compact={filters.view === 'compact'} />
          ))
        : (
            <>
              {safeUsers.map((user) => (
                <Link
                  className={cn(
                    buttonVariants({ variant: 'ghost' }),
                    'flex h-full w-full min-w-0 self-stretch rounded-3xl border-0 p-0 text-left hover:bg-transparent',
                  )}
                  key={user.id}
                  to={`/users/${user.id}${search}`}
                >
                  <UserCard compact={filters.view === 'compact'} user={user} />
                </Link>
              ))}
              {isFetchingNextPage
                ? skeletonItems.slice(0, 6).map((item) => (
                    <UserCardSkeleton
                      key={`next-page-skeleton-${item}`}
                      compact={filters.view === 'compact'}
                    />
                  ))
                : null}
            </>
          )}
    </div>
  )
}
