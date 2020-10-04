<template>
  <div class="feed-toggle">
    <ul class="nav nav-pills outline-active">
      <li v-if="isLogin" class="nav-item">
        <a
          class="nav-link"
          :class="{ active: feedType === 'YOUR' }"
          @click="$emit('handle-feed-toggle', 'YOUR')"
          >Your Feed</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: feedType === 'GLOBAL' }"
          @click="$emit('handle-feed-toggle', 'GLOBAL')"
          >Global Feed</a
        >
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'FeedTabNavigation',
  props: {
    feedType: String,
    isLogin: Boolean,
  },
})
</script>
