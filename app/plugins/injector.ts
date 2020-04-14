/* eslint-disable */
import { Context } from '@nuxt/types/app'
import Vue from 'vue'

import { APIClient as QifAPIClient } from '@/infrastructure/network/Qif/APIClient'

// Repositories
import AppRepository from '@/repositories/AppRepository'

// Gateways
import QifGateway from '@/gateways/Qif'

// Services
import LogService from '@/services/LogService'

// FIXME
const dummyLogger = {
  captureException(params: Error | string) {
    console.log('/// logging with dummy logger ///')
    console.log(params)
  }
}

export default (ctx: Context) => {
  const { store, app } = ctx
  const qifAPIClient = new QifAPIClient(ctx)

  Vue.prototype.App = {
    state: new AppRepository(app.$cookies, store),
    qifGateway: new QifGateway(qifAPIClient),
    logService: new LogService(dummyLogger /* app.$sentry */)
  }

  ctx.App = {
    state: new AppRepository(app.$cookies, store),
    qifGateway: new QifGateway(qifAPIClient),
    logService: new LogService(dummyLogger /* app.$sentry */)
  }
}
