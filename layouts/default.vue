<template>
  <div id="main">
    <app-header />
    <Nuxt />
    <app-footer />
  </div>
</template>

<script lang="ts">
import { defineComponent, useAsync } from '@nuxtjs/composition-api'

import appFooter from './appFooter.vue'
import appHeader from './appHeader.vue'

import useUser from '~/compositions/useUser'

export default defineComponent({
  name: 'Default',
  components: {
    appHeader,
    appFooter,
  },
  setup() {
    const { retryLogin } = useUser()

    useAsync(() => {
      if (process.server) {
        return false
      }

      const token = window.localStorage.getItem('token')

      if (token) {
        retryLogin(token)
      }
    })
  },
})
</script>
