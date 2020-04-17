/* eslint camelcase: 0 */
import { Signup } from '@/infrastructure/network/<%= appName %>/schema'
import { ISignupProps } from '@/entities/Signup'

export const toSignupProps = (props: Signup): ISignupProps => {
  const { username, password, email, name } = props
  return {
    username,
    password,
    email,
    name
  }
}

export const toSignupSeed = (props: ISignupProps): Signup => {
  const { username, password, email, name } = props
  return {
    username,
    password,
    email,
    name
  }
}
