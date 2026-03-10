export type Address = {
  city: string
  country: string
  postalCode: string
  state: string
  street: string
  stateCode: string
  coordinates: {
    lat: number
    lng: number
  }
}

export type Company = {
  department: string
  name: string
  title: string
}

export type UserHair = {
  color: string
  type: string
}

export type UserBank = {
  cardExpire: string
  cardNumber: string
  cardType: string
  currency: string
  iban: string
}

export type UserCrypto = {
  coin: string
  network: string
  wallet: string
}

export type UserCompanyAddress = {
  address: string
  city: string
  coordinates: {
    lat: number
    lng: number
  }
  country: string
  postalCode: string
  state: string
}

export type User = {
  address: Address
  age: number
  birthDate: string
  bloodGroup: string
  company: Company & {
    address: UserCompanyAddress
  }
  email: string
  eyeColor: string
  firstName: string
  gender: string
  hair: UserHair
  id: number
  image: string
  ip: string
  lastName: string
  maidenName: string
  macAddress: string
  phone: string
  university: string
  userAgent: string
  username: string
  height: number
  weight: number
  bank: UserBank
  crypto: UserCrypto
}

export type Post = {
  body: string
  id: number
  title: string
  userId: number
}

export type PaginatedResponse<T> = {
  limit: number
  skip: number
  total: number
  users: T[]
}

export type UserSort = 'name' | 'city'

export type UserView = 'cards' | 'compact'

export type UserListFilters = {
  city: string
  query: string
  sort: UserSort
  view: UserView
}
