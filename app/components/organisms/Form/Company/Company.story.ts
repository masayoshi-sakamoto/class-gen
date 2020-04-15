import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import Cookie from 'cookie-universal'
import Tag from './Company.vue'
import { defaultData } from './fixtures'
import createStore from '@/store'
import injector from '@/presenter/injector'
import { CompanyEntityFactory, EmptyCompanyEntityFactory } from '@/entities/Company'

const entity = CompanyEntityFactory()
const empty = EmptyCompanyEntityFactory()

Vue.use(Vuex)
Vue.use(Vuetify)

export default {
  title: 'components/organisms/Form/Company',
  component: Tag
}

export const Default = () => ({
  components: { Tag },
  template: '<div class="pa-4"><Tag v-model="entity" /></div>',
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
  template: '<div class="pa-4"><Tag v-model="empty" /></div>',
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
