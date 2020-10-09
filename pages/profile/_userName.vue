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
          <tab-navigation
            :tab-type="postType"
            :tab-items="tabItems"
            @on-click-tab="onChangeTab"
          />
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

import { useArticle, useProfile, useUser } from '~/compositions'
import { PostType } from '~/compositions/useArticle'

import ArticlePreviewList from '~/components/ArticlePreviewList.vue'
import TabNavigation from '~/components/TabNavigation.vue'
import ProfileBanner from '~/components/ProfileBanner.vue'

export default defineComponent({
  name: 'ProfilePage',
  components: {
    ArticlePreviewList,
    TabNavigation,
    ProfileBanner,
  },
  setup() {
    const { params } = useContext()
    const { userName } = params.value

    const { state: articleState, handlePostToggle } = useArticle()
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
      await handlePostToggle({ userName, postType: articleState.postType })
      await getProfile(userName)
    })

    const fetchToggleFollowUser = async () => {
      if (isFollowing.value) {
        await unFollowUser(userName)
      } else {
        await followUser(userName)
      }
    }

    const onChangeTab = async (postType: PostType) => {
      await handlePostToggle({ userName, postType })
    }

    return {
      articleList: toRef(articleState, 'articleList'),
      profile: toRef(profileState, 'profile'),
      postType: toRef(articleState, 'postType'),
      tabItems,
      fetchState,
      onChangeTab,
      isLogin,
      isFollowing,
      isMyProfile,
      fetchToggleFollowUser,
    }
  },
})

const tabItems = [
  {
    type: 'AUTHOR',
    name: 'My Posts',
  },
  {
    type: 'FAVORITED',
    name: 'Favorited Posts',
  },
]
</script>
