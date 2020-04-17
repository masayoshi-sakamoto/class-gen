<template>
  <AuthSignin @submit="login"></AuthSignin>
</template>

<script lang="ts">
import Vue from 'vue'
import AuthSignin from '@/components/templates/Auth/Signin'
import LoginUseCase from '@/usecases/auth/LoginUseCase'
import LoginEntity from '@/entities/Login'

export default Vue.extend({
  components: {
    AuthSignin
  },
  created() {
    this.App.state.refresh()
  },
  methods: {
    async login(entity: LoginEntity) {
      const usecase = new LoginUseCase(this.App)
      this.App.state.loading = true
      const url = await usecase.execute(entity)
      this.App.state.loading = false
      if (typeof url === 'string') {
        this.$router.push(url)
      }
    }
  },
  head() {
    return {
      title: 'ログイン'
    }
  }
})
</script>
