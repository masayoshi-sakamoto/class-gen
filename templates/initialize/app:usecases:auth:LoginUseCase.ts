import { IApp } from '@/types/nuxt'
import { errors } from '@/utils/error'
import LoginEntity from '@/entities/Login'

export default class LoginUseCase implements BaseUseCase {
  app: IApp
  constructor(app: IApp) {
    this.app = app
  }

  async execute(entity: LoginEntity): Promise<boolean | string> {
    const { state, <%= appName.toLowerCase() %>Gateway, logService } = this.app
    try {
      state.token = await <%= appName.toLowerCase() %>Gateway.Auth.Login(entity)
      return this.app.state.url
    } catch (error) {
      const url = await errors(error, this.app, logService)
      if (typeof url === 'string') {
        this.app.state.errors = { message: 'IDまたはパスワードが違います。' }
        return true
      }
      return url
    }
  }
}
