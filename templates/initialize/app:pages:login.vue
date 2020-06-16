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
    this.App.state.clear()
  },
  methods: {
    async login(entity: LoginEntity) {
      try {
        const usecase = new LoginUseCase(this.App)
        this.App.state.loading = true
        this.$router.push(await usecase.execute(entity))
        this.App.state.loading = false
      } catch (error) {
        this.App.state.loading = false
        if (error.statusCode === 401) {
          this.App.state.errors = { message: 'IDまたはパスワードが違います' }
        }
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
