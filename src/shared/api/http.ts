const API_BASE_URL = 'https://dummyjson.com'

export class ApiError extends Error {
  public readonly status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function request<T>(path: string, init?: RequestInit) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      Accept: 'application/json',
      ...init?.headers,
    },
  })

  if (!response.ok) {
    throw new ApiError(response.status, `Ошибка запроса: ${response.status}`)
  }

  return (await response.json()) as T
}

export const apiClient = {
  get: <T>(path: string) => request<T>(path),
}
