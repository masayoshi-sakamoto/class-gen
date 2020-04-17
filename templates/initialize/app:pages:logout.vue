<template>
  <v-app>
    <Loading></Loading>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import authenticated from '@/middleware/authenticated'
import Loading from '@/components/molecules/Loading'

export default Vue.extend({
  middleware: authenticated,
  components: { Loading },
  fetch({ App }) {
    App.state.loading = true
  },
  created() {
    this.App.state.refresh()
    this.$router.push('/login')
  }
})
</script>
