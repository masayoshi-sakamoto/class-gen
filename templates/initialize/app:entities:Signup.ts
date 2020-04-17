export interface ISignupProps {
  username: string
  password: string
  email: string
  name: string
}

export default class SignupEntity {
  private _props: ISignupProps

  constructor(props: ISignupProps) {
    this._props = props
  }

  get props(): ISignupProps {
    return this._props
  }

  get username(): string {
    return this._props.username
  }

  get password(): string {
    return this._props.password
  }

  get email(): string {
    return this._props.email
  }

  get name(): string {
    return this._props.name
  }
}

export const EmptySignupPropsFactory = (props?: Partial<ISignupProps>): ISignupProps => ({
  username: '',
  password: '',
  email: '',
  name: '',
  ...props
})

export const SignupPropsFactory = (props?: Partial<ISignupProps>): ISignupProps => ({
  username: 'username',
  password: '',
  email: 'username@example.com',
  name: 'ユーザー',
  ...props
})

export const EmptySignupEntityFactory = (props?: Partial<ISignupProps>): SignupEntity => {
  return new SignupEntity(EmptySignupPropsFactory(props))
}

export const SignupEntityFactory = (props?: Partial<ISignupProps>): SignupEntity => {
  return new SignupEntity(SignupPropsFactory(props))
}
