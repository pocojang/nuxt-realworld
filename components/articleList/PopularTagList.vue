<template>
  <div class="sidebar">
    <p>Popular Tags</p>
    <div class="tag-list">
      <a
        v-for="(tag, index) in tagList"
        :key="index"
        class="tag-default tag-pill"
        @click="$emit('on-click-tag', tag)"
      >
        {{ tag }}
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

import { Tag } from '@/types'

export default Vue.extend({
  name: 'PopularTagList',
  props: {
    tagList: {
      type: Array as PropType<Tag[]>,
      required: true,
    },
  },
})
</script>

<style scoped>
.tag-default {
  cursor: pointer;
}
</style>
