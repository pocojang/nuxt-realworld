<template>
  <div class="banner">
    <div class="container">
      <h1>
        <slot name="title" />
      </h1>
      <div class="article-meta">
        <nuxt-link :to="`/profile/${author.username}`">
          <img :src="author.image" alt="author profile image" />
        </nuxt-link>
        <div class="info">
          <nuxt-link :to="`/profile/${author.username}`" class="author">{{
            author.username
          }}</nuxt-link>
          <span class="date">{{ new Date(article.createdAt) }}</span>
        </div>
        <span v-if="isMyArticle">
          <nuxt-link
            :to="`/editor/${article.slug}`"
            class="btn btn-outline-secondary btn-sm"
          >
            <i class="ion-edit" /> Edit Article
          </nuxt-link>
          <button
            class="btn btn-outline-danger btn-sm"
            @click="$emit('on-delete-article')"
          >
            <i class="ion-trash-a" /> Delete Article
          </button>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { Article, Author } from '~/types'

export default Vue.extend({
  name: 'ArticleBanner',
  props: {
    article: {
      type: Object,
      required: true,
      default: () => {},
    } as PropOptions<Article>,
    author: {
      type: Object,
      required: true,
      default: () => {},
    } as PropOptions<Author>,
    isMyArticle: {
      type: Boolean,
      required: true,
    },
  },
})
</script>
