# ![Nuxt RealWorld Example App](logo.png)

[![RealWorld Frontend](https://img.shields.io/badge/realworld-frontend-%23783578.svg)](http://realworld.io)

> ### Nuxt + Composition API RFC codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.


### [Demo](https://nuxt-realworld.vercel.app)&nbsp;&nbsp;&nbsp;&nbsp;[RealWorld](https://github.com/gothinkster/realworld)


This codebase was created to demonstrate a fully fledged fullstack application built with Nuxt including CRUD operations, authentication, routing, pagination, and more.

We've gone to great lengths to adhere to the Nuxt community styleguides & best practices.

For more information on how to this works with other frontends/backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.


# How it works

```bash
|____api           # api service
|____components    # Single File Components of Vue
|____compositions  # @composition-api base logic
|____pages         # Page Components of Nuxt
|____plugins       # inject to api service
|____types         # declare to Vue & Next type & Real World Model Type
```

# Getting started

```bash
# install dependencies
$ npm install
or
$ yarn install

# serve with hot reload at localhost:3000
$ npm run dev
or
$ yarn dev

# build for production and launch server
$ npm run build
$ npm start
or
$ yarn build
$ yarn start

# generate static project
$ npm run generate
or
$ yarn generate
```


## Functionality overview

The example application is a social blogging site (i.e. a Medium.com clone) called "Conduit". It uses a custom API for all requests, including authentication. You can view a live demo over at https://nuxt-realworld.vercel.app

**General functionality:**

- Authenticate users via JWT (login/signup pages + logout button on settings page)
- CRU* users (sign up & settings page - no deleting required)
- CRUD Articles
- CR*D Comments on articles (no updating required)
- GET and display paginated lists of articles
- Favorite articles
- Follow other users

**The general page breakdown looks like this:**

- Home page (URL: / )
    - List of tags
    - List of articles pulled from either Feed, Global, or by Tag
    - Pagination for list of articles
- Sign in/Sign up pages (URL: /login, /register )
    - Use JWT (store the token in localStorage)
- Settings page (URL: /settings )
- Editor page to create/edit articles (URL: /editor, /editor/article-slug-here )
- Article page (URL: /article/article-slug-here )
    - Delete article button (only shown to article's author)
    - Render markdown from server client side
    - Comments section at bottom of page
    - Delete comment button (only shown to comment's author)
- Profile page (URL: /profile/username, /profile/username/favorites )
    - Show basic user info
    - List of articles populated from author's created articles or author's favorited articles


## Vue related implementations of the Realworld app
[gothinkster/vue-realworld-example-app](https://github.com/gothinkster/vue-realworld-example-app) - vue2, js  
[AlexBrohshtut/vue-ts-realworld-app](https://github.com/AlexBrohshtut/vue-ts-realworld-app) - vue2, ts, class-component  
[mutoe/vue3-realworld-example-app](https://github.com/mutoe/vue3-realworld-example-app) - vue3, vite, ts, composition api

[![Brought to you by Thinkster](https://raw.githubusercontent.com/gothinkster/realworld/master/media/end.png)](https://thinkster.io)