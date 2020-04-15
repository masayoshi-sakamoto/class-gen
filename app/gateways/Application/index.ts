import Company from './company'
import { APIClient } from '@/infrastructure/network/Application/APIClient'

export default class ApplicationGateway {
  apiClient: APIClient
  Company: Company

  constructor(apiClient: APIClient) {
    this.apiClient = apiClient
    this.Company = new Company(apiClient)
  }
}

export const ApplicationGatewayFactory = (): ApplicationGateway => {
  const apiClient = new APIClient()
  return new ApplicationGateway(apiClient)
}
