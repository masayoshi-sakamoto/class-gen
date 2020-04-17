/* eslint camelcase: 0 */
import { Login } from '@/infrastructure/network/<%= appName %>/schema'
import { ILoginProps } from '@/entities/Login'

export const toLoginProps = (props: Login): ILoginProps => {
  const { username, password } = props
  return {
    username,
    password
  }
}

export const toLoginSeed = (props: ILoginProps): Login => {
  const { username, password } = props
  return {
    username,
    password
  }
}
