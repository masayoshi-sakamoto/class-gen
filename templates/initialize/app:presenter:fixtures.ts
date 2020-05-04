import { RootState } from '@/store'
import { IAppState } from '@/store/app'
import { menus } from '@/entities/Menu'
import { EmptyMeEntityFactory } from '@/entities/Me'

export const AppPropsFactory = (props?: Partial<IAppState>): IAppState => ({
  dialog: {},
  drawer: null,
  errors: {},
  loading: false,
  me: EmptyMeEntityFactory(),
  menus,
  url: '/',
  ...props
})

export const defaultSnapshot: Partial<RootState> = {
  app: AppPropsFactory()
}

export const emptySnapshot: Partial<RootState> = {
  app: AppPropsFactory()
}
