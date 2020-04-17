<template>
  <v-app>
    <v-sheet tile color="accent" class="fill-height">
      <Loading></Loading>
      <v-content>
        <slot></slot>
      </v-content>
    </v-sheet>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Loading from '@/components/molecules/Loading'

export default Vue.extend({
  components: {
    Loading
  }
})
</script>
