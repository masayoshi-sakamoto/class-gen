import Vue from 'vue'
import { MutationTree } from 'vuex'
import { IAppState, state as init } from '@/store/app'
import { Types, Loading, Errors, Expired, Dialog, Drawer, Me, Menus, Url } from '@/store/app/types'

const mutations: MutationTree<IAppState> = {
  [Types.dialog]: (state, action: Dialog) => {
    const { type, value } = action.payload
    Vue.set(state.dialog, type, value)
  },
  [Types.drawer]: (state, action: Drawer) => {
    state.drawer = action.payload
  },
  [Types.errors]: (state, action: Errors) => {
    if (action.payload === null) {
      delete state.errors
      state.errors = {}
    } else {
      state.errors = action.payload
    }
  },
  [Types.expired]: (state, action: Expired) => {
    state.expired = action.payload
  },
  [Types.loading]: (state, action: Loading) => {
    state.loading = action.payload
  },
  [Types.me]: (state, action: Me) => {
    state.me = action.payload
  },
  [Types.menus]: (state, action: Menus) => {
    state.menus = action.payload
  },
  [Types.url]: (state, action: Url) => {
    state.url = action.payload
  },
  [Types.clear]: (state) => {
    Object.assign(state, init())
  }
}

export default mutations
