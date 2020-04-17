<template>
  <v-app>
    <ToolbarApp></ToolbarApp>
    <NavigationApp></NavigationApp>
    <Loading></Loading>
    <v-content>
      <v-container fluid>
        <h1>{{ title }}</h1>
      </v-container>
      <slot></slot>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Loading from '@/components/molecules/Loading'
import NavigationApp from '@/components/organisms/Navigation/App'
import ToolbarApp from '@/components/organisms/Toolbar/App'

export default Vue.extend({
  components: {
    Loading,
    NavigationApp,
    ToolbarApp
  },
  props: {
    title: {
      type: String,
      required: true
    }
  }
})
</script>
