export interface ICompanyProps {
  id: string
  name: string
}

export default class CompanyEntity {
  private _props: ICompanyProps

  constructor(props: ICompanyProps) {
    this._props = props
  }

  get props(): ICompanyProps {
    return this._props
  }

  get id(): string {
    return this._props.id
  }

  get name(): string {
    return this._props.name
  }
}

export const headers = [
  { text: 'ID', value: 'id' },
  { text: 'タイトル', value: 'name' }
]

export const EmptyCompanyPropsFactory = (props?: Partial<ICompanyProps>): ICompanyProps => ({
  id: '',
  name: '',
  ...props
})

export const CompanyPropsFactory = (props?: Partial<ICompanyProps>): ICompanyProps => ({
  id: 'unique_company_id',
  name: 'タイトル',
  ...props
})

export const EmptyCompanyEntityFactory = (props?: Partial<ICompanyProps>): CompanyEntity => {
  return new CompanyEntity(EmptyCompanyPropsFactory(props))
}

export const CompanyEntityFactory = (props?: Partial<ICompanyProps>): CompanyEntity => {
  return new CompanyEntity(CompanyPropsFactory(props))
}
