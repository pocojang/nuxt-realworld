<template>
  <BannerContainer>
    <h1>
      <slot name="title" />
    </h1>

    <slot name="article-meta" />
  </BannerContainer>
</template>

<script lang="ts">
import Vue from 'vue'

import BannerContainer from '@/components/banner/BannerContainer.vue'

export default Vue.extend({
  name: 'ArticleBanner',
  components: {
    BannerContainer,
  },
})
</script>
