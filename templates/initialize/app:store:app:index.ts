import { Module } from 'vuex'
import { RootState } from '@/store'
import mutations from '@/store/app/mutations'
import { path } from '@/store/app/types'
import { mutation } from '@/utils/mutation'
import state, { IAppState } from '@/store/app/state'

export * from '@/store/app/state'

export const store: Module<IAppState, RootState> = {
  state,
  mutations: mutation(mutations, path)
}
