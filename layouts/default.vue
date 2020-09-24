<template>
  <div id="main">
    <GlobalHeader />
    <Nuxt />
    <FooterCopyright />
  </div>
</template>

<script lang="ts">
import GlobalHeader from '~/components/GlobalHeader.vue'
import FooterCopyright from '~/components/FooterCopyright.vue'

export default {
  name: 'Default',
  components: {
    GlobalHeader,
    FooterCopyright,
  },
}
</script>
