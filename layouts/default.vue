<template>
  <div id="main">
    <app-header />
    <Nuxt />
    <app-footer />
  </div>
</template>

<script lang="ts">
import { defineComponent, useAsync } from '@nuxtjs/composition-api'
import { useArticleList, useUser } from '@/compositions'
import appFooter from './appFooter.vue'
import appHeader from './appHeader.vue'

export default defineComponent({
  name: 'Default',
  components: {
    appHeader,
    appFooter,
  },
  setup() {
    const { retryLogin } = useUser()
    const { setFeedType } = useArticleList()

    useAsync(() => {
      if (process.server) {
        return false
      }

      const token = window.localStorage.getItem('token')

      if (token) {
        retryLogin(token)
        setFeedType('YOUR')

        return
      }

      setFeedType('GLOBAL')
    })
  },
})
</script>
