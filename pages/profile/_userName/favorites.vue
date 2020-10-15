<template>
  <article-preview-list
    v-if="!fetchState.pending && !fetchState.error"
    :article-list="articleList"
  />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import useProfileList from '~/compositions/useProfileList'
import ArticlePreviewList from '~/components/ArticlePreviewList.vue'

export default defineComponent({
  name: 'ProfileFavoritePage',
  components: {
    ArticlePreviewList,
  },
  setup() {
    return useProfileList()
  },
})
</script>
