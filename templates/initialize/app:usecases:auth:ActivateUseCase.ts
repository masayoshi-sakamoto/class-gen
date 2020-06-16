import { IApp } from '@/types/nuxt'
import { errors } from '@/utils/error'

export default class ActivateUseCase implements BaseUseCase {
  app: IApp
  constructor(app: IApp) {
    this.app = app
  }

  async execute(invitationId: string): Promise<boolean> {
    const { <%= appName.toLowerCase() %>Gateway, logService } = this.app
    try {
      const res = await <%= appName.toLowerCase() %>Gateway.Auth.Activate(invitationId)
      return res
    } catch (error) {
      return await errors(error, this.app, logService)
    }
  }
}
