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
import { defineComponent } from '@nuxtjs/composition-api'

// TODO: Add Typing
export default defineComponent({
  name: 'TabNavigation',
  props: {
    tabType: String,
    tabItems: Array,
  },
})
</script>

<style scoped>
.nav-link.active {
  pointer-events: none;
}
</style>
