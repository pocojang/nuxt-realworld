<template>
  <div v-if="!fetchState.pending && !fetchState.error" class="profile-page">
    <profile-banner :profile="profile" />
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <feed-toggle />
          <div>
            <article-preview-list :article-list="articleList" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRef,
  useContext,
  useFetch,
} from '@nuxtjs/composition-api'

import ArticlePreviewList from '~/components/ArticlePreviewList.vue'
import FeedToggle from '~/components/FeedToggle.vue'
import ProfileBanner from '~/components/ProfileBanner.vue'

export default defineComponent({
  name: 'ProfilePage',
  components: {
    ArticlePreviewList,
    FeedToggle,
    ProfileBanner,
  },
  setup() {
    const state = reactive({
      profile: {},
      articleList: [],
      articlesCount: 0,
    })

    const { $repository, params } = useContext()
    const { userName } = params.value

    const { fetchState } = useFetch(async () => {
      const { profile } = await $repository.profile.getProfile(userName)
      const {
        articles,
        articlesCount,
      } = await $repository.article.getArticleList({
        author: userName,
      })

      state.profile = profile
      state.articleList = articles
      state.articlesCount = articlesCount
    })

    return {
      articleList: toRef(state, 'articleList'),
      profile: toRef(state, 'profile'),
      fetchState,
    }
  },
})
</script>
