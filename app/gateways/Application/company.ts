import { ApplicationGatewayBase } from './base'
import { GetCompany, GetCompanies, PostCompany, PutCompany, DeleteCompany } from '@/infrastructure/network/Application/requests/company'
import CompanyEntity, { ICompanyProps } from '@/entities/Company'
import { toCompanyProps, toCompanySeed } from '@/gateways/Application/translator/company'

export default class Company extends ApplicationGatewayBase {
  async GetCompany(id: string): Promise<ICompanyProps | null> {
    const { company } = await this.apiClient.request(new GetCompany(id))
    return company ? toCompanyProps(company) : null
  }

  async GetCompanies(): Promise<ICompanyProps[]> {
    const { companies } = await this.apiClient.request(new GetCompanies())
    return companies ? companies.map((prop) => toCompanyProps(prop)) : []
  }

  async PostCompany(entity: CompanyEntity) {
    const { company } = await this.apiClient.request(new PostCompany(toCompanySeed(entity.props)))
    return company ? toCompanyProps(company) : null
  }

  async PutCompany(entity: CompanyEntity) {
    const { company } = await this.apiClient.request(new PutCompany(toCompanySeed(entity.props)))
    return company ? toCompanyProps(company) : null
  }

  async DeleteCompany(id: string) {
    await this.apiClient.request(new DeleteCompany(id))
  }
}
