<template>
  <div v-if="!fetchState.pending && !fetchState.error" class="profile-page">
    <profile-banner :profile="profile">
      <template v-slot:edit-button>
        <nuxt-link
          v-if="isMyProfile"
          to="/settings"
          class="btn btn-sm btn-outline-secondary action-btn"
        >
          <i class="ion-gear-a" /> Edit Profile Settings
        </nuxt-link>

        <a
          v-if="isLogin && !isMyProfile"
          class="btn btn-sm btn-outline-secondary action-btn"
          @click.prevent="fetchToggleFollowUser"
        >
          <template v-if="isFollowing">
            <i class="ion-minus-round" />
            {{ `Unfollow ${profile.username}` }}
          </template>

          <template v-else>
            <i class="ion-plus-round" />
            {{ `Follow ${profile.username}` }}
          </template>
        </a>
      </template>
    </profile-banner>
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <feed-tab-navigation />
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
  computed,
  defineComponent,
  toRef,
  useContext,
  useFetch,
} from '@nuxtjs/composition-api'
import useArticle from '~/compositions/useArticle'

import ArticlePreviewList from '~/components/ArticlePreviewList.vue'
import FeedTabNavigation from '~/components/FeedTabNavigation.vue'
import ProfileBanner from '~/components/ProfileBanner.vue'
import useUser from '~/compositions/useUser'
import useProfile from '~/compositions/useProfile'

export default defineComponent({
  name: 'ProfilePage',
  components: {
    ArticlePreviewList,
    FeedTabNavigation,
    ProfileBanner,
  },
  setup() {
    const { params } = useContext()
    const { userName } = params.value

    const { state: articleState, getArticleList } = useArticle()
    const {
      state: profileState,
      getProfile,
      followUser,
      unFollowUser,
    } = useProfile()
    const { user: userState, isLogin } = useUser()

    const isMyProfile = computed(
      () => userState.value.username === profileState.profile.username
    )
    const isFollowing = computed(
      () => isLogin && !isMyProfile.value && profileState.profile.following
    )

    const { fetchState } = useFetch(async () => {
      await getArticleList({
        author: userName,
      })
      await getProfile(userName)
    })

    const fetchToggleFollowUser = async () => {
      if (isFollowing.value) {
        await unFollowUser(userName)
      } else {
        await followUser(userName)
      }
    }

    return {
      articleList: toRef(articleState, 'articleList'),
      profile: toRef(profileState, 'profile'),
      fetchState,
      isLogin,
      isFollowing,
      isMyProfile,
      fetchToggleFollowUser,
    }
  },
})
</script>
