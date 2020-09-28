<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
        />
      </div>
      <div class="card-footer">
        <img
          src="https://avatars0.githubusercontent.com/u/68723614?s=400&amp;u=9676acd378ca0802e86a17f845a536af648497e0&amp;v=4"
          class="comment-author-img"
          alt="author profile image"
        />
        <button class="btn btn-sm btn-primary" type="submit">
          Post Comment
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'CommentEditor',
})
</script>
