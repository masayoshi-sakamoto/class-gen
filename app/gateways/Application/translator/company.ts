/* eslint camelcase: 0 */
import { Company, CompanySeed } from '@/infrastructure/network/Application/schema'
import { ICompanyProps, EmptyCompanyPropsFactory } from '@/entities/Company'

export const toCompanyProps = (props: Company): ICompanyProps => {
  if (!props) {
    return EmptyCompanyPropsFactory()
  }

  const { id } = props
  return {
    id
  }
}

export const toCompanySeed = (props: ICompanyProps): CompanySeed => {
  const { id } = props
  return {
    id
  }
}
