import { RootState } from '@/store'
import { defaultSnapshot, emptySnapshot } from '@/presenter/fixtures'

export const defaultData: Partial<RootState> = {
  ...defaultSnapshot
}

export const emptyData: Partial<RootState> = {
  ...emptySnapshot
}
