import { createBrowserRouter } from 'react-router-dom'

import { ErrorBoundaryPage } from '@/pages/error-boundary/error-boundary-page'
import { HomePage } from '@/pages/home/home-page'
import { NotFoundPage } from '@/pages/not-found/not-found-page'
import { UserDetailsPage } from '@/pages/user-details/user-details-page'
import { UsersListPage } from '@/pages/users-list/users-list-page'
import { AppShell } from '@/widgets/app-shell/app-shell'

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorBoundaryPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'users',
        element: <AppShell />,
        children: [
          {
            index: true,
            element: <UsersListPage />,
          },
          {
            path: ':userId',
            element: <UserDetailsPage />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_URL,
})
