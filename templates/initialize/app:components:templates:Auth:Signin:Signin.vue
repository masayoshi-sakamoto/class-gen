<template>
  <LayoutAuth>
    <v-row>
      <v-col offset="1" cols="10" offset-sm="2" sm="8" offset-md="3" md="6" offset-lg="4" lg="4">
        <v-sheet color="white" class="pa-10 mt-10">
          <FormSignin v-model="entity" @submit="submit"></FormSignin>
        </v-sheet>
      </v-col>
    </v-row>
  </LayoutAuth>
</template>

<script lang="ts">
import Vue from 'vue'
import LayoutAuth from '@/components/organisms/Layout/Auth'
import FormSignin from '@/components/organisms/Form/Signin'
import LoginEntity, { EmptyLoginEntityFactory } from '@/entities/Login'

interface IData {
  entity: LoginEntity
}

export default Vue.extend({
  components: {
    LayoutAuth,
    FormSignin
  },
  data(): IData {
    return {
      entity: EmptyLoginEntityFactory()
    }
  },
  methods: {
    submit(entity: LoginEntity) {
      this.$emit('submit', entity)
    }
  }
})
</script>
