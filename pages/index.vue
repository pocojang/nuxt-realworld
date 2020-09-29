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
          <PopularTagList
            :tag-list="tagList"
            @on-click-tag="getArticleListByTag"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
  reactive,
  toRefs,
  useFetch,
} from '@nuxtjs/composition-api'

import ArticlePreviewList from '~/components/ArticlePreviewList.vue'
import FeedToggle from '~/components/FeedToggle.vue'
import Pagination from '~/components/Pagination.vue'
import PopularTagList from '~/components/PopularTagList.vue'
import { Article, Tag } from '~/types'

type State = {
  articleList: Article[]
  tagList: Tag[]
  articleCount: number
}

export default defineComponent({
  name: 'IndexPage',
  components: {
    ArticlePreviewList,
    FeedToggle,
    Pagination,
    PopularTagList,
  },
  setup() {
    const state = reactive<State>({
      articleList: [],
      tagList: [],
      articleCount: 0,
    })

    const { $repository } = useContext()

    useFetch(async () => {
      const {
        articles,
        articlesCount,
      } = await $repository.article.getArticleList()
      const { tags } = await $repository.tag.getTagList()

      state.articleList = articles
      state.articleCount = articlesCount
      state.tagList = tags.filter((tag: Tag) =>
        String(tag).replace(/[\u200B-\u200D\uFEFF]/g, '')
      )
    })

    const getArticleListByTag = async (tag: Tag) => {
      const {
        articles,
        articlesCount,
      } = await $repository.article.getArticleList({ tag })

      state.articleList = articles
      state.articleCount = articlesCount
    }

    return {
      ...toRefs(state),
      getArticleListByTag,
    }
  },
})
</script>
