<template>
  <LayoutApp>
    <v-container v-if="error.statusCode !== 401" class="text-center pt-10">
      <h1 v-if="error.statusCode === 404">
        {{ pageNotFound }}
      </h1>
      <h1 v-else>
        {{ otherError }}
      </h1>
      <div class="mt-10">
        <nuxt-link to="/">トップページに戻る</nuxt-link>
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
      otherError: 'システムエラー'
    }
  },
  created() {
    this.App.state.url = this.$route.fullPath
    if (this.error.statusCode === 401) {
      this.$router.push('/logout')
    }
  },
  head() {
    const title = this.error.statusCode === 404 ? 'お探しのページは見つかりません' : 'システムエラー'
    return {
      title
    }
  }
})
</script>
