import { IApp } from '@/types/nuxt'
import { errors } from '@/utils/error'
import SignupEntity from '@/entities/Signup'

export default class SignupUseCase implements BaseUseCase {
  app: IApp
  constructor(app: IApp) {
    this.app = app
  }

  async execute(entity: SignupEntity): Promise<boolean> {
    const { state, <%= appName.toLowerCase() %>Gateway, logService } = this.app
    try {
      state.token = await <%= appName.toLowerCase() %>Gateway.Auth.Signup(entity)
      return this.app.state.url
    } catch (error) {
      return await errors(error, this.app, logService)
    }
  }
}
