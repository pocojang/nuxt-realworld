<template>
  <div>
    <div v-for="(comment, index) in commentList" :key="index" class="card">
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <nuxt-link
          :to="`/profile/${comment.author.username}`"
          class="comment-author"
        >
          <img
            :src="comment.author.image"
            class="comment-author-img"
            alt="author profile image"
          />
        </nuxt-link>
        <nuxt-link
          :to="`/profile/${comment.author.username}`"
          class="comment-author"
          >{{ comment.author.username }}</nuxt-link
        >
        <span class="date-posted">{{ comment.createdAt }}</span>
        <span class="mod-options">
          <i
            v-if="loginUser.username === comment.author.username"
            class="ion-trash-a"
            @click="$emit('on-delete-comment', comment.id)"
          ></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { Comment, User } from '~/types'

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
    loginUser: {
      type: Object,
      required: true,
    } as PropOptions<User>,
  },
})
</script>
