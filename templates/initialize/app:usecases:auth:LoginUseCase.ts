import { IApp } from '@/types/nuxt'
import { errors } from '@/utils/error'
import LoginEntity from '@/entities/Login'

export default class LoginUseCase implements BaseUseCase {
  app: IApp
  constructor(app: IApp) {
    this.app = app
  }

  async execute(entity: LoginEntity): Promise<string> {
    const { state, <%= appName.toLowerCase() %>Gateway, logService } = this.app
    try {
      state.token = await <%= appName.toLowerCase() %>Gateway.Auth.Login(entity)
    } catch (error) {
      const url = await errors(error, this.app, logService)
    }
    return this.app.state.url ? this.app.state.url : '/'
  }
}
