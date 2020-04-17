export interface IMeProps {
  id: string
  name: string
  email: string
}

export default class MeEntity {
  private _props: IMeProps

  constructor(props: IMeProps) {
    this._props = props
  }

  get props(): IMeProps {
    return this._props
  }

  get id(): string {
    return this._props.id
  }

  get email(): string {
    return this._props.email
  }

  get name(): string {
    return this._props.name
  }
}

export const EmptyMePropsFactory = (): IMeProps => ({
  id: '',
  name: '',
  email: ''
})

export const MePropsFactory = (props?: Partial<IMeProps>): IMeProps => ({
  id: 'unique_user_id',
  name: 'ログインユーザー',
  email: 'username@example.com',
  ...props
})

export const MeEntityFactory = (props?: Partial<IMeProps>): MeEntity => {
  return new MeEntity(MePropsFactory(props))
}
