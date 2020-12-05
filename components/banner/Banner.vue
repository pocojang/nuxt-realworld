<template>
  <BannerContainer>
    <h1 class="logo-font">conduit</h1>
    <p>A place to share your knowledge.</p>
  </BannerContainer>
</template>

<script lang="ts">
import Vue from 'vue'

import BannerContainer from '@/components/banner/BannerContainer.vue'

export default Vue.extend({
  name: 'Banner',
  components: {
    BannerContainer,
  },
})
</script>
