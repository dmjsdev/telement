import type { Address, User, UserListFilters } from './types'

const collator = new Intl.Collator('ru', { sensitivity: 'base' })

export function getUserFullName(user: Pick<User, 'firstName' | 'lastName'>) {
  return `${user.firstName} ${user.lastName}`
}

export function getUserCities(users: User[]) {
  return [...new Set(users.map((user) => user.address.city))].sort((left, right) =>
    collator.compare(left, right),
  )
}

export function formatAddress(address: Address) {
  return `${address.city}, ${address.stateCode}, ${address.street}, ${address.postalCode}`
}

export function getInitials(user: Pick<User, 'firstName' | 'lastName'>) {
  return `${user.firstName[0] ?? ''}${user.lastName[0] ?? ''}`.toUpperCase()
}

export function getEmailDomain(email: string) {
  return email.split('@')[1] ?? email
}

export function filterUsers(users: User[], filters: UserListFilters) {
  const query = filters.query.trim().toLowerCase()

  return [...users]
    .filter((user) => {
      const matchesCity = filters.city === 'all' || user.address.city === filters.city

      if (!matchesCity) {
        return false
      }

      if (!query) {
        return true
      }

      const searchIndex = [
        getUserFullName(user),
        user.maidenName,
        user.username,
        user.email,
        user.phone,
        getEmailDomain(user.email),
        user.company.name,
        user.company.title,
        user.address.city,
        user.company.department,
      ]
        .join(' ')
        .toLowerCase()

      return searchIndex.includes(query)
    })
    .sort((left, right) => {
      if (filters.sort === 'city') {
        return (
          collator.compare(left.address.city, right.address.city) ||
          collator.compare(getUserFullName(left), getUserFullName(right))
        )
      }

      return collator.compare(getUserFullName(left), getUserFullName(right))
    })
}

export function normalizeDomain(domain: string | undefined) {
  return (domain ?? '').replace(/^https?:\/\//, '')
}
