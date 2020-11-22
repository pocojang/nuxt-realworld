<template>
  <article-preview-list
    v-if="!fetchState.pending && !fetchState.error"
    :article-list="articleList"
    @toggle-favorite-article="toggleFavoriteArticleByList"
  />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import useProfileList from '@/compositions/useProfileList'
import ArticlePreviewList from '@/components/ArticlePreviewList.vue'

export default defineComponent({
  name: 'ProfileAuthorPage',
  components: {
    ArticlePreviewList,
  },
  setup() {
    return useProfileList()
  },
})
</script>
