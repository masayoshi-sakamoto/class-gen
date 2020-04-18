<template>
  <v-app-bar app dark clipped-left color="accent" dense>
    <v-app-bar-nav-icon @click.stop="App.state.drawer = !App.state.drawer" />
    <v-toolbar-title class="mr-12 align-center">
      <%= appName %>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text small class="font-weight-bold" :to="{ name: 'logout' }">
      ログアウト
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>
