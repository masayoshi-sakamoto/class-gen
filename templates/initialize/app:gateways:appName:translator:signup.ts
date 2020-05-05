/* eslint camelcase: 0 */
import { Signup } from '@/infrastructure/network/<%= appName %>/schema'
import { ISignupProps } from '@/entities/Signup'

export const toSignupProps = (props: Signup): ISignupProps => {
  const { id, username, password, email, name } = props
  return {
    id,
    username,
    password,
    email,
    name
  }
}

export const toSignupSeed = (props: ISignupProps): Signup => {
  const { id, username, password, email, name } = props
  return {
    id,
    username,
    password,
    email,
    name
  }
}
