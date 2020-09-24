<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <nuxt-link to="/" class="navbar-brand">conduit</nuxt-link>
      <AuthNavigationBar />
    </div>
  </nav>
</template>

<script lang="ts">
import AuthNavigationBar from './AuthNavigationBar.vue'

export default {
  name: 'GlobalHeader',
  components: {
    AuthNavigationBar,
  },
}
</script>
