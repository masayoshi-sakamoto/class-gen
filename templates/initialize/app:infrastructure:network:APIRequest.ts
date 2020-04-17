import { HTTPMethod } from '@/infrastructure/network/types'

export interface APIRequest<R> {
  response: R
  path: string
  contentType: string
  method: HTTPMethod
  params?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  baseURL?: string
  parse?: (data: any) => R // eslint-disable-line @typescript-eslint/no-explicit-any
}
