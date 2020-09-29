<template>
  <div>
    <div v-for="(comment, index) in commentList" :key="index" class="card">
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <nuxt-link :to="`/${comment.author.username}`" class="comment-author">
          <img
            :src="comment.author.image"
            class="comment-author-img"
            alt="author profile image"
          />
        </nuxt-link>
        <nuxt-link :to="`/${comment.author.username}`" class="comment-author">{{
          comment.author.username
        }}</nuxt-link>
        <span class="date-posted">{{ comment.createdAt }}</span>
        <span class="mod-options">
          <i class="ion-trash-a"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { Comment } from '~/types'

/**
 *
 * TODO
 *
 * 1. Body Parser
 *
 */
export default Vue.extend({
  name: 'CommentCardList',
  props: {
    commentList: {
      type: Array,
      required: false,
      default: () => [],
    } as PropOptions<Comment[]>,
  },
})
</script>
