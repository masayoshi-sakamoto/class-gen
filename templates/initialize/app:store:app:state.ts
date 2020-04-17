import MenuEntity from '@/entities/Menu'

export interface IAppState {
  dialog: object
  drawer: boolean | null
  errors: object
  loading: boolean
  menus: MenuEntity[]
  url: string
}

export const state = (): IAppState => ({
  dialog: {},
  drawer: null,
  errors: {},
  loading: false,
  menus: [],
  url: '/'
})

export default state
