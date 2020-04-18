<template>
  <LayoutApp :title="title"></LayoutApp>
</template>

<script lang="ts">
import Vue from 'vue'
import LayoutApp from '@/components/organisms/Layout/App'

export default Vue.extend({
  components: {
    LayoutApp
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  }
})
</script>
