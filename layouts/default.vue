<template>
  <div id="main">
    <app-header />
    <Nuxt />
    <app-footer />
  </div>
</template>

<script lang="ts">
import appFooter from './appFooter.vue'
import appHeader from './appHeader.vue'

export default {
  name: 'Default',
  components: {
    appHeader,
    appFooter,
  },
}
</script>
