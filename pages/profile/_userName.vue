<template>
  <div v-if="!fetchState.pending && !fetchState.error" class="profile-page">
    <profile-banner :profile="profile">
      <template #edit-button>
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
          <nuxt-child :key="$route.params.userName" />
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

import { useProfileUser, useProfileList, useUser } from '@/compositions'
import { PostType } from '@/compositions/useProfileList'

import TabNavigation from '@/components/articleList/TabNavigation.vue'
import ProfileBanner from '@/components/banner/ProfileBanner.vue'
import { postTypes } from '@/constants'

export default defineComponent({
  name: 'ProfilePage',
  components: {
    TabNavigation,
    ProfileBanner,
  },
  setup() {
    const { params, redirect } = useContext()
    const { userName } = params.value

    const { postType, setPostType } = useProfileList()
    const {
      state: profileState,
      getProfile,
      followUser,
      unFollowUser,
    } = useProfileUser()
    const { user: userState, isLogin } = useUser()

    const isMyProfile = computed(
      () => userState.value.username === profileState.profile.username
    )
    const isFollowing = computed(
      () => isLogin && !isMyProfile.value && profileState.profile.following
    )

    const { fetchState } = useFetch(async () => {
      await getProfile(userName)
    })

    const fetchToggleFollowUser = async () => {
      if (isFollowing.value) {
        await unFollowUser(userName)
      } else {
        await followUser(userName)
      }
    }

    const onChangeTab = (postType: PostType) => {
      const urlBy = {
        AUTHOR: (userName: string) => '/profile/' + userName,
        FAVORITED: (userName: string) => `/profile/${userName}/favorites`,
      }
      const newURL = urlBy[postType](userName)

      setPostType(postType)
      redirect(newURL)
    }

    return {
      profile: toRef(profileState, 'profile'),
      postType,
      tabItems: postTypes,
      fetchState,
      onChangeTab,
      isLogin,
      isFollowing,
      isMyProfile,
      fetchToggleFollowUser,
    }
  },
})
</script>
