import { ICompanyProps } from '@/entities/Company'

export interface ICompanyState {
  byIds: {
    [id: string]: ICompanyProps
  }
}

const state = (): ICompanyState => ({
  byIds: {}
})

export default state
