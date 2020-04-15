import Vue from 'vue'
import { MutationTree } from 'vuex'
import { ICompanyState } from '@/store/company'
import { Types, Store, Remove } from '@/store/company/types'

const mutations: MutationTree<ICompanyState> = {
  [Types.store]: (state, action: Store) => {
    const props = action.payload
    if (props.length === 0) {
      delete state.byIds
      state.byIds = {}
    } else {
      props.forEach((prop) => {
        state.byIds = {
          ...state.byIds,
          [prop.id]: prop
        }
      })
    }
  },
  [Types.remove]: (state, action: Remove) => {
    const prop = action.payload
    if (!state.byIds[prop.id]) return
    Vue.delete(state.byIds, prop.id)
  }
}

export default mutations
