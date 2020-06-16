/* eslint camelcase: 0 */
import { Options } from '@/infrastructure/network/<%= appName %>/schema'
import { IOptionsProps, EmptyOptionsPropsFactory } from '@/entities/Options'

export const toOptionsProps = (props: Options): IOptionsProps => {
  if (!props) {
    return EmptyOptionsPropsFactory()
  }

  const { total, page, take, count, search, sort, desc } = props
  return {
    total,
    page,
    itemsPerPage: take,
    pageCount: count,
    sortBy: [sort],
    sortDesc: [desc],
    search
  }
}
