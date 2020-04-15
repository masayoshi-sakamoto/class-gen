import { IApp } from '@/types/nuxt'
import { LogType } from '@/services/LogService'
import { errors } from '@/utils/error'

export default class FetchCompanysUseCase implements BaseUseCase {
  app: IApp
  constructor(app: IApp) {
    this.app = app
  }

  async execute() {
    const { state, company, applicationGateway, logService } = this.app
    try {
      const props = await applicationGateway.Company.GetCompanies()
      company.save([])
      company.save(props)
      return true
    } catch (error) {
      await logService.handle({ type: LogType.Error, error })
      state.errors = errors(error)
      return false
    }
  }
}
