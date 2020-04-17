import { APIClient } from '@/infrastructure/network/<%= appName %>/APIClient'

export class <%= appName %>GatewayBase {
  apiClient: APIClient

  constructor(apiClient: APIClient) {
    this.apiClient = apiClient
  }
}
