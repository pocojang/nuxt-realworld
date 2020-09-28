<template>
  <div>
    <div
      v-for="(article, articleIndex) in articleList"
      :key="articleIndex"
      class="article-preview"
    >
      <div class="article-meta">
        <nuxt-link to="/">
          <nuxt-link to="/">
            <img :src="article.author.image" alt="author profile image" />
          </nuxt-link>
          <div class="info">
            <nuxt-link to="/" class="author">
              {{ article.author.username }}</nuxt-link
            >
            <span class="date">{{ new Date(article.createdAt) }}</span>
          </div>
        </nuxt-link>
        <div class="pull-xs-right">
          <button class="btn btn-sm btn-outline-primary">
            <i class="ion-heart" />
            {{ article.favoritesCount }}
          </button>
        </div>
      </div>
      <nuxt-link to="/article/slug">
        <nuxt-link to="/" class="preview-link">
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>

          <ul v-if="article.tagList.length" class="tag-list">
            <li
              v-for="(value, tagIndex) in article.tagList"
              :key="tagIndex"
              class="tag-default tag-pill tag-outline"
            >
              {{ value }}
            </li>
          </ul>
        </nuxt-link>
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { Article } from '~/types'

/**
 * TODO:
 *
 * 1. createdAt? updatedAt?
 * 2. Date Format
 */
export default Vue.extend({
  name: 'ArticlePreviewList',
  props: {
    articleList: {
      type: Array,
      required: false,
      default: () => [],
    } as PropOptions<Article[]>,
  },
})
</script>
