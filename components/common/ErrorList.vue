<template>
  <ul class="error-messages">
    <li v-for="(values, name, index) in errors" :key="index">
      {{ name }} <template v-for="err in values">{{ err }} </template>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

import { CustomErrors } from '@/types'

export default Vue.extend({
  name: 'ErrorList',
  props: {
    errors: {
      type: Object,
      required: true,
    } as PropOptions<CustomErrors>,
  },
})
</script>
