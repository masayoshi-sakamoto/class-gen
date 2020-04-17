<template>
  <validation-observer v-slot="{ invalid, passes }">
    <v-form ref="form" @submit.prevent="passes(submit)">
      <v-alert v-if="App.state.errors.message" dense outlined type="error" class="mt-6 mb-10">
        {{ App.state.errors.message }}
      </v-alert>
      <validation-provider v-slot="{ errors }" rules="required|min:3|max:255" name="ユーザID">
        <v-text-field
          v-model="props.username"
          :error-messages="App.state.errors.username ? App.state.errors.username : errors[0]"
          outlined
          label="ユーザID"
          required
        ></v-text-field>
      </validation-provider>
      <validation-provider v-slot="{ errors }" rules="required|min:8|max:255" name="パスワード">
        <v-text-field
          v-model="props.password"
          :append-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
          :type="show ? 'text' : 'password'"
          :error-messages="App.state.errors.password ? App.state.errors.password : errors[0]"
          outlined
          label="パスワード"
          required
          @click:append="show = !show"
        ></v-text-field>
      </validation-provider>
      <validation-provider v-slot="{ errors }" rules="required" name="お名前">
        <v-text-field
          v-model="props.name"
          :error-messages="App.state.errors.name ? App.state.errors.name : errors[0]"
          outlined
          label="お名前"
          required
        ></v-text-field>
      </validation-provider>
      <validation-provider v-slot="{ errors }" rules="required|email" name="メールアドレス">
        <v-text-field
          v-model="props.email"
          :error-messages="App.state.errors.email ? App.state.errors.email : errors[0]"
          outlined
          label="メールアドレス"
          required
        ></v-text-field>
      </validation-provider>
      <v-btn :disabled="invalid" class="mt-6" color="primary" type="submit" x-large block rounded elevation="0">
        <strong>サインアップ</strong>
      </v-btn>
    </v-form>
  </validation-observer>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import SignupEntity, { ISignupProps } from '@/entities/Signup'

interface IData {
  show: boolean
  props: ISignupProps
}

export default Vue.extend({
  props: {
    value: {
      type: Object as PropType<SignupEntity>,
      required: true
    }
  },
  data(): IData {
    return {
      show: false,
      props: this.value.props
    }
  },
  methods: {
    submit() {
      this.$emit('submit', new SignupEntity(this.props))
    }
  }
})
</script>
