<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <nuxt-link to="/" class="navbar-brand">conduit</nuxt-link>

      <auth-navigation-bar
        v-if="isLogin"
        :user-name="user.username"
        :image="user.image"
      />
      <navigation-bar v-else />
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import AuthNavigationBar from '@/components/common/AuthNavigationBar.vue'
import NavigationBar from '@/components/common/NavigationBar.vue'
import useUser from '@/compositions/useUser'

export default defineComponent({
  name: 'AppHeader',
  components: {
    AuthNavigationBar,
    NavigationBar,
  },
  setup() {
    return useUser()
  },
})
</script>
