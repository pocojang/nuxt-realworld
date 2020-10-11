<template>
  <div :class="name">
    <div class="container">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'BannerContainer',
  props: {
    name: {
      type: String,
      required: false,
      default: 'banner',
    },
  },
})
</script>
