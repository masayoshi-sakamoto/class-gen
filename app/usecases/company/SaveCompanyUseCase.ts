import { IApp } from '@/types/nuxt'
import { LogType } from '@/services/LogService'
import CompanyEntity from '@/entities/Company'
import { errors } from '@/utils/error'

export default class SaveCompanyUseCase implements BaseUseCase {
  app: IApp
  constructor(app: IApp) {
    this.app = app
  }

  async execute(entity: CompanyEntity) {
    const { state, company, applicationGateway, logService } = this.app
    try {
      const res = entity.id ? await applicationGateway.Company.PutCompany(entity) : await applicationGateway.Company.PostCompany(entity)
      if (res) {
        company.save(res)
        return true
      }
      return false
    } catch (error) {
      await logService.handle({ type: LogType.Error, error })
      state.errors = errors(error)
      return ''
    }
  }
}
