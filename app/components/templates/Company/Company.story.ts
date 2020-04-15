import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import Cookie from 'cookie-universal'
import Tag from './Company.vue'
import { defaultData } from './fixtures'
import createStore from '@/store'
import injector from '@/presenter/injector'

Vue.use(Vuex)
Vue.use(Vuetify)

export default {
  title: 'components/templates/Company',
  component: Tag
}

export const Default = () => ({
  components: { Tag },
  template: '<Tag />',
  data() {
    return {
      entities: []
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
