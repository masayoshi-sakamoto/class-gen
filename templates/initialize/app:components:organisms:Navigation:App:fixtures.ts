import { RootState } from '@/store'
import { defaultSnapshot, AppPropsFactory } from '@/presenter/fixtures'

export const defaultData: Partial<RootState> = {
  ...defaultSnapshot,
  app: AppPropsFactory({})
}
