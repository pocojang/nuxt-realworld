<template>
  <div>
    <form class="card comment-form" @submit.prevent="onSubmitComment">
      <div class="card-block">
        <textarea
          v-model="inputBody"
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
        />
      </div>
      <div class="card-footer">
        <img
          :src="loginUser.image"
          class="comment-author-img"
          alt="author profile image"
        />
        <button
          class="btn btn-sm btn-primary"
          type="submit"
          @click.prevent="onSubmitComment"
        >
          Post Comment
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { PropType } from 'vue'
import { User } from '@/types'

export default defineComponent({
  name: 'CommentEditor',
  props: {
    loginUser: {
      type: Object as () => PropType<User>,
      required: true,
    },
  },
  setup(_, { emit }) {
    const inputBody = ref('')

    const onSubmitComment = () => {
      emit('on-create-comment', inputBody.value)

      inputBody.value = ''
    }

    return { inputBody, onSubmitComment }
  },
})
</script>
