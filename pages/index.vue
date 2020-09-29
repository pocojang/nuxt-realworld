<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-9">
          <FeedToggle />
          <ArticlePreviewList :article-list="articleList" />
          <Pagination />
        </div>
        <div class="col-md-3">
          <PopularTagList :tag-list="tagList" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useAsync,
  useContext,
  ref,
} from '@nuxtjs/composition-api'

import ArticlePreviewList from '~/components/ArticlePreviewList.vue'
import FeedToggle from '~/components/FeedToggle.vue'
import Pagination from '~/components/Pagination.vue'
import PopularTagList from '~/components/PopularTagList.vue'
import { Article, Tag } from '~/types'

export default defineComponent({
  name: 'IndexPage',
  components: {
    ArticlePreviewList,
    FeedToggle,
    Pagination,
    PopularTagList,
  },
  setup() {
    const articleList = ref<Article[]>([])
    const articleCount = ref<number>(0)
    const tagList = ref<Tag[]>([])

    const { $repository } = useContext()

    useAsync(async () => {
      const {
        articles,
        articlesCount,
      } = await $repository.article.getArticleList()
      const { tags } = await $repository.tag.getTagList()

      articleList.value = articles
      articleCount.value = articlesCount
      tagList.value = tags
    })

    return {
      articleCount,
      articleList,
      tagList,
    }
  },
})
</script>
