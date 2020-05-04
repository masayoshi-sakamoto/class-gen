export interface IMeProps {
  id: string
  username: string
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

  get username(): string {
    return this._props.name
  }

  get name(): string {
    return this._props.name
  }

  get email(): string {
    return this._props.email
  }
}

export const EmptyMePropsFactory = (props?: Partial<IMeProps>): IMeProps => ({
  id: '',
  username: '',
  name: '',
  email: '',
  ...props
})

export const MePropsFactory = (props?: Partial<IMeProps>): IMeProps => ({
  id: 'unique_user_id',
  username: 'username',
  name: 'ログインユーザー',
  email: 'username@example.com',
  ...props
})


export const EmptyMeEntityFactory = (props?: Partial<IMeProps>): MeEntity => {
  return new MeEntity(EmptyMePropsFactory(props))
}

export const MeEntityFactory = (props?: Partial<IMeProps>): MeEntity => {
  return new MeEntity(MePropsFactory(props))
}
