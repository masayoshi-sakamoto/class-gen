<template>
  <div>マイページ</div>
</template>

<script lang="ts">
import Vue from 'vue'
import authenticated from '@/middleware/authenticated'

export default Vue.extend({
  middleware: authenticated,
  components: {},
  head() {
    return {
      title: 'マイページ'
    }
  }
})
</script>
