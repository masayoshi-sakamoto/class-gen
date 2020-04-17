// FIXME: Use log library specific interface
/* eslint-disable */
interface Logger {
  captureException(params?: Error | string): void
}

export enum LogType {
  Error,
  Message
}

type LogPayload =
  | {
      type: LogType.Error
      error: Error
    }
  | {
      type: LogType.Message
      message: string
    }

export default class LogService implements BaseService {
  logger: Logger

  constructor(logger: Logger) {
    this.logger = logger
  }

  async handle(payload: LogPayload) {
    if (payload.type === LogType.Error) {
      await this.logger.captureException(payload.error)
    } else if (payload.type === LogType.Message) {
      await this.logger.captureException(payload.message)
    }
  }
}

export const LogServiceFactory = (): LogService => {
  const dummyLogger = {
    captureException(params: Error) {
      console.log('/// logging with dummy logger ///')
      console.log(params)
    }
  }
  return new LogService(dummyLogger)
}
