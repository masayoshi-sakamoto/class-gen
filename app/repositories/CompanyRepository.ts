import { Store } from 'vuex'
import { RootState } from '@/store'
import * as types from '@/store/company/types'
import CompanyEntity, { ICompanyProps } from '@/entities/Company'

export default class CompanyRepository {
  private _store: Store<RootState>

  constructor(store: Store<RootState>) {
    this._store = store
  }

  save(props: ICompanyProps[] | ICompanyProps) {
    if (!Array.isArray(props)) {
      props = [props]
    }
    this._store.commit(new types.Store(props))
  }

  all(): CompanyEntity[] {
    const props = this._store.state.company.byIds
    return props ? Object.values(props).map((prop) => new CompanyEntity(prop)) : []
  }

  get(id: string): CompanyEntity | null {
    const prop = this._store.state.company.byIds[id]
    return prop ? new CompanyEntity(prop) : null
  }

  delete(prop: ICompanyProps) {
    this._store.commit(new types.Remove(prop))
  }
}
