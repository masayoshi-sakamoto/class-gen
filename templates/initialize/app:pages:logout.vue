<template>
  <v-app>
    <Loading></Loading>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import authenticated from '@/middleware/authenticated'
import Loading from '@/components/molecules/Loading'
import LogoutUseCase from '@/usecases/auth/LogoutUseCase'

export default Vue.extend({
  middleware: authenticated,
  components: { Loading },
  async fetch({ App, redirect }) {
    try {
      const usecase = new LogoutUseCase(App)
      await usecase.execute()
    } catch (error) {
      App.state.clear()
      redirect('/login')
    }
  },
  created() {
    this.App.state.clear()
    this.$router.push('/login')
  }
})
</script>
