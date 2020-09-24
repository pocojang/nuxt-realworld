<template>
  <div>
    <ArticleBanner />
    <div class="article-page">
      <div class="container page">
        <div class="row article-content">
          <div class="col-xs-12">
            <div>
              <h1 id="world">world</h1>
            </div>
            <ul class="tag-list">
              <li class="tag-default tag-pill tag-outline">suwon</li>
            </ul>
          </div>
        </div>
        <hr />
        <div class="article-actions"></div>
        <div class="row">
          <div class="col-xs-12 col-md-8 offset-md-2">
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
            <div>
              <div class="card">
                <div class="card-block">
                  <p class="card-text">Goo2</p>
                </div>
                <div class="card-footer">
                  <nuxt-link to="userName" class="comment-author">
                    <img
                      src="https://avatars0.githubusercontent.com/u/68723614?s=400&amp;u=9676acd378ca0802e86a17f845a536af648497e0&amp;v=4"
                      class="comment-author-img"
                      alt="author profile image"
                    />
                  </nuxt-link>
                  <nuxt-link to="/" class="comment-author">devJang</nuxt-link>
                  <span class="date-posted">Wed Sep 02 2020</span>
                  <span class="mod-options">
                    <i class="ion-trash-a"></i>
                  </span>
                </div>
              </div>
              <div class="card">
                <div class="card-block">
                  <p class="card-text">Good</p>
                </div>
                <div class="card-footer">
                  <nuxt-link to="userName" class="comment-author">
                    <img
                      src="https://avatars0.githubusercontent.com/u/68723614?s=400&amp;u=9676acd378ca0802e86a17f845a536af648497e0&amp;v=4"
                      class="comment-author-img"
                      alt="author profile image"
                    />
                  </nuxt-link>
                  <nuxt-link to="/" class="comment-author">devJang</nuxt-link>
                  <span class="date-posted">Wed Sep 02 2020</span>
                  <span class="mod-options">
                    <i class="ion-trash-a"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ArticleBanner from '~/components/ArticleBanner.vue'

export default {
  name: 'Aritcle',
  components: {
    ArticleBanner,
  },
}
</script>
