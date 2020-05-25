import LogService, { LogType } from '@/services/LogService'
import { IApp } from '@/types/nuxt'

export async function errors(error: any, App: IApp, logService: LogService): Promise<boolean | string> {
  if (error.status === undefined || error.status === 500) {
    await logService.handle({ type: LogType.Error, error })
    App.state.errors = { message: '不正なエラーが発生しました。' }
  } else if (error.status === 401) {
    return '/logout'
  } else if (error.status === 422 || error.status === 429) {
    App.state.errors = error.raw.response.data.errors
  } else if (error.status === 404) {
    throw new NotFoundException(error.raw.response.data.message)
  } else {
    App.state.errors = { message: error.raw.response.data.message }
  }
  return false
}

class NotFoundException {
  constructor(message: string) {
    return { message, statusCode: 404 }
  }
}
