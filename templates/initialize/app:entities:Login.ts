export interface ILoginProps {
  username: string
  password: string
}

export default class LoginEntity {
  private _props: ILoginProps

  constructor(props: ILoginProps) {
    this._props = props
  }

  get props(): ILoginProps {
    return this._props
  }

  get username(): string {
    return this._props.username
  }

  get password(): string {
    return this._props.password
  }
}

export const EmptyLoginPropsFactory = (props?: Partial<ILoginProps>): ILoginProps => ({
  username: '',
  password: '',
  ...props
})

export const LoginPropsFactory = (props?: Partial<ILoginProps>): ILoginProps => ({
  username: 'username@example.com',
  password: '',
  ...props
})

export const EmptyLoginEntityFactory = (props?: Partial<ILoginProps>): LoginEntity => {
  return new LoginEntity(EmptyLoginPropsFactory(props))
}

export const LoginEntityFactory = (props?: Partial<ILoginProps>): LoginEntity => {
  return new LoginEntity(LoginPropsFactory(props))
}
