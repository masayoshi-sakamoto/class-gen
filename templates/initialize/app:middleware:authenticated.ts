import { Context } from '@nuxt/types/app'
import { Middleware } from '@nuxt/types'
import { EmptyMeEntityFactory } from '@/entities/Me'
import { menus } from '@/entities/Menu'

const authenticated: Middleware = async ({ App, redirect, route }: Context) => {
  try {
    const now = new Date().getTime()
    if (App.state.expired !== 0 && now > App.state.expired) {
      App.state.token = await App.<%= appName.toLowerCase() %>Gateway.Auth.Refresh()
    }

    if (App.state.token === '') {
      App.state.clear()
      App.state.url = route.fullPath === '/logout' ? '/' : route.fullPath
      redirect('/login')
      return
    }
    
    if (!App.state.me.id) {
      App.state.me = EmptyMeEntityFactory(await App.<%= appName.toLowerCase() %>Gateway.Auth.Me())
      // はじめてログインするときの処理
    }

    App.state.menus = menus
  } catch (e) {
    if (route.name !== 'login') {
      App.state.clear()
      App.state.url = route.fullPath === '/logout' ? '/' : route.fullPath
      return redirect('/login')
    }
  }
}

export default authenticated
