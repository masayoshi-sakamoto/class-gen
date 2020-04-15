import { ICompanyProps } from '@/entities/Company'

export const Types = {
  store: 'store',
  remove: 'remove'
}

export const path = 'company/'

export class Store implements FluxStandardAction<ICompanyProps[]> {
  type = path + Types.store
  constructor(public payload: ICompanyProps[]) {}
}

export class Remove implements FluxStandardAction<ICompanyProps> {
  type = path + Types.remove
  constructor(public payload: ICompanyProps) {}
}
