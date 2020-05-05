/* eslint camelcase: 0 */
import { Activate } from '@/infrastructure/network/<%= appName %>//schema'

export const toActivateProps = (props: Activate): boolean => {
  if (!props) {
    return false
  }
  const { is_activate } = props
  return !is_activate
}
