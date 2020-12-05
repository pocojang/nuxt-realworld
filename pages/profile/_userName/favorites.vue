<template>
  <article-list-loading v-if="fetchState.pending" />

  <article-preview-list
    v-else-if="!fetchState.error"
    :article-list="articleList"
    @toggle-favorite-article="toggleFavoriteArticleByList"
  />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import useProfileList from '@/compositions/useProfileList'
import ArticlePreviewList from '@/components/articleList/ArticlePreviewList.vue'
import ArticleListLoading from '@/components/articleList/ArticleListLoading.vue'

export default defineComponent({
  name: 'ProfileFavoritePage',
  components: {
    ArticlePreviewList,
    ArticleListLoading,
  },
  setup() {
    return useProfileList()
  },
})
</script>
