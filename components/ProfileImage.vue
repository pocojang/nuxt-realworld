<template>
  <nuxt-link v-if="redirectUrl" :to="redirectUrl">
    <img :src="url" :alt="alt" :class="className" @error="imageUrlAlt" />
  </nuxt-link>

  <img v-else :src="url" :alt="alt" :class="className" @error="imageUrlAlt" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useUtils } from '@/compositions'

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
    redirectUrl: {
      type: String,
      required: false,
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
