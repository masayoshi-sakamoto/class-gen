import { Application, CompanySeed } from '@/infrastructure/network/Application/schema'
import { APIRequest } from '@/infrastructure/network/APIRequest'
import { HTTPMethod } from '@/infrastructure/network/types'

export class GetCompany implements APIRequest<Application.Company.getCompanyResponse> {
  response: Application.Company.getCompanyResponse
  path: string
  contentType = 'application/json'
  method = HTTPMethod.GET
  constructor(companyId: string) {
    this.path = `/companies/${companyId}`
  }
}

export class GetCompanies implements APIRequest<Application.Company.getCompaniesResponse> {
  response: Application.Company.getCompaniesResponse
  path: string
  contentType = 'application/json'
  method = HTTPMethod.GET
  constructor() {
    this.path = '/companies'
  }
}

export class PostCompany implements APIRequest<Application.Company.postCompanyResponse> {
  response: Application.Company.postCompanyResponse
  path: string
  contentType = 'application/json'
  method = HTTPMethod.POST
  params: Application.Company.postCompanyRequest
  constructor(params: CompanySeed) {
    this.params = params
    this.path = '/companies'
  }
}

export class PutCompany implements APIRequest<Application.Company.putCompanyResponse> {
  response: Application.Company.putCompanyResponse
  path: string
  contentType = 'application/json'
  method = HTTPMethod.PUT
  params: Application.Company.putCompanyRequest
  constructor(params: CompanySeed) {
    const companyId = params.id
    this.params = params
    this.path = `/companies/${companyId}`
  }
}

export class DeleteCompany implements APIRequest<Application.Company.deleteCompanyResponse> {
  response: Application.Company.deleteCompanyResponse
  path: string
  contentType = 'application/json'
  method = HTTPMethod.DELETE
  constructor(companyId: string) {
    this.path = `/companies/${companyId}`
  }
}
