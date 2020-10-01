<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <nuxt-link to="/" class="navbar-brand">conduit</nuxt-link>
      <navigation-bar />
    </div>
  </nav>
</template>

<script lang="ts">
import NavigationBar from '@/components/NavigationBar.vue'

export default {
  name: 'GlobalHeader',
  components: {
    NavigationBar,
  },
}
</script>
