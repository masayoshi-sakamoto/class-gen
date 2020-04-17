import { IApp } from '@/types/nuxt'
import { errors } from '@/utils/error'

export default class MeUseCase implements BaseUseCase {
  app: IApp
  constructor(app: IApp) {
    this.app = app
  }

  async execute(): Promise<boolean | string> {
    const { <%= appName.toLowerCase() %>Gateway, logService } = this.app
    try {
      await <%= appName.toLowerCase() %>Gateway.Auth.Me()
      return true
    } catch (error) {
      return await errors(error, this.app, logService)
    }
  }
}
