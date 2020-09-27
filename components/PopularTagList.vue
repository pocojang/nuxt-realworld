<template>
  <div class="sidebar">
    <p>Popular Tags</p>
    <div class="tag-list">
      <a
        v-for="(tag, index) in tagList"
        :key="index"
        class="tag-default tag-pill"
        >{{ tag }}</a
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { Tag } from '~/types'

export default Vue.extend({
  name: 'PopularTagList',
  props: {
    tagList: {
      type: Array,
      required: false,
      default: () => [],
    } as PropOptions<Tag[]>,
  },
})
</script>
