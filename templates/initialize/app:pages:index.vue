<template>
  <Home :title="title"></Home>
</template>

<script lang="ts">
import Vue from 'vue'
import authenticated from '@/middleware/authenticated'
import Home from '@/components/templates/Home'

interface IData {
  title: string
}

export default Vue.extend({
  middleware: authenticated,
  components: {
    Home
  },
  data(): IData {
    return {
      title: 'マイページ'
    }
  },
  head() {
    return {
      title: this.title
    }
  }
})
</script>
