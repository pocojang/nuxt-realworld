<template>
  <div class="user-info">
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <img :src="profile.image" class="user-img" alt="user profile image" />
          <h4>{{ profile.username }}</h4>
          <p v-if="profile.bio">{{ profile.bio }}</p>

          <slot name="edit-button"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { defineComponent } from '@nuxtjs/composition-api'
import { Profile } from '~/types'

export default defineComponent({
  name: 'ProfileBanner',
  props: {
    profile: {
      type: Object as () => PropType<Profile>,
      required: true,
    },
  },
})
</script>
