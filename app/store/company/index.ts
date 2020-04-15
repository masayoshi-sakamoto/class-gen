import { Module } from 'vuex'
import { RootState } from '@/store'
import mutations from '@/store/company/mutations'
import { path } from '@/store/company/types'
import { mutation } from '@/utils/mutation'
import state, { ICompanyState } from '@/store/company/state'

export * from '@/store/company/state'

export const store: Module<ICompanyState, RootState> = {
  state,
  mutations: mutation(mutations, path)
}
