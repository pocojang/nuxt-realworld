<template>
  <ul class="nav navbar-nav pull-xs-right">
    <li class="nav-item">
      <nuxt-link to="/" class="nav-link"> Home </nuxt-link>
    </li>
    <li class="nav-item">
      <nuxt-link to="/login" class="nav-link"> Sign in </nuxt-link>
    </li>
    <li class="nav-item">
      <nuxt-link to="/register" class="nav-link"> Sigin up </nuxt-link>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'NavigationBar',
})
</script>
