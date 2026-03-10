import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useLocation, useParams } from 'react-router-dom'

import { userDetailsQueryOptions, userPostsQueryOptions } from '@/entities/user/api/user-queries'
import { UserDetailsPanel } from '@/widgets/user-details-panel/user-details-panel'

export function UserDetailsPage() {
  const { userId } = useParams()
  const location = useLocation()
  const parsedUserId = Number(userId)
  const isValidUserId = Number.isInteger(parsedUserId) && parsedUserId > 0

  const userQuery = useQuery({
    ...userDetailsQueryOptions(parsedUserId),
    enabled: isValidUserId,
  })
  const postsQuery = useQuery({
    ...userPostsQueryOptions(parsedUserId),
    enabled: isValidUserId,
  })

  const backHref = useMemo(() => `/${location.search}`, [location.search])

  return (
    <UserDetailsPanel
      backHref={backHref}
      isValidUserId={isValidUserId}
      postsQuery={postsQuery}
      userQuery={userQuery}
    />
  )
}
