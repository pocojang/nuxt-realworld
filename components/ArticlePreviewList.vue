<template>
  <div>
    <div
      v-for="(article, articleIndex) in articleList"
      :key="articleIndex"
      class="article-preview"
    >
      <div class="article-meta">
        <nuxt-link :to="`/profile/${article.author.username}`">
          <img :src="article.author.image" alt="author profile image" />
        </nuxt-link>
        <div class="info">
          <nuxt-link :to="`/profile/${article.author.username}`" class="author">
            {{ article.author.username }}
          </nuxt-link>
          <span class="date">{{ new Date(article.createdAt) }}</span>
        </div>
        <button
          class="btn btn-sm pull-xs-right"
          :class="{
            'btn-outline-primary': !article.favorited,
            'btn-primary': article.favorited,
          }"
          @click="fetchToggleFavorite(articleIndex)"
        >
          <i class="ion-heart" />
          {{ article.favoritesCount }}
        </button>
      </div>
      <nuxt-link :to="`/article/${article.slug}`" class="preview-link">
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
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { defineComponent } from '@nuxtjs/composition-api'
import { Article } from '~/types'
import useArticleList from '~/compositions/useArticleList'

/**
 * TODO:
 *
 * 1. createdAt? updatedAt?
 * 2. Date Format
 */
export default defineComponent({
  name: 'ArticlePreviewList',
  props: {
    articleList: {
      type: Array as () => PropType<Article[]>,
      required: false,
    },
  },
  setup() {
    const { fetchToggleFavorite } = useArticleList()

    return { fetchToggleFavorite }
  },
})
</script>
