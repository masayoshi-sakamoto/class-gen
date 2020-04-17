<template>
  <v-navigation-drawer v-model="App.state.drawer" dark clipped app color="accent">
    <v-list>
      <v-list-item-group color="white">
        <template v-for="menu in App.state.menus">
          <v-list-item :key="menu.id">
            <v-list-item-icon>
              <v-icon v-text="menu.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="qif--font-noto font-weight-bold">{{ menu.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider :key="menu.id"></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>
