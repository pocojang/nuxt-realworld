<template>
  <ul class="tag-list">
    <li
      v-for="(tag, index) in tagList"
      :key="index"
      class="tag-default tag-pill tag-outline"
    >
      {{ tag }}
    </li>
  </ul>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

import { Tag } from '@/types'

export default Vue.extend({
  name: 'ArticleTagList',
  props: {
    tagList: {
      type: Array as () => PropType<Tag[]>,
      required: true,
    },
  },
})
</script>
