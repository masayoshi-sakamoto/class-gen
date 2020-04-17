<template>
  <AuthSignup @submit="signup"></AuthSignup>
</template>

<script lang="ts">
import Vue from 'vue'
import AuthSignup from '@/components/templates/Auth/Signup'
import SignupUseCase from '@/usecases/auth/SignupUseCase'
import SignupEntity from '@/entities/Signup'

export default Vue.extend({
  components: {
    AuthSignup
  },
  methods: {
    async signup(entity: SignupEntity) {
      const usecase = new SignupUseCase(this.App)
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
      title: 'サインアップ'
    }
  }
})
</script>
