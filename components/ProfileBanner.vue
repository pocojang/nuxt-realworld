<template>
  <div class="user-info">
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <img :src="profile.image" class="user-img" alt="user profile image" />
          <h4>{{ profile.username }}</h4>
          <!-- <p>TODO: Profile User info</p> -->
          <nuxt-link
            to="/settings"
            class="btn btn-sm btn-outline-secondary action-btn"
          >
            <!-- TODO: conditional rendering -->
            <i class="ion-gear-a" /> {{ `Follow ${profile.username}` }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { Profile } from '~/types'

/**
 * TODO Follow
 */
export default Vue.extend({
  name: 'ProfileBanner',
  props: {
    profile: {
      type: Object,
      required: true,
      default: () => {},
    } as PropOptions<Profile>,
  },
})
</script>
