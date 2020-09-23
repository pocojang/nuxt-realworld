<template>
  <div>
    <NavigationBar />
    <Nuxt />
    <FooterCopyright />
  </div>
</template>

<script lang="ts">
import NavigationBar from '~/components/NavigationBar.vue'
import FooterCopyright from '~/components/FooterCopyright.vue'

export default {
  name: 'Default',
  components: {
    NavigationBar,
    FooterCopyright,
  },
}
</script>
