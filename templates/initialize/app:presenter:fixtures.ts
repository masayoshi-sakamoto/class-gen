import { RootState } from '@/store'
import { IAppState, state } from '@/store/app'

export const AppPropsFactory = (props?: Partial<IAppState>): IAppState => state(props)

export const defaultSnapshot: Partial<RootState> = {
  app: AppPropsFactory()
}

export const emptySnapshot: Partial<RootState> = {
  app: AppPropsFactory()
}
