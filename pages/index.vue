<template>
  <div class="home-page">
    <Banner v-if="!isLogin" />
    <div class="container">
      <div class="row">
        <div class="col-md-9">
          <feed-tab-navigation :is-login="isLogin" />
          <article-preview-list :article-list="articleList" />
          <pagination />
        </div>
        <div class="col-md-3">
          <popular-tag-list
            :tag-list="tagList"
            @on-click-tag="getArticleListByTag"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRef, useFetch } from '@nuxtjs/composition-api'

import ArticlePreviewList from '~/components/ArticlePreviewList.vue'
import Banner from '~/components/Banner.vue'
import FeedTabNavigation from '~/components/FeedTabNavigation.vue'
import Pagination from '~/components/Pagination.vue'
import PopularTagList from '~/components/PopularTagList.vue'
import useArticle from '~/compositions/useArticle'
import useTag from '~/compositions/useTag'
import useUser from '~/compositions/useUser'

export default defineComponent({
  name: 'IndexPage',
  components: {
    ArticlePreviewList,
    Banner,
    FeedTabNavigation,
    Pagination,
    PopularTagList,
  },
  setup() {
    const { isLogin } = useUser()
    const {
      state: articleState,
      getArticleList,
      getArticleListByTag,
    } = useArticle()
    const { state: tagState, getTagList } = useTag()

    useFetch(async () => {
      await getArticleList()
      await getTagList()
    })

    console.log(isLogin)

    return {
      articleList: toRef(articleState, 'articleList'),
      tagList: toRef(tagState, 'tagList'),
      getArticleListByTag,
      isLogin,
    }
  },
})
</script>
