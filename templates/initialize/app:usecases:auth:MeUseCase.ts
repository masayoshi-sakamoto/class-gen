import { IApp } from '@/types/nuxt'
import { errors } from '@/utils/error'
import MeEntity from '@/entities/Me'

export default class MeUseCase implements BaseUseCase {
  app: IApp
  constructor(app: IApp) {
    this.app = app
  }

  async execute(): Promise<boolean> {
    const { state, <%= appName.toLowerCase() %>Gateway, logService } = this.app
    try {
      state.me = new MeEntity(await <%= appName.toLowerCase() %>Gateway.Auth.Me())
      return true
    } catch (error) {
      return await errors(error, this.app, logService)
    }
  }
}
