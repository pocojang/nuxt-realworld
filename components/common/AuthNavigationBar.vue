<template>
  <ul class="nav navbar-nav pull-xs-right">
    <li class="nav-item">
      <nuxt-link to="/" class="nav-link">Home</nuxt-link>
    </li>
    <li class="nav-item">
      <nuxt-link to="/editor" class="nav-link">
        <i class="ion-compose" /> New Post
      </nuxt-link>
    </li>
    <li class="nav-item">
      <nuxt-link to="/settings" class="nav-link">
        <i class="ion-gear-a" /> Settings
      </nuxt-link>
    </li>
    <li class="nav-item">
      <nuxt-link :to="`/profile/${userName}`" class="nav-link">
        <ProfileImage
          :url="image"
          :class-name="'user-pic'"
          :alt="'user profile image'"
        />
        {{ userName }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

import { User } from '@/types'
import ProfileImage from '@/components/common/ProfileImage.vue'

export default Vue.extend({
  name: 'AuthNavigationBar',
  components: {
    ProfileImage,
  },
  props: {
    userName: {
      type: String as PropType<User['username']>,
      required: true,
      default: '',
    },
    image: {
      type: String as PropType<User['image']>,
      required: true,
      default: '',
    },
  },
})
</script>
