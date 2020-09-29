<template>
  <div class="sidebar">
    <p>Popular Tags</p>
    <div class="tag-list">
      <a
        v-for="(tag, index) in existTagList"
        :key="index"
        class="tag-default tag-pill"
        >{{ tag }}</a
      >
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable import/named */
import { defineComponent, computed, PropType } from '@nuxtjs/composition-api'
import { Tag } from '~/types'

export default defineComponent({
  name: 'PopularTagList',
  props: {
    tagList: {
      type: Array as PropType<Tag[]>,
      required: true,
    },
  },
  setup(props) {
    const existTagList = computed(() =>
      props.tagList.filter((tag: Tag) =>
        String(tag).replace(/[\u200B-\u200D\uFEFF]/g, '')
      )
    )

    return { existTagList }
  },
})
</script>
