import Vue from 'vue'
import { Context } from '@nuxt/types/app'

// Repositories
import AppRepository from '@/repositories/AppRepository'

// Gateways
import QifGateway from '@/gateways/Qif'

// Services
import LogService from '@/services/LogService'

declare module 'vuex/types/index' {
  interface ActionTree<S, R> {
    nuxtServerInit: (context: ActionContext<S, R>, nuxtContext: Context) => void
  }
}

export interface IApp {
  // Status
  state: AppRepository

  // Repositories

  // Gateways
  universityGateway: QifGateway

  // Services
  logService: LogService
}

declare module 'vue/types/vue' {
  interface Vue {
    App: IApp
  }
}

declare module '@nuxt/types/app/index' {
  interface Context {
    App: IApp
  }
}
