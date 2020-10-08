<template>
  <ul class="error-messages">
    <li v-if="(error, index) in errors" :key="index">
      {{ error.key }} {{ error.value }}
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ErrorList',
  props: {
    errors: {
      type: Object,
      required: true,
    },
  },
})
</script>
