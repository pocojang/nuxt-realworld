<template>
  <div class="article-preview">
    <div class="article-meta">
      <nuxt-link to="/">
        <nuxt-link to="/">
          <img
            src="https://cdn.cnn.com/cnnnext/dam/assets/190410090959-01-black-hole-event-horizon-telescope-exlarge-169.jpg"
            alt="author profile image"
          />
        </nuxt-link>
        <div class="info">
          <nuxt-link to="/" class="author">yomogan</nuxt-link>
          <span class="date">Sun Sep 06 2020</span>
        </div>
      </nuxt-link>
      <div class="pull-xs-right">
        <button class="btn btn-sm btn-outline-primary">
          <i class="ion-heart"></i>
        </button>
      </div>
    </div>
    <nuxt-link to="/article/slug">
      <nuxt-link to="/" class="preview-link">
        <h1>test_yomogan_06_september</h1>
        <p>test_yomogan_06_september</p>
        <span>Read more...</span>
        <ul class="tag-list">
          <li class="tag-default tag-pill tag-outline">dragons</li>
          <li class="tag-default tag-pill tag-outline">test</li>
        </ul>
      </nuxt-link>
    </nuxt-link>
  </div>
</template>
