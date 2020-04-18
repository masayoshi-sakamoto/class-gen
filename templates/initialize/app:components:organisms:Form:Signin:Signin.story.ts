import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import Cookie from 'cookie-universal'
import Tag from './Signin.vue'
import { defaultData } from './fixtures'
import createStore from '@/store'
import injector from '@/presenter/injector'
import { LoginEntityFactory, EmptyLoginEntityFactory } from '@/entities/Login'

const entity = LoginEntityFactory()
const empty = EmptyLoginEntityFactory()

Vue.use(Vuex)
Vue.use(Vuetify)

export default {
  title: 'components/organisms/Form/Signin',
  component: Tag
}

export const Default = () => ({
  components: { Tag },
  template: '<div class="pa-10"><Tag v-model="entity" /></div>',
  data() {
    return {
      entity
    }
  },
  created() {
    const cookies = Cookie()
    const store = createStore()
    const storyState = Object.assign(store.state, defaultData)
    store.replaceState(storyState)

    injector(Vue, store, cookies)
  }
})

export const Empty = () => ({
  components: { Tag },
  template: '<div class="pa-10"><Tag v-model="empty" /></div>',
  data() {
    return {
      empty
    }
  },
  created() {
    const cookies = Cookie()
    const store = createStore()
    const storyState = Object.assign(store.state, defaultData)
    store.replaceState(storyState)

    injector(Vue, store, cookies)
  }
})
