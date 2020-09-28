<template>
  <div class="banner">
    <div class="container">
      <h1>Why</h1>
      <div class="article-meta">
        <nuxt-link to="/">
          <img :src="author.image" alt="author profile image" />
        </nuxt-link>
        <div class="info">
          <nuxt-link to="/" class="author">{{ author.username }}</nuxt-link>
          <span class="date">{{ new Date(createdAt) }}</span>
        </div>
        <span>
          <nuxt-link to="/editor/slug" class="btn btn-outline-secondary btn-sm">
            <i class="ion-edit"></i>
          </nuxt-link>
          <button class="btn btn-outline-danger btn-sm">
            <i class="ion-trash-a"></i>
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
    author: {
      type: Object,
      required: true,
      default: () => {},
    } as PropOptions<Author>,
    createdAt: {
      type: String,
      required: true,
      default: '',
    } as PropOptions<Article['createdAt']>,
  },
})
</script>
