import { IApp } from '@/types/nuxt'
import { LogType } from '@/services/LogService'
import CompanyEntity from '@/entities/Company'
import { errors } from '@/utils/error'

export default class UpdateCompaniesUseCase implements BaseUseCase {
  app: IApp
  constructor(app: IApp) {
    this.app = app
  }

  async execute(entities: CompanyEntity[]) {
    const { state, company, applicationGateway, logService } = this.app
    try {
      const exec = entities.map((entity) => applicationGateway.Company.PutCompany(entity))
      await Promise.all(exec).then((response) => {
        response.forEach((prop) => {
          if (prop) company.save(prop)
        })
      })
    } catch (error) {
      await logService.handle({ type: LogType.Error, error })
      state.errors = errors(error)
      return ''
    }
  }
}
