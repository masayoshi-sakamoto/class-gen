export interface IMenuProps {
  id: string
  title: string
  icon: string | null
  to: any | null
  href: string | null
}

export default class MenuEntity {
  private _props: IMenuProps

  constructor(props: IMenuProps) {
    this._props = props
  }

  get props(): IMenuProps {
    return this._props
  }

  get id(): string {
    return this._props.id
  }

  get title(): string {
    return this._props.title
  }

  get icon(): string | null {
    return this._props.icon
  }

  get to(): any | null {
    return this._props.to
  }

  get href(): string | null {
    return this._props.href
  }
}

export const EmptyMenuPropsFactory = (props?: Partial<IMenuProps>): IMenuProps => ({
  id: '',
  title: '',
  icon: null,
  to: null,
  href: null,
  ...props
})

export const MenuPropsFactory = (props?: Partial<IMenuProps>): IMenuProps => ({
  id: '1',
  title: 'ホーム',
  icon: 'mdi-home',
  to: { name: 'index' },
  href: null,
  ...props
})

export const EmptyMenuEntityFactory = (props?: Partial<IMenuProps>): MenuEntity => {
  return new MenuEntity(EmptyMenuPropsFactory(props))
}

export const MenuEntityFactory = (props?: Partial<IMenuProps>): MenuEntity => {
  return new MenuEntity(MenuPropsFactory(props))
}

export const menus: MenuEntity[] = [
  EmptyMenuEntityFactory({
    id: '1',
    title: 'ホーム',
    icon: 'mdi-home-outline',
    to: { name: 'index' }
  }),
]
