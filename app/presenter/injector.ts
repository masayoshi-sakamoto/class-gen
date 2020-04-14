// Repositories
import AppRepository from '@/repositories/AppRepository'

export default (vue: any, store: any, cookies: any) => {
  vue.prototype.App = {
    state: new AppRepository(cookies, store)
  }
  vue.prototype.$router = { push: () => {} }
}
