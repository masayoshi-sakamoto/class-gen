import { NuxtCookies } from 'cookie-universal-nuxt'
import { Store } from 'vuex'
import { RootState } from '@/store'
import * as types from '@/store/app/types'
import MeEntity from '@/entities/Me'
import MenuEntity from '@/entities/Menu'

export default class AppRepository {
  private cookies: NuxtCookies
  private _store: Store<RootState>

  constructor(cookies: NuxtCookies, store: Store<RootState>) {
    this.cookies = cookies
    this._store = store
  }

  setDialog(type: string, value: boolean | null) {
    this._store.commit(new types.Dialog({ type, value }))
  }

  getDialog(type: string): boolean | null {
    return this._store.state.app.dialog[type] ? this._store.state.app.dialog[type] : null
  }

  set drawer(value: boolean | null) {
    this._store.commit(new types.Drawer(value))
  }

  get drawer(): boolean | null {
    return this._store.state.app.drawer
  }

  set errors(value: any) {
    this._store.commit(new types.Errors(value))
  }

  get errors(): any {
    return this._store.state.app.errors
  }

  get expired(): number {
    return this._store.state.app.expired
  }

  set loading(value: boolean) {
    this._store.commit(new types.Loading(value))
  }

  get loading(): boolean {
    return this._store.state.app.loading
  }

  set me(value: MeEntity) {
    this._store.commit(new types.Me(value))
  }

  get me(): MeEntity {
    return this._store.state.app.me
  }

  set menus(value: MenuEntity[]) {
    this._store.commit(new types.Menus(value))
  }

  get menus(): MenuEntity[] {
    return this._store.state.app.menus
  }

  clear() {
    this.token = ''
    this._store.commit(new types.Clear())
  }

  set token(value: string) {
    if (value === '') {
      this.cookies.remove('accessToken')
    } else {
      const date = new Date()
      date.setMinutes(date.getMinutes() + 3)
      this._store.commit(new types.Expired(date.getTime()))
      this.cookies.set('accessToken', value, { maxAge: 60 * 30 })
    }
  }

  get token(): string {
    return this.cookies.get('accessToken')
  }

  set url(value: string) {
    this.cookies.set('url', value, { maxAge: 60 })
  }

  get url(): string {
    return this.cookies.get('url')
  }
}
