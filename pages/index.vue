<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-9">
          <FeedToggle />
          <div><ArticlePreview /></div>
          <Pagination />
        </div>
        <div class="col-md-3">
          <SideBar />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ArticlePreview from '~/components/ArticlePreview.vue'
import FeedToggle from '~/components/FeedToggle.vue'
import Pagination from '~/components/Pagination.vue'
import SideBar from '~/components/SideBar.vue'

export default {
  name: 'Index',
  components: {
    ArticlePreview,
    FeedToggle,
    Pagination,
    SideBar,
  },
}
</script>
