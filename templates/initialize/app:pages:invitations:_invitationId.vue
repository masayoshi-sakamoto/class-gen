<template>
  <AuthSignup :invitation-id="$route.params.invitationId" @submit="signup"></AuthSignup>
</template>

<script lang="ts">
import Vue from 'vue'
import AuthSignup from '@/components/templates/Auth/Signup'
import SignupUseCase from '@/usecases/auth/SignupUseCase'
import SignupEntity from '@/entities/Signup'
import ActivateUseCase from '@/usecases/auth/ActivateUseCase'

export default Vue.extend({
  components: {
    AuthSignup
  },
  async fetch({ App, params }) {
    const usecase = new ActivateUseCase(App)
    await usecase.execute(params.invitationId)
  },
  methods: {
    async signup(entity: SignupEntity) {
      const usecase = new SignupUseCase(this.App)
      const url = await usecase.execute(entity)
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
