<template>
  <div class="profile-page">
    <ProfileBanner />
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <FeedToggle />
          <div>
            <ArticlePreviewList />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ArticlePreviewList from '~/components/ArticlePreviewList.vue'
import FeedToggle from '~/components/FeedToggle.vue'
import ProfileBanner from '~/components/ProfileBanner.vue'

export default {
  name: 'Profile',
  components: {
    ArticlePreviewList,
    FeedToggle,
    ProfileBanner,
  },
}
</script>
