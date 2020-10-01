<template>
  <div v-if="!fetchState.pending && !fetchState.error" class="profile-page">
    <ProfileBanner :profile="profile" />
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <FeedToggle />
          <div>
            <ArticlePreviewList :article-list="articleList" />
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
  toRefs,
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
      ...toRefs(state),
      fetchState,
    }
  },
})
</script>
