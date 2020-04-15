<template>
  <LayoutApp title="-- タイトル --">
    <ListCompany v-model="options" :entities="entities"></ListCompany>
  </LayoutApp>
</template>

<script lang="ts">
import Vue from 'vue'
import LayoutApp from '@/components/organisms/Layout/App'
import ListCompany from '@/components/organisms/List/Company'

export default Vue.extend({
  components: {
    LayoutApp,
    ListCompany
  },
  data() {
    return {
      entities: this.App.company.all(),
      options: { ...this.App.company.options() }
    }
  }
})
</script>
