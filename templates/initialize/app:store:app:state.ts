import MeEntity, { EmptyMeEntityFactory } from '@/entities/Me'
import MenuEntity from '@/entities/Menu'

export interface IAppState {
  dialog: object
  drawer: boolean | null
  errors: object
  loading: boolean
  me: MeEntity
  menus: MenuEntity[]
  url: string
}

export const state = (): IAppState => ({
  dialog: {},
  drawer: null,
  errors: {},
  loading: false,
  me: EmptyMeEntityFactory(),
  menus: [],
  url: '/'
})

export default state
