<template>
  <LayoutApp>
    <v-container class="text-center pt-10">
      <h1 v-if="error.statusCode === 404">
        {{ pageNotFound }}
      </h1>
      <h1 v-else>
        {{ otherError }}
      </h1>
      <div class="mt-10">
        <NuxtLink to="/">
          トップページに戻る
        </NuxtLink>
      </div>
    </v-container>
  </LayoutApp>
</template>

<script lang="ts">
import Vue from 'vue'
import LayoutApp from '@/components/organisms/Layout/App'

export default Vue.extend({
  components: {
    LayoutApp
  },
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pageNotFound: 'お探しのページは見つかりません',
      otherError: 'エラー'
    }
  },
  head() {
    const title = this.error.statusCode === 404 ? 'お探しのページは見つかりません' : 'エラー'
    return {
      title
    }
  }
})
</script>
