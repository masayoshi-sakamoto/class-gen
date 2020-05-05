export interface IOptionsProps {
  total: number
  page: number
  itemsPerPage: number
  pageCount: number
  sortBy?: string[]
  sortDesc?: boolean[]
  search?: string
}

export interface IParamsProps {
  take: number
  skip: number
  sort?: string
  desc?: boolean
  search?: string
}

export default class OptionsEntity {
  private _props: IOptionsProps

  constructor(props: IOptionsProps) {
    this._props = props
  }

  get props(): IOptionsProps {
    return {
      total: this._props.total,
      page: this._props.page,
      itemsPerPage: this._props.itemsPerPage,
      pageCount: this._props.pageCount,
      search: this._props.search
    }
  }

  get total(): number {
    return this._props.total
  }

  get page(): number {
    return this._props.page
  }

  get itemsPerPage(): number {
    return this._props.itemsPerPage
  }

  get pageCount(): number {
    return this._props.pageCount
  }

  get start(): number {
    return this._props.total === 0 ? 0 : (this._props.page - 1) * this._props.itemsPerPage + 1
  }

  get end(): number {
    const end = this._props.page * this._props.itemsPerPage
    return end > this._props.total ? this._props.total : end
  }
  
  get params(): IParamsProps {
    const page = this._props.page - 1
    const params: IParamsProps = {
      take: this._props.itemsPerPage,
      skip: (page < 0 ? 0 : page) * this._props.itemsPerPage
    }
    if (this._props.sortBy && this._props.sortBy[0]) params.sort = this._props.sortBy[0]
    if (this._props.sortDesc && this._props.sortDesc[0]) params.desc = this._props.sortDesc[0]
    if (this._props.search) params.search = this._props.search
    return params
  }
}

export const EmptyOptionsPropsFactory = (props?: Partial<IOptionsProps>): IOptionsProps => ({
  total: 0,
  page: 0,
  itemsPerPage: 10,
  pageCount: 0,
  sortBy: [],
  sortDesc: [],
  ...props
})

export const EmptyOptionsEntityFactory = (props?: Partial<IOptionsProps>): OptionsEntity => {
  return new OptionsEntity(EmptyOptionsPropsFactory(props))
}
