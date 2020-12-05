<template>
  <img :src="url" :alt="alt" :class="className" @error="imageUrlAlt" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import useUtils from '@/compositions/useUtils'

export default defineComponent({
  name: 'ProfileImage',
  props: {
    url: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      required: false,
      default: '',
    },
  },
  setup() {
    const { imageUrlAlt } = useUtils()

    return { imageUrlAlt }
  },
})
</script>
