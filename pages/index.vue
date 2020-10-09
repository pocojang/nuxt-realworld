<template>
  <div class="home-page">
    <Banner v-if="!isLogin" />
    <div class="container">
      <div class="row">
        <div class="col-md-9">
          <tab-navigation
            :tab-type="feedType"
            :tab-items="tabItems"
            @on-click-tab="handleFeedToggle"
          />
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
import {
  computed,
  defineComponent,
  toRef,
  useFetch,
} from '@nuxtjs/composition-api'

import ArticlePreviewList from '~/components/ArticlePreviewList.vue'
import Banner from '~/components/Banner.vue'
import TabNavigation from '~/components/TabNavigation.vue'
import Pagination from '~/components/Pagination.vue'
import PopularTagList from '~/components/PopularTagList.vue'

import { useArticle, useTag, useUser } from '~/compositions'

export default defineComponent({
  name: 'IndexPage',
  components: {
    ArticlePreviewList,
    Banner,
    TabNavigation,
    Pagination,
    PopularTagList,
  },
  setup() {
    const { isLogin } = useUser()
    const {
      state: articleState,
      getArticleList,
      getFeedArticleList,
      getArticleListByTag,
      handleFeedToggle,
    } = useArticle()
    const { state: tagState, getTagList } = useTag()

    useFetch(async () => {
      if (articleState.feedType === 'YOUR') {
        await getFeedArticleList()
      } else {
        await getArticleList()
      }
    })

    useFetch(async () => {
      await getTagList()
    })

    return {
      articleList: toRef(articleState, 'articleList'),
      tagList: toRef(tagState, 'tagList'),
      feedType: toRef(articleState, 'feedType'),
      tabItems: computed(() =>
        isLogin.value
          ? [
              {
                type: 'YOUR',
                name: 'Your Feed',
              },
              ...tabItems,
            ]
          : tabItems
      ),
      getArticleListByTag,
      isLogin,
      handleFeedToggle,
    }
  },
})

const tabItems = [
  {
    type: 'GLOBAL',
    name: 'Global Feed',
  },
]
</script>
