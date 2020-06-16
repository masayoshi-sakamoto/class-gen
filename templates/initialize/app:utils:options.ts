import OptionsEntity from '@/entities/Options'

export function validate(options1: OptionsEntity, options2: OptionsEntity): boolean {
  const page = options1.page !== options2.page
  const sortBy = options1.props.sortBy !== options2.props.sortBy
  const sortDesc = options1.props.sortDesc !== options2.props.sortDesc
  return page || sortBy || sortDesc
}
