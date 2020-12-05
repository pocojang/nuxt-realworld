<template>
  <div class="article-meta">
    <nuxt-link :to="`/profile/${author.username}`">
      <ProfileImage :url="author.image" :alt="'author profile image'" />
    </nuxt-link>

    <div class="info">
      <nuxt-link :to="`/profile/${author.username}`" class="author">
        {{ author.username }}
      </nuxt-link>
      <span class="date">{{ new Date(article.createdAt).toDateString() }}</span>
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

    <span v-else>
      <button
        class="btn btn-sm"
        :class="{
          'btn-outline-secondary': !author.following,
          'btn-secondary': author.following,
        }"
        @click="$emit('on-toggle-follow-user')"
      >
        <template v-if="author.following">
          <i class="ion-minus-round" />
          Unfollow
        </template>

        <template v-else>
          <i class="ion-plus-round" />
          Follow
        </template>
      </button>

      <button
        class="btn btn-sm"
        :class="{
          'btn-outline-primary': !article.favorited,
          'btn-primary': article.favorited,
        }"
        @click="$emit('on-toggle-favorite-article')"
      >
        <i class="ion-heart" />
        <span>{{ article.favorited ? 'Unfavorite' : 'Favorite' }}</span>
        <span class="counter">({{ article.favoritesCount }})</span>
      </button>
    </span>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Article, Author } from '@/types'

import ProfileImage from '@/components/common/ProfileImage.vue'

export default Vue.extend({
  name: 'ArticleMeta',
  components: {
    ProfileImage,
  },
  props: {
    isMyArticle: {
      type: Boolean,
      required: true,
    },
    article: {
      type: Object as PropType<Article>,
      required: true,
    },
    author: {
      type: Object as PropType<Author>,
      required: true,
    },
  },
})
</script>
