<template>
  <div class="home-page">
    <Banner v-if="!isLogin" />
    <div class="container">
      <div class="row">
        <div class="col-md-9">
          <tab-navigation
            :tab-type="feedType"
            :tab-items="tabItems"
            @on-click-tab="getArticleListByFeed"
          />

          <template v-if="!fetchState.pending && !fetchState.error">
            <article-preview-list
              :article-list="articleList"
              @toggle-favorite-article="toggleFavoriteArticle"
            />
            <pagination />
          </template>
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

import ArticlePreviewList from '@/components/ArticlePreviewList.vue'
import Banner from '@/components/Banner.vue'
import TabNavigation from '@/components/TabNavigation.vue'
import Pagination from '@/components/Pagination.vue'
import PopularTagList from '@/components/PopularTagList.vue'

import { useArticleList, useTag, useUser } from '@/compositions'
import { feedTypes } from '@/constants'

// TODO: [Vue warn]: Write operation failed: computed value is readonly.
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
      articleList,
      feedType,
      getArticleList,
      getFeedArticleList,
      getArticleListByTag,
      getArticleListByFeed,
      toggleFavoriteArticle,
    } = useArticleList()
    const { state: tagState, getTagList } = useTag()

    const { fetchState } = useFetch(async () => {
      if (feedType.value === 'YOUR') {
        await getFeedArticleList()
      } else {
        await getArticleList()
      }
    })

    useFetch(async () => {
      await getTagList()
    })

    return {
      fetchState,
      articleList,
      feedType,
      tagList: toRef(tagState, 'tagList'),
      tabItems: computed(() => {
        const [, globalFeed] = feedTypes

        return isLogin.value ? feedTypes : [globalFeed]
      }),
      getArticleListByTag,
      isLogin,
      getArticleListByFeed,
      toggleFavoriteArticle,
    }
  },
})
</script>
