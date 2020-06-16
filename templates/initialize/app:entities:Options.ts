export interface IOptionsProps {
  total: number
  page: number
  itemsPerPage: number
  pageCount: number
  sortBy: string[]
  sortDesc: boolean[]
  search: string
}

export interface IParamsProps {
  take: number
  skip: number
  sort?: string
  desc?: boolean
  search?: string
}

export interface IOptions {
  page: number
  itemsPerPage: number
  sortBy: string[]
  sortDesc: boolean[]
  groupBy: string[]
  groupDesc: boolean[]
  multiSort: boolean
  mustSort: boolean
}

export default class OptionsEntity {
  private _props: IOptionsProps

  constructor(props: IOptionsProps) {
    this._props = props
  }

  get props(): IOptionsProps {
    return this._props
  }

  set props(value: IOptionsProps) {
    this._props = value
  }

  set options(value: IOptions) {
    this._props = {
      ...this._props,
      ...value
    }
  }

  get options(): IOptions {
    return OptionsFactory(this._props)
  }

  get total(): number {
    return this._props.total
  }

  get page(): number {
    return this._props.page
  }

  set page(value: number) {
    this._props.page = value
  }

  get itemsPerPage(): number {
    return this._props.itemsPerPage
  }

  get pageCount(): number {
    return this._props.pageCount
  }

  set pageCount(value: number) {
    this._props.pageCount = value
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
  search: '',
  ...props
})

export const EmptyOptionsEntityFactory = (props?: Partial<IOptionsProps>): OptionsEntity => {
  return new OptionsEntity(EmptyOptionsPropsFactory(props))
}

export const OptionsFactory = (props: IOptionsProps): IOptions => ({
  page: props.page,
  itemsPerPage: props.itemsPerPage,
  sortBy: props.sortBy,
  sortDesc: props.sortDesc,
  groupBy: [],
  groupDesc: [],
  multiSort: false,
  mustSort: false
})
