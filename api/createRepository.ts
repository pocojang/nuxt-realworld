import { NuxtAxiosInstance } from '@nuxtjs/axios'
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
} from '~/api'

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
const createRepository = ($axios: NuxtAxiosInstance): Repository => ({
  article: articleRepository($axios),
  comment: commentRepository($axios),
  profile: profileRepository($axios),
  tag: tagRepository($axios),
  user: userRepository($axios),
})

export default createRepository
