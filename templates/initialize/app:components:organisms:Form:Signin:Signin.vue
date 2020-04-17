<template>
  <validation-observer v-slot="{ invalid, passes }">
    <v-form ref="form" @submit.prevent="passes(submit)">
      <v-alert v-if="App.state.errors.message" dense outlined type="error" class="mb-10">
        {{ App.state.errors.message }}
      </v-alert>
      <validation-provider v-slot="{ errors }" rules="required" name="ユーザID">
        <v-text-field
          v-model="props.username"
          outlined
          :error-messages="App.state.errors.username ? App.state.errors.username : errors[0]"
          label="ユーザID"
        ></v-text-field>
      </validation-provider>
      <validation-provider v-slot="{ errors }" rules="required" name="パスワード">
        <v-text-field
          v-model="props.password"
          outlined
          :append-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
          :type="show ? 'text' : 'password'"
          :error-messages="errors[0]"
          label="パスワード"
          class="mt-4"
          @click:append="show = !show"
        ></v-text-field>
      </validation-provider>
      <v-btn :disabled="invalid" class="mt-6" color="primary" type="submit" x-large block elevation="0">
        <strong>ログイン</strong>
      </v-btn>
    </v-form>
  </validation-observer>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import LoginEntity, { ILoginProps } from '@/entities/Login'

interface IData {
  show: boolean
  props: ILoginProps
}

export default Vue.extend({
  props: {
    value: {
      type: Object as PropType<LoginEntity>,
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
      this.$emit('submit', new LoginEntity(this.props))
    }
  }
})
</script>
