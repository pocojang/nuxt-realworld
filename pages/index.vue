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
          <PopularTagList :tag-list="tagList" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import ArticlePreview from '~/components/ArticlePreview.vue'
import FeedToggle from '~/components/FeedToggle.vue'
import Pagination from '~/components/Pagination.vue'
import PopularTagList from '~/components/PopularTagList.vue'
import { Tag } from '~/types'

export default Vue.extend({
  name: 'IndexPage',
  components: {
    ArticlePreview,
    FeedToggle,
    Pagination,
    PopularTagList,
  },
  async asyncData({ $repository }) {
    const {
      articles,
      articlesCount,
    } = await $repository.article.getArticleList()
    const { tags } = await $repository.tag.getTagList()

    return {
      articleCount: articlesCount,
      articleList: articles,
      tagList: tags.filter((tag: Tag) =>
        String(tag).replace(/[\u200B-\u200D\uFEFF]/g, '')
      ),
    }
  },
  data() {
    return {
      articleCount: [],
      articleList: [],
      tagList: [],
    }
  },
})
</script>
