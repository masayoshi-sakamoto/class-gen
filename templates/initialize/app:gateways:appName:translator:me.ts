/* eslint camelcase: 0 */
import { Me } from '@/infrastructure/network/<%= appName %>/schema'
import { IMeProps } from '@/entities/Me'

export const toMeProps = (props: Me): IMeProps => {
  const { id, name, email } = props
  return {
    id,
    name,
    email
  }
}
