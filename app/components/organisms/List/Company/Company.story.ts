import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import Cookie from 'cookie-universal'
import Tag from './Company.vue'
import { defaultData } from './fixtures'
import createStore from '@/store'
import injector from '@/presenter/injector'
import { CompanyEntityFactory } from '@/entities/Company'

Vue.use(Vuex)
Vue.use(Vuetify)

const entities = [
  CompanyEntityFactory({ id: 'unique_company_id1', name: 'タイトル1' }),
  CompanyEntityFactory({ id: 'unique_company_id2', name: 'タイトル2' }),
  CompanyEntityFactory({ id: 'unique_company_id3', name: 'タイトル3' }),
  CompanyEntityFactory({ id: 'unique_company_id4', name: 'タイトル4' }),
  CompanyEntityFactory({ id: 'unique_company_id5', name: 'タイトル5' }),
  CompanyEntityFactory({ id: 'unique_company_id6', name: 'タイトル6' }),
  CompanyEntityFactory({ id: 'unique_company_id7', name: 'タイトル7' }),
  CompanyEntityFactory({ id: 'unique_company_id8', name: 'タイトル8' }),
  CompanyEntityFactory({ id: 'unique_company_id9', name: 'タイトル9' }),
  CompanyEntityFactory({ id: 'unique_company_id10', name: 'タイトル10' }),
  CompanyEntityFactory({ id: 'unique_company_id11', name: 'タイトル11' })
]

export default {
  title: 'components/organisms/List/Company',
  component: Tag
}

export const Default = () => ({
  components: { Tag },
  template: '<Tag :entities="entities" v-model="options" />',
  data() {
    return {
      entities,
      options: {
        total: 11,
        page: 1,
        itemsPerPage: 10,
        pageCount: 2
      }
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
