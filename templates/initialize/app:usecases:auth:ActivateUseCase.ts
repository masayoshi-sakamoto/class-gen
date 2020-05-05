import { IApp } from '@/types/nuxt'
import { errors } from '@/utils/error'

export default class ActivateUseCase implements BaseUseCase {
  app: IApp
  constructor(app: IApp) {
    this.app = app
  }

  async execute(invitationId: string): Promise<boolean | string> {
    const { state, %= appName.toLowerCase() %>Gateway, logService } = this.app
    try {
      state.loading = true
      const res = await %= appName.toLowerCase() %>Gateway.Auth.Activate(invitationId)
      state.loading = false
      return res
    } catch (error) {
      state.loading = false
      return await errors(error, this.app, logService)
    }
  }
}
