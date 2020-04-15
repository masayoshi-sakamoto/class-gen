import { IApp } from '@/types/nuxt'
import { LogType } from '@/services/LogService'
import CompanyEntity from '@/entities/Company'
import { errors } from '@/utils/error'

export default class DeleteCompanyUseCase implements BaseUseCase {
  app: IApp
  constructor(app: IApp) {
    this.app = app
  }

  async execute(entity: CompanyEntity) {
    const { state, company, applicationGateway, logService } = this.app
    try {
      await applicationGateway.Company.DeleteCompany(entity.id)
      company.delete(entity.props)
      return true
    } catch (error) {
      await logService.handle({ type: LogType.Error, error })
      state.errors = errors(error)
      return ''
    }
  }
}
