<template>
  <header>
    <nav class="navbar navbar-light">
      <div class="container">
        <nuxt-link to="/" class="navbar-brand">conduit</nuxt-link>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <nuxt-link to="/" class="nav-link">Home</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/editor" class="nav-link">
              <i class="ion-compose"></i> New Post
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/settings" class="nav-link">
              <i class="ion-gear-a"></i> Settings
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/profile/userName" class="nav-link">
              <img
                src="https://avatars0.githubusercontent.com/u/68723614?s=400&amp;u=9676acd378ca0802e86a17f845a536af648497e0&amp;v=4"
                class="user-pic"
                alt="user profile image"
              />
              devJang
            </nuxt-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
