<template>
  <header>
    <nav class="navbar navbar-light">
      <div class="container">
        <nuxt-link to="/">
          <a class="navbar-brand">conduit</a>
        </nuxt-link>
        <ul class="nav navbar-nav pull-xs-right">
          <nuxt-link to="/">
            <li class="nav-item">
              <a class="nav-link">Home</a>
            </li>
          </nuxt-link>
          <nuxt-link to="/editor">
            <li class="nav-item">
              <a class="nav-link"> <i class="ion-compose"></i> New Post </a>
            </li>
          </nuxt-link>
          <nuxt-link to="/settings">
            <li class="nav-item">
              <a class="nav-link"> <i class="ion-gear-a"></i> Settings </a>
            </li>
          </nuxt-link>
          <nuxt-link to="/[userName]">
            <li class="nav-item">
              <a class="nav-link">
                <img
                  src="https://avatars0.githubusercontent.com/u/68723614?s=400&amp;u=9676acd378ca0802e86a17f845a536af648497e0&amp;v=4"
                  class="user-pic"
                  alt="user profile image"
                />
                devJang
              </a>
            </li>
          </nuxt-link>
        </ul>
      </div>
    </nav>
  </header>
</template>
