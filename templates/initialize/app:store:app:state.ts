import MeEntity, { EmptyMeEntityFactory } from '@/entities/Me'
import MenuEntity, { menus } from '@/entities/Menu'

export interface IAppState {
  dialog: object
  drawer: boolean | null
  errors: object
  loading: boolean
  me: MeEntity
  menus: MenuEntity[]
  url: string
}

export const state = (props?: Partial<IAppState>): IAppState => ({
  dialog: {},
  drawer: null,
  errors: {},
  loading: false,
  me: EmptyMeEntityFactory(),
  menus,
  url: '/',
  ...props
})

export default state
