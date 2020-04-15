import Vuex from 'vuex'
import * as company from '@/store/company'

export interface RootState {
  company: company.ICompanyState
}

const createStore = () => {
  return new Vuex.Store<RootState>({
    modules: {
      company: company.store,
      app: app.store
    }
  })
}

export default createStore
