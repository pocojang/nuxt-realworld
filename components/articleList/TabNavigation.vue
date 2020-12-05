<template>
  <div class="feed-toggle">
    <ul class="nav nav-pills outline-active">
      <li v-for="(item, index) in tabItems" :key="index" class="nav-item">
        <a
          class="nav-link"
          :class="{ active: tabType === item.type }"
          @click="$emit('on-click-tab', item.type)"
        >
          {{ item.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

import { FeedTabItems, PostTabItems } from '@/constants'

export default Vue.extend({
  name: 'TabNavigation',
  props: {
    tabType: {
      type: String,
      required: true,
    },
    tabItems: {
      type: Array as PropType<FeedTabItems> | PropType<PostTabItems>,
      required: true,
    },
  },
})
</script>

<style scoped>
.nav-link.active {
  pointer-events: none;
}
</style>
