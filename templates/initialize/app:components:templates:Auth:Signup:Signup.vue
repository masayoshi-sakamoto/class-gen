<template>
  <LayoutAuth>
    <v-row>
      <v-col offset="1" cols="10" offset-sm="2" sm="8" offset-md="3" md="6" offset-lg="4" lg="4">
        <v-sheet color="white" class="pa-10 mt-10">
          <FormSignup v-model="entity" @submit="submit"></FormSignup>
        </v-sheet>
      </v-col>
    </v-row>
  </LayoutAuth>
</template>

<script lang="ts">
import Vue from 'vue'
import LayoutAuth from '@/components/organisms/Layout/Auth'
import FormSignup from '@/components/organisms/Form/Signup'
import SignupEntity, { EmptySignupEntityFactory } from '@/entities/Signup'

interface IData {
  entity: SignupEntity
}

export default Vue.extend({
  components: {
    LayoutAuth,
    FormSignup
  },
  data(): IData {
    return {
      entity: EmptySignupEntityFactory()
    }
  },
  methods: {
    submit(entity: SignupEntity) {
      this.$emit('submit', entity)
    }
  }
})
</script>
