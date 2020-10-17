import { Context } from '@nuxt/types'
import {
  articleRepository,
  commentRepository,
  profileRepository,
  tagRepository,
  userRepository,
  ArticleRepository,
  CommentRepository,
  ProfileRepository,
  TagRepository,
  UserRepository,
} from '@/api'

export type Repository = {
  article: ArticleRepository
  comment: CommentRepository
  profile: ProfileRepository
  tag: TagRepository
  user: UserRepository
}

/**
 * @see https://axios.nuxtjs.org
 * @see https://github.com/gothinkster/realworld/tree/3155494efe68432772157de38a90c49b3698897f/api
 */
const createRepository = ({ app, $axios, redirect }: Context): Repository => {
  $axios.onError((error) => {
    if (!error.response) {
      return
    }

    // TODO: 422 & constants
    const code = error.response.status

    // Unauthorized requests
    if (code === 401) {
      redirect('/login')

      return
    }

    // Forbidden requests
    if (code === 403) {
      app?.router?.back()

      return
    }

    // Not found requests
    if (code === 404) {
      redirect('/')
    }
  })

  return {
    article: articleRepository($axios),
    comment: commentRepository($axios),
    profile: profileRepository($axios),
    tag: tagRepository($axios),
    user: userRepository($axios),
  }
}

export default createRepository
